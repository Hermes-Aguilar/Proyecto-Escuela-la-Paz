// ============================================================
// lib/dal/publicaciones.ts
// DAL del CRUD de publicaciones (CU-06 a CU-09).
//
// Regla de oro: salvo la lectura del muro público, TODA función
// llama getAuthenticatedUser() primero y filtra/valida por el
// jardinId de la SESIÓN (nunca uno externo). Editar y borrar
// revalidan la propiedad antes de tocar nada (defensa en
// profundidad sobre proxy.ts).
//
// El contenido es un ARRAY DE BLOQUES (texto/imagen/video, ver
// types/bloques.ts). Una BloqueImagen referencia un Medio por su
// id; el DAL inserta primero los Medios de las imágenes nuevas,
// obtiene sus ids reales y reescribe los bloques borrador a su
// forma canónica antes de guardarlos. Al leer, el JSON de la BD se
// valida con zod (no se confía ciegamente en él). Todo se devuelve
// como DTO plano, nunca la entidad Prisma cruda.
// ============================================================
import "server-only";
import type { TipoPublicacion, TipoMedio, Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/dal/session";
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/dal/errors";
import { contenidoLecturaSchema } from "@/lib/validations/publicacion";
import type { Bloque, BloqueBorrador } from "@/types/bloques";

// ---------- DTOs ----------

export interface MedioDTO {
  id: number;
  url: string;
  // public_id de Cloudinary (solo imágenes); null en videos de YouTube.
  publicId: string | null;
  tipo: TipoMedio;
  orden: number;
}

export interface PublicacionDTO {
  id: number;
  jardinId: number;
  titulo: string;
  contenido: Bloque[];
  tipo: TipoPublicacion;
  publicado: boolean;
  creadoEn: Date;
  actualizadoEn: Date | null;
  medios: MedioDTO[];
}

// ---------- Entradas ----------

/** Una imagen ya subida a Cloudinary, lista para insertarse como Medio. */
export interface ImagenNueva {
  /** Clave temporal con que el bloque borrador la referencia. */
  nuevaRef: string;
  url: string;
  publicId: string;
}

export interface CreatePublicacionData {
  titulo: string;
  tipo: TipoPublicacion;
  /** Bloques en formato borrador (las imágenes nuevas usan `nuevaRef`). */
  bloques: BloqueBorrador[];
  /** Imágenes nuevas ya subidas a Cloudinary. */
  imagenes: ImagenNueva[];
}

export interface UpdatePublicacionData {
  titulo: string;
  tipo: TipoPublicacion;
  bloques: BloqueBorrador[];
  /** Imágenes nuevas ya subidas a Cloudinary. */
  imagenesNuevas: ImagenNueva[];
  /** Ids de Medios existentes a eliminar (la action ya los borró de Cloudinary). */
  mediosEliminar: number[];
}

// Forma única expuesta al exterior. `contenido` se castea aparte (Json → Bloque[]).
const publicacionSelect = {
  id: true,
  jardinId: true,
  titulo: true,
  contenido: true,
  tipo: true,
  publicado: true,
  creadoEn: true,
  actualizadoEn: true,
  medios: {
    select: { id: true, url: true, publicId: true, tipo: true, orden: true },
    orderBy: { orden: "asc" },
  },
} as const;

type PublicacionRow = Prisma.PublicacionGetPayload<{
  select: typeof publicacionSelect;
}>;

// ---------- Helpers ----------

/**
 * Mapea la fila de Prisma a DTO validando el JSON de `contenido` con
 * zod. Si por algún dato corrupto no casa la estructura, devuelve un
 * contenido vacío en vez de romper la lectura (no se confía ciegamente
 * en el JSON de la BD).
 */
function aDTO(row: PublicacionRow): PublicacionDTO {
  const parsed = contenidoLecturaSchema.safeParse(row.contenido);
  return { ...row, contenido: parsed.success ? parsed.data : [] };
}

/**
 * Reescribe los bloques borrador a su forma canónica:
 *   · imagen con `nuevaRef` → `medioId` real (del map ref→id)
 *   · imagen con `medioId`   → se conserva, pero DEBE pertenecer a
 *     esta publicación (defensa: el cliente no referencia un Medio ajeno)
 *   · texto / video          → sin cambios
 */
function resolverBloques(
  bloques: BloqueBorrador[],
  refAId: Map<string, number>,
  mediosValidos: Set<number>,
): Bloque[] {
  return bloques.map((b) => {
    if (b.tipo !== "imagen") return b;
    if ("nuevaRef" in b) {
      const id = refAId.get(b.nuevaRef);
      if (id == null) {
        throw new ValidationError("Falta subir una imagen del contenido");
      }
      return { tipo: "imagen", medioId: id };
    }
    // Imagen existente: solo válida si es un Medio de ESTA publicación.
    if (!mediosValidos.has(b.medioId)) throw new ForbiddenError();
    return { tipo: "imagen", medioId: b.medioId };
  });
}

// Prisma no acepta tipos de objeto concretos donde espera Json de
// entrada; el cast lo trata como JSON plano (lo es).
function comoJson(bloques: Bloque[]): Prisma.InputJsonValue {
  return bloques as unknown as Prisma.InputJsonValue;
}

// ============================================================
// LECTURAS
// ============================================================

/**
 * CU-07 · Lista del PANEL: solo las publicaciones del jardín de la
 * sesión, de la más reciente a la más antigua.
 */
export async function getPublicaciones(): Promise<PublicacionDTO[]> {
  const user = await getAuthenticatedUser();
  const rows = await db.publicacion.findMany({
    where: { jardinId: user.jardinId },
    orderBy: { creadoEn: "desc" },
    select: publicacionSelect,
  });
  return rows.map(aDTO);
}

/**
 * CU-02 · Muro PÚBLICO de un jardín. Sin sesión: el jardinId llega
 * desde el slug de la ruta pública. Solo publicaciones visibles
 * (`publicado = true`), de la más reciente a la más antigua.
 *
 * Filtros opcionales:
 *   · `tipo`  → restringe al tipo (noticias/eventos/avisos del muro).
 *   · `limit` → recorta el número de filas (p. ej. las 3 más recientes
 *     para el inicio del jardín).
 */
export async function getPublicacionesPublicas(
  jardinId: number,
  tipo?: TipoPublicacion,
  limit?: number,
): Promise<PublicacionDTO[]> {
  const rows = await db.publicacion.findMany({
    where: { jardinId, publicado: true, ...(tipo ? { tipo } : {}) },
    orderBy: { creadoEn: "desc" },
    ...(limit ? { take: limit } : {}),
    select: publicacionSelect,
  });
  return rows.map(aDTO);
}

/**
 * CU-03 · Detalle PÚBLICO de una publicación. Sin sesión: el jardinId
 * llega desde el slug de la ruta pública. Filtra por id + jardinId +
 * `publicado = true`, de modo que una publicación de otro jardín o aún
 * en borrador NO se revela. Devuelve null si no existe (la ruta hará
 * 404), sin distinguir "no existe" de "no es público".
 */
export async function getPublicacionPublicaById(
  id: number,
  jardinId: number,
): Promise<PublicacionDTO | null> {
  const pub = await db.publicacion.findFirst({
    where: { id, jardinId, publicado: true },
    select: publicacionSelect,
  });
  return pub ? aDTO(pub) : null;
}

/**
 * CU-07/08 · Detalle por id para el panel. Valida propiedad: si la
 * publicación es de otro jardín se bloquea (no se revela su
 * contenido). NotFoundError si no existe.
 */
export async function getPublicacionById(id: number): Promise<PublicacionDTO> {
  const user = await getAuthenticatedUser();
  const pub = await db.publicacion.findUnique({
    where: { id },
    select: publicacionSelect,
  });

  if (!pub) throw new NotFoundError();
  if (pub.jardinId !== user.jardinId) throw new ForbiddenError();

  return aDTO(pub);
}

// ============================================================
// ESCRITURAS
// ============================================================

/**
 * CU-06 · Crear. El jardinId y la autoría salen SIEMPRE de la
 * sesión, jamás de la entrada. En una transacción: inserta la
 * publicación, crea los Medios de las imágenes (para obtener sus ids),
 * resuelve los bloques y guarda el contenido ya canónico.
 */
export async function createPublicacion(
  data: CreatePublicacionData,
): Promise<PublicacionDTO> {
  const user = await getAuthenticatedUser();

  const row = await db.$transaction(async (tx) => {
    // 1. Publicación con contenido placeholder (necesitamos su id para
    //    poder colgar los Medios antes de resolver los bloques).
    const pub = await tx.publicacion.create({
      data: {
        jardinId: user.jardinId,
        usuarioId: Number(user.id),
        titulo: data.titulo,
        tipo: data.tipo,
        contenido: comoJson([]),
      },
      select: { id: true },
    });

    // 2. Medios de las imágenes nuevas → mapa ref → id real.
    const refAId = new Map<string, number>();
    let orden = 0;
    for (const img of data.imagenes) {
      const medio = await tx.medio.create({
        data: {
          publicacionId: pub.id,
          url: img.url,
          publicId: img.publicId,
          tipo: "IMAGEN",
          orden: orden++,
        },
        select: { id: true },
      });
      refAId.set(img.nuevaRef, medio.id);
    }

    // 3. Resuelve bloques y guarda el contenido definitivo.
    const contenido = resolverBloques(
      data.bloques,
      refAId,
      new Set(refAId.values()),
    );
    return tx.publicacion.update({
      where: { id: pub.id },
      data: { contenido: comoJson(contenido) },
      select: publicacionSelect,
    });
  });

  return aDTO(row);
}

/**
 * CU-08 · Editar. Revalida propiedad ANTES de tocar nada. En una
 * transacción: borra los Medios marcados, crea los nuevos, resuelve
 * los bloques (los medioId existentes deben seguir siendo de esta
 * publicación) y actualiza texto + contenido + actualizadoEn.
 */
export async function updatePublicacion(
  id: number,
  data: UpdatePublicacionData,
): Promise<PublicacionDTO> {
  const user = await getAuthenticatedUser();

  const existing = await db.publicacion.findUnique({
    where: { id },
    select: { jardinId: true, medios: { select: { id: true } } },
  });
  if (!existing) throw new NotFoundError();
  if (existing.jardinId !== user.jardinId) throw new ForbiddenError();

  const row = await db.$transaction(async (tx) => {
    if (data.mediosEliminar.length) {
      // publicacionId en el filtro: nunca borrar Medios de otra fila.
      await tx.medio.deleteMany({
        where: { id: { in: data.mediosEliminar }, publicacionId: id },
      });
    }

    // Medios que sobreviven al borrado (válidos para referenciar).
    const sobreviven = new Set(
      existing.medios
        .map((m) => m.id)
        .filter((mid) => !data.mediosEliminar.includes(mid)),
    );

    // Imágenes nuevas → Medios → mapa ref → id real.
    const refAId = new Map<string, number>();
    let orden = sobreviven.size;
    for (const img of data.imagenesNuevas) {
      const medio = await tx.medio.create({
        data: {
          publicacionId: id,
          url: img.url,
          publicId: img.publicId,
          tipo: "IMAGEN",
          orden: orden++,
        },
        select: { id: true },
      });
      refAId.set(img.nuevaRef, medio.id);
      sobreviven.add(medio.id);
    }

    const contenido = resolverBloques(data.bloques, refAId, sobreviven);
    return tx.publicacion.update({
      where: { id },
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        actualizadoEn: new Date(),
        contenido: comoJson(contenido),
      },
      select: publicacionSelect,
    });
  });

  return aDTO(row);
}

/**
 * CU-09 · Borrar. Revalida propiedad: si no es de su jardín lanza
 * ForbiddenError. Los medios se borran en cascada (onDelete:
 * Cascade del esquema). La limpieza de Cloudinary la hace la action
 * ANTES de llamar aquí (necesita las URLs).
 */
export async function deletePublicacion(id: number): Promise<void> {
  const user = await getAuthenticatedUser();

  const pub = await db.publicacion.findUnique({
    where: { id },
    select: { jardinId: true },
  });
  if (!pub) throw new NotFoundError();
  if (pub.jardinId !== user.jardinId) throw new ForbiddenError();

  await db.publicacion.delete({ where: { id } });
}
