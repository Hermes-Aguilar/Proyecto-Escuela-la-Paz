// ============================================================
// .../[jardin]/nosotros/espiritualidad/page.tsx
// CU-02 · Sección "Espiritualidad" del jardín. SERVER COMPONENT
// estático. Página en construcción: su contenido vive en
// lib/data/jardines-contenido (`espiritualidad`), aún pendiente (null).
// Mismo lenguaje visual que el resto de páginas de Nosotros.
// ============================================================
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";

export default async function Espiritualidad({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const espiritualidad = jardinesContenido[slug]?.espiritualidad ?? null;

  return (
    <div className="font-texto mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Nosotros
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Espiritualidad
      </h1>

      {espiritualidad ? (
        <div className="mt-8 space-y-5 text-base leading-relaxed text-marron-suave">
          <p className="text-justify">{espiritualidad.descripcion}</p>
          <div
            className="flex items-start gap-4 rounded-2xl border border-arena bg-white p-6 shadow-sm"
            style={{ borderLeftColor: "var(--jardin-primario)", borderLeftWidth: 4 }}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                color: "var(--jardin-primario)",
              }}
            >
              <Heart size={22} />
            </span>
            <p className="font-titulo font-semibold text-marron">
              {espiritualidad.nota}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-arena bg-white px-6 py-14 text-center shadow-sm">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--jardin-primario) 12%, white)",
              color: "var(--jardin-primario)",
            }}
          >
            <Heart size={30} />
          </span>
          <h2 className="font-titulo text-xl font-bold text-marron">
            Sección en construcción
          </h2>
          <p className="max-w-md text-base leading-relaxed text-marron-suave">
            Esta sección está en construcción. Próximamente encontrarás aquí
            información sobre nuestra vida espiritual y programa de catequesis.
          </p>
        </div>
      )}
    </div>
  );
}
