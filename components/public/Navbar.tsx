"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Inicio", "/"],
    ["P. Vocacional", "/pastoral-vocacional"],
    ["P. Educativa", "/pastoral-educativa"],
    ["P. Misionera", "/pastoral-misionera"],
    ["P. Juvenil", "/pastoral-juvenil"],
    ["Librerías", "/librerias"],
    ["Contacto", "/contacto"],
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E4D7BC]/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-24 flex items-center justify-between">
          
          {/* Logo con tus colores franciscanos nativos */}
          <Link href="/" className="flex flex-col tracking-wide">
            <span className="font-titulo text-xl md:text-2xl font-light text-[#C25B35]">
              Congregación
            </span>
            <span className="text-xs uppercase tracking-widest text-[#8E9A3C] -mt-1">
              Religiosa
            </span>
          </Link>

          {/* Enlaces de navegación limpios */}
          <nav className="hidden lg:flex gap-8">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Botón de Menú Móvil en color Terracota */}
          <button
            className="lg:hidden text-[#C25B35]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E4D7BC]/30">
          <div className="p-6 flex flex-col gap-4">
            {links.map(([label, href]) => (
              <Link 
                key={href} 
                href={href}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}