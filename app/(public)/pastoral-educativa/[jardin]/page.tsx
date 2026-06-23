// ============================================================
// app/(public)/pastoral-educativa/[jardin]/page.tsx
// CU-02 · Inicio del micro-sitio de cada jardín. SERVER COMPONENT.
//
// Mismo lenguaje visual que el inicio de la congregación: carrusel hero
// con fondo fijo (efecto "reveal" al hacer scroll, ver CarruselHero) y
// secciones que entran con animación al scroll (AnimacionScroll). El
// contenido va en una capa opaca (z-10 + bg-crema) que se desplaza por
// encima de la imagen fija.
//
// Las fotos de cada jardín están en public/images/. Si un jardín aún no
// tiene set de carrusel (p. ej. Porvenir), se usa el hero estático
// (HeroJardin) como respaldo.
// ============================================================
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Users, TreePine, ArrowRight } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { getPublicacionesPublicas } from "@/lib/dal/publicaciones";
import TarjetaPublicacion from "@/components/public/TarjetaPublicacion";
import HeroJardin from "@/components/public/HeroJardin";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// Carrusel hero por jardín (lapaz1–5). Si un slug no está aquí, el
// inicio usa el hero estático de respaldo (HeroJardin).
const SLIDES_HERO: Record<string, SlideHero[]> = {
  "la-paz": [
    {
      imagen: "/images/lapaz11.jpeg",
      categoria: "Jardín de Niños La Paz",
      titulo: "Sembrando paz, amor y valores",
      descripcion:
        "Acompañamos los primeros pasos de tu hija o hijo en un ambiente seguro, alegre y lleno de fe.",
    },
    {
      imagen: "/images/lapaz21.jpeg",
      categoria: "Nuestra comunidad",
      titulo: "Un lugar para crecer felices",
      descripcion:
        "Familias, maestras y niños caminamos juntos como una sola fraternidad.",
    },
    {
      imagen: "/images/lapaz311.jpeg",
      categoria: "Formación integral",
      titulo: "Cuerpo, mente, corazón y espíritu",
      descripcion:
        "Cuidamos no solo lo que aprenden, sino la persona en la que se están convirtiendo.",
    },
    {
      imagen: "/images/lapaz4.jpeg",
      categoria: "Educación en la fe",
      titulo: "Acompañamos con cariño",
      descripcion:
        "Sembramos valores evangélicos desde la infancia, con ternura y cercanía.",
    },
    {
      imagen: "/images/lapaz5.jpeg",
      categoria: "60 años de historia",
      titulo: "Una tradición de formar con amor",
      descripcion:
        "Seis décadas ayudando a las familias en la formación integral de sus hijos.",
    },
  ],
};

// Galería del inicio por jardín: el resto de las fotos, con una breve
// descripción de lo que muestran.
interface FotoGaleria {
  src: string;
  titulo: string;
  descripcion: string;
}

const GALERIA: Record<string, FotoGaleria[]> = {
  "la-paz": [
    {
      src: "/images/eventolapaz1.jpeg",
      titulo: "Festivales y eventos",
      descripcion:
        "Celebramos juntos las fechas especiales con festivales llenos de alegría.",
    },
    {
      src: "/images/lapaz6.jpeg",
      titulo: "Juego y convivencia",
      descripcion:
        "Aprendemos jugando y conviviendo en un ambiente seguro y feliz.",
    },
    {
      src: "/images/lapazcomputacion.jpeg",
      titulo: "Clases de computación",
      descripcion:
        "Los niños dan sus primeros pasos en la tecnología desde temprana edad.",
    },
  ],
};

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

// Fotografía de respaldo (hero estático) y slogan por jardín.
const IMAGEN_JARDIN: Record<string, string> = {
  "la-paz": "/images/lapaz3.jpeg",
  porvenir: "/images/porvenir2.jpeg",
};

const SLOGANS: Record<string, string> = {
  "la-paz": "Sembrando paz, amor y valores desde la infancia",
  porvenir: "Construyendo el futuro con alegría y fe",
};

