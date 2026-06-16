// ============================================================
// components/public/ChromePublico.tsx
// Navbar y Footer del portal, pero OCULTOS dentro del micro-sitio de
// un jardín (/pastoral-educativa/<slug>/...). Allí la navegación la
// da el sidebar propio del jardín, de modo que el espacio sea solo
// información de ESE jardín, sin el menú principal de la congregación.
//
// CLIENT COMPONENT: decide con usePathname. usePathname también
// resuelve en SSR, así que no hay parpadeo.
// ============================================================
"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";
import Footer from "./Footer";

// Ruta DENTRO de un jardín concreto: /pastoral-educativa/<algo>[/...].
// NO incluye /pastoral-educativa exacto (esa sí lleva el menú global).
function esRutaJardin(pathname: string): boolean {
  return /^\/pastoral-educativa\/[^/]+/.test(pathname);
}

export function NavbarPublico() {
  const pathname = usePathname();
  if (esRutaJardin(pathname)) return null;
  return <Navbar />;
}

export function FooterPublico() {
  const pathname = usePathname();
  if (esRutaJardin(pathname)) return null;
  return <Footer />;
}
