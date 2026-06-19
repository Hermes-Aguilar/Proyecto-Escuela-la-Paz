// ============================================================
// components/public/CarruselHero.tsx
// Carrusel hero GENÉRICO y reutilizable del portal general de la
// congregación (Inicio y páginas de pastorales/librerías).
// CLIENT COMPONENT (useState + useEffect para el temporizador).
//
// A diferencia de CarruselJardin.tsx (que usa los colores propios de
// cada jardín y lleva parallax), éste es para el portal institucional:
// contenido CENTRADO en un cuadro translúcido, sin tema por jardín.
//
//  · Avanza solo cada 8 s, con transición de fundido (opacity 0→1, 700 ms).
//  · El texto del slide hace fade junto con la imagen.
//  · Navegación manual con flechas ← → y puntos indicadores.
//
// El color de acento llega como prop (default azul-institucional institucional);
// nunca depende del jardín.
// ============================================================
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SlideHero {
  imagen: string;
  categoria: string;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  /** Botón opcional "Más información" del slide. */
  boton?: { texto: string; href: string };
}

interface Props {
  slides: SlideHero[];
  /** Altura del carrusel (utilidad Tailwind). */
  altura?: string;
  /** Color de acento de la categoría/botón. Default azul-institucional. */
  colorAcento?: string;
  /**
   * Si es true, SOLO las imágenes quedan fijas (position fixed, como fondo a
   * pantalla completa detrás de todo), mientras la sección con la caja de texto
   * y los controles permanece en el flujo normal. Así, al hacer scroll, la caja
   * sube con la página mientras la imagen se queda quieta (efecto "reveal").
   * El contenido posterior de la página debe ir en una capa opaca con z mayor.
   */
  fondoFijo?: boolean;
}

const INTERVALO_MS = 8_000;

export default function CarruselHero({
  slides,
  altura = "h-[520px]",
  colorAcento = "#2c5f7c",
  fondoFijo = false,
}: Props) {
  const [actual, setActual] = useState(0);
  const total = slides.length;

  // Avance automático cada 8 s. La dependencia en `actual` reinicia el
  // temporizador en cada cambio (también con las flechas) y el cleanup
  // limpia el timeout para no acumular timers (evita memory leaks).
  useEffect(() => {
    if (total <= 1) return;
    const t = setTimeout(() => setActual((i) => (i + 1) % total), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [actual, total]);

  if (total === 0) return null;

  const irA = (n: number) => setActual((n + total) % total);

  return (
    <section
      className={`relative w-full overflow-hidden ${altura} ${
        fondoFijo ? "" : "bg-marron"
      }`}
      aria-roledescription="carrusel"
    >
      {/* CAPA DE IMÁGENES (con velo oscuro para legibilidad) */}
      {slides.map((slide, i) => {
        const activa = i === actual;
        return (
          <div
            key={i}
            className={`${
              fondoFijo ? "fixed inset-0 -z-10" : "absolute inset-0"
            } transition-opacity duration-700 ease-in-out ${
              activa ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!activa}
          >
            <Image
              src={slide.imagen}
              alt={slide.titulo}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        );
      })}

      {/* CAPA DE CONTENIDO (centrada, hace fade con el slide) */}
      {slides.map((slide, i) => {
        const activa = i === actual;
        return (
          <div
            key={i}
            className={`absolute inset-0 z-10 flex items-center justify-center px-4 transition-opacity duration-700 ease-in-out ${
              activa ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!activa}
          >
            <div className="max-w-2xl rounded-2xl bg-black/40 p-8 text-center text-white shadow-xl backdrop-blur-sm md:p-12">
              {/* Categoría con línea decorativa a los lados */}
              <div className="flex items-center justify-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 md:w-12"
                  style={{ backgroundColor: colorAcento }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest md:text-sm"
                  style={{ color: colorAcento }}
                >
                  {slide.categoria}
                </span>
                <span
                  aria-hidden
                  className="h-px w-8 md:w-12"
                  style={{ backgroundColor: colorAcento }}
                />
              </div>

              <h2
                className="font-titulo mt-4 text-4xl font-bold leading-tight md:text-5xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
              >
                {slide.titulo}
              </h2>

              {slide.subtitulo && (
                <p className="mt-2 text-lg font-medium text-white/90">
                  {slide.subtitulo}
                </p>
              )}

              <p className="mx-auto mt-4 line-clamp-2 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                {slide.descripcion}
              </p>

              {slide.boton && (
                <Link
                  href={slide.boton.href}
                  className="mt-6 inline-block rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition hover:brightness-95"
                  style={{ backgroundColor: colorAcento }}
                >
                  {slide.boton.texto}
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {/* Flechas + puntos de navegación manual */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => irA(actual - 1)}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => irA(actual + 1)}
            aria-label="Slide siguiente"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => {
              const activa = i === actual;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => irA(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  aria-current={activa}
                  className={`h-2.5 rounded-full transition-all ${
                    activa ? "w-6" : "w-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                  style={activa ? { backgroundColor: colorAcento } : undefined}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
