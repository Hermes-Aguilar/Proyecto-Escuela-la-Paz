// ============================================================
// lib/dal/jardines.ts
// DAL de jardines (CU-02).
//
// Dos lecturas con públicos distintos:
//   · getJardinBySlug(slug)  → PORTAL PÚBLICO. No requiere sesión.
//     Lo usa la ruta /pastoral-educativa/[jardin] para pintar el
//     tema (colores) y los datos de contacto/redes.
//   · getJardinById(id)      → PANEL ADMIN. Requiere sesión y
//     aplica aislamiento: la encargada solo puede leer SU jardín.
//
// Ambas devuelven un DTO plano (JardinDTO), nunca la entidad
// Prisma cruda.
// ============================================================
import "server-only";
import { db } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/dal/session";
import { ForbiddenError } from "@/lib/dal/errors";

export interface JardinDTO {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  colorPrimario: string;
  colorSecundario: string;
  logoUrl: string | null;
  direccion: string | null;
  ciudad: string | null;
  telefono: string | null;
  emailContacto: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  whatsapp: string | null;
}

// Campos que se exponen al exterior. Coincide exactamente con
// JardinDTO, así Prisma devuelve ya la forma del DTO (sin mapear).
const jardinSelect = {
  id: true,
  nombre: true,
  slug: true,
  descripcion: true,
  colorPrimario: true,
  colorSecundario: true,
  logoUrl: true,
  direccion: true,
  ciudad: true,
  telefono: true,
  emailContacto: true,
  facebookUrl: true,
  instagramUrl: true,
  whatsapp: true,
} as const;

/**
 * Lectura PÚBLICA por slug (CU-02). Sin sesión.
 * Devuelve null si el jardín no existe (la ruta mostrará 404).
 */
export async function getJardinBySlug(slug: string): Promise<JardinDTO | null> {
  return db.jardin.findUnique({
    where: { slug },
    select: jardinSelect,
  });
}

/**
 * Lectura del PANEL ADMIN por id. Requiere sesión.
 * Aislamiento: una encargada solo puede leer su propio jardín; si
 * pide otro id, se bloquea (no se revela nada de otra escuela).
 */
export async function getJardinById(id: number): Promise<JardinDTO | null> {
  const user = await getAuthenticatedUser();

  if (id !== user.jardinId) throw new ForbiddenError();

  return db.jardin.findUnique({
    where: { id },
    select: jardinSelect,
  });
}
