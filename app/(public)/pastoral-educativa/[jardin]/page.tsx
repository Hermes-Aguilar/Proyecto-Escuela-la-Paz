// ============================================================
// app/(public)/pastoral-educativa/[jardin]/page.tsx
// CU-02 · Inicio del micro-sitio de cada jardín. SERVER COMPONENT.
//
// Hero temático (colores leídos de la BD), bienvenida, las 3
// publicaciones más recientes y los rasgos que distinguen al jardín.
// El layout ya validó el jardín y tematizó el subárbol; aquí se
// vuelve a leer por slug para disponer de sus datos.
// ============================================================
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Users, TreePine, ArrowRight } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { getPublicacionesPublicas } from "@/lib/dal/publicaciones";
import TarjetaPublicacion from "@/components/public/TarjetaPublicacion";

const RASGOS = [
  {
    icon: Heart,
    titulo: "Amor",
    texto:
      "Cada niña y niño es acompañado con ternura y cercanía, al estilo de San Francisco.",
  },
  {
    icon: Users,
    titulo: "Comunidad",
    texto:
      "Familias, maestras y niños caminamos juntos como una sola fraternidad.",
  },
  {
    icon: TreePine,
    titulo: "Naturaleza",
    texto:
      "Aprendemos a cuidar la creación: huerto, juego al aire libre y respeto por la vida.",
  },
];

export default async function InicioJardin({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const recientes = await getPublicacionesPublicas(jardin.id, undefined, 3);

  return (
    <div className="font-texto">
      {/* HERO temático */}
      <section
        className="relative overflow-hidden px-6 py-16 md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, ${jardin.colorPrimario}, ${jardin.colorSecundario})`,
        }}
      >
        {/* Vignette: asegura contraste del texto blanco en cualquier tema */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 65% at 50% 45%, rgba(22,16,11,0.28), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center text-white">
          {jardin.ciudad && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
              {jardin.ciudad}
            </p>
          )}
          <h1 className="font-titulo mt-3 text-4xl font-extrabold drop-shadow-sm md:text-5xl">
            {jardin.nombre}
          </h1>
          {jardin.descripcion && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {jardin.descripcion}
            </p>
          )}
        </div>
      </section>

      {/* BIENVENIDA */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center md:py-16">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--jardin-primario)" }}
        >
          Bienvenida
        </p>
        <h2 className="font-titulo mt-2 text-2xl font-bold text-marron md:text-3xl">
          Un lugar para crecer felices
        </h2>
        <p className="mt-5 text-base leading-relaxed text-marron-suave">
          En {jardin.nombre} cada día es una oportunidad para descubrir, jugar y
          aprender. Acompañamos los primeros pasos de tu hija o hijo en un
          ambiente seguro, alegre y lleno de valores, donde la fe, el cariño y el
          respeto por los demás guían todo lo que hacemos.
        </p>
      </section>

      {/* ÚLTIMAS PUBLICACIONES */}
      <section className="bg-white/60 px-6 py-14 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--jardin-primario)" }}
              >
                Lo más reciente
              </p>
              <h2 className="font-titulo mt-2 text-2xl font-bold text-marron md:text-3xl">
                Novedades del jardín
              </h2>
            </div>
            <Link
              href={`/pastoral-educativa/${jardin.slug}/publicaciones/noticias`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
              style={{ color: "var(--jardin-primario)" }}
            >
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          {recientes.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-arena bg-white px-6 py-12 text-center text-marron-suave">
              Aún no hay publicaciones. ¡Vuelve pronto para conocer nuestras
              novedades!
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recientes.map((pub) => (
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

      {/* LO QUE NOS HACE ÚNICOS */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <h2 className="font-titulo text-center text-2xl font-bold text-marron md:text-3xl">
          Lo que nos hace únicos
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {RASGOS.map(({ icon: Icono, titulo, texto }) => (
            <div
              key={titulo}
              className="group flex flex-col items-center rounded-2xl border border-arena bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Círculo con el gradiente propio del jardín (su esencia):
                  primario → secundario, ícono en blanco para buen
                  contraste con cualquiera de las dos paletas. */}
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-sm"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${jardin.colorPrimario}, ${jardin.colorSecundario})`,
                }}
              >
                <Icono size={28} />
              </span>
              <h3 className="font-titulo mt-4 text-lg font-bold text-marron">
                {titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-marron-suave">
                {texto}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
