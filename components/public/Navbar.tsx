// RUTA: components/public/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { href: "/", label: "Inicio" },
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
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-azul-institucional text-white"
                    : "text-white/90 hover:bg-azul-institucional hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
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
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block border-b border-white/5 px-6 py-3 text-sm transition-colors ${
                  pathname === href
                    ? "font-semibold text-dorado"
                    : "text-arena hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
