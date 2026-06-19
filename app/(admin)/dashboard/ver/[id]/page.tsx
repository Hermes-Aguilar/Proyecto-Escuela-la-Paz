// ============================================================
// app/(admin)/dashboard/ver/[id]/page.tsx
// CU-07 · Ver Publicación (panel). Server Component de SOLO
// LECTURA: carga la publicación con getPublicacionById (que
// revalida la propiedad por jardinId) y la muestra como una
// "vista previa de noticia". Si no existe O es de otro jardín →
// 404, sin revelar si la publicación existe (no fuga de datos
// entre jardines, mismo criterio que editar).
//
// El contenido es un array de BLOQUES (texto/imagen/video) que se
// renderizan EN ORDEN. Las imágenes consecutivas se agrupan en una
// cuadrícula; cada BloqueImagen referencia un Medio por su id.
// ============================================================
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect, unstable_rethrow } from "next/navigation";
import type { TipoPublicacion } from "@prisma/client";

import { getAuthenticatedUser } from "@/lib/dal/session";
import { getJardinById } from "@/lib/dal/jardines";
import {
  getPublicacionById,
  type PublicacionDTO,
} from "@/lib/dal/publicaciones";
import type { Bloque } from "@/types/bloques";

// ---------- Presentación por tipo (mismos colores que el dashboard) ----------

const TIPO_BADGE: Record<TipoPublicacion, { etiqueta: string; clases: string }> =
  {
    NOTICIA: { etiqueta: "Noticia", clases: "bg-dorado/15 text-dorado" },
    EVENTO: { etiqueta: "Evento", clases: "bg-azul-institucional/15 text-azul-institucional" },
    AVISO: { etiqueta: "Aviso", clases: "bg-arena/70 text-marron-suave" },
  };

// "12 de junio de 2026"
function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

// Extrae el ID (11 chars) de un link de YouTube (watch?v=… o youtu.be/…)
// para construir la URL de embed.
function youtubeEmbedUrl(url: string): string | null {
  const m =
    url.match(/[?&]v=([\w-]{11})/) ?? url.match(/youtu\.be\/([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

// ---------- Render de bloques ----------

function Galeria({ fotos }: { fotos: { id: number; url: string }[] }) {
  if (fotos.length === 0) return null;
  return (
    <div
      className={
        fotos.length === 1 ? "" : "grid grid-cols-2 gap-3 sm:grid-cols-3"
      }
    >
      {fotos.map((foto) => (
        <a
          key={foto.id}
          href={foto.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block overflow-hidden rounded-xl border border-arena bg-crema ${
            fotos.length === 1 ? "aspect-video" : "aspect-square"
          }`}
        >
          <Image
            src={foto.url}
            alt=""
            fill
            sizes={fotos.length === 1 ? "(min-width: 1024px) 56rem, 100vw" : "(min-width: 640px) 33vw, 50vw"}
            loading="lazy"
            className="object-cover transition group-hover:brightness-95"
          />
        </a>
      ))}
    </div>
  );
}

function Contenido({
  bloques,
  urlPorMedio,
}: {
  bloques: Bloque[];
  urlPorMedio: Map<number, string>;
}) {
  const salida: React.ReactNode[] = [];
  let i = 0;
  while (i < bloques.length) {
    const bloque = bloques[i];

    if (bloque.tipo === "imagen") {
      // Agrupa imágenes consecutivas en una sola cuadrícula.
      const fotos: { id: number; url: string }[] = [];
      while (i < bloques.length) {
        const actual = bloques[i];
        if (actual.tipo !== "imagen") break;
        const url = urlPorMedio.get(actual.medioId);
        if (url) fotos.push({ id: actual.medioId, url });
        i++;
      }
      salida.push(<Galeria key={`g-${i}`} fotos={fotos} />);
      continue;
    }

    if (bloque.tipo === "texto") {
      salida.push(
        <p
          key={`t-${i}`}
          className="whitespace-pre-wrap text-base leading-relaxed text-marron"
        >
          {bloque.valor}
        </p>,
      );
    } else {
      const embed = youtubeEmbedUrl(bloque.url);
      if (embed) {
        salida.push(
          <div
            key={`v-${i}`}
            className="relative aspect-video overflow-hidden rounded-xl border border-arena bg-marron"
          >
            <iframe
              src={embed}
              title="Video de YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>,
        );
      }
    }
    i++;
  }

  return <div className="flex flex-col gap-5">{salida}</div>;
}

export default async function VerPublicacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum <= 0) notFound();

  const user = await getAuthenticatedUser();
  const jardin = await getJardinById(user.jardinId);
  if (!jardin) redirect("/login");

  let publicacion: PublicacionDTO;
  try {
    publicacion = await getPublicacionById(idNum);
  } catch (e) {
    // Respeta el redirect() interno de la sesión; NotFound y
    // Forbidden se colapsan en el mismo 404 (no fuga de datos).
    unstable_rethrow(e);
    notFound();
  }

  const badge = TIPO_BADGE[publicacion.tipo];
  const urlPorMedio = new Map(publicacion.medios.map((m) => [m.id, m.url]));

  // "Editado el …" solo si actualizadoEn existe y difiere de la creación.
  const editado =
    publicacion.actualizadoEn &&
    publicacion.actualizadoEn.getTime() !== publicacion.creadoEn.getTime()
      ? publicacion.actualizadoEn
      : null;

  return (
    <div
      style={
        {
          "--primario": jardin.colorPrimario,
          "--secundario": jardin.colorSecundario,
        } as React.CSSProperties
      }
      className="font-texto min-h-screen bg-crema"
    >
      {/* HEADER · franja con los colores del jardín */}
      <header className="border-b border-arena bg-white shadow-sm">
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(to right, var(--primario), var(--secundario))",
          }}
        />
        <div className="mx-auto max-w-4xl px-4 py-5 md:px-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-marron-suave transition hover:text-marron"
          >
            ← Volver al panel
          </Link>
          <h1
            className="font-titulo mt-1 text-2xl font-semibold md:text-3xl"
            style={{ color: "var(--primario)" }}
          >
            Vista previa
          </h1>
          <p className="mt-1 text-sm text-marron-suave">
            Jardín {jardin.nombre} · así se ve tu publicación.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <article className="overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-5 md:p-8">
            {/* Tipo + estado */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.clases}`}
              >
                {badge.etiqueta}
              </span>
              {!publicacion.publicado && (
                <span className="w-fit rounded-full bg-marron/80 px-2.5 py-0.5 text-xs font-medium text-white">
                  Borrador
                </span>
              )}
            </div>

            {/* Título */}
            <h2 className="font-titulo text-2xl font-semibold leading-tight text-marron md:text-3xl">
              {publicacion.titulo}
            </h2>

            {/* Fechas */}
            <p className="-mt-2 text-sm text-marron-suave">
              {formatearFecha(publicacion.creadoEn)}
              {editado && (
                <span className="text-marron-suave/80">
                  {" "}
                  · Editado el {formatearFecha(editado)}
                </span>
              )}
            </p>

            {/* Cuerpo · bloques en orden */}
            <Contenido
              bloques={publicacion.contenido}
              urlPorMedio={urlPorMedio}
            />
          </div>
        </article>

        {/* ACCIONES */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/dashboard/editar/${publicacion.id}`}
            className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium text-white shadow transition hover:brightness-95 active:translate-y-px"
            style={{ backgroundColor: "var(--primario)" }}
          >
            Editar
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-arena bg-white px-5 py-2.5 font-medium text-marron transition hover:bg-arena/40"
          >
            Volver
          </Link>
        </div>
      </main>
    </div>
  );
}
