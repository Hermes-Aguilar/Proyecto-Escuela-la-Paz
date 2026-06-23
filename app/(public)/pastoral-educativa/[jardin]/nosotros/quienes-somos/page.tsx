// ============================================================
// .../[jardin]/nosotros/quienes-somos/page.tsx
// CU-02 · Sección "Quiénes somos" del jardín. SERVER COMPONENT
// estático (obra educativa de las Misioneras del Señor de los Corazones
// y de Santa María de Guadalupe). Incluye el ancla #mision a la que
// apunta el sidebar ("Nuestra misión").
//
// El objetivo general, la misión, la visión y los valores se leen de
// lib/data/jardines-contenido (no se hardcodean). Si algún dato falta
// para el jardín → "Información próximamente".
// ============================================================
import { notFound } from "next/navigation";
import { Target, Eye } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";

const PROXIMAMENTE = "Información próximamente.";

export default async function QuienesSomos({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const contenido = jardinesContenido[slug] ?? jardinesContenido["la-paz"]!;

  return (
    <div className="font-texto mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Nosotros
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Quiénes somos
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-marron-suave">
        <p>
          {jardin.nombre} es un jardín de niños de las{" "}
          <strong className="text-marron">
            Misioneras del Señor de los Corazones y de Santa María de Guadalupe
          </strong>
          . Es parte de la obra educativa que la Congregación inició en 1966, del
          deseo de ofrecer a las familias un espacio donde la educación de la
          primera infancia se viva con amor, sencillez y esperanza.
        </p>
        <p>
          Creemos que cada niña y cada niño es un regalo único. Por eso
          acompañamos su crecimiento con paciencia y alegría, cuidando no solo lo
          que aprenden, sino la persona en la que se están convirtiendo: sensible,
          libre y respetuosa de los demás.
        </p>
      </div>

      {/* OBJETIVO GENERAL · párrafo destacado en blockquote */}
      <section className="mt-12">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--jardin-primario)" }}
        >
          Objetivo general
        </p>
        <blockquote
          className="font-titulo mt-3 rounded-2xl border-l-4 bg-white p-6 text-lg italic leading-relaxed text-marron shadow-sm md:p-7 md:text-xl"
          style={{ borderColor: "var(--jardin-primario)" }}
        >
          {contenido.objetivoGeneral ?? PROXIMAMENTE}
        </blockquote>
      </section>

      {/* MISIÓN · ancla del sidebar (#mision) */}
      <section id="mision" className="mt-10 scroll-mt-24">
        <div
          className="rounded-2xl border border-arena bg-white p-7 shadow-sm md:p-9"
          style={{ borderTopColor: "var(--jardin-primario)", borderTopWidth: 4 }}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--jardin-primario) 12%, white)",
              color: "var(--jardin-primario)",
            }}
          >
            <Target size={24} />
          </span>
          <h2 className="font-titulo mt-4 text-2xl font-bold text-marron">
            Nuestra misión
          </h2>
          <p className="mt-3 text-base leading-relaxed text-marron-suave">
            {contenido.mision ?? PROXIMAMENTE}
          </p>
        </div>
      </section>

      {/* VISIÓN */}
      <section className="mt-8">
        <div
          className="rounded-2xl border border-arena bg-white p-7 shadow-sm md:p-9"
          style={{ borderTopColor: "var(--jardin-primario)", borderTopWidth: 4 }}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--jardin-primario) 12%, white)",
              color: "var(--jardin-primario)",
            }}
          >
            <Eye size={24} />
          </span>
          <h2 className="font-titulo mt-4 text-2xl font-bold text-marron">
            Nuestra visión
          </h2>
          <p className="mt-3 text-base leading-relaxed text-marron-suave">
            {contenido.vision ?? PROXIMAMENTE}
          </p>
        </div>
      </section>

      {/* VALORES · grid 4×2 (una tarjeta por valor) */}
      <section className="mt-12">
        <h2 className="font-titulo text-2xl font-bold text-marron">
          Valores que enseñamos
        </h2>
        {contenido.valores.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {contenido.valores.map((valor) => (
              <div
                key={valor}
                className="flex items-center gap-3 rounded-xl border border-arena bg-white p-4 shadow-sm"
                style={{
                  borderLeftColor: "var(--jardin-primario)",
                  borderLeftWidth: 4,
                }}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--jardin-primario)" }}
                />
                <span className="font-titulo text-sm font-semibold text-marron">
                  {valor}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-base text-marron-suave">{PROXIMAMENTE}</p>
        )}
      </section>
    </div>
  );
}
