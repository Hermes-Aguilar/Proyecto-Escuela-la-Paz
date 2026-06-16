// ============================================================
// components/public/SidebarJardin.tsx
// Menú lateral del micro-sitio de cada jardín (CU-02).
//
// CLIENT COMPONENT: usa usePathname para resaltar la sección
// activa y useState para los grupos expandibles y el drawer móvil.
//
// El color de acento (link activo, nombre del jardín) sale SIEMPRE
// de colorPrimario, leído de la BD por el layout y pasado como prop;
// nunca se hardcodea el teal/mostaza de una escuela concreta.
// ============================================================
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BookOpen,
  Newspaper,
  Mail,
  ChevronDown,
  ArrowLeft,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

interface Props {
  nombreJardin: string;
  slug: string;
  colorPrimario: string;
}

// ---------- Modelo del menú ----------

interface SubLink {
  label: string;
  href: string;
}

type Item =
  | { tipo: "link"; label: string; href: string; icon: LucideIcon }
  | {
      tipo: "grupo";
      label: string;
      icon: LucideIcon;
      // Prefijo de ruta que marca al grupo como "activo" (abre por defecto).
      prefijo: string;
      hijos: SubLink[];
    };

function construirMenu(base: string): Item[] {
  return [
    { tipo: "link", label: "Inicio", href: base, icon: Home },
    {
      tipo: "grupo",
      label: "Nosotros",
      icon: Users,
      prefijo: `${base}/nosotros`,
      hijos: [
        { label: "Quiénes somos", href: `${base}/nosotros/quienes-somos` },
        { label: "Nuestra misión", href: `${base}/nosotros/quienes-somos#mision` },
        { label: "Nuestro equipo", href: `${base}/nosotros/equipo` },
      ],
    },
    {
      tipo: "grupo",
      label: "Oferta Educativa",
      icon: BookOpen,
      prefijo: `${base}/oferta`,
      hijos: [
        { label: "Niveles", href: `${base}/oferta#niveles` },
        { label: "Actividades", href: `${base}/oferta#actividades` },
      ],
    },
    {
      tipo: "grupo",
      label: "Publicaciones",
      icon: Newspaper,
      prefijo: `${base}/publicaciones`,
      hijos: [
        { label: "Noticias", href: `${base}/publicaciones/noticias` },
        { label: "Eventos", href: `${base}/publicaciones/eventos` },
        { label: "Avisos", href: `${base}/publicaciones/avisos` },
      ],
    },
    { tipo: "link", label: "Contacto", href: `${base}/contacto`, icon: Mail },
  ];
}

// Un link sin hash está activo si la ruta coincide exactamente. Los
// links con hash (#) son anclas secundarias: no se resaltan, para que
// solo una entrada por sección quede marcada.
function linkActivo(href: string, pathname: string): boolean {
  return !href.includes("#") && pathname === href;
}

// ---------- Grupo expandible ----------

function Grupo({
  item,
  pathname,
  color,
  onNavegar,
}: {
  item: Extract<Item, { tipo: "grupo" }>;
  pathname: string;
  color: string;
  onNavegar: () => void;
}) {
  const activo = pathname.startsWith(item.prefijo);
  // El grupo de la sección actual abre por defecto.
  const [abierto, setAbierto] = useState(activo);
  const Icono = item.icon;

  return (
    <li>
      <button
        type="button"
        onClick={() => setAbierto((o) => !o)}
        aria-expanded={abierto}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-marron-suave transition-colors hover:bg-arena/40 hover:text-marron"
      >
        <Icono
          size={18}
          className="shrink-0"
          style={activo ? { color } : undefined}
        />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-marron-suave/70 transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto && (
        <ul className="mt-1 space-y-0.5 border-l border-arena pl-3 ml-5">
          {item.hijos.map((h) => {
            const act = linkActivo(h.href, pathname);
            return (
              <li key={h.href}>
                <Link
                  href={h.href}
                  onClick={onNavegar}
                  className="block rounded-md px-3 py-2 text-sm text-marron-suave transition-colors hover:bg-arena/40 hover:text-marron"
                  style={
                    act
                      ? { backgroundColor: `${color}1A`, color }
                      : undefined
                  }
                >
                  {h.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

// ---------- Sidebar ----------

export default function SidebarJardin({
  nombreJardin,
  slug,
  colorPrimario,
}: Props) {
  const pathname = usePathname();
  const [drawerAbierto, setDrawerAbierto] = useState(false);

  const base = `/pastoral-educativa/${slug}`;
  const menu = construirMenu(base);
  const cerrarDrawer = () => setDrawerAbierto(false);

  // Contenido del menú, reutilizado en el aside de escritorio y en el
  // drawer móvil.
  const navegacion = (
    <div className="flex h-full flex-col">
      {/* Cabecera: nombre del jardín en su color primario */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-marron-suave/70">
          Jardín de niños
        </p>
        <h2
          className="font-titulo mt-1 text-xl font-bold leading-tight"
          style={{ color: colorPrimario }}
        >
          {nombreJardin}
        </h2>
      </div>

      {/* Regreso a la congregación */}
      <div className="px-3">
        <Link
          href="/pastoral-educativa"
          onClick={cerrarDrawer}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-marron-suave transition-colors hover:text-terracota"
        >
          <ArrowLeft size={16} className="shrink-0" />
          Regresar a Congregación
        </Link>
      </div>

      <div className="mx-5 my-3 border-t border-arena" />

      {/* Navegación principal */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-1">
          {menu.map((item) => {
            if (item.tipo === "grupo") {
              return (
                <Grupo
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  color={colorPrimario}
                  onNavegar={cerrarDrawer}
                />
              );
            }
            const act = linkActivo(item.href, pathname);
            const Icono = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={cerrarDrawer}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-marron-suave transition-colors hover:bg-arena/40 hover:text-marron"
                  style={
                    act
                      ? { backgroundColor: `${colorPrimario}1A`, color: colorPrimario }
                      : undefined
                  }
                >
                  <Icono
                    size={18}
                    className="shrink-0"
                    style={act ? { color: colorPrimario } : undefined}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* BARRA MÓVIL · botón hamburguesa (sticky bajo el navbar global) */}
      <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-arena bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerAbierto(true)}
          aria-label="Abrir menú del jardín"
          className="rounded-lg p-2 text-marron transition-colors hover:bg-arena/40"
        >
          <Menu size={22} />
        </button>
        <span className="font-titulo font-bold" style={{ color: colorPrimario }}>
          {nombreJardin}
        </span>
      </div>

      {/* DRAWER MÓVIL · overlay + panel deslizable desde la izquierda */}
      {drawerAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-marron/50"
            onClick={cerrarDrawer}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white shadow-xl">
            <button
              type="button"
              onClick={cerrarDrawer}
              aria-label="Cerrar menú"
              className="absolute right-3 top-4 rounded-lg p-2 text-marron-suave transition-colors hover:bg-arena/40"
            >
              <X size={20} />
            </button>
            {navegacion}
          </div>
        </div>
      )}

      {/* SIDEBAR ESCRITORIO · fijo a la izquierda */}
      <aside className="hidden w-64 shrink-0 border-r border-arena bg-white lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        {navegacion}
      </aside>
    </>
  );
}
