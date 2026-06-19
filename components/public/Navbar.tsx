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
    <header className="sticky top-0 z-50">
      {/* ============================================================
          HEADER SUPERIOR — fondo crema, identidad de la congregación:
          escudo (izq) · nombre + lema (centro) · imágenes religiosas (der).
          ============================================================ */}
      <div className="bg-crema border-b border-arena">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          {/* 3 columnas: izquierda y derecha con ANCHO FIJO IGUAL (w-24/w-32)
              para que la columna central quede matemáticamente centrada. */}
          <div className="flex items-stretch justify-between gap-2 sm:gap-4">
            {/* IZQUIERDA · Escudo (ancho fijo) */}
            <div className="flex w-24 shrink-0 items-center justify-center sm:w-32">
              <Link
                href="/"
                aria-label="Inicio"
                className="relative isolate inline-flex"
              >
                {/* Halo/brillo suave detrás del escudo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(201,162,39,0.40) 45%, transparent 72%)",
                  }}
                />
                <Image
                  src="/images/escudo.png"
                  alt="Escudo del Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                  width={1024}
                  height={1536}
                  priority
                  className="h-28 w-24 object-contain"
                />
              </Link>
            </div>

            {/* CENTRO · Nombre + lema (centrado horizontal y verticalmente) */}
            <div className="flex min-w-0 flex-1 flex-col items-center justify-center text-center">
              <p className="font-titulo text-sm font-bold leading-tight text-azul-institucional sm:text-base lg:text-lg">
                Instituto de Misioneras del Señor de los Corazones
                <br className="hidden sm:block" /> y de Santa María de Guadalupe
              </p>
              <p className="mt-1 font-titulo text-xs italic text-dorado sm:text-sm">
                «Alegrémonos de sufrir por Cristo en favor de su Iglesia»
              </p>
              {/* Línea decorativa bajo el lema */}
              <div className="mt-2 w-64 border-t border-dorado/40 sm:w-80" />
            </div>

            {/* DERECHA · Dos imágenes religiosas (ancho fijo IGUAL a la izquierda).
                Orden: Cristo (cerca del centro) · María (esquina externa). */}
            <div className="flex w-24 shrink-0 items-end justify-end sm:w-32">
              <div className="hidden items-end md:flex">
                <Image
                  src="/images/cristo.png"
                  alt="Señor de los Corazones (Cristo crucificado)"
                  width={1492}
                  height={1054}
                  className="h-25 w-auto rounded-lg object-contain drop-shadow-sm lg:h-30"
                />
                <Image
                  src="/images/maria.png"
                  alt="Santa María de Guadalupe"
                  width={1153}
                  height={1364}
                  className="-ml-3 h-25 w-auto rounded-lg object-contain drop-shadow-sm lg:h-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BARRA DE NAVEGACIÓN — fondo oscuro (marrón institucional).
          ============================================================ */}
      <div className="bg-marron shadow-md">
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
          <div className="border-t border-white/10 bg-azul-oscuro lg:hidden">
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
