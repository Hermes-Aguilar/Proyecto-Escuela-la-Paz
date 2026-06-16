// RUTA: app/(public)/layout.tsx
import { NavbarPublico, FooterPublico } from "@/components/public/ChromePublico";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar y Footer se ocultan dentro del micro-sitio de un jardín:
          ahí la navegación la da el sidebar propio del jardín. */}
      <NavbarPublico />
      <main className="min-h-screen">{children}</main>
      <FooterPublico />
    </>
  );
}
