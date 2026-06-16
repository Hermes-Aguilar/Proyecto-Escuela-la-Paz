// ============================================================
// lib/actions/publicaciones.actions.ts
// Server Actions del CRUD de publicaciones (CU-06/08/09).
//
// Contrato Result<T>: toda action captura los errores del DAL y de
// Cloudinary y los traduce a un código estable (VALIDATION,
// FORBIDDEN, NOT_FOUND, INTERNAL). Nunca se filtra el mensaje real
// ni el stack al cliente.
//
// El cuerpo de la publicación llega como BLOQUES (texto/imagen/video)
// en un campo "bloques" (JSON). Las imágenes nuevas llegan aparte
// como Files en "imagenes" + sus claves en "imagenesRefs" (mismo
// orden). La action sube los Files a Cloudinary y le pasa al DAL las
// imágenes ya resueltas; el DAL inserta los Medios, obtiene sus ids y
// reescribe los bloques. El jardinId SIEMPRE sale de la sesión.
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
  type ImagenNueva,
} from "@/lib/dal/publicaciones";
import { subirImagen, eliminarImagen } from "@/lib/services/cloudinary";
import {
  publicacionSchema,
  editarPublicacionSchema,
  imagenesSchema,
} from "@/lib/validations/publicacion";
import type { ContenidoBorrador } from "@/types/bloques";

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

/** Parsea el JSON de bloques del FormData (undefined si no es válido). */
function leerBloques(formData: FormData): unknown {
  const raw = formData.get("bloques");
  if (typeof raw !== "string") return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/** Pares (File, ref) de imágenes nuevas, en el orden paralelo del FormData. */
function leerImagenesNuevas(formData: FormData): { file: File; ref: string }[] {
  const files = formData.getAll("imagenes");
  const refs = formData.getAll("imagenesRefs");
  const out: { file: File; ref: string }[] = [];
  files.forEach((f, i) => {
    const ref = refs[i];
    if (esArchivo(f) && typeof ref === "string" && ref.length > 0) {
      out.push({ file: f, ref });
    }
  });
  return out;
}

/** Refs de imágenes nuevas que aparecen en el contenido. */
function refsNuevasDelContenido(bloques: ContenidoBorrador): string[] {
  return bloques.flatMap((b) =>
    b.tipo === "imagen" && "nuevaRef" in b ? [b.nuevaRef] : [],
  );
}

/** Verifica que cada `nuevaRef` del contenido tenga su File y viceversa. */
function refsCuadran(
  bloques: ContenidoBorrador,
  archivos: { ref: string }[],
): boolean {
  const enContenido = refsNuevasDelContenido(bloques);
  const enArchivos = new Set(archivos.map((a) => a.ref));
  return (
    enContenido.length === archivos.length &&
    enContenido.every((r) => enArchivos.has(r))
  );
}

/** Sube cada File a Cloudinary y arma las imágenes resueltas para el DAL. */
async function subirImagenes(
  archivos: { file: File; ref: string }[],
  carpeta: string,
): Promise<ImagenNueva[]> {
  const imagenes: ImagenNueva[] = [];
  for (const { file, ref } of archivos) {
    const { url, publicId } = await subirImagen(file, carpeta);
    imagenes.push({ nuevaRef: ref, url, publicId });
  }
  return imagenes;
}

/** Slug del jardín de la sesión (carpeta de Cloudinary + revalidar el muro). */
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
    const parsed = publicacionSchema.safeParse({
      titulo: formData.get("titulo"),
      tipo: formData.get("tipo"),
      contenido: leerBloques(formData),
    });
    if (!parsed.success) return fail("VALIDATION", primerError(parsed.error));
    const { titulo, tipo, contenido: bloques } = parsed.data;

    const archivos = leerImagenesNuevas(formData);
    const files = imagenesSchema.safeParse(archivos.map((a) => a.file));
    if (!files.success) return fail("VALIDATION", primerError(files.error));
    if (!refsCuadran(bloques, archivos))
      return fail("VALIDATION", "Faltan imágenes por adjuntar. Inténtalo de nuevo.");

    const slug = await slugDelJardin(user.jardinId);
    const carpeta = `congregacion/${slug}/publicaciones`;

    // Imágenes → Cloudinary → {nuevaRef, url, publicId}.
    const imagenes = await subirImagenes(archivos, carpeta);

    // Inserta publicación + medios y resuelve los bloques (DAL, atómico).
    const pub = await createPublicacion({ titulo, tipo, bloques, imagenes });

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

    const parsed = editarPublicacionSchema.safeParse({
      titulo: formData.get("titulo"),
      tipo: formData.get("tipo"),
      contenido: leerBloques(formData),
    });
    if (!parsed.success) return fail("VALIDATION", primerError(parsed.error));
    const { titulo, tipo, contenido: bloques } = parsed.data;

    const archivos = leerImagenesNuevas(formData);
    const files = imagenesSchema.safeParse(archivos.map((a) => a.file));
    if (!files.success) return fail("VALIDATION", primerError(files.error));
    if (!refsCuadran(bloques, archivos))
      return fail("VALIDATION", "Faltan imágenes por adjuntar. Inténtalo de nuevo.");

    // Medios IMAGEN que el contenido editado ya no referencia → eliminar.
    const referenciados = new Set(
      bloques.flatMap((b) =>
        b.tipo === "imagen" && "medioId" in b ? [b.medioId] : [],
      ),
    );
    const mediosEliminar = actual.medios
      .filter((m) => m.tipo === "IMAGEN" && !referenciados.has(m.id))
      .map((m) => m.id);

    const slug = await slugDelJardin(user.jardinId);
    const carpeta = `congregacion/${slug}/publicaciones`;

    // Fotos quitadas → borrarlas de Cloudinary ANTES de tocar la BD.
    const aQuitar = actual.medios.filter((m) => mediosEliminar.includes(m.id));
    for (const medio of aQuitar) {
      if (medio.tipo === "IMAGEN" && medio.publicId) {
        await eliminarImagen(medio.publicId);
      }
    }

    // Fotos nuevas → Cloudinary.
    const imagenesNuevas = await subirImagenes(archivos, carpeta);

    const pub = await updatePublicacion(id, {
      titulo,
      tipo,
      bloques,
      imagenesNuevas,
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
