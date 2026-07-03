// ============================================================
// components/public/ComunidadModal.tsx
// Tarjeta compacta (vertical) de una comunidad misionera para la
// cuadrícula del directorio. Al hacer clic abre una ventana (modal)
// con toda su información: foto, presentación y las áreas de servicio.
// Las comunidades cuya información aún no se carga (sin áreas) se
// muestran como tarjeta estática con la etiqueta "Próximamente".
// ============================================================
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaMapMarkerAlt,
  FaGlobeAfrica,
  FaChurch,
  FaPray,
  FaUsers,
  FaRegClock,
} from "react-icons/fa";
import { X } from "lucide-react";

export type AreaComunidad = { titulo: string; items: string[] };

export type Comunidad = {
  nombre: string;
  ubicacion: string;
  /** Foto representativa de la comunidad (en /public/images). */
  foto?: string;
  /** Párrafo de presentación. */
  intro: string;
  /** Áreas de servicio con sus actividades. */
  areas: AreaComunidad[];
};

// Ícono según la posición del área (pastoral, espiritualidad, …).
const iconoArea = [FaChurch, FaPray, FaUsers];

export function ComunidadModal({ comunidad }: { comunidad: Comunidad }) {
  const [abierto, setAbierto] = useState(false);
  // El modal se monta en <body> con un portal (ver más abajo). Este flag
  // evita usar document.body durante el render del servidor (SSR).
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  // Una comunidad sin áreas de servicio todavía no tiene información
  // completa: aparece en el directorio, pero no abre ventana.
  const pendiente = comunidad.areas.length === 0;

  // Esc cierra la ventana y se bloquea el scroll del fondo.
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

  // ——— Contenido de la tarjeta (común a ambos estados) ———
  const contenido = (
    <>
      {comunidad.foto && (
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden">
          <Image
            src={comunidad.foto}
            alt={comunidad.nombre}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
            className={`object-cover transition-transform duration-500 ${
              pendiente ? "opacity-70" : "group-hover:scale-105"
            }`}
          />
          {pendiente ? (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-dorado/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <FaRegClock size={11} /> Próximamente
            </span>
          ) : (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <FaGlobeAfrica size={12} /> Misión
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-azul-institucional">{comunidad.nombre}</h3>
        {/* Filete dorado que se ensancha al pasar el cursor. */}
        <span
          aria-hidden
          className="mt-2 block h-[3px] w-8 rounded-full bg-dorado/60 transition-all duration-500 group-hover:w-16 group-hover:bg-dorado"
        />
        <p className="mt-2.5 flex items-start gap-1.5 text-sm font-medium text-marron">
          <FaMapMarkerAlt className="mt-0.5 shrink-0 text-dorado" size={13} />
          {comunidad.ubicacion}
        </p>
        {pendiente ? (
          <span className="mt-auto pt-4 text-sm font-medium italic text-marron-suave">
            Información próximamente
          </span>
        ) : (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-azul-institucional transition-colors group-hover:text-dorado-oscuro">
            Ver información
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        )}
      </div>
    </>
  );

  // Estado pendiente: tarjeta estática, sin botón ni ventana.
  if (pendiente) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-arena bg-white/70 shadow-sm">
        {contenido}
      </div>
    );
  }

  return (
    <>
      {/* Tarjeta compacta (vertical): foto arriba, info abajo. */}
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-arena bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-dorado/40 hover:shadow-xl"
      >
        {contenido}
      </button>

      {/* Ventana / modal */}
      {abierto &&
        montado &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={comunidad.nombre}
          onClick={() => setAbierto(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-crema shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-marron shadow-sm transition-colors hover:bg-arena"
            >
              <X size={22} />
            </button>

            {/* Foto + presentación */}
            <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-2 md:items-center">
              {comunidad.foto && (
                <figure className="overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={comunidad.foto}
                      alt={comunidad.nombre}
                      fill
                      sizes="(min-width: 768px) 32rem, 90vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              )}
              <div>
                <span className="inline-flex items-center gap-2 text-azul-institucional text-sm font-semibold tracking-widest uppercase">
                  <FaGlobeAfrica size={16} /> Misión en el extranjero
                </span>
                <h2 className="mt-2 text-3xl font-bold text-azul-institucional md:text-4xl">
                  {comunidad.nombre}
                </h2>
                <p className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-marron">
                  <FaMapMarkerAlt className="text-dorado" size={15} />
                  {comunidad.ubicacion}
                </p>
                <p className="mt-4 text-base leading-relaxed text-marron-suave text-justify">
                  {comunidad.intro}
                </p>
              </div>
            </div>

            {/* Áreas de servicio */}
            <div className="grid gap-6 px-8 pb-10 sm:px-10 md:grid-cols-2">
              {comunidad.areas.map((area, i) => {
                const Icono = iconoArea[i] ?? FaUsers;
                return (
                  <div
                    key={area.titulo}
                    className="rounded-2xl border border-arena bg-white p-7 shadow-sm"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-dorado">
                        <Icono size={22} />
                      </span>
                      <h3 className="text-lg font-bold text-azul-institucional">
                        {area.titulo}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {area.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base text-marron-suave"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dorado"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
