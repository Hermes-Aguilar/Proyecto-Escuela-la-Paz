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
// El DAL es el dueño de Prisma: la transacción publicación+medios
// vive aquí. La Server Action solo orquesta Cloudinary y le pasa
// las URLs ya subidas como datos planos. Todo se devuelve como DTO
// plano, nunca la entidad Prisma cruda.
// ============================================================
import "server-only";
import type { TipoPublicacion, TipoMedio } from "@prisma/client";

import { db } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/dal/session";
import { ForbiddenError, NotFoundError } from "@/lib/dal/errors";

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
  contenido: string;
  tipo: TipoPublicacion;
  publicado: boolean;
  creadoEn: Date;
  actualizadoEn: Date | null;
  medios: MedioDTO[];
}

// ---------- Entradas (datos planos, sin archivos) ----------

/** Un medio ya resuelto: imagen subida a Cloudinary o link de YouTube. */
export interface MedioInput {
  url: string;
  /** public_id de Cloudinary para imágenes; null/omitido en videos. */
  publicId?: string | null;
  tipo: TipoMedio;
  orden: number;
}

export interface CreatePublicacionData {
  titulo: string;
  contenido: string;
  tipo: TipoPublicacion;
  medios: MedioInput[];
}

export interface UpdatePublicacionData {
  titulo: string;
  contenido: string;
  tipo: TipoPublicacion;
  /** Medios a crear (imágenes nuevas ya subidas o videos añadidos). */
  mediosNuevos: MedioInput[];
  /** Ids de medios existentes a eliminar (la action ya los borró de Cloudinary). */
  mediosEliminar: number[];
}

// Forma única expuesta al exterior. Calca PublicacionDTO para que
// Prisma devuelva ya el DTO sin mapeo manual.
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

// ============================================================
// LECTURAS
// ============================================================

/**
 * CU-07 · Lista del PANEL: solo las publicaciones del jardín de la
 * sesión, de la más reciente a la más antigua.
 */
export async function getPublicaciones(): Promise<PublicacionDTO[]> {
  const user = await getAuthenticatedUser();
  return db.publicacion.findMany({
    where: { jardinId: user.jardinId },
    orderBy: { creadoEn: "desc" },
    select: publicacionSelect,
  });
}

/**
 * CU-02 · Muro PÚBLICO de un jardín. Sin sesión: el jardinId llega
 * desde el slug de la ruta pública. Solo publicaciones visibles.
 */
export async function getPublicacionesPublicas(
  jardinId: number,
): Promise<PublicacionDTO[]> {
  return db.publicacion.findMany({
    where: { jardinId, publicado: true },
    orderBy: { creadoEn: "desc" },
    select: publicacionSelect,
  });
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

  return pub;
}

// ============================================================
// ESCRITURAS
// ============================================================

/**
 * CU-06 · Crear. El jardinId y la autoría salen SIEMPRE de la
 * sesión, jamás de la entrada. La publicación y sus medios se
 * insertan de forma atómica (nested create = una transacción).
 */
export async function createPublicacion(
  data: CreatePublicacionData,
): Promise<PublicacionDTO> {
  const user = await getAuthenticatedUser();

  return db.publicacion.create({
    data: {
      jardinId: user.jardinId,
      usuarioId: Number(user.id),
      titulo: data.titulo,
      contenido: data.contenido,
      tipo: data.tipo,
      medios: data.medios.length
        ? {
            create: data.medios.map((m) => ({
              url: m.url,
              publicId: m.publicId ?? null,
              tipo: m.tipo,
              orden: m.orden,
            })),
          }
        : undefined,
    },
    select: publicacionSelect,
  });
}

/**
 * CU-08 · Editar. Revalida propiedad ANTES de tocar nada. Borra los
 * medios marcados, crea los nuevos y actualiza el texto +
 * actualizadoEn, todo en una transacción.
 */
export async function updatePublicacion(
  id: number,
  data: UpdatePublicacionData,
): Promise<PublicacionDTO> {
  const user = await getAuthenticatedUser();

  const existing = await db.publicacion.findUnique({
    where: { id },
    select: { jardinId: true },
  });
  if (!existing) throw new NotFoundError();
  if (existing.jardinId !== user.jardinId) throw new ForbiddenError();

  return db.$transaction(async (tx) => {
    if (data.mediosEliminar.length) {
      // publicacionId en el filtro: nunca borrar medios de otra fila.
      await tx.medio.deleteMany({
        where: { id: { in: data.mediosEliminar }, publicacionId: id },
      });
    }

    return tx.publicacion.update({
      where: { id },
      data: {
        titulo: data.titulo,
        contenido: data.contenido,
        tipo: data.tipo,
        actualizadoEn: new Date(),
        medios: data.mediosNuevos.length
          ? {
              create: data.mediosNuevos.map((m) => ({
                url: m.url,
                publicId: m.publicId ?? null,
                tipo: m.tipo,
                orden: m.orden,
              })),
            }
          : undefined,
      },
      select: publicacionSelect,
    });
  });
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
