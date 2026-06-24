// ============================================================
// components/public/GaleriaInicio.tsx
// Galería "Nuestro día a día" del inicio de cada jardín. Client
// Component: muestra fotos (y videos de YouTube) en tarjetas con título
// y descripción. Al pulsar una, abre un lightbox que la amplía junto con
// su texto; los videos se reproducen embebidos. Cierra con la "X", clic
// en el fondo o Esc; flechas (teclado y botones) para navegar.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

export interface FotoGaleria {
  /** Imagen de la tarjeta. En los videos es opcional: si falta, se usa
   *  la miniatura de YouTube. */
  src?: string;
  titulo: string;
  descripcion: string;
  /** Si está presente, el elemento es un video de YouTube (su ID). */
  videoId?: string;
}

// Miniatura a mostrar en la tarjeta: la propia imagen o, para videos, la
// miniatura de YouTube.
function miniatura(foto: FotoGaleria): string {
  if (foto.src) return foto.src;
  if (foto.videoId) return `https://img.youtube.com/vi/${foto.videoId}/hqdefault.jpg`;
  return "";
}

export function GaleriaInicio({ fotos }: { fotos: FotoGaleria[] }) {
  // Índice de la foto abierta en el lightbox; null = cerrado.
  const [abierta, setAbierta] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);
  const anterior = useCallback(
    () =>
      setAbierta((i) =>
        i === null ? i : (i - 1 + fotos.length) % fotos.length,
      ),
    [fotos.length],
  );
  const siguiente = useCallback(
    () => setAbierta((i) => (i === null ? i : (i + 1) % fotos.length)),
    [fotos.length],
  );

  // Teclado: Esc cierra, flechas navegan. Bloquea el scroll del fondo
  // mientras el lightbox está abierto.
  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      else if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta, cerrar, anterior, siguiente]);

  const foto = abierta === null ? null : fotos[abierta];

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fotos.map((foto, i) => (
          <AnimacionScroll key={foto.src ?? foto.videoId} delay={i * 90} className="h-full">
            <button
              type="button"
              onClick={() => setAbierta(i)}
              aria-label={
                foto.videoId
                  ? `Reproducir video: ${foto.titulo}`
                  : `Ampliar foto: ${foto.titulo}`
              }
              className="group flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={miniatura(foto)}
                  alt={foto.titulo}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Botón de reproducción para los videos. */}
                {foto.videoId && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-marron shadow-lg transition-transform group-hover:scale-110">
                      <Play size={26} className="ml-1 fill-current" />
                    </span>
                  </span>
                )}
              </div>
              <figcaption className="flex flex-1 flex-col p-5">
                <h3 className="font-titulo text-lg font-bold text-marron">
                  {foto.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                  {foto.descripcion}
                </p>
              </figcaption>
            </button>
          </AnimacionScroll>
        ))}
      </div>

      {/* Lightbox */}
      {foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={foto.titulo}
          onClick={cerrar}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* Anterior / Siguiente (solo si hay más de un elemento) */}
          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  anterior();
                }}
                aria-label="Anterior"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-4"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  siguiente();
                }}
                aria-label="Siguiente"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-4"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Tarjeta ampliada: media + texto. stopPropagation evita que el
              clic sobre ella cierre el modal. */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {foto.videoId ? (
              // Video vertical (Short): contenedor 9/16 con altura limitada.
              <div className="mx-auto aspect-9/16 max-h-[70vh] w-auto bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${foto.videoId}?autoplay=1&rel=0`}
                  title={foto.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="relative w-full bg-black">
                <Image
                  src={foto.src!}
                  alt={foto.titulo}
                  width={1600}
                  height={1200}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="mx-auto h-auto max-h-[65vh] w-auto object-contain"
                  priority
                />
              </div>
            )}
            <figcaption className="p-6">
              <h3 className="font-titulo text-xl font-bold text-marron">
                {foto.titulo}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-marron-suave">
                {foto.descripcion}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
