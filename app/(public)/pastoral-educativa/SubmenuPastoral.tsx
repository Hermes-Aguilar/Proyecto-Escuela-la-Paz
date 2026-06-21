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
// ============================================================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ENLACES = [
  {
    etiqueta: "Nuestros Jardines",
    href: "/pastoral-educativa#jardines",
    activoEn: "/pastoral-educativa",
  },
  {
    etiqueta: "Jardín La Paz",
    href: "/pastoral-educativa/la-paz",
    activoEn: "/pastoral-educativa/la-paz",
  },
  {
    etiqueta: "Jardín Porvenir",
    href: "/pastoral-educativa/porvenir",
    activoEn: "/pastoral-educativa/porvenir",
  },
];

export function SubmenuPastoral() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación de Pastoral Educativa"
      className="bg-white shadow-sm"
    >
      <ul className="mx-auto flex max-w-7xl items-stretch overflow-x-auto whitespace-nowrap px-6 text-sm">
        {ENLACES.map((enlace, i) => {
          const activo = pathname === enlace.activoEn;
          return (
            <li
              key={enlace.href}
              // Separador vertical (|) en arena, excepto antes del primero.
              className={`flex items-stretch ${
                i > 0
                  ? "before:flex before:items-center before:px-3 before:text-arena before:content-['|']"
                  : ""
              }`}
            >
              <Link
                href={enlace.href}
                aria-current={activo ? "page" : undefined}
                className={`flex items-center border-b-2 px-3 py-4 font-medium transition-colors ${
                  activo
                    ? "border-azul-institucional bg-azul-institucional/10 text-azul-institucional"
                    : "border-transparent text-marron-suave hover:text-azul-institucional"
                }`}
              >
                {enlace.etiqueta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
