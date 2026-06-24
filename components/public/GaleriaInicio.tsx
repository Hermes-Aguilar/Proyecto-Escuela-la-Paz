// ============================================================
// components/public/GaleriaInicio.tsx
// Galería "Nuestro día a día" del inicio de cada jardín. Client
// Component: muestra las fotos en tarjetas con título y descripción. Los
// videos NO se listan uno a uno (crecerían demasiado y alargarían la
// página): se agrupan en una sola tarjeta "Videos" que, al pulsarla, abre
// una ventana con todos ellos. Tanto fotos como videos se amplían en un
// visor (lightbox); los videos se reproducen embebidos. Se cierra con la
// "X", clic en el fondo o Esc; flechas (teclado y botones) para navegar.
// ============================================================
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Film,
} from "lucide-react";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// Cuántas tarjetas se muestran de inicio (cuadrícula 3×3). El resto queda
// oculto tras el botón "Ver más" para no alargar la página.
const VISIBLES = 9;

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

// Estado del visor (lightbox): la lista que se está recorriendo y el
// índice activo dentro de ella. null = cerrado.
interface Visor {
  lista: FotoGaleria[];
  indice: number;
}

export function GaleriaInicio({ fotos }: { fotos: FotoGaleria[] }) {
  // Separamos imágenes de videos: las imágenes se muestran en la
  // cuadrícula; los videos se agrupan en una sola tarjeta + ventana.
  const imagenes = fotos.filter((f) => !f.videoId);
  const videos = fotos.filter((f) => f.videoId);

  // Ventana con todos los videos (la "galería de videos").
  const [videosAbiertos, setVideosAbiertos] = useState(false);
  // Visor que amplía/reproduce un elemento concreto.
  const [visor, setVisor] = useState<Visor | null>(null);
  // ¿Se muestran todas las tarjetas o solo las primeras VISIBLES?
  const [expandida, setExpandida] = useState(false);

  // Celdas de la cuadrícula: la tarjeta "Videos" primero (si hay videos),
  // seguida de las imágenes. Marcamos la de videos con un centinela.
  const VIDEOS = "__videos__" as const;
  const celdas: (typeof VIDEOS | FotoGaleria)[] = [
    ...(videos.length > 0 ? [VIDEOS] : []),
    ...imagenes,
  ];
  const visibles = expandida ? celdas : celdas.slice(0, VISIBLES);

  const cerrarVisor = useCallback(() => setVisor(null), []);
  const anterior = useCallback(
    () =>
      setVisor((v) =>
        v === null
          ? v
          : { ...v, indice: (v.indice - 1 + v.lista.length) % v.lista.length },
      ),
    [],
  );
  const siguiente = useCallback(
    () =>
      setVisor((v) =>
        v === null
          ? v
          : { ...v, indice: (v.indice + 1) % v.lista.length },
      ),
    [],
  );

  // Teclado: Esc cierra (primero el visor, si no la ventana de videos),
  // flechas navegan dentro del visor. Bloquea el scroll del fondo mientras
  // haya algo abierto.
  useEffect(() => {
    const algoAbierto = visor !== null || videosAbiertos;
    if (!algoAbierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (visor !== null) cerrarVisor();
        else setVideosAbiertos(false);
      } else if (visor !== null && e.key === "ArrowLeft") anterior();
      else if (visor !== null && e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [visor, videosAbiertos, cerrarVisor, anterior, siguiente]);

  const foto = visor === null ? null : visor.lista[visor.indice];

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((celda, i) =>
          celda === VIDEOS ? (
            // Tarjeta única que agrupa todos los videos (siempre primera).
            <AnimacionScroll key="videos" delay={i * 90} className="h-full">
              <button
                type="button"
                onClick={() => setVideosAbiertos(true)}
                aria-label={`Ver todos los videos (${videos.length})`}
                className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={miniatura(videos[0])}
                    alt="Videos"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 transition-colors group-hover:bg-black/55">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-marron shadow-lg transition-transform group-hover:scale-110">
                      <Play size={26} className="ml-1 fill-current" />
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-marron">
                      {videos.length} {videos.length === 1 ? "video" : "videos"}
                    </span>
                  </span>
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="font-titulo text-lg font-bold text-marron">
                    Videos
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                    Mira todos nuestros videos en un solo lugar.
                  </p>
                </figcaption>
              </button>
            </AnimacionScroll>
          ) : (
            <AnimacionScroll key={celda.src} delay={i * 90} className="h-full">
              <button
                type="button"
                onClick={() =>
                  setVisor({ lista: imagenes, indice: imagenes.indexOf(celda) })
                }
                aria-label={`Ampliar foto: ${celda.titulo}`}
                className="group flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={miniatura(celda)}
                    alt={celda.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="font-titulo text-lg font-bold text-marron">
                    {celda.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-marron-suave">
                    {celda.descripcion}
                  </p>
                </figcaption>
              </button>
            </AnimacionScroll>
          ),
        )}
      </div>

      {/* Ver más / Ver menos: solo si hay más tarjetas de las visibles. */}
      {celdas.length > VISIBLES && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpandida((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-semibold text-marron transition-colors hover:bg-white"
            style={{ borderColor: "var(--jardin-primario)" }}
          >
            {expandida ? (
              <>
                Ver menos <ChevronUp size={18} />
              </>
            ) : (
              <>
                Ver más <ChevronDown size={18} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Ventana con la galería de videos. */}
      {videosAbiertos && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Videos"
          onClick={() => setVideosAbiertos(false)}
          className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-4xl rounded-2xl bg-crema p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-titulo flex items-center gap-2 text-xl font-bold text-marron md:text-2xl">
                <Film size={22} style={{ color: "var(--jardin-primario)" }} />
                Videos
              </h3>
              <button
                type="button"
                onClick={() => setVideosAbiertos(false)}
                aria-label="Cerrar"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-marron shadow-sm transition hover:bg-arena/40"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, i) => (
                <button
                  key={video.videoId}
                  type="button"
                  onClick={() => setVisor({ lista: videos, indice: i })}
                  aria-label={`Reproducir video: ${video.titulo}`}
                  className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={miniatura(video)}
                      alt={video.titulo}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-marron shadow-lg transition-transform group-hover:scale-110">
                        <Play size={22} className="ml-1 fill-current" />
                      </span>
                    </span>
                  </div>
                  <figcaption className="flex flex-1 flex-col p-4">
                    <h4 className="font-titulo text-base font-bold text-marron">
                      {video.titulo}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-marron-suave">
                      {video.descripcion}
                    </p>
                  </figcaption>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visor (lightbox): amplía una foto o reproduce un video. */}
      {foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={foto.titulo}
          onClick={cerrarVisor}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={cerrarVisor}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* Anterior / Siguiente (solo si hay más de un elemento) */}
          {visor!.lista.length > 1 && (
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
