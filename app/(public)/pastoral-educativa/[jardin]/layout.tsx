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
import MenuJardin from "@/components/public/MenuJardin";

const nunito = Nunito({
  variable: "--font-titulo",
  subsets: ["latin"],
  display: "swap",
});

// Tercer tono (acento) de la paleta de cada jardín. La BD solo guarda
// primario/secundario; el acento complementa el color base para dar más
// riqueza visual (degradado del hero, detalles) sin que todo sea del
// mismo tono. Fallback al secundario si el slug no está mapeado.
const ACENTOS: Record<string, string> = {
  "la-paz": "#E8907A", // coral suave que contrasta con el teal
  porvenir: "#5B8FA8", // azul suave que complementa el amarillo
};

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

  const colorAcento = ACENTOS[jardin.slug] ?? jardin.colorSecundario;

  return (
    <div
      className={`${nunito.variable} font-texto`}
      style={
        {
          "--jardin-primario": jardin.colorPrimario,
          "--jardin-secundario": jardin.colorSecundario,
          "--jardin-acento": colorAcento,
          // El portal adoptó la identidad "litúrgico sobrio" (azul + oro).
          // Aquí restauramos los valores ANTIGUOS de los neutros
          // institucionales SOLO en el subárbol del jardín, para que sus
          // rutas se vean IDÉNTICAS a antes (su tema por escuela vive en
          // --jardin-primario/secundario y no se toca).
          "--foreground": "#171717",
          "--color-crema": "#faf6f0",
          "--color-arena": "#e3d8cc",
          "--color-marron": "#3f2d23",
          "--color-marron-suave": "#6b5b4f",
          "--color-azul-institucional": "#2c5f7c",
          "--color-azul-oscuro": "#234c61",
          "--color-dorado": "#c9a227",
          "--color-dorado-oscuro": "#a8841c",
          "--color-error": "#b00020",
        } as React.CSSProperties
      }
    >
      {/* Fondo crema base, FIJO detrás de todo (-z-20). Va por detrás del
          hero con fondo fijo del inicio (-z-10), así no lo tapa pero sigue
          dando el fondo crema a todas las páginas del jardín. */}
      <div className="fixed inset-0 -z-20 bg-crema" aria-hidden="true" />

      {/* Menú superior horizontal (sticky); el contenido fluye debajo a
          ancho completo. */}
      <MenuJardin
        nombreJardin={jardin.nombre}
        slug={jardin.slug}
        colorPrimario={jardin.colorPrimario}
        logoUrl={jardin.logoUrl}
      />
      <div className="min-h-screen">{children}</div>
    </div>
  );
}
