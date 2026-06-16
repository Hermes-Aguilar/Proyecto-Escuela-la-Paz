// ============================================================
// .../[jardin]/publicaciones/[tipo]/[id]/page.tsx
// CU-03 · Ver publicación (detalle público). SERVER COMPONENT.
//
// Carga la publicación con getPublicacionPublicaById (filtra por id +
// jardinId + publicado=true): si no existe, no es de este jardín o
// está en borrador → 404. También 404 si el [tipo] de la URL no
// coincide con el de la publicación (URL canónica).
//
// El contenido es un array de BLOQUES (texto/imagen/video) que se
// renderizan EN ORDEN. Las imágenes consecutivas se agrupan en una
// cuadrícula de 2 columnas. Imágenes con lazy loading (CU-03).
// ============================================================
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { getPublicacionPublicaById } from "@/lib/dal/publicaciones";
import type { Bloque } from "@/types/bloques";
import {
  TIPOS,
  slugATipo,
  formatearFecha,
  youtubeEmbedUrl,
} from "@/lib/publicaciones-ui";

// ---------- Render de bloques ----------

function Galeria({ fotos }: { fotos: { id: number; url: string }[] }) {
  if (fotos.length === 0) return null;
  return (
    <div className={fotos.length === 1 ? "" : "grid grid-cols-2 gap-3"}>
      {fotos.map((foto) => (
        <div
          key={foto.id}
          className={`relative overflow-hidden rounded-xl border border-arena bg-arena/30 ${
            fotos.length === 1 ? "aspect-video" : "aspect-square"
          }`}
        >
          <Image
            src={foto.url}
            alt=""
            fill
            sizes={
              fotos.length === 1
                ? "(min-width: 1024px) 56rem, 100vw"
                : "(min-width: 1024px) 28rem, 50vw"
            }
            loading="lazy"
            className="object-cover"
          />
        </div>
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

export default async function DetallePublicacion({
  params,
}: {
  params: Promise<{ jardin: string; tipo: string; id: string }>;
}) {
  const { jardin: slug, tipo: tipoSlug, id } = await params;

  const tipo = slugATipo(tipoSlug);
  if (!tipo) notFound();

  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum <= 0) notFound();

  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const publicacion = await getPublicacionPublicaById(idNum, jardin.id);
  // 404 si no existe/no es pública, o si el tipo de la URL no coincide
  // con el real (mantiene la URL canónica /publicaciones/<tipo>/<id>).
  if (!publicacion || publicacion.tipo !== tipo) notFound();

  const info = TIPOS[tipo];
  const urlPorMedio = new Map(publicacion.medios.map((m) => [m.id, m.url]));
  const muroHref = `/pastoral-educativa/${jardin.slug}/publicaciones/${info.slug}`;

  return (
    <div className="font-texto mx-auto max-w-4xl px-6 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="text-sm text-marron-suave">
        <Link href={muroHref} className="transition-colors hover:text-marron">
          {info.plural}
        </Link>
        <span className="px-1.5 text-marron-suave/60">/</span>
        <span className="text-marron">{publicacion.titulo}</span>
      </nav>

      <article className="mt-6 overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
        {/* Franja superior con los colores del jardín */}
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(to right, var(--jardin-primario), var(--jardin-secundario))",
          }}
        />
        <div className="flex flex-col gap-5 p-5 md:p-8">
          {/* Tipo + fecha */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.badge}`}
            >
              {info.etiqueta}
            </span>
            <span className="text-sm text-marron-suave">
              {formatearFecha(publicacion.creadoEn)}
            </span>
          </div>

          {/* Título */}
          <h1 className="font-titulo text-3xl font-extrabold leading-tight text-marron md:text-4xl">
            {publicacion.titulo}
          </h1>

          {/* Cuerpo · bloques en orden */}
          <Contenido bloques={publicacion.contenido} urlPorMedio={urlPorMedio} />
        </div>
      </article>

      {/* Volver */}
      <div className="mt-6">
        <Link
          href={muroHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
          style={{ color: "var(--jardin-primario)" }}
        >
          ← Volver a {info.plural}
        </Link>
      </div>
    </div>
  );
}
