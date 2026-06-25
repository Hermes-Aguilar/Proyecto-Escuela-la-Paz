// ============================================================
// components/public/CarruselGaleria.tsx
// Carrusel de fotos: muestra una imagen a la vez y se recorren
// todas con flechas, puntos o teclado, sin enseñarlas todas de
// golpe. Al hacer clic, la foto se amplía en un lightbox.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function CarruselGaleria({
  imagenes,
  titulo = "Galería",
  permitirAmpliar = true,
}: {
  imagenes: string[];
  /** Texto base para el alt de cada foto y las etiquetas de accesibilidad. */
  titulo?: string;
  /**
   * Si la foto principal se puede ampliar en un lightbox al hacer clic.
   * Conviene desactivarlo cuando el carrusel ya vive dentro de una ventana
   * modal (p. ej. la galería de cada librería) para evitar modales anidados.
   */
  permitirAmpliar?: boolean;
}) {
  // Foto visible en el carrusel.
  const [actual, setActual] = useState(0);
  // ¿Está abierto el lightbox?
  const [ampliada, setAmpliada] = useState(false);

  const anterior = useCallback(
    () => setActual((i) => (i - 1 + imagenes.length) % imagenes.length),
    [imagenes.length],
  );
  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % imagenes.length),
    [imagenes.length],
  );

  // Teclado: las flechas navegan siempre; Esc cierra el lightbox.
  // Mientras el lightbox está abierto se bloquea el scroll del fondo.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") siguiente();
      else if (e.key === "Escape") setAmpliada(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anterior, siguiente]);

  useEffect(() => {
    if (!ampliada) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ampliada]);

  if (imagenes.length === 0) return null;

  return (
    <>
      <div className="relative mx-auto max-w-3xl">
        {/* Foto principal. Si se permite ampliar es un botón con zoom; si no
            (dentro de un modal), es un contenedor estático. */}
        <div
          {...(permitirAmpliar
            ? {
                role: "button" as const,
                tabIndex: 0,
                onClick: () => setAmpliada(true),
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") setAmpliada(true);
                },
                "aria-label": `Ampliar foto ${actual + 1} de ${imagenes.length}`,
              }
            : {})}
          className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-arena bg-white shadow-sm ${
            permitirAmpliar ? "cursor-zoom-in" : ""
          }`}
        >
          <Image
            src={imagenes[actual]}
            alt={`${titulo} — foto ${actual + 1}`}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className={`object-cover transition-transform duration-300 ${
              permitirAmpliar ? "group-hover:scale-[1.03]" : ""
            }`}
            priority={actual === 0}
          />
          {/* Contador */}
          <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
            {actual + 1} / {imagenes.length}
          </span>
        </div>

        {/* Flechas (solo si hay más de una foto) */}
        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-azul-institucional shadow-md transition hover:bg-white md:left-3"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-azul-institucional shadow-md transition hover:bg-white md:right-3"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Puntos */}
        {imagenes.length > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                aria-current={i === actual}
                className={`h-2.5 rounded-full transition-all ${
                  i === actual
                    ? "w-6 bg-dorado"
                    : "w-2.5 bg-arena hover:bg-dorado/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {permitirAmpliar && ampliada && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${actual + 1} de ${imagenes.length}`}
          onClick={() => setAmpliada(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setAmpliada(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {imagenes.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  anterior();
                }}
                aria-label="Foto anterior"
                className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-4"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  siguiente();
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-4"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
          >
            <Image
              src={imagenes[actual]}
              alt={`${titulo} — foto ${actual + 1}`}
              width={1600}
              height={1600}
              sizes="90vw"
              className="h-auto max-h-[90vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
