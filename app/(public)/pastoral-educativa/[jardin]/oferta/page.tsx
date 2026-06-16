// ============================================================
// .../[jardin]/oferta/page.tsx
// CU-02 · Oferta educativa del jardín. SERVER COMPONENT estático.
// Dos secciones ancladas desde el sidebar: #niveles y #actividades.
// ============================================================
import { Music, Palette, Leaf, HandHeart, Baby, GraduationCap } from "lucide-react";

const NIVELES = [
  {
    icon: Baby,
    nombre: "Maternal",
    edad: "1 a 3 años",
    desc: "Primeros pasos en un entorno seguro y afectivo: estimulación temprana, juego y hábitos.",
  },
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

const ACTIVIDADES = [
  {
    icon: Music,
    nombre: "Música",
    desc: "Canto, ritmo e instrumentos para expresar emociones y desarrollar la sensibilidad.",
  },
  {
    icon: Palette,
    nombre: "Arte",
    desc: "Pintura, modelado y manualidades que despiertan la creatividad y la motricidad fina.",
  },
  {
    icon: Leaf,
    nombre: "Educación ambiental",
    desc: "Huerto escolar y cuidado de la naturaleza, inspirados en el amor franciscano a la creación.",
  },
  {
    icon: HandHeart,
    nombre: "Valores",
    desc: "Formación en valores del Evangelio: respeto, generosidad, fraternidad y paz.",
  },
];

export default function Oferta() {
  return (
    <div className="font-texto mx-auto max-w-4xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Oferta educativa
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Lo que ofrecemos
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-marron-suave">
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
                  backgroundColor: "color-mix(in srgb, var(--jardin-primario) 12%, white)",
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
                      backgroundColor: "color-mix(in srgb, var(--jardin-primario) 14%, white)",
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

      {/* ACTIVIDADES */}
      <section id="actividades" className="mt-12 scroll-mt-24">
        <h2 className="font-titulo text-2xl font-bold text-marron">
          Actividades extracurriculares
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {ACTIVIDADES.map(({ icon: Icono, nombre, desc }) => (
            <div
              key={nombre}
              className="rounded-2xl border border-arena bg-white p-6 shadow-sm"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                  color: "var(--jardin-primario)",
                }}
              >
                <Icono size={24} />
              </span>
              <h3 className="font-titulo mt-4 text-lg font-bold text-marron">
                {nombre}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
