// RUTA: components/public/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

type SubLink = { href: string; label: string };
type NavLink = { href: string; label: string; submenu?: SubLink[] };

const links: NavLink[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/la-congregacion",
    label: "La Congregación",
    submenu: [
      { href: "/la-congregacion/fundador", label: "El Fundador" },
      { href: "/la-congregacion/historia", label: "Nuestra Historia" },
      { href: "/la-congregacion/superioras", label: "Superioras Generales" },
      { href: "/la-congregacion/primeras-hermanas", label: "Primeras Hermanas" },
      { href: "/la-congregacion/escudo", label: "Nuestro Escudo" },
    ],
  },
  { href: "/pastoral-vocacional", label: "Pastoral Vocacional" },
  { href: "/pastoral-educativa", label: "Pastoral Educativa" },
  { href: "/pastoral-misionera", label: "Pastoral Misionera" },
  { href: "/pastoral-juvenil", label: "Comunidades" },
  { href: "/librerias", label: "Librerías" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Un enlace está activo si coincide exactamente o si es una sección con
  // subrutas (p. ej. /la-congregacion/fundador resalta «La Congregación»).
  const esActivo = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="relative z-50">
      {/* ============================================================
          HEADER SUPERIOR — fondo crema, identidad de la congregación:
          escudo (izq) · nombre + lema (centro) · imágenes religiosas (der).
          ============================================================ */}
      <div className="bg-crema border-b border-arena">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Cabecera en 3 columnas. Las columnas izquierda y derecha tienen
              EXACTAMENTE el mismo ancho (w-28 → w-56 → w-80) para que la
              columna central (flex-1) quede matemáticamente centrada. */}
          <div className="relative flex items-stretch justify-between gap-3 py-2 sm:gap-4">
            {/* IZQUIERDA · Escudo con halo. Ancho fijo = columna derecha. */}
            <div className="flex w-28 shrink-0 items-center justify-start sm:w-44 md:w-56 lg:w-80">
              <Link
                href="/"
                aria-label="Inicio"
                className="relative flex items-center"
              >
                {/* Halo/brillo suave detrás del escudo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,162,39,0.40) 0%, rgba(255,255,255,0.55) 38%, transparent 70%)",
                  }}
                />
                {/* La máscara radial difumina el fondo oscuro del PNG. */}
                <Image
                  src="/images/escudo.png"
                  alt="Escudo del Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                  width={1024}
                  height={1536}
                  priority
                  className="h-28 w-auto object-contain sm:h-32 lg:h-36"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 68% 68% at 50% 47%, #000 62%, transparent 80%)",
                    maskImage:
                      "radial-gradient(ellipse 68% 68% at 50% 47%, #000 62%, transparent 80%)",
                  }}
                />
              </Link>
            </div>

            {/* CENTRO · Nombre + lema + línea, centrado horizontal y vertical. */}
            <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-1 text-center">
              <h1 className="font-titulo text-base font-bold leading-tight text-marron sm:text-xl lg:text-2xl">
                Instituto de Misioneras del
                <br />
                Señor de los Corazones
                <br />
                y de Santa María de Guadalupe
              </h1>
              <p className="mt-1 font-script text-xl leading-none text-terracota sm:text-2xl lg:text-3xl">
                Alegrémonos de sufrir por Cristo en favor de su Iglesia
              </p>
              {/* Línea decorativa bajo el lema (dorado al 40%, ancho moderado) */}
              <div className="mx-auto mt-2 w-64 border-t border-dorado/40 lg:w-80" />
            </div>

            {/* DERECHA · Cristo (interior) + María (esquina). Ancho fijo =
                columna izquierda. Ocultas en móvil para no saturar. */}
            <div className="hidden w-28 shrink-0 items-center justify-end gap-2 sm:w-44 md:flex md:w-56 lg:w-80 lg:gap-3">
              {/* Cristo · más cerca del centro. Máscara radial para fundirlo. */}
              <Image
                src="/images/cristo.png"
                alt="Señor de los Corazones (Cristo crucificado)"
                width={1492}
                height={1054}
                className="h-20 w-auto object-contain md:h-24 lg:h-28"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 64% 64% at 50% 50%, #000 60%, transparent 78%)",
                  maskImage:
                    "radial-gradient(ellipse 64% 64% at 50% 50%, #000 60%, transparent 78%)",
                }}
              />
              {/* María · esquina externa derecha. */}
              <Image
                src="/images/12.png"
                alt="Santa María de Guadalupe"
                width={1153}
                height={1364}
                className="h-24 w-auto object-contain drop-shadow-sm md:h-28 lg:h-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BARRA DE NAVEGACIÓN — fondo marrón institucional. El azul
          institucional se usa SOLO como acento (link activo y hover).
          ============================================================ */}
      <div className="bg-marron shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:justify-center">
          {/* Etiqueta solo visible en móvil (la navegación va en el drawer) */}
          <span className="font-titulo text-sm font-semibold text-arena lg:hidden">
            Navegación
          </span>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const activo = esActivo(link.href);

              // Enlace simple (sin submenú).
              if (!link.submenu) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activo
                        ? "bg-azul-institucional text-white"
                        : "text-white/90 hover:bg-azul-institucional hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              // Enlace con submenú desplegable al hover (y focus-within para
              // teclado). El click directo navega a la página principal.
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activo
                        ? "bg-azul-institucional text-white"
                        : "text-white/90 hover:bg-azul-institucional hover:text-white"
                    }`}
                  >
                    {link.label}
                    <FaChevronDown
                      size={10}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  </Link>

                  {/* Panel del submenú: oculto por defecto, aparece en
                      group-hover/focus-within con fade + slide. */}
                  <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="overflow-hidden rounded-xl border border-arena bg-white py-1 shadow-xl">
                      {link.submenu.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              pathname === sub.href
                                ? "bg-azul-institucional/10 font-semibold text-azul-institucional"
                                : "text-marron hover:bg-crema hover:text-azul-institucional"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            aria-expanded={open}
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-white/10 bg-marron lg:hidden">
            {links.map((link) => {
              const activo = esActivo(link.href);
              return (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/5 px-6 py-3 text-sm transition-colors ${
                      activo
                        ? "font-semibold text-dorado"
                        : "text-arena hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {/* Subenlaces indentados bajo la sección con submenú. */}
                  {link.submenu && (
                    <div className="bg-black/15">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className={`block border-b border-white/5 py-2.5 pl-10 pr-6 text-sm transition-colors ${
                            pathname === sub.href
                              ? "font-semibold text-dorado"
                              : "text-arena/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
