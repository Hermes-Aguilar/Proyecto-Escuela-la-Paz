// RUTA: src/components/public/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

// Símbolo institucional simplificado inspirado en el escudo:
// una cruz dentro de un óvalo. No replica el escudo completo.
function LogoInstituto() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden focusable="false">
      <ellipse
        cx="12"
        cy="12"
        rx="7"
        ry="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 5.5V18.5M8.5 10H15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
    <header className="sticky top-0 z-50 bg-marron shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="bg-azul-institucional text-white rounded-full p-2 group-hover:bg-azul-oscuro transition-colors">
            <LogoInstituto />
          </span>
          <span className="text-white font-bold text-base tracking-wide leading-tight">
            Misioneras del Señor<br />
            <span className="text-dorado text-sm font-normal transition-colors">
              de los Corazones
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 text-sm rounded-md transition-colors font-medium ${
                pathname === href
                  ? "bg-azul-institucional text-white"
                  : "text-arena hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-azul-oscuro border-t border-white/10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm border-b border-white/5 transition-colors ${
                pathname === href
                  ? "text-dorado font-semibold"
                  : "text-arena hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}