// ============================================================
// .../[jardin]/nosotros/historia/page.tsx
// CU-02 · Sección "Historia" del jardín. SERVER COMPONENT estático.
// El texto íntegro se lee de lib/data/jardines-contenido (sin resumir);
// los listados de hermanas (líneas "- ") se renderizan como lista.
// Al final, una ficha con los datos institucionales del jardín.
// Si la historia aún no está cargada → "Información próximamente".
// ============================================================
import { notFound } from "next/navigation";
import { History } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";

// Nombre histórico de cada jardín (dato puntual, no vive en el .md de
// contenido). Tepeyac → La Paz, Nazareth → Porvenir.
const NOMBRE_ANTERIOR: Record<string, string> = {
  "la-paz": "Tepeyac",
  porvenir: "Nazareth",
};

// Convierte el texto íntegro (párrafos separados por `\n\n`, con
// posibles líneas "- " de listado) en bloques renderizables.
function bloquesHistoria(texto: string) {
  return texto.split("\n\n").map((bloque) => {
    const lineas = bloque.split("\n");
    const intro = lineas.filter((l) => !l.startsWith("- ")).join(" ").trim();
    const items = lineas
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2).trim());
    return { intro, items };
  });
}

export default async function Historia({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const contenido = jardinesContenido[slug] ?? jardinesContenido["la-paz"]!;
  const nombreAnterior = NOMBRE_ANTERIOR[slug];

  return (
    <div className="font-texto mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Nosotros
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Historia
      </h1>

      {/* Origen: nombre histórico del jardín */}
      {nombreAnterior && (
        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-arena bg-white px-4 py-2 text-sm font-medium text-marron-suave shadow-sm"
          style={{
            borderColor: "color-mix(in srgb, var(--jardin-primario) 40%, white)",
          }}
        >
          <History size={16} style={{ color: "var(--jardin-primario)" }} />
          Antes conocido como Jardín de Niños «{nombreAnterior}»
        </div>
      )}

      {contenido.historia ? (
        <>
          <div className="mt-8 space-y-7 text-base leading-relaxed text-marron-suave">
            {bloquesHistoria(contenido.historia).map((b, i) => (
              <div key={i} className="space-y-3">
                {b.intro && <p className="text-justify">{b.intro}</p>}
                {b.items.length > 0 && (
                  <ul className="space-y-1.5 pl-1">
                    {b.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--jardin-primario)" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Ficha de datos del jardín */}
          {contenido.contacto && (
            <div
              className="mt-10 rounded-2xl p-7 md:p-9"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--jardin-primario) 10%, white)",
              }}
            >
              <h2 className="font-titulo text-xl font-bold text-marron">
                Datos del jardín
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  { t: "Clave", v: contenido.contacto.clave },
                  { t: "Turno", v: contenido.contacto.turno },
                  { t: "Incorporación", v: contenido.contacto.incorporacion },
                  { t: "Número de acuerdo", v: contenido.contacto.numeroAcuerdo },
                  { t: "Correo", v: contenido.contacto.email },
                ].map(({ t, v }) => (
                  <div key={t}>
                    <dt
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "var(--jardin-primario)" }}
                    >
                      {t}
                    </dt>
                    <dd className="mt-1 break-words text-marron">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </>
      ) : (
        <p className="mt-8 text-base leading-relaxed text-marron-suave">
          Información próximamente.
        </p>
      )}
    </div>
  );
}
