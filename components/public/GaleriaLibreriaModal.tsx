// ============================================================
// components/public/GaleriaLibreriaModal.tsx
// Botón con ícono que abre una ventana (modal) con el carrusel
// de fotos de una librería. Cada tarjeta del directorio usa el
// suyo, así las fotos no se muestran todas de golpe.
// ============================================================
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Images, X } from "lucide-react";
import { CarruselGaleria } from "./CarruselGaleria";

export function GaleriaLibreriaModal({
  imagenes,
  titulo,
}: {
  imagenes: string[];
  titulo: string;
}) {
  const [abierto, setAbierto] = useState(false);
  // El modal se monta en <body> con un portal (ver más abajo). Este flag
  // evita usar document.body durante el render del servidor (SSR).
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  // Esc cierra la ventana y se bloquea el scroll del fondo mientras
  // está abierta.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  if (imagenes.length === 0) return null;

  return (
    <>
      {/* Portada: la primera foto, con overlay para abrir la galería.
          Llena el alto de su contenedor (la columna de la tarjeta). */}
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="group relative block aspect-16/10 w-full overflow-hidden rounded-2xl border border-arena bg-crema md:aspect-auto md:h-full"
        aria-label={`Ver las ${imagenes.length} fotos de ${titulo}`}
      >
        <Image
          src={imagenes[0]}
          alt={`${titulo} — portada`}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Degradado inferior para legibilidad de la etiqueta */}
        <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Contador de fotos arriba a la derecha */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Images size={13} />
          {imagenes.length}
        </span>
        {/* Llamado a la acción abajo */}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
          <span className="text-sm font-semibold text-white drop-shadow">
            Galería de fotos
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-azul-institucional shadow-sm transition-colors group-hover:bg-white">
            Ver las {imagenes.length} fotos
          </span>
        </span>
      </button>

      {abierto &&
        montado &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotos de ${titulo}`}
          onClick={() => setAbierto(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl md:p-8"
          >
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-crema text-marron transition-colors hover:bg-arena"
            >
              <X size={20} />
            </button>

            <h3 className="mb-5 pr-12 text-xl font-bold text-azul-institucional">
              {titulo}
            </h3>

            <CarruselGaleria
              imagenes={imagenes}
              titulo={titulo}
              permitirAmpliar={false}
            />
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
