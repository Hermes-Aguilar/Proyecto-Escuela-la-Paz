// ============================================================
// .../[jardin]/oferta/page.tsx
// CU-02 · Oferta educativa del jardín. SERVER COMPONENT estático.
// Secciones ancladas desde el menú: #niveles y #actividades.
// Las clases adicionales y las actividades extra se leen de
// lib/data/jardines-contenido (no se hardcodean); sus íconos llegan
// como nombre de lucide-react y se resuelven con el registro ICONOS.
// ============================================================
import { notFound } from "next/navigation";
import {
  GraduationCap,
  Dumbbell,
  Monitor,
  Globe,
  Music,
  Trophy,
  Tent,
  Waves,
  Moon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";
import { EncabezadoApartado } from "@/components/public/EncabezadoApartado";

const NIVELES = [
  {
    icon: GraduationCap,
    nombre: "Preescolar 1",
    edad: "3 años",
    desc: "Exploración, lenguaje y convivencia. El niño descubre el mundo jugando.",
  },
  {
    icon: GraduationCap,
    nombre: "Preescolar 2",
    edad: "4 años",
    desc: "Desarrollo del pensamiento, la creatividad y la autonomía personal.",
  },
  {
    icon: GraduationCap,
    nombre: "Preescolar 3",
    edad: "5 años",
    desc: "Preparación integral para la primaria: lectoescritura inicial y trabajo en equipo.",
  },
];

// Registro nombre → componente de ícono (los datos guardan el nombre).
const ICONOS: Record<string, LucideIcon> = {
  Dumbbell,
  Monitor,
  Globe,
  Music,
  Trophy,
  Tent,
  Waves,
  Moon,
};

export default async function Oferta({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const contenido = jardinesContenido[slug] ?? jardinesContenido["la-paz"]!;

  return (
    <div className="font-texto">
      <EncabezadoApartado
        id="oferta"
        eyebrow="Oferta educativa"
        titulo="Lo que ofrecemos"
      />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
      <p className="max-w-2xl text-base leading-relaxed text-marron-suave">
        Acompañamos a cada niña y niño según su edad, con actividades que cultivan
        su cuerpo, su mente, su corazón y su espíritu.
      </p>

      {/* NIVELES */}
      <section id="niveles" className="mt-12 scroll-mt-24">
        <h2 className="font-titulo text-2xl font-bold text-marron">Niveles</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {NIVELES.map(({ icon: Icono, nombre, edad, desc }) => (
            <div
              key={nombre}
              className="flex gap-4 rounded-2xl border border-arena bg-white p-5 shadow-sm"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                  color: "var(--jardin-primario)",
                }}
              >
                <Icono size={24} />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-titulo text-lg font-bold text-marron">
                    {nombre}
                  </h3>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--jardin-primario) 14%, white)",
                      color: "var(--jardin-primario)",
                    }}
                  >
                    {edad}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLASES ADICIONALES */}
      <section id="clases" className="mt-12 scroll-mt-24">
        <h2 className="font-titulo text-2xl font-bold text-marron">
          Clases adicionales
        </h2>
        <p className="mt-2 text-base leading-relaxed text-marron-suave">
          Además del programa, en {jardin.nombre} se imparten clases que
          enriquecen la formación de los niños.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {contenido.clasesAdicionales.map(({ nombre, icono }) => {
            const Icono = ICONOS[icono] ?? Sparkles;
            return (
              <div
                key={nombre}
                className="flex flex-col items-center rounded-2xl border border-arena bg-white p-5 text-center shadow-sm"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                    color: "var(--jardin-primario)",
                  }}
                >
                  <Icono size={24} />
                </span>
                <h3 className="font-titulo mt-3 text-sm font-bold text-marron">
                  {nombre}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTIVIDADES EXTRA */}
      <section id="actividades" className="mt-12 scroll-mt-24">
        <h2 className="font-titulo text-2xl font-bold text-marron">
          Actividades extras
        </h2>
        <p className="mt-2 text-base leading-relaxed text-marron-suave">
          Experiencias que crean recuerdos y fortalecen la convivencia.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {contenido.actividadesExtras.map(({ nombre, icono }) => {
            const Icono = ICONOS[icono] ?? Sparkles;
            return (
              <div
                key={nombre}
                className="flex items-center gap-4 rounded-2xl border border-arena bg-white p-6 shadow-sm"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                    color: "var(--jardin-primario)",
                  }}
                >
                  <Icono size={24} />
                </span>
                <h3 className="font-titulo text-lg font-bold text-marron">
                  {nombre}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
        </div>
      </section>
    </div>
  );
}
