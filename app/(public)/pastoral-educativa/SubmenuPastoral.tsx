// ============================================================
// app/(public)/pastoral-educativa/SubmenuPastoral.tsx
// Submenú horizontal de Pastoral Educativa: ancla a la sección de
// jardines de esta página + accesos directos a cada jardín.
//
// Client Component: usa usePathname para resaltar el enlace activo
// (azul-institucional). Es reutilizable — si esta barra se coloca también en
// las páginas de jardín, "La Paz"/"Porvenir" se resaltan solas.
//
// Va en el flujo normal de la página (NO sticky/fixed): scrollea junto
// con el resto del contenido para no solaparse con el título ni el texto.
// Mobile-first: scroll horizontal interno si las pestañas no caben.
//
// Cada enlace es una pestaña tipo "pill": el de jardines lleva ícono en
// oro (único acento) y los jardines un punto con su color propio (teal /
// mostaza), los mismos que ya usa el resto de esta página del portal.
// ============================================================
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSeedling } from "react-icons/fa";

type Enlace = {
  etiqueta: string;
  href: string;
  activoEn: string;
  icono?: ReactNode;
  punto?: string; // color propio del jardín (teal / mostaza)
};

const ENLACES: Enlace[] = [
  {
    etiqueta: "Nuestros Jardines",
    href: "/pastoral-educativa#jardines",
    activoEn: "/pastoral-educativa",
    icono: <FaSeedling size={13} />,
  },
  {
    etiqueta: "Jardín La Paz",
    href: "/pastoral-educativa/la-paz",
    activoEn: "/pastoral-educativa/la-paz",
    punto: "#137E86",
  },
  {
    etiqueta: "Jardín Porvenir",
    href: "/pastoral-educativa/porvenir",
    activoEn: "/pastoral-educativa/porvenir",
    punto: "#F4C438",
  },
];

export function SubmenuPastoral() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación de Pastoral Educativa"
      className="border-b border-arena bg-gradient-to-b from-white to-crema/50 shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 overflow-x-auto px-4 py-3 sm:px-6">
        {/* Rótulo guía, solo en pantallas anchas */}
        <span className="hidden shrink-0 items-center gap-2 pr-1 text-xs font-semibold uppercase tracking-widest text-marron-suave sm:flex">
          <span className="h-px w-5 bg-dorado" />
          Explora
        </span>

        {ENLACES.map((enlace) => {
          const activo = pathname === enlace.activoEn;
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              aria-current={activo ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                activo
                  ? "border-azul-institucional bg-azul-institucional text-white shadow-sm"
                  : "border-arena bg-white text-marron-suave hover:-translate-y-0.5 hover:border-azul-institucional hover:text-azul-institucional hover:shadow-md"
              }`}
            >
              {enlace.icono && <span className="text-dorado">{enlace.icono}</span>}
              {enlace.punto && (
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/80"
                  style={{ backgroundColor: enlace.punto }}
                />
              )}
              {enlace.etiqueta}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
