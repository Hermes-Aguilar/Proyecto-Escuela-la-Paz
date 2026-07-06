// ============================================================
// components/public/CarruselFoto.tsx
// Mini carrusel que alterna varias fotos DENTRO del mismo marco
// (crossfade por opacidad, sin cambiar de tamaño). Solo cambia al
// pulsar las flechas o los puntitos (sin avance automático).
// ============================================================
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarruselFoto({
  fotos,
}: {
  fotos: { src: string; alt?: string }[];
}) {
  const [idx, setIdx] = useState(0);

  const actual = fotos[idx];
  const varias = fotos.length > 1;
  const ir = (paso: number) =>
    setIdx((i) => (i + paso + fotos.length) % fotos.length);

  return (
    <>
      <div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl border border-arena bg-crema shadow-sm">
        {fotos.map((f, i) => (
          <Image
            key={f.src}
            src={f.src}
            alt={f.alt ?? ""}
            width={768}
            height={960}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {varias && (
          <>
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-marron shadow-sm transition-colors hover:bg-white hover:text-azul-institucional focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-marron shadow-sm transition-colors hover:bg-white hover:text-azul-institucional focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === idx}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === idx ? "bg-dorado" : "bg-arena hover:bg-dorado/60"
              }`}
            />
          ))}
        </div>
      )}

      {actual.alt && (
        <figcaption className="mt-2 px-1 text-center text-xs italic leading-snug text-marron-suave">
          {actual.alt}
        </figcaption>
      )}
    </>
  );
}
