// ============================================================
// components/public/MenuJardin.tsx
// Menú superior horizontal del micro-sitio de cada jardín (CU-02).
//
// CLIENT COMPONENT: usa usePathname para resaltar la sección activa y
// useState para el menú hamburguesa móvil.
//
// Barra blanca, sticky arriba, SIN franja de color encima. A la
// izquierda el ícono + nombre del jardín; a la derecha los enlaces
// (Inicio, Nosotros▾, Oferta Educativa▾, Publicaciones▾, Contacto) y un
// «Regresar a Congregación» discreto al final. El color de acento del
// enlace activo sale SIEMPRE de colorPrimario (leído de la BD por el
// layout y pasado como prop); nunca se hardcodea el teal/mostaza.
// ============================================================
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowLeft, Menu, X } from "lucide-react";

import IconoJardin from "./IconoJardin";

interface Props {
  nombreJardin: string;
  slug: string;
  colorPrimario: string;
  logoUrl: string | null;
}

// Logo local por jardín (fallback cuando la BD no tiene logoUrl).
const LOGOS_FALLBACK: Record<string, string> = {
  "la-paz": "/images/logo-paz.png",
  porvenir: "/images/logo_porvenir.png",
};

// ---------- Modelo del menú ----------

interface SubLink {
  label: string;
  href: string;
}

type Item =
  | { tipo: "link"; label: string; href: string }
  | { tipo: "grupo"; label: string; prefijo: string; hijos: SubLink[] };

function construirMenu(base: string): Item[] {
  return [
    { tipo: "link", label: "Inicio", href: base },
    {
      tipo: "grupo",
      label: "Nosotros",
      prefijo: `${base}/nosotros`,
      hijos: [
        { label: "Quiénes somos", href: `${base}/nosotros/quienes-somos` },
        { label: "Historia", href: `${base}/nosotros/historia` },
        { label: "Espiritualidad", href: `${base}/nosotros/espiritualidad` },
        { label: "Nuestro equipo", href: `${base}/nosotros/equipo` },
      ],
    },
    {
      tipo: "grupo",
      label: "Oferta Educativa",
      prefijo: `${base}/oferta`,
      hijos: [
        { label: "Niveles", href: `${base}/oferta#niveles` },
        { label: "Actividades", href: `${base}/oferta#actividades` },
      ],
    },
    {
      tipo: "grupo",
      label: "Publicaciones",
      prefijo: `${base}/publicaciones`,
      hijos: [
        { label: "Noticias", href: `${base}/publicaciones/noticias` },
        { label: "Eventos", href: `${base}/publicaciones/eventos` },
        { label: "Avisos", href: `${base}/publicaciones/avisos` },
      ],
    },
    { tipo: "link", label: "Contacto", href: `${base}/contacto` },
  ];
}

// Un link sin hash está activo si la ruta coincide exactamente. Los
// links con hash (#) son anclas secundarias: no se resaltan.
function linkActivo(href: string, pathname: string): boolean {
  return !href.includes("#") && pathname === href;
}

export default function MenuJardin({
  nombreJardin,
  slug,
  colorPrimario,
  logoUrl,
}: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const base = `/pastoral-educativa/${slug}`;
  const menu = construirMenu(base);
  const cerrar = () => setAbierto(false);
  const logoSrc = logoUrl ?? LOGOS_FALLBACK[slug] ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* IZQUIERDA · ícono + nombre del jardín */}
        <Link
          href={base}
          onClick={cerrar}
          className="flex shrink-0 items-center gap-2.5"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`Logo de ${nombreJardin}`}
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              priority
            />
          ) : (
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm"
              style={{ backgroundColor: colorPrimario }}
            >
              <IconoJardin slug={slug} className="h-6 w-6 text-white" />
            </span>
          )}
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-marron-suave/70">
              Jardín de niños
            </span>
            <span
              className="font-titulo text-base font-bold leading-tight sm:text-lg"
              style={{ color: colorPrimario }}
            >
              {nombreJardin}
            </span>
          </span>
        </Link>

        {/* DERECHA · navegación de escritorio */}
        <nav className="hidden items-center gap-1 lg:flex">
          {menu.map((item) => {
            if (item.tipo === "link") {
              const act = linkActivo(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-arena/40"
                  style={
                    act
                      ? { color: colorPrimario }
                      : { color: "var(--color-marron-suave)" }
                  }
                >
                  {item.label}
                </Link>
              );
            }

            // Grupo con submenú desplegable al hover (y focus-within para
            // teclado). El label resalta cuando la ruta actual cae bajo él.
            const activoGrupo = pathname.startsWith(item.prefijo);
            return (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-arena/40"
                  style={
                    activoGrupo
                      ? { color: colorPrimario }
                      : { color: "var(--color-marron-suave)" }
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul className="overflow-hidden rounded-xl border border-arena bg-white py-1 shadow-xl">
                    {item.hijos.map((h) => {
                      const act = linkActivo(h.href, pathname);
                      return (
                        <li key={h.href}>
                          <Link
                            href={h.href}
                            className="block px-4 py-2.5 text-sm text-marron transition-colors hover:bg-crema"
                            style={
                              act
                                ? { backgroundColor: `${colorPrimario}1A`, color: colorPrimario }
                                : undefined
                            }
                          >
                            {h.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Regresar · discreto, al final */}
          <Link
            href="/pastoral-educativa"
            className="ml-1 flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-marron-suave/80 transition-colors hover:text-azul-institucional"
          >
            <ArrowLeft size={15} />
            Regresar a Congregación
          </Link>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setAbierto((o) => !o)}
          aria-label="Menú"
          aria-expanded={abierto}
          className="rounded-lg p-2 text-marron transition-colors hover:bg-arena/40 lg:hidden"
        >
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {abierto && (
        <div className="border-t border-arena bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            <Link
              href="/pastoral-educativa"
              onClick={cerrar}
              className="flex items-center gap-2 border-b border-arena px-1 py-3 text-sm font-medium text-marron-suave/80 transition-colors hover:text-azul-institucional"
            >
              <ArrowLeft size={15} />
              Regresar a Congregación
            </Link>

            <ul className="py-1">
              {menu.map((item) => {
                if (item.tipo === "link") {
                  const act = linkActivo(item.href, pathname);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={cerrar}
                        className="block px-1 py-3 text-sm font-medium transition-colors"
                        style={
                          act
                            ? { color: colorPrimario }
                            : { color: "var(--color-marron)" }
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const activoGrupo = pathname.startsWith(item.prefijo);
                return (
                  <li key={item.label} className="border-t border-arena/60 first:border-t-0">
                    <p
                      className="px-1 pt-3 pb-1 text-sm font-semibold"
                      style={
                        activoGrupo
                          ? { color: colorPrimario }
                          : { color: "var(--color-marron)" }
                      }
                    >
                      {item.label}
                    </p>
                    <ul className="pb-2">
                      {item.hijos.map((h) => {
                        const act = linkActivo(h.href, pathname);
                        return (
                          <li key={h.href}>
                            <Link
                              href={h.href}
                              onClick={cerrar}
                              className="block py-2 pl-4 pr-1 text-sm text-marron-suave transition-colors"
                              style={act ? { color: colorPrimario } : undefined}
                            >
                              {h.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
