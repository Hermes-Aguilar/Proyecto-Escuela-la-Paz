// ============================================================
// components/public/GaleriaEspiritualidad.tsx
// Galería de fotos de la vida espiritual del jardín. Client Component:
// muestra las fotos en masonry (columnas CSS) para acomodar verticales
// y horizontales sin recortes, y al pulsar una abre un lightbox modal
// que la muestra en grande. Cierra con la "X", clic en el fondo o Esc;
// flechas (teclado y botones) para navegar entre fotos.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function GaleriaEspiritualidad({
  imagenes,
  nombreJardin,
}: {
  imagenes: string[];
  nombreJardin: string;
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
      {/* Masonry: columnas CSS + break-inside-avoid para que ninguna foto
          se parta entre columnas. */}
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
        {imagenes.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setAbierta(i)}
            className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-arena bg-white shadow-sm break-inside-avoid"
            aria-label={`Ampliar foto ${i + 1} de la vida espiritual de ${nombreJardin}`}
          >
            <Image
              src={src}
              alt={`Vida espiritual de ${nombreJardin} — foto ${i + 1}`}
              width={800}
              height={1000}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
          {/* Cerrar · fondo oscuro sólido + z alto para que la X siempre se
              vea sobre la foto. */}
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/30 transition hover:bg-black/80"
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
                className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/30 transition hover:bg-black/80 md:left-4"
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
                className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/30 transition hover:bg-black/80 md:right-4"
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
              alt={`Vida espiritual de ${nombreJardin} — foto ${abierta + 1}`}
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
