// ============================================================
// components/public/DirectorioComunidades.tsx
// Directorio de comunidades misioneras: filtros por región (chips)
// y una cuadrícula compacta de tarjetas. Cada tarjeta abre la
// ventana con la información completa (ver ComunidadModal). Las
// comunidades sin información aún se muestran como "Próximamente".
// En móvil los chips se deslizan en horizontal.
// ============================================================
"use client";

import { useMemo, useState } from "react";
import { ComunidadModal, type Comunidad } from "./ComunidadModal";
import { Revelar } from "./Revelar";

// La región es la última parte de la ubicación ("…, Oaxaca" → "Oaxaca").
// Las comunidades sin sede confirmada se agrupan aparte.
function regionDe(c: Comunidad): string {
  if (/por confirmar/i.test(c.ubicacion)) return "Por confirmar";
  return c.ubicacion.split(",").pop()!.trim();
}

// Orden preferido de las regiones en los filtros. Las que no estén
// listadas se colocan al final, conservando su aparición.
const ORDEN = ["Oaxaca", "Puebla", "Costa Rica", "África", "Por confirmar"];

const TODAS = "Todas";

export function DirectorioComunidades({
  comunidades,
}: {
  comunidades: Comunidad[];
}) {
  const regiones = useMemo(() => {
    const unicas = [...new Set(comunidades.map(regionDe))];
    return unicas.sort((a, b) => {
      const ia = ORDEN.indexOf(a);
      const ib = ORDEN.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }, [comunidades]);

  const [filtro, setFiltro] = useState<string>(TODAS);

  const visibles =
    filtro === TODAS
      ? comunidades
      : comunidades.filter((c) => regionDe(c) === filtro);

  const chips = [TODAS, ...regiones];
  const cuenta = (r: string) =>
    r === TODAS
      ? comunidades.length
      : comunidades.filter((c) => regionDe(c) === r).length;

  return (
    <div>
      {/* Filtros por región — deslizables en móvil, centrados en escritorio */}
      <Revelar className="-mx-6 mb-10 overflow-x-auto px-6 pb-1">
        <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
          {chips.map((r) => {
            const activo = r === filtro;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setFiltro(r)}
                aria-current={activo ? "true" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activo
                    ? "bg-azul-institucional text-white shadow-sm"
                    : "border border-arena bg-white text-marron hover:-translate-y-0.5 hover:border-azul-institucional/40 hover:shadow-sm"
                }`}
              >
                {r}
                <span
                  className={`ml-1.5 text-xs ${
                    activo ? "text-white/70" : "text-marron-suave"
                  }`}
                >
                  {cuenta(r)}
                </span>
              </button>
            );
          })}
        </div>
      </Revelar>

      {/* Cuadrícula de comunidades — aparecen en cascada al hacer scroll y
          al cambiar de filtro (la key por filtro las vuelve a montar). */}
      <div
        key={filtro}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibles.map((c, i) => (
          <Revelar
            key={`${c.nombre} · ${c.ubicacion}`}
            delay={(i % 3) * 90}
            className="h-full"
          >
            <ComunidadModal comunidad={c} />
          </Revelar>
        ))}
      </div>
    </div>
  );
}
