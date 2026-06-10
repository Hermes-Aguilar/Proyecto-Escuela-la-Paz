import { Nunito } from "next/font/google";

// En las páginas de cada jardín los títulos usan Nunito (más redonda
// y cercana, acorde a un jardín de niños) en lugar de Fraunces.
// Reutilizamos la MISMA variable --font-titulo: al redefinirla en este
// subárbol, todos los <h*> y la clase font-titulo heredan Nunito aquí,
// sin tocar el resto del portal.
const nunito = Nunito({
  variable: "--font-titulo",
  subsets: ["latin"],
  display: "swap",
});

export default function JardinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={nunito.variable}>{children}</div>;
}
