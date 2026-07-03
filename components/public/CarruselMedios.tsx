// ============================================================
// components/public/CarruselMedios.tsx
// Carrusel de "medios" para el modal de comunidades: muestra una
// foto o un video de YouTube a la vez y se recorren con flechas,
// puntos o teclado. No amplía (sin lightbox), pensado para vivir
// dentro de una ventana modal.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Medio =
  | { tipo: "imagen"; src: string }
  | { tipo: "video"; youtube: string };

// Extrae el ID de un enlace de YouTube (shorts, watch, youtu.be, embed) o
// devuelve el texto tal cual si ya es el ID.
function youtubeId(urlOrId: string): string {
  const m = urlOrId.match(/(?:shorts\/|watch\?v=|youtu\.be\/|embed\/)([\w-]+)/);
  return m ? m[1] : urlOrId;
}

export function CarruselMedios({
  medios,
  titulo = "Galería",
}: {
  medios: Medio[];
  titulo?: string;
}) {
  const [actual, setActual] = useState(0);

  const anterior = useCallback(
    () => setActual((i) => (i - 1 + medios.length) % medios.length),
    [medios.length],
  );
  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % medios.length),
    [medios.length],
  );

  // Teclado: las flechas navegan entre medios.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anterior, siguiente]);

  if (medios.length === 0) return null;
  const medio = medios[actual];

  return (
    <div className="relative w-full">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-arena bg-crema shadow-sm">
        {medio.tipo === "imagen" ? (
          <>
            {/* Fondo difuminado para que las fotos verticales no dejen barras. */}
            <Image
              src={medio.src}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 32rem, 90vw"
              className="scale-110 object-cover blur-xl brightness-95"
            />
            <Image
              src={medio.src}
              alt={`${titulo} — foto ${actual + 1}`}
              fill
              sizes="(min-width: 768px) 32rem, 90vw"
              className="relative object-contain"
              priority={actual === 0}
            />
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId(medio.youtube)}`}
            title={`${titulo} — video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* Contador */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
          {actual + 1} / {medios.length}
        </span>

        {/* Flechas (solo si hay más de un medio) */}
        {medios.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-azul-institucional shadow-md transition hover:bg-white md:left-3"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-azul-institucional shadow-md transition hover:bg-white md:right-3"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Puntos */}
      {medios.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {medios.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ir al medio ${i + 1}`}
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
  );
}
