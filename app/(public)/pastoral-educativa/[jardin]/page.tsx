// ============================================================
// app/(public)/pastoral-educativa/[jardin]/page.tsx
// CU-02 · Inicio del micro-sitio de cada jardín. SERVER COMPONENT.
//
// Carrusel de fotografías (nombre + slogan fuera de él), bienvenida,
// las 3 publicaciones más recientes y los rasgos que distinguen al jardín.
// El layout ya validó el jardín y tematizó el subárbol; aquí se
// vuelve a leer por slug para disponer de sus datos.
// ============================================================
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Users, TreePine, ArrowRight } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { getPublicacionesPublicas } from "@/lib/dal/publicaciones";
import TarjetaPublicacion from "@/components/public/TarjetaPublicacion";
import CarruselJardin, {
  type SlideCarrusel,
} from "@/components/public/CarruselJardin";

// Fotografías por jardín (archivos en public/images/).
const IMAGENES_JARDIN: Record<string, string[]> = {
  "la-paz": ["/images/lapaz3.jpeg", "/images/paz.jpeg", "/images/paz2.jpg"],
  porvenir: [
    "/images/porvenir1.jpeg",
    "/images/porvenir2.jpeg",
    "/images/porvenir3.jpeg",
  ],
};

// Contenido estático de cada slide (genérico para un jardín de niños
// franciscano); las imágenes cambian por jardín.
const SLIDES_CONTENIDO: Omit<SlideCarrusel, "src">[] = [
  {
    categoria: "Nuestro jardín",
    titulo: "Un hogar donde crecer felices",
    descripcion:
      "Un espacio seguro y alegre para los primeros pasos de tu hija o hijo.",
  },
  {
    categoria: "Aprender jugando",
    titulo: "Descubrir el mundo con asombro",
    descripcion:
      "Cada día es una aventura de juego, arte y exploración llena de cariño.",
  },
  {
    categoria: "Valores franciscanos",
    titulo: "Sembrar amor y fraternidad",
    descripcion:
      "Educamos el corazón con los valores del Evangelio y el amor a la creación.",
  },
];

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

// Slogan por jardín (estático). Fallback a la descripción de la BD.
const SLOGANS: Record<string, string> = {
  "la-paz": "Sembrando paz, amor y valores desde la infancia",
  porvenir: "Construyendo el futuro con alegría y fe",
};

// Nube decorativa (SVG inline). El color/opacidad se controlan por
// className (text-white opacity-…).
function Nube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="currentColor" aria-hidden className={className}>
      <ellipse cx="40" cy="46" rx="30" ry="20" />
      <ellipse cx="66" cy="38" rx="30" ry="24" />
      <ellipse cx="90" cy="48" rx="22" ry="16" />
      <rect x="28" y="44" width="68" height="24" rx="12" />
    </svg>
  );
}

// Ícono representativo del jardín: paloma (La Paz) o estrella (Porvenir).
// Toma el color del jardín de la CSS var inyectada por el layout.
function IconoJardin({ slug, className }: { slug: string; className?: string }) {
  const color = { color: "var(--jardin-primario)" };
  if (slug === "porvenir") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={className}
        style={color}
      >
        <path d="M12 2.6l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.3 19.7l1.4-6.3L2.9 9.1l6.4-.6z" />
      </svg>
    );
  }
  // La Paz (y por defecto): paloma en vuelo.
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden
      className={className}
      style={color}
    >
      <path d="M4 36C16 18 28 18 32 32 36 18 48 18 60 36 46 30 36 33 32 40 28 33 18 30 4 36Z" />
    </svg>
  );
}

export default async function InicioJardin({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const recientes = await getPublicacionesPublicas(jardin.id, undefined, 3);

  // Arma los slides combinando el contenido estático con las fotos del
  // jardín. Si hubiera menos fotos que slides, se repiten (mín. 3).
  const imagenes = IMAGENES_JARDIN[jardin.slug] ?? [];
  const slides: SlideCarrusel[] = imagenes.length
    ? SLIDES_CONTENIDO.map((c, i) => ({
        ...c,
        src: imagenes[i % imagenes.length],
      }))
    : [];

  const slogan = SLOGANS[jardin.slug] ?? jardin.descripcion ?? "";

  return (
    <div className="font-texto">
      {/* ── MEJORA 1 · Cabecera con toque de color del jardín y nubes ── */}
      <header className="relative overflow-hidden bg-crema py-12">
        {/* Toque suave (8%) del color primario sobre el crema */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: `${jardin.colorPrimario}14` }}
        />

        {/* Nubes decorativas (las grandes se ocultan en móvil) */}
        <Nube className="absolute -left-4 top-6 w-24 text-white opacity-70 sm:w-32" />
        <Nube className="absolute right-6 top-3 hidden text-white opacity-60 md:block md:w-56" />
        <Nube className="absolute bottom-1 left-1/4 hidden w-40 text-white opacity-60 md:block" />
        <Nube className="absolute -bottom-3 right-0 w-28 text-white opacity-70 sm:w-44" />

        {/* Contenido centrado sobre las nubes */}
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <IconoJardin slug={jardin.slug} className="mx-auto h-12 w-12" />
          <p
            className="mt-3 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: `${jardin.colorPrimario}99` }}
          >
            Jardín de niños
          </p>
          <h1
            className="font-titulo mt-1 text-4xl font-extrabold md:text-5xl"
            style={{ color: "var(--jardin-primario)" }}
          >
            {jardin.nombre}
          </h1>
          {slogan && (
            <p className="mx-auto mt-3 max-w-xl text-lg text-marron-suave">
              {slogan}
            </p>
          )}
        </div>
      </header>

      {/* ── MEJORA 2 · Carrusel fijo (sticky) para el efecto parallax ── */}
      <div className="sticky top-0 z-0">
        <CarruselJardin
          slides={slides}
          colorPrimario={jardin.colorPrimario}
          nombreJardin={jardin.nombre}
        />
      </div>

      {/* Contenido que sube por encima del carrusel (fondo crema sólido) */}
      <div className="relative z-10 bg-crema">
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
    </div>
  );
}
