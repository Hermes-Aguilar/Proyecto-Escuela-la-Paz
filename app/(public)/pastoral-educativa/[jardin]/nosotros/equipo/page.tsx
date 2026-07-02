// ============================================================
// .../[jardin]/nosotros/equipo/page.tsx
// CU-02 · Sección "Nuestro equipo" del jardín. SERVER COMPONENT
// estático: grid de maestras con avatar de iniciales en el color del
// jardín. El equipo se lee de lib/data/jardines-contenido (no se
// hardcodea). Los puestos sin nombre conocido se muestran solo con su
// rol (avatar con ícono genérico). Si el jardín no tiene equipo
// documentado → "Información próximamente".
// ============================================================
import { Mail, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";
import { EncabezadoApartado } from "@/components/public/EncabezadoApartado";

const PROXIMAMENTE = "Información próximamente.";

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

  const contenido = jardinesContenido[slug] ?? jardinesContenido["la-paz"]!;
  const equipo = contenido.equipo;

  return (
    <div className="font-texto">
      <EncabezadoApartado eyebrow="Nosotros" titulo="Nuestro equipo" />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
      <p className="max-w-2xl text-base leading-relaxed text-marron-suave">
        Un grupo de maestras y religiosas que acompañan con vocación y cariño el
        crecimiento de cada niña y niño de {jardin.nombre}.
      </p>

      {equipo.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((m, i) => (
            <div
              key={m.nombre ?? `${m.rol}-${i}`}
              className="flex flex-col items-center rounded-2xl border border-arena bg-white p-7 text-center shadow-sm"
            >
              <span
                className="font-titulo flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
                style={{
                  backgroundColor: `${jardin.colorPrimario}1A`,
                  color: jardin.colorPrimario,
                }}
              >
                {m.nombre ? iniciales(m.nombre) : <User size={32} />}
              </span>
              {m.nombre ? (
                <>
                  <h2 className="font-titulo mt-4 text-lg font-bold text-marron">
                    {m.nombre}
                  </h2>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{ color: "var(--jardin-primario)" }}
                  >
                    {m.rol}
                  </p>
                </>
              ) : (
                <h2 className="font-titulo mt-4 text-lg font-bold text-marron">
                  {m.rol}
                </h2>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-base text-marron-suave">{PROXIMAMENTE}</p>
      )}

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
      </section>
    </div>
  );
}
