// ============================================================
// components/public/GaleriaMisionera.tsx
// Galería de fotos de la pastoral misionera
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function GaleriaMisionera({
  imagenes,
  etiqueta = "la pastoral misionera",
}: {
  imagenes: string[];
  // Nombre de la pastoral para alt/aria (la galería se reutiliza en varias).
  etiqueta?: string;
}) {
  // Índice de la foto abierta en el lightbox; null = cerrado.
  const [abierta, setAbierta] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);
  const anterior = useCallback(
    () =>
      setAbierta((i) =>
        i === null ? i : (i - 1 + imagenes.length) % imagenes.length,
      ),
    [imagenes.length],
  );
  const siguiente = useCallback(
    () => setAbierta((i) => (i === null ? i : (i + 1) % imagenes.length)),
    [imagenes.length],
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

  return (
    <>
      {/* Cuadrícula uniforme: todas las celdas cuadradas y del mismo tamaño
          (object-cover) para que las filas queden perfectamente alineadas
          aunque las fotos tengan proporciones distintas. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {imagenes.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setAbierta(i)}
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-arena bg-white shadow-sm"
            aria-label={`Ampliar foto ${i + 1} de ${etiqueta}`}
          >
            <Image
              src={src}
              alt={`Foto ${i + 1} de ${etiqueta}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {abierta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${abierta + 1} de ${imagenes.length}`}
          onClick={cerrar}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* Anterior / Siguiente (solo si hay más de una foto) */}
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

          {/* Imagen ampliada. stopPropagation evita que el clic sobre la
              foto cierre el modal. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
          >
            <Image
              src={imagenes[abierta]}
              alt={`Foto ${abierta + 1} de ${etiqueta}`}
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