export default async function InicioJardin({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const recientes = await getPublicacionesPublicas(jardin.id, undefined, 3);

  const slides = SLIDES_HERO[jardin.slug];
  const galeria = GALERIA[jardin.slug] ?? [];

  const slogan = SLOGANS[jardin.slug] ?? jardin.descripcion ?? "";
  const imagenHero =
    IMAGEN_JARDIN[jardin.slug] ?? jardin.logoUrl ?? "/images/lapaz3.jpeg";

  return (
    <div className="font-texto">
      {/* ── HERO ── Carrusel con fondo fijo (efecto reveal) si el jardín
            tiene set de fotos; si no, hero estático de respaldo. */}
      {slides ? (
        <CarruselHero
          slides={slides}
          fondoFijo
          altura="h-[60vh]"
          colorAcento={jardin.colorPrimario}
        />
      ) : (
        <HeroJardin
          slug={jardin.slug}
          nombreJardin={jardin.nombre}
          src={imagenHero}
          slogan={slogan}
          descripcion={jardin.descripcion ?? undefined}
        />
      )}

      {/* CONTENIDO — capa opaca que se desplaza por encima de la imagen fija. */}
      <div className="relative z-10 bg-crema">
        {/* BIENVENIDA */}
        <section className="mx-auto max-w-3xl px-6 py-14 text-center md:py-16">
          <AnimacionScroll>
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
              En {jardin.nombre} cada día es una oportunidad para descubrir,
              jugar y aprender. Acompañamos los primeros pasos de tu hija o hijo
              en un ambiente seguro, alegre y lleno de valores, donde la fe, el
              cariño y el respeto por los demás guían todo lo que hacemos.
            </p>

            {/* LEMA INSTITUCIONAL · cita destacada con líneas decorativas. */}
            <figure className="mt-10 flex flex-col items-center gap-4">
              <span
                className="h-0.5 w-12 rounded-full"
                style={{ backgroundColor: "var(--jardin-primario)" }}
                aria-hidden="true"
              />
              <blockquote
                className="font-titulo text-xl font-semibold italic md:text-2xl"
                style={{ color: "var(--jardin-primario)" }}
              >
                “Todo por el bien de la niñez”
              </blockquote>
              <span
                className="h-0.5 w-12 rounded-full"
                style={{ backgroundColor: "var(--jardin-primario)" }}
                aria-hidden="true"
              />
            </figure>
          </AnimacionScroll>
        </section>

        {/* ÚLTIMAS PUBLICACIONES */}
        <section className="bg-white/60 px-6 py-14 md:py-16">
          <div className="mx-auto max-w-5xl">
            <AnimacionScroll>
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
            </AnimacionScroll>

            {recientes.length === 0 ? (
              <p className="mt-8 rounded-2xl border border-dashed border-arena bg-white px-6 py-12 text-center text-marron-suave">
                Aún no hay publicaciones. ¡Vuelve pronto para conocer nuestras
                novedades!
              </p>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recientes.map((pub, i) => (
                  <AnimacionScroll key={pub.id} delay={i * 90} className="h-full">
                    <TarjetaPublicacion pub={pub} slugJardin={jardin.slug} />
                  </AnimacionScroll>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GALERÍA · el resto de las fotos del jardín con descripción */}
        {galeria.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
            <AnimacionScroll>
              <div className="text-center">
                <p
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "var(--jardin-primario)" }}
                >
                  Nuestro día a día
                </p>
                <h2 className="font-titulo mt-2 text-2xl font-bold text-marron md:text-3xl">
                  Galería
                </h2>
              </div>
            </AnimacionScroll>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galeria.map((foto, i) => (
                <AnimacionScroll key={foto.src} delay={i * 90} className="h-full">
                  <figure className="group flex h-full flex-col overflow-hidden rounded-2xl border border-arena bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={foto.src}
                        alt={foto.titulo}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="flex flex-1 flex-col p-5">
                      <h3 className="font-titulo text-lg font-bold text-marron">
                        {foto.titulo}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                        {foto.descripcion}
                      </p>
                    </figcaption>
                  </figure>
                </AnimacionScroll>
              ))}
            </div>
          </section>
        )}

        {/* LO QUE NOS HACE ÚNICOS */}
        <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
          <AnimacionScroll>
            <h2 className="font-titulo text-center text-2xl font-bold text-marron md:text-3xl">
              Lo que nos hace únicos
            </h2>
          </AnimacionScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {RASGOS.map(({ icon: Icono, titulo, texto }, i) => (
              <AnimacionScroll key={titulo} delay={i * 90} className="h-full">
                <div className="group flex h-full flex-col items-center rounded-2xl border border-arena bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* Círculo con el gradiente propio del jardín. */}
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
              </AnimacionScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
