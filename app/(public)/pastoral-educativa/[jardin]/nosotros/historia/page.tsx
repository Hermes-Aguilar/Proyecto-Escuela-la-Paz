// ============================================================
// .../[jardin]/nosotros/historia/page.tsx
// CU-02 · Sección "Historia" del jardín. SERVER COMPONENT estático.
// El texto cambia según el slug del jardín (La Paz, antes "Tepeyac";
// Porvenir, antes "Nazareth"). Tematiza con --jardin-primario.
// ============================================================
import { notFound } from "next/navigation";
import { History } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";

// Contenido por jardín (según su nombre histórico).
const HISTORIAS: Record<
  string,
  { nombreAnterior: string; parrafos: string[] }
> = {
  "la-paz": {
    nombreAnterior: "Tepeyac",
    parrafos: [
      "Nuestra historia comienza en 1966, cuando las Misioneras del Señor de los Corazones y de Santa María de Guadalupe iniciaron la educación de los niños pequeños bajo el nombre de Jardín de Niños Tepeyac.",
      "Durante más de 50 años hemos acompañado a generaciones de familias en los primeros pasos de la educación de sus hijos, bajo el cuidado de las hermanas misioneras. En 1991 celebramos las Bodas de Plata de nuestro jardín.",
      "Hoy seguimos firmes en nuestra misión: educar con amor, fe y dedicación a cada niño que llega a nuestras aulas.",
    ],
  },
  porvenir: {
    nombreAnterior: "Nazareth",
    parrafos: [
      "Nuestra historia comienza en 1966, cuando las Misioneras del Señor de los Corazones y de Santa María de Guadalupe iniciaron la educación de los niños pequeños bajo el nombre de Jardín de Niños Nazareth.",
      "El 1 de abril de 1992 se estableció formalmente la Comunidad Nazareth, viviendo en el mismo lugar donde se imparte la educación.",
      "Desde entonces, generaciones de familias han confiado en nosotras el cuidado y la formación de sus pequeños, en un ambiente de fe, cariño y aprendizaje.",
    ],
  },
};

export default async function Historia({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const historia = HISTORIAS[slug] ?? HISTORIAS["la-paz"]!;

  return (
    <div className="font-texto mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Nosotros
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Historia
      </h1>

      {/* Origen: nombre histórico del jardín */}
      <div
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-arena bg-white px-4 py-2 text-sm font-medium text-marron-suave shadow-sm"
        style={{ borderColor: "color-mix(in srgb, var(--jardin-primario) 40%, white)" }}
      >
        <History size={16} style={{ color: "var(--jardin-primario)" }} />
        Antes conocido como Jardín de Niños «{historia.nombreAnterior}»
      </div>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-marron-suave">
        {historia.parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Hito destacado */}
      <div
        className="mt-10 rounded-2xl border border-arena bg-white p-7 shadow-sm md:p-9"
        style={{ borderTopColor: "var(--jardin-primario)", borderTopWidth: 4 }}
      >
        <p
          className="font-titulo text-4xl font-extrabold"
          style={{ color: "var(--jardin-primario)" }}
        >
          1966
        </p>
        <p className="mt-2 text-base leading-relaxed text-marron-suave">
          Año en que las Misioneras del Señor de los Corazones y de Santa María de
          Guadalupe iniciaron la obra educativa de la que {jardin.nombre} forma
          parte, sirviendo desde entonces a las familias de Huajuapan de León.
        </p>
      </div>
    </div>
  );
}
