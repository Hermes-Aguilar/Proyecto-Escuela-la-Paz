// ============================================================
// .../[jardin]/nosotros/quienes-somos/page.tsx
// CU-02 · Sección "Quiénes somos" del jardín. SERVER COMPONENT
// estático (contenido inspiracional franciscano). Incluye el ancla
// #mision a la que apunta el sidebar ("Nuestra misión").
// ============================================================
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";

export default async function QuienesSomos({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

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
            Religiosas Franciscanas de Nuestra Señora del Refugio
          </strong>
          . Nacimos del deseo de ofrecer a las familias un espacio donde la
          educación de la primera infancia se viva con amor, sencillez y
          esperanza.
        </p>
        <p>
          Inspiradas en San Francisco de Asís, creemos que cada niña y cada niño
          es un regalo único. Por eso acompañamos su crecimiento con paciencia y
          alegría, cuidando no solo lo que aprenden, sino la persona en la que se
          están convirtiendo: sensible, libre, respetuosa de los demás y de la
          creación.
        </p>
        <p>
          Nuestra comunidad educativa es una fraternidad: maestras, familias y
          niños caminamos juntos. Aquí el aula es un hogar, el juego es aprendizaje
          y los valores del Evangelio se viven en lo cotidiano.
        </p>
      </div>

      {/* MISIÓN · ancla del sidebar */}
      <section id="mision" className="mt-12 scroll-mt-24">
        <div
          className="rounded-2xl border border-arena bg-white p-7 shadow-sm md:p-9"
          style={{ borderTopColor: "var(--jardin-primario)", borderTopWidth: 4 }}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              backgroundColor: "color-mix(in srgb, var(--jardin-primario) 12%, white)",
              color: "var(--jardin-primario)",
            }}
          >
            <Sparkles size={24} />
          </span>
          <h2 className="font-titulo mt-4 text-2xl font-bold text-marron">
            Nuestra misión
          </h2>
          <p className="mt-3 text-base leading-relaxed text-marron-suave">
            Formar a las niñas y los niños en sus primeros años desde los valores
            del Evangelio y el carisma franciscano, promoviendo su desarrollo
            integral —humano, espiritual, intelectual y social— en un ambiente de
            cariño, seguridad y respeto, en estrecha colaboración con sus
            familias.
          </p>
          <blockquote
            className="mt-6 border-l-4 pl-4 font-titulo text-lg italic text-marron"
            style={{ borderColor: "var(--jardin-primario)" }}
          >
            “Comencemos, hermanos, a servir a Dios, porque hasta ahora poco o nada
            hemos avanzado.” — San Francisco de Asís
          </blockquote>
        </div>
      </section>
    </div>
  );
}
