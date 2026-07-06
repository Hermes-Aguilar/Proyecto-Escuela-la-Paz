// RUTA: components/public/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
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

  // Con el menú móvil abierto se bloquea el scroll del fondo; se cierra con
  // Esc (o al elegir un enlace / pulsar la ✕, que ponen open en false).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
          {/* Cabecera mobile-first. En móvil y tablet se APILA (flex-col,
              centrada) para no apretar el nombre largo del Instituto ni las
              imágenes. Desde lg vuelve a 3 columnas en fila: las laterales con
              el mismo ancho (lg:w-80) para que el centro (flex-1) quede
              matemáticamente centrado. */}
          <div className="relative flex flex-col items-center gap-3 py-3 lg:flex-row lg:items-stretch lg:justify-between lg:gap-4 lg:py-2">
            {/* IZQUIERDA · Escudo con halo. En lg, ancho = columna derecha. */}
            <div className="flex shrink-0 items-center justify-center lg:w-80 lg:justify-start">
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
                      "radial-gradient(circle, rgba(193,154,58,0.40) 0%, rgba(255,255,255,0.55) 38%, transparent 70%)",
                  }}
                />
                {/* La máscara radial difumina el fondo oscuro del PNG. */}
                <Image
                  src="/images/escudo.png"
                  alt="Escudo del Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                  width={1024}
                  height={1536}
                  priority
                  className="h-20 w-auto object-contain sm:h-24 lg:h-36"
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
              <p className="mt-1 font-script text-lg leading-tight text-dorado-oscuro sm:text-2xl lg:text-3xl">
                Alegrémonos de sufrir por Cristo en favor de su Iglesia
              </p>
              {/* Línea decorativa bajo el lema (dorado al 40%). Ancho responsivo
                  con max-w-full para no desbordar el centro en móvil. */}
              <div className="mx-auto mt-2 w-56 max-w-full border-t border-dorado/40 sm:w-64 lg:w-80" />
            </div>

            {/* DERECHA · Cristo (interior) + María (esquina). En móvil/tablet
                se apilan centradas bajo el texto; en lg pasan a columna de la
                derecha (ancho = columna izquierda). Tamaños responsivos. */}
            <div className="flex shrink-0 items-center justify-center gap-2 lg:w-80 lg:justify-end lg:gap-3">
              {/* Cristo · más cerca del centro. Máscara radial para fundirlo. */}
              <Image
                src="/images/cris.jpeg"
                alt="Señor de los Corazones (Cristo crucificado)"
                width={1492}
                height={1054}
                className="h-20 w-auto object-contain sm:h-24 lg:h-28"
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
                className="h-24 w-auto object-contain drop-shadow-sm sm:h-28 lg:h-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BARRA DE NAVEGACIÓN — fondo azul institucional. El dorado se
          usa como acento (link activo); el hover aclara con blanco.
          ============================================================ */}
      <div className="bg-azul-institucional shadow-sm">
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
                        ? "bg-dorado text-marron"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
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
                        ? "bg-dorado text-marron"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
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

        {/* Mobile menu — panel a pantalla completa con scroll propio, para
            que el fondo no se mueva mientras está abierto. */}
        {open && (
          <div className="fixed inset-0 z-50 flex flex-col bg-azul-institucional lg:hidden">
            {/* Barra superior (misma altura que la de navegación) con cerrar. */}
            <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
              <span className="font-titulo text-sm font-semibold text-arena">
                Navegación
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 text-white"
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* Lista de enlaces, desplazable dentro del panel. */}
            <nav className="flex-1 overflow-y-auto overscroll-contain border-t border-white/10 pb-8">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
