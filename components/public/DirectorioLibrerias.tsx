// ============================================================
// components/public/DirectorioLibrerias.tsx
// Directorio interactivo de librerías tipo "localizador de
// sucursales": lista lateral agrupada por estado y un panel de
// detalle que cambia sin recargar ni abrir modales. En móvil la
// lista se vuelve chips deslizables arriba del panel.
// ============================================================
"use client";

import { useState } from "react";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";
import { GaleriaLibreriaModal } from "./GaleriaLibreriaModal";

export type Libreria = {
  nombre: string;
  /** Nombre corto para la lista lateral y los chips en móvil. */
  corto: string;
  ciudad: string;
  direccion: string;
  /** Horario de atención en texto libre. Opcional si aún no se confirma. */
  horario?: string;
  /** Teléfonos de contacto (uno o varios). Opcional. */
  telefono?: string[];
  email?: string;
  principal: boolean;
  descripcion: string;
  /** Artículos religiosos que ofrece la librería. */
  productos?: string[];
  /** Fotos de la librería; se muestran en un carrusel dentro de un modal. */
  fotos?: string[];
};

// El estado es la última parte de la ciudad ("Juxtlahuaca, Oaxaca" → "Oaxaca").
const estadoDe = (lib: Libreria) => lib.ciudad.split(",").pop()!.trim();

export function DirectorioLibrerias({ librerias }: { librerias: Libreria[] }) {
  // Al cargar se muestra la librería principal (o la primera si no hay).
  const [sel, setSel] = useState(() =>
    Math.max(0, librerias.findIndex((l) => l.principal)),
  );
  const lib = librerias[sel];

  // Grupos por estado conservando el orden de aparición.
  const estados = [...new Set(librerias.map(estadoDe))];

  return (
    <div className="grid items-start gap-6 md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr]">
      {/* ——— Lista lateral (escritorio) ——— */}
      <nav aria-label="Librerías por estado" className="hidden md:block md:sticky md:top-24">
        {estados.map((estado) => (
          <div key={estado} className="mb-6 last:mb-0">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-marron-suave">
              {estado}
            </p>
            <ul className="space-y-1.5">
              {librerias.map((l, i) =>
                estadoDe(l) !== estado ? null : (
                  <li key={l.nombre}>
                    <button
                      type="button"
                      onClick={() => setSel(i)}
                      aria-current={i === sel ? "true" : undefined}
                      className={`w-full rounded-xl px-4 py-3 text-left transition-colors ${
                        i === sel
                          ? "bg-azul-institucional text-white shadow-sm"
                          : "bg-white text-marron border border-arena hover:border-azul-institucional/40 hover:bg-white/60"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-bold">
                        {l.corto}
                        {l.principal && (
                          <FaStar
                            size={11}
                            className={i === sel ? "text-dorado" : "text-dorado/80"}
                            aria-label="Librería principal"
                          />
                        )}
                      </span>
                      <span className={`text-xs ${i === sel ? "text-white/75" : "text-marron-suave"}`}>
                        {l.ciudad.split(",")[0]}
                      </span>
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>

      {/* ——— Chips deslizables (móvil) ——— */}
      <div className="-mx-6 overflow-x-auto px-6 pb-1 md:hidden">
        <div className="flex w-max gap-2">
          {librerias.map((l, i) => (
            <button
              key={l.nombre}
              type="button"
              onClick={() => setSel(i)}
              aria-current={i === sel ? "true" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === sel
                  ? "bg-azul-institucional text-white shadow-sm"
                  : "bg-white text-marron border border-arena"
              }`}
            >
              {l.corto}
            </button>
          ))}
        </div>
      </div>

      {/* ——— Panel de detalle ——— */}
      <article
        key={lib.nombre}
        className="animate-[aparecer_0.35s_ease] overflow-hidden rounded-3xl border border-arena bg-white shadow-sm"
      >
        {/* Portada con acceso a la galería completa. El alto fijo en md+
            es necesario: la portada usa md:h-full y sin él colapsaría. */}
        {lib.fotos && lib.fotos.length > 0 && (
          <div className="p-4 pb-0 sm:p-5 sm:pb-0">
            <div className="md:h-96">
              <GaleriaLibreriaModal imagenes={lib.fotos} titulo={lib.nombre} />
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {lib.principal && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-dorado/15 px-3 py-1 text-xs font-bold text-dorado-oscuro">
              <FaStar size={10} /> Librería principal
            </span>
          )}
          <h3 className="text-2xl font-bold text-azul-institucional">{lib.nombre}</h3>
          <p className="mt-1 text-sm font-semibold text-azul-institucional">{lib.ciudad}</p>
          <p className="mt-4 text-sm leading-relaxed text-marron">{lib.descripcion}</p>

          {/* Datos prácticos */}
          <dl className="mt-6 grid gap-3 rounded-2xl bg-crema p-5 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 sm:col-span-2">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-azul-institucional" size={14} />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-marron-suave">Dirección</dt>
                <dd className="text-sm text-marron">{lib.direccion}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <FaClock className="mt-0.5 shrink-0 text-azul-institucional" size={14} />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-marron-suave">Horario</dt>
                <dd className={`text-sm ${lib.horario ? "text-marron" : "italic text-marron-suave"}`}>
                  {lib.horario ?? "Días y horario por confirmar"}
                </dd>
              </div>
            </div>
            {lib.telefono && (
              <div className="flex items-start gap-2.5">
                <FaPhoneAlt className="mt-0.5 shrink-0 text-azul-institucional" size={14} />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-marron-suave">Teléfono</dt>
                  <dd className="text-sm text-marron">
                    {lib.telefono.map((tel, i) => (
                      <span key={tel}>
                        {i > 0 && " · "}
                        <a
                          href={`tel:${tel.replace(/\s+/g, "")}`}
                          className="transition-colors hover:text-azul-institucional"
                        >
                          {tel}
                        </a>
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            )}
            {lib.email && (
              <div className="flex items-start gap-2.5">
                <FaEnvelope className="mt-0.5 shrink-0 text-azul-institucional" size={14} />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-marron-suave">Correo</dt>
                  <dd className="text-sm text-marron">
                    <a
                      href={`mailto:${lib.email}`}
                      className="transition-colors hover:text-azul-institucional"
                    >
                      {lib.email}
                    </a>
                  </dd>
                </div>
              </div>
            )}
          </dl>

          {/* Artículos como etiquetas */}
          {lib.productos && (
            <div className="mt-6">
              <h4 className="mb-3 font-bold text-azul-institucional">Artículos que ofrecemos</h4>
              <ul className="flex flex-wrap gap-2">
                {lib.productos.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-dorado/40 bg-dorado/10 px-3.5 py-1.5 text-xs font-medium text-marron"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
