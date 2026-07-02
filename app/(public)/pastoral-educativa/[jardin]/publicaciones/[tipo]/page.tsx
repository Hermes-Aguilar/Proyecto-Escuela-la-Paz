// ============================================================
// .../[jardin]/publicaciones/[tipo]/page.tsx
// CU-02 · Muro público por tipo (noticias / eventos / avisos).
// SERVER COMPONENT.
//
// El segmento [tipo] se traduce a TipoPublicacion (slug → enum); un
// tipo inválido → 404. Lista solo las publicaciones publicadas del
// jardín (DAL público), de la más reciente a la más antigua, en
// tarjetas que enlazan al detalle. Estado vacío amigable por tipo.
// ============================================================
import { notFound } from "next/navigation";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { getPublicacionesPublicas } from "@/lib/dal/publicaciones";
import { TIPOS, slugATipo } from "@/lib/publicaciones-ui";
import TarjetaPublicacion from "@/components/public/TarjetaPublicacion";
import { EncabezadoApartado } from "@/components/public/EncabezadoApartado";

export default async function MuroPorTipo({
  params,
}: {
  params: Promise<{ jardin: string; tipo: string }>;
}) {
  const { jardin: slug, tipo: tipoSlug } = await params;

  const tipo = slugATipo(tipoSlug);
  if (!tipo) notFound();

  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const info = TIPOS[tipo];
  const publicaciones = await getPublicacionesPublicas(jardin.id, tipo);

  return (
    <div className="font-texto">
      <EncabezadoApartado eyebrow="Publicaciones" titulo={info.plural} />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
      {publicaciones.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-arena bg-white px-6 py-16 text-center">
          <p className="font-titulo text-lg font-semibold text-marron">
            {info.vacio}
          </p>
          <p className="mt-2 text-sm text-marron-suave">
            Vuelve más tarde para conocer las novedades de {jardin.nombre}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publicaciones.map((pub) => (
            <TarjetaPublicacion
              key={pub.id}
              pub={pub}
              slugJardin={jardin.slug}
            />
          ))}
        </div>
      )}
        </div>
      </section>
    </div>
  );
}
