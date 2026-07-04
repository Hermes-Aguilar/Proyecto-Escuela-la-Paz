import type { Metadata } from "next";
import { Fraunces, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

// Títulos del portal: Fraunces (serif con carácter).
// En las páginas de los jardines se sobreescribe --font-titulo con
// Nunito (ver app/(public)/pastoral-educativa/[jardin]/layout.tsx).
const fraunces = Fraunces({
  variable: "--font-titulo",
  subsets: ["latin"],
  display: "swap",
});

// Texto del cuerpo: Inter (sans legible).
const inter = Inter({
  variable: "--font-texto",
  subsets: ["latin"],
  display: "swap",
});

// Lema/caligrafía: Great Vibes (script formal, estilo invitación).
// Genera la utilidad font-script (ver globals.css).
const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pastoral Educativa",
  description:
    "Portal de la congregación — Jardines de niños La Paz y Porvenir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${greatVibes.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}