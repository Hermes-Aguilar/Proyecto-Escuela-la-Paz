// ============================================================
// components/public/ComunidadModal.tsx
// Tarjeta compacta de una comunidad misionera. Al hacer clic abre
// una ventana (modal) con toda su información: foto, presentación y
// las áreas de servicio con sus listas.
// ============================================================
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaGlobeAfrica,
  FaChurch,
  FaPray,
  FaUsers,
} from "react-icons/fa";
import { X } from "lucide-react";

export type AreaComunidad = { titulo: string; items: string[] };

type Comunidad = {
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

  return (
    <>
      {/* Tarjeta ancha (rectángulo): foto a la izquierda, info a la derecha. */}
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="group flex w-full flex-col overflow-hidden rounded-3xl border border-arena bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-stretch"
      >
        {comunidad.foto && (
          <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden md:aspect-auto md:w-2/5">
            <Image
              src={comunidad.foto}
              alt={comunidad.nombre}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <FaGlobeAfrica size={12} /> Misión
            </span>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center p-7 md:p-8">
          <span className="inline-flex items-center gap-2 text-azul-institucional text-xs font-semibold tracking-widest uppercase">
            <FaGlobeAfrica size={13} /> Misión en el extranjero
          </span>
          <h3 className="mt-2 text-2xl font-bold text-azul-institucional">{comunidad.nombre}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-marron">
            <FaMapMarkerAlt className="text-dorado shrink-0" size={13} />
            {comunidad.ubicacion}
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-marron-suave">
            {comunidad.intro}
          </p>
          <span className="mt-5 inline-block w-fit rounded-full bg-azul-institucional px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-azul-institucional/90">
            Ver información
          </span>
        </div>
      </button>

      {/* Ventana / modal */}
      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={comunidad.nombre}
          onClick={() => setAbierto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-crema shadow-2xl"
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
        </div>
      )}
    </>
  );
}
