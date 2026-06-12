// RUTA: src/components/public/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaBook } from "react-icons/fa";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/pastoral-vocacional", label: "Pastoral Vocacional" },
  { href: "/pastoral-educativa", label: "Pastoral Educativa" },
  { href: "/pastoral-misionera", label: "Pastoral Misionera" },
  { href: "/pastoral-juvenil", label: "Pastoral Juvenil" },
  { href: "/librerias", label: "Librerías" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#3B2314] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-[#C25B35] text-white rounded-full p-2 group-hover:bg-[#8E9A3C] transition-colors">
            <FaBook size={18} />
          </span>
          <span className="text-white font-bold text-lg tracking-wide leading-tight">
            Fraternidad<br />
            <span className="text-[#C25B35] text-sm font-normal group-hover:text-[#8E9A3C] transition-colors">
              Franciscana
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
                  ? "bg-[#C25B35] text-white"
                  : "text-[#E4D7BC] hover:bg-white/10 hover:text-white"
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
        <div className="lg:hidden bg-[#2A1A0E] border-t border-white/10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm border-b border-white/5 transition-colors ${
                pathname === href
                  ? "text-[#C25B35] font-semibold"
                  : "text-[#E4D7BC] hover:text-white hover:bg-white/5"
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