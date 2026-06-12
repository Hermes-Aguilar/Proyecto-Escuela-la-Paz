// ============================================================
// lib/actions/publicaciones.actions.ts
// Server Actions del CRUD de publicaciones (CU-06/08/09).
//
// Contrato Result<T>: toda action captura los errores del DAL y de
// Cloudinary y los traduce a un código estable (VALIDATION,
// FORBIDDEN, NOT_FOUND, INTERNAL). Nunca se filtra el mensaje real
// ni el stack al cliente.
//
// Reparto de responsabilidades:
//   · Validación de entrada → zod (lib/validations/publicacion.ts)
//   · Archivos (subir/borrar) → Cloudinary (lib/services)
//   · Persistencia atómica → DAL (lib/dal/publicaciones.ts), que
//     además impone el aislamiento por jardinId de la sesión.
// El jardinId SIEMPRE sale de la sesión, jamás del formulario.
// ============================================================
"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import type { ZodError } from "zod";

import { ok, fail, type Result } from "@/lib/contracts/result";
import {
  ValidationError,
  ForbiddenError,
  NotFoundError,
} from "@/lib/dal/errors";
import { getAuthenticatedUser } from "@/lib/dal/session";
import { getJardinById } from "@/lib/dal/jardines";
import {
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionById,
  type PublicacionDTO,
  type MedioInput,
} from "@/lib/dal/publicaciones";
import { subirImagen, eliminarImagen } from "@/lib/services/cloudinary";
import {
  publicacionSchema,
  editarPublicacionSchema,
  MAX_IMAGENES,
  MAX_VIDEOS,
} from "@/lib/validations/publicacion";

// ============================================================
// Helpers
// ============================================================

/** Traduce cualquier excepción a un Result<never> con código estable. */
function mapError(e: unknown): Result<never> {
  if (e instanceof ValidationError) return fail("VALIDATION", e.message);
  if (e instanceof ForbiddenError) return fail("FORBIDDEN", "No autorizado");
  if (e instanceof NotFoundError) return fail("NOT_FOUND", "No encontrado");
  // No exponemos el mensaje real ni el stack.
  return fail("INTERNAL", "Error del servidor");
}

/** Primer mensaje legible de un error de zod. */
function primerError(error: ZodError): string {
  return error.issues[0]?.message ?? "Datos inválidos";
}

/** Un File con contenido real (descarta inputs de archivo vacíos). */
function esArchivo(v: FormDataEntryValue): v is File {
  return v instanceof File && v.size > 0;
}

/** Extrae del FormData los campos comunes de una publicación. */
function leerCampos(formData: FormData) {
  return {
    titulo: formData.get("titulo"),
    contenido: formData.get("contenido"),
    tipo: formData.get("tipo"),
    imagenes: formData.getAll("imagenes").filter(esArchivo),
    videosYoutube: formData
      .getAll("videosYoutube")
      .filter((v): v is string => typeof v === "string" && v.trim().length > 0),
  };
}

/** Ids de medios a eliminar (solo enteros positivos válidos). */
function leerMediosEliminar(formData: FormData): number[] {
  return formData
    .getAll("mediosEliminar")
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0);
}

/** Slug del jardín de la sesión (para la carpeta de Cloudinary y revalidar el muro). */
async function slugDelJardin(jardinId: number): Promise<string> {
  const jardin = await getJardinById(jardinId);
  if (!jardin) throw new NotFoundError();
  return jardin.slug;
}

// ============================================================
// CU-06 · Crear
// ============================================================
export async function crearPublicacion(
  formData: FormData,
): Promise<Result<PublicacionDTO>> {
  try {
    const user = await getAuthenticatedUser();

    // Validar ANTES de subir nada a Cloudinary.
    const parsed = publicacionSchema.safeParse(leerCampos(formData));
    if (!parsed.success) return fail("VALIDATION", primerError(parsed.error));
    const { titulo, contenido, tipo, imagenes, videosYoutube } = parsed.data;

    const slug = await slugDelJardin(user.jardinId);
    const carpeta = `congregacion/${slug}/publicaciones`;

    // Imágenes → Cloudinary → medios IMAGEN (con publicId).
    const medios: MedioInput[] = [];
    for (const imagen of imagenes) {
      const { url, publicId } = await subirImagen(imagen, carpeta);
      medios.push({ url, publicId, tipo: "IMAGEN", orden: medios.length });
    }
    // Videos de YouTube → medios VIDEO (sin publicId).
    for (const link of videosYoutube) {
      medios.push({ url: link, publicId: null, tipo: "VIDEO", orden: medios.length });
    }

    // Inserta publicación + medios en una transacción (DAL).
    const pub = await createPublicacion({ titulo, contenido, tipo, medios });

    revalidatePath("/dashboard");
    revalidatePath(`/pastoral-educativa/${slug}`);
    return ok(pub);
  } catch (e) {
    unstable_rethrow(e);
    return mapError(e);
  }
}

// ============================================================
// CU-08 · Editar
// ============================================================
export async function editarPublicacion(
  id: number,
  formData: FormData,
): Promise<Result<PublicacionDTO>> {
  try {
    const user = await getAuthenticatedUser();

    // Ownership + estado actual (el DAL lanza Forbidden/NotFound).
    const actual = await getPublicacionById(id);

    // Validar entrada (incluye los ids de medios a quitar).
    const parsed = editarPublicacionSchema.safeParse({
      ...leerCampos(formData),
      mediosEliminar: leerMediosEliminar(formData),
    });
    if (!parsed.success) return fail("VALIDATION", primerError(parsed.error));
    const { titulo, contenido, tipo, imagenes, videosYoutube, mediosEliminar } =
      parsed.data;

    // Validar el TOTAL por tipo (existentes − eliminadas + nuevas) ANTES de
    // tocar Cloudinary: no gastar uploads en una operación que va a fallar.
    const imagenesActuales = actual.medios.filter(
      (m) => m.tipo === "IMAGEN" && !mediosEliminar.includes(m.id),
    ).length;
    const videosActuales = actual.medios.filter(
      (m) => m.tipo === "VIDEO" && !mediosEliminar.includes(m.id),
    ).length;
    if (imagenesActuales + imagenes.length > MAX_IMAGENES)
      return fail("VALIDATION", `Máximo ${MAX_IMAGENES} fotos por publicación`);
    if (videosActuales + videosYoutube.length > MAX_VIDEOS)
      return fail("VALIDATION", `Máximo ${MAX_VIDEOS} videos por publicación`);

    const slug = await slugDelJardin(user.jardinId);
    const carpeta = `congregacion/${slug}/publicaciones`;

    // Fotos eliminadas → borrarlas de Cloudinary (solo imágenes con publicId).
    const aQuitar = actual.medios.filter((m) => mediosEliminar.includes(m.id));
    for (const medio of aQuitar) {
      if (medio.tipo === "IMAGEN" && medio.publicId) {
        await eliminarImagen(medio.publicId);
      }
    }

    // Fotos nuevas y videos nuevos → medios a crear (se añaden al final).
    const mediosNuevos: MedioInput[] = [];
    let orden = actual.medios.length;
    for (const imagen of imagenes) {
      const { url, publicId } = await subirImagen(imagen, carpeta);
      mediosNuevos.push({ url, publicId, tipo: "IMAGEN", orden: orden++ });
    }
    for (const link of videosYoutube) {
      mediosNuevos.push({ url: link, publicId: null, tipo: "VIDEO", orden: orden++ });
    }

    const pub = await updatePublicacion(id, {
      titulo,
      contenido,
      tipo,
      mediosNuevos,
      mediosEliminar,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/pastoral-educativa/${slug}`);
    return ok(pub);
  } catch (e) {
    unstable_rethrow(e);
    return mapError(e);
  }
}

// ============================================================
// CU-09 · Borrar
// ============================================================
export async function borrarPublicacion(id: number): Promise<Result<void>> {
  try {
    // Ownership + trae los medios (el DAL lanza Forbidden/NotFound).
    const pub = await getPublicacionById(id);

    // Limpia Cloudinary ANTES de borrar la BD (necesita los publicId).
    for (const medio of pub.medios) {
      if (medio.tipo === "IMAGEN" && medio.publicId) {
        await eliminarImagen(medio.publicId);
      }
    }

    // Borra de la BD (los medios caen por onDelete: Cascade).
    await deletePublicacion(id);

    const slug = await slugDelJardin(pub.jardinId);
    revalidatePath("/dashboard");
    revalidatePath(`/pastoral-educativa/${slug}`);
    return ok(undefined);
  } catch (e) {
    unstable_rethrow(e);
    return mapError(e);
  }
}
