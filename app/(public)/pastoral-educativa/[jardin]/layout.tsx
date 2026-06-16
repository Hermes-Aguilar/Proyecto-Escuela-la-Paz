// ============================================================
// app/(public)/pastoral-educativa/[jardin]/layout.tsx
// Layout del micro-sitio de cada jardín (CU-02). SERVER COMPONENT.
//
// Lee el slug de params, carga el jardín con getJardinBySlug (lectura
// pública, sin sesión) y, si no existe, muestra 404. Inyecta los
// colores del jardín leídos de la BD como CSS vars
// (--jardin-primario / --jardin-secundario) en el contenedor, de modo
// que las páginas hijas tematizan sin hardcodear el color de ninguna
// escuela.
//
// En las páginas de jardín los títulos usan Nunito (más redonda, acorde
// a un jardín de niños): redefinimos --font-titulo SOLO en este subárbol,
// así font-titulo y los <h*> heredan Nunito sin tocar el resto del portal.
// ============================================================
import { notFound } from "next/navigation";
import { Nunito } from "next/font/google";

import { getJardinBySlug } from "@/lib/dal/jardines";
import SidebarJardin from "@/components/public/SidebarJardin";

const nunito = Nunito({
  variable: "--font-titulo",
  subsets: ["latin"],
  display: "swap",
});

export default async function JardinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  return (
    <div
      className={`${nunito.variable} font-texto bg-crema`}
      style={
        {
          "--jardin-primario": jardin.colorPrimario,
          "--jardin-secundario": jardin.colorSecundario,
        } as React.CSSProperties
      }
    >
      {/* El sidebar es fixed en escritorio (ocupa 16rem a la izquierda);
          el contenido se desplaza con lg:pl-64 para no quedar debajo. */}
      <SidebarJardin
        nombreJardin={jardin.nombre}
        slug={jardin.slug}
        colorPrimario={jardin.colorPrimario}
      />
      <div className="min-h-screen lg:pl-64">{children}</div>
    </div>
  );
}
