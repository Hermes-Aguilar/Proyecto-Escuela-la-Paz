// ============================================================
// .../[jardin]/nosotros/equipo/page.tsx
// CU-02 · Sección "Nuestro equipo" del jardín. SERVER COMPONENT
// estático: grid de maestras con avatar de iniciales en el color del
// jardín. Los datos son de muestra (placeholder) hasta contar con la
// información real de cada escuela.
// ============================================================
import { Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJardinBySlug } from "@/lib/dal/jardines";

interface Maestra {
  nombre: string;
  rol: string;
}

const EQUIPO: Maestra[] = [
  { nombre: "Hna. María Guadalupe", rol: "Directora" },
  { nombre: "Mtra. Ana Sofía Ramírez", rol: "Maternal" },
  { nombre: "Mtra. Lucía Hernández", rol: "Preescolar 1" },
  { nombre: "Mtra. Daniela Torres", rol: "Preescolar 2" },
  { nombre: "Mtra. Paola Jiménez", rol: "Preescolar 3" },
  { nombre: "Mtra. Carmen Vargas", rol: "Educación ambiental" },
];

// Iniciales a partir del nombre (omite títulos y abreviaturas con punto).
function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter((p) => !p.endsWith("."))
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function Equipo({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  return (
    <div className="font-texto mx-auto max-w-4xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Nosotros
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Nuestro equipo
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-marron-suave">
        Un grupo de maestras y religiosas que acompañan con vocación y cariño el
        crecimiento de cada niña y niño de {jardin.nombre}.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EQUIPO.map((m) => (
          <div
            key={m.nombre}
            className="flex flex-col items-center rounded-2xl border border-arena bg-white p-7 text-center shadow-sm"
          >
            <span
              className="font-titulo flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                backgroundColor: `${jardin.colorPrimario}1A`,
                color: jardin.colorPrimario,
              }}
            >
              {iniciales(m.nombre)}
            </span>
            <h2 className="font-titulo mt-4 text-lg font-bold text-marron">
              {m.nombre}
            </h2>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: "var(--jardin-primario)" }}
            >
              {m.rol}
            </p>
          </div>
        ))}
      </div>

      {/* Nota */}
      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-arena bg-white px-6 py-8 text-center">
        <p className="text-marron-suave">
          ¿Quieres saber más sobre nuestro equipo?{" "}
          <span className="font-semibold text-marron">Contáctanos.</span>
        </p>
        <Link
          href={`/pastoral-educativa/${jardin.slug}/contacto`}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-95"
          style={{ backgroundColor: "var(--jardin-primario)" }}
        >
          <Mail size={16} /> Ir a contacto
        </Link>
      </div>
    </div>
  );
}
