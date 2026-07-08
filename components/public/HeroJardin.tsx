// ============================================================
// components/public/HeroJardin.tsx
// HERO del inicio de cada jardín (CU-02). SERVER COMPONENT (estático,
// sin estado ni temporizadores: reemplaza al antiguo carrusel).
//
// UNA SOLA pieza visual: la fotografía del jardín ocupa todo el hero de
// pared a pared y, ENCIMA, un velo de gradiente horizontal (del color
// primario opaco a la izquierda → transparente a la derecha) tiñe la
// zona del texto sin tapar la foto. El texto flota legible sobre la
// parte teñida. No hay columnas ni paneles separados.
//
// Los colores NUNCA se hardcodean: se leen de las CSS vars que el
// layout del jardín inyecta en un ancestro (--jardin-primario), de modo
// que la misma pieza sirve para La Paz (teal) y Porvenir (mostaza).
// ============================================================
import Image from "next/image";

import IconoJardin from "./IconoJardin";

interface Props {
  slug: string;
  nombreJardin: string;
  src: string;
  slogan?: string;
  descripcion?: string;
}

export default function HeroJardin({
  slug,
  nombreJardin,
  src,
  slogan,
  descripcion,
}: Props) {
  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[550px]">
      {/* FOTO DE FONDO · ocupa el 100% del hero, de lado a lado. Es la
          única imagen: no hay división en columnas. */}
      <Image
        src={src}
        alt={`Jardín de niños ${nombreJardin}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* VELO DE GRADIENTE · horizontal, ENCIMA de la foto. Tiñe la zona
          izquierda con el color primario (≈85% → 40%) y se desvanece a
          transparente a la derecha, dejando ver la foto nítida. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-[var(--jardin-primario)]/85 via-[var(--jardin-primario)]/40 to-transparent"
      />

      {/* CONTENIDO · alineado a la izquierda, centrado verticalmente,
          sobre la zona teñida. */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-xl px-6 text-white sm:px-10 lg:px-16">
          <div className="mb-4 flex items-center gap-2.5">
            <IconoJardin slug={slug} className="h-7 w-7 text-white/90" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Jardín de niños
            </span>
          </div>

          <h1 className="font-titulo text-4xl font-extrabold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] md:text-5xl lg:text-6xl">
            {nombreJardin}
          </h1>

          {/* Línea decorativa breve, en blanco translúcido. */}
          <div className="mt-5 h-1 w-16 rounded-full bg-white/70" />

          {slogan && (
            <p className="mt-5 max-w-md text-lg font-medium text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:text-xl">
              {slogan}
            </p>
          )}

          {descripcion && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:text-base">
              {descripcion}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
