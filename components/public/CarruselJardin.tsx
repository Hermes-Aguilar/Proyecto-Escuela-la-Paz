// ============================================================
// components/public/CarruselJardin.tsx
// Carrusel de fotografías a pantalla completa del inicio del jardín
// (CU-02), al estilo del sitio oficial de la congregación.
// CLIENT COMPONENT (useState + useEffect para el temporizador y el
// parallax).
//
// · Avanza solo cada 10 s, con transición de fundido (fade).
// · El cuadro de información también hace fade al cambiar.
// · Navegación manual con flechas ← → y puntos indicadores.
// · PARALLAX REAL: al hacer scroll, la CAPA DE IMÁGENES se mueve más
//   lento que el contenido (queda "atrás" → profundidad). Se hace con
//   un listener de scroll en window que aplica transform en GPU
//   (will-change) sobre una capa sobredimensionada; el contenedor tiene
//   overflow-hidden para que la imagen no se salga al moverse.
//
// El color del cuadro translúcido NUNCA se hardcodea: llega como
// prop colorPrimario (leído de la BD) y se aplica con alfa.
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SlideCarrusel {
  src: string;
  categoria: string;
  titulo: string;
  descripcion: string;
}

interface Props {
  slides: SlideCarrusel[];
  colorPrimario: string;
  nombreJardin: string;
}

const INTERVALO_MS = 10_000;
// Desplazamiento máximo del fondo (px) y holgura de la imagen a cada
// lado. MAX < BUFFER para que el parallax nunca deje ver los bordes.
const PARALLAX_MAX = 50;
const PARALLAX_BUFFER = 64;

export default function CarruselJardin({
  slides,
  colorPrimario,
  nombreJardin,
}: Props) {
  const [actual, setActual] = useState(0);
  const total = slides.length;
  const seccionRef = useRef<HTMLElement>(null);
  const imagenesRef = useRef<HTMLDivElement>(null);

  // Avance automático cada 10 s. La dependencia en `actual` reinicia el
  // temporizador en cada cambio (también con las flechas), y el cleanup
  // limpia el timeout para no acumular timers (evita memory leaks).
  useEffect(() => {
    if (total <= 1) return;
    const t = setTimeout(
      () => setActual((i) => (i + 1) % total),
      INTERVALO_MS,
    );
    return () => clearTimeout(t);
  }, [actual, total]);

  // Parallax real: el fondo se mueve a ~mitad de velocidad que el
  // contenido. Listener passive sobre window + throttle con
  // requestAnimationFrame (getBoundingClientRect fuerza reflujo, así no
  // lo recalculamos en cada evento). Cleanup quita el listener.
  useEffect(() => {
    const capa = imagenesRef.current;
    const seccion = seccionRef.current;
    if (!capa || !seccion) return;

    // Respeta a quien prefiere menos movimiento: sin parallax.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      capa.style.transform = "";
      return;
    }

    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      const rect = seccion.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progreso ~ +1 (sección entrando por abajo) .. -1 (saliendo por
      // arriba). Acotado a [-1, 1] para que el desplazamiento no crezca
      // sin límite y nunca supere el BUFFER.
      const progreso =
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const acotado = Math.max(-1, Math.min(1, progreso));
      const offset = acotado * PARALLAX_MAX;
      capa.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };

    actualizar(); // posición inicial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (total === 0) return null;

  const irA = (n: number) => setActual((n + total) % total);

  return (
    <section
      ref={seccionRef}
      className="relative h-[300px] w-full overflow-hidden bg-marron md:h-[500px]"
      aria-roledescription="carrusel"
      aria-label={`Fotografías de ${nombreJardin}`}
    >
      {/* CAPA DE IMÁGENES (parallax). Sobredimensionada arriba y abajo
          (top/bottom = -BUFFER) para que al desplazarse nunca muestre los
          bordes. will-change-transform → la mueve la GPU. */}
      <div
        ref={imagenesRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -PARALLAX_BUFFER, bottom: -PARALLAX_BUFFER }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === actual ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={`${nombreJardin} — ${slide.titulo}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* CAPA DE CONTENIDO (sin parallax): degradado + cuadro, con fade. */}
      {slides.map((slide, i) => {
        const activa = i === actual;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activa ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!activa}
          >
            {/* Degradado inferior para legibilidad del cuadro */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />

            {/* Cuadro translúcido abajo a la izquierda (hace fade con el slide) */}
            <div
              className="absolute bottom-6 left-4 max-w-[85%] rounded-2xl p-5 text-white shadow-lg backdrop-blur-sm md:bottom-10 md:left-10 md:max-w-md md:p-7"
              style={{ backgroundColor: `${colorPrimario}99` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                {slide.categoria}
              </p>
              <h2 className="font-titulo mt-1.5 text-2xl font-extrabold leading-tight md:text-3xl">
                {slide.titulo}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                {slide.descripcion}
              </p>
            </div>
          </div>
        );
      })}

      {/* Flechas de navegación manual */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => irA(actual - 1)}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => irA(actual + 1)}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight size={24} />
          </button>

          {/* Puntos indicadores */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => {
              const activa = i === actual;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => irA(i)}
                  aria-label={`Ir a la imagen ${i + 1}`}
                  aria-current={activa}
                  className={`h-2.5 rounded-full transition-all ${
                    activa ? "w-6" : "w-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                  style={activa ? { backgroundColor: colorPrimario } : undefined}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
