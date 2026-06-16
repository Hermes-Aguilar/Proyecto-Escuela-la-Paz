// ============================================================
// lib/publicaciones-ui.ts
// Helpers de presentación compartidos por las páginas públicas del
// jardín (inicio, muro por tipo y detalle). Sin lógica de datos: solo
// formato de fechas, extracto del primer texto y mapeos de tipo.
// ============================================================
import type { TipoPublicacion } from "@prisma/client";
import type { Bloque } from "@/types/bloques";
import type { PublicacionDTO } from "@/lib/dal/publicaciones";

// ---------- Tipos de publicación ----------

export interface TipoInfo {
  /** Etiqueta singular para badges ("Noticia"). */
  etiqueta: string;
  /** Título de la sección/plural ("Noticias"). */
  plural: string;
  /** Segmento de ruta (`/publicaciones/<slug>`). */
  slug: string;
  /** Clases del badge (paleta institucional). */
  badge: string;
  /** Mensaje del estado vacío del muro. */
  vacio: string;
}

export const TIPOS: Record<TipoPublicacion, TipoInfo> = {
  NOTICIA: {
    etiqueta: "Noticia",
    plural: "Noticias",
    slug: "noticias",
    badge: "bg-olivo/15 text-olivo",
    vacio: "Aún no hay noticias publicadas. ¡Vuelve pronto!",
  },
  EVENTO: {
    etiqueta: "Evento",
    plural: "Eventos",
    slug: "eventos",
    badge: "bg-terracota/15 text-terracota",
    vacio: "No hay eventos programados por el momento.",
  },
  AVISO: {
    etiqueta: "Aviso",
    plural: "Avisos",
    slug: "avisos",
    badge: "bg-arena/70 text-marron-suave",
    vacio: "No hay avisos disponibles por el momento.",
  },
};

// Mapea el segmento de ruta (noticias/eventos/avisos) al enum. Un slug
// desconocido devuelve null → la ruta hará 404.
export function slugATipo(slug: string): TipoPublicacion | null {
  const entrada = (Object.entries(TIPOS) as [TipoPublicacion, TipoInfo][]).find(
    ([, info]) => info.slug === slug,
  );
  return entrada ? entrada[0] : null;
}

// ---------- Fechas y texto ----------

// "12 de junio de 2026"
export function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

// Texto del primer BloqueTexto (para el extracto de las tarjetas).
export function primerTexto(bloques: Bloque[]): string {
  const bloque = bloques.find((b) => b.tipo === "texto");
  return bloque ? bloque.valor.trim() : "";
}

// Recorta a `max` caracteres sin cortar a media palabra y añade "…".
export function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const ultimoEspacio = corte.lastIndexOf(" ");
  return `${corte.slice(0, ultimoEspacio > 0 ? ultimoEspacio : max).trimEnd()}…`;
}

// URL de la primera imagen de portada (primer BloqueImagen resuelto a su
// Medio). null si la publicación no tiene imágenes.
export function portadaUrl(pub: PublicacionDTO): string | null {
  const bloque = pub.contenido.find((b) => b.tipo === "imagen");
  if (!bloque) return null;
  return pub.medios.find((m) => m.id === bloque.medioId)?.url ?? null;
}

// ID de un link de YouTube (watch?v=… o youtu.be/…) → URL de embed.
export function youtubeEmbedUrl(url: string): string | null {
  const m =
    url.match(/[?&]v=([\w-]{11})/) ?? url.match(/youtu\.be\/([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
