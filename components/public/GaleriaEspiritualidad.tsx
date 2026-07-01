// ============================================================
// components/public/GaleriaEspiritualidad.tsx
// Galería de fotos de la vida espiritual del jardín. Client Component.
//
// Dos presentaciones según los datos:
//   · Con `albumes` — cada álbum agrupa las fotos de un mismo motivo (p. ej.
//     "Pastorela", "Viacrucis") en UNA tarjeta con portada y badge "N fotos";
//     al pulsarla, el visor recorre las fotos de ESE álbum. Tiene prioridad.
//   · Sin `albumes` — mosaico (columnas CSS) con `imagenes`, para acomodar
//     fotos verticales y horizontales sin recortes; al pulsar una, el visor
//     recorre todas.
//
// El visor (lightbox) es común: cierra con la "X", clic en el fondo o Esc;
// flechas (teclado y botones) para navegar entre fotos.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

import type { AlbumEspiritualidad } from "@/lib/data/jardines-contenido";

// Estado del visor: la lista de fotos que se recorre, su pie opcional y el
// índice activo. null = cerrado.
interface Visor {
  fotos: string[];
  titulo?: string;
  descripcion?: string;
  indice: number;
}

export function GaleriaEspiritualidad({
  imagenes,
  albumes,
  nombreJardin,
}: {
  imagenes?: string[];
  albumes?: AlbumEspiritualidad[];
  nombreJardin: string;
}) {
  const [visor, setVisor] = useState<Visor | null>(null);

  const cerrar = useCallback(() => setVisor(null), []);
  const anterior = useCallback(
    () =>
      setVisor((v) =>
        v === null
          ? v
          : { ...v, indice: (v.indice - 1 + v.fotos.length) % v.fotos.length },
      ),
    [],
  );
  const siguiente = useCallback(
    () =>
      setVisor((v) =>
        v === null ? v : { ...v, indice: (v.indice + 1) % v.fotos.length },
      ),
    [],
  );

  // Teclado: Esc cierra, flechas navegan. Bloquea el scroll del fondo
  // mientras el visor está abierto.
  useEffect(() => {
    if (visor === null) return;
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
  }, [visor, cerrar, anterior, siguiente]);

  const foto = visor === null ? null : visor.fotos[visor.indice];

  return (
    <>
      {albumes && albumes.length > 0 ? (
        // Álbumes: una tarjeta por motivo. Al pulsarla, el visor recorre las
        // fotos de ese álbum.
        <div className="grid gap-5 sm:grid-cols-2">
          {albumes.map((album) => (
            <button
              key={album.titulo ?? album.fotos[0]}
              type="button"
              onClick={() =>
                setVisor({
                  fotos: album.fotos,
                  titulo: album.titulo,
                  descripcion: album.descripcion,
                  indice: 0,
                })
              }
              aria-label={`Ver fotos${album.titulo ? `: ${album.titulo}` : ""} de la vida espiritual de ${nombreJardin} (${album.fotos.length})`}
              className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={album.fotos[0]}
                  alt={album.titulo ?? `Vida espiritual de ${nombreJardin}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {album.fotos.length > 1 && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Images size={14} />
                    {album.fotos.length} fotos
                  </span>
                )}
              </div>
              <figcaption className="flex flex-1 flex-col p-5">
                {album.titulo && (
                  <h3 className="font-titulo text-lg font-bold text-marron">
                    {album.titulo}
                  </h3>
                )}
                {album.descripcion && (
                  <p
                    className={`text-sm leading-relaxed text-marron-suave${
                      album.titulo ? " mt-1.5" : ""
                    }`}
                  >
                    {album.descripcion}
                  </p>
                )}
              </figcaption>
            </button>
          ))}
        </div>
      ) : (
        // Mosaico: columnas CSS + break-inside-avoid para que ninguna foto se
        // parta entre columnas.
        <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
          {(imagenes ?? []).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() =>
                setVisor({ fotos: imagenes ?? [], indice: i })
              }
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
      )}

      {/* Visor (lightbox) */}
      {visor !== null && foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${visor.indice + 1} de ${visor.fotos.length}`}
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
          {visor.fotos.length > 1 && (
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

          {/* Imagen ampliada + (si el álbum lo define) su pie y el contador.
              stopPropagation evita que el clic sobre la foto cierre el modal. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center gap-3"
          >
            <Image
              src={foto}
              alt={`Vida espiritual de ${nombreJardin} — foto ${visor.indice + 1}`}
              width={1600}
              height={1600}
              sizes="90vw"
              className="h-auto max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
            {(visor.titulo || visor.descripcion) && (
              <div className="max-w-xl text-center text-white">
                {visor.titulo && (
                  <p className="font-titulo text-base font-semibold md:text-lg">
                    {visor.titulo}
                  </p>
                )}
                {visor.descripcion && (
                  <p className="mt-0.5 text-sm leading-relaxed text-white/85 md:text-base">
                    {visor.descripcion}
                  </p>
                )}
                {visor.fotos.length > 1 && (
                  <span className="mt-1 block text-xs font-semibold text-white/70">
                    {visor.indice + 1} / {visor.fotos.length}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
