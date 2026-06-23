// ============================================================
// .../[jardin]/contacto/page.tsx
// CU-04 · Contacto del jardín. SERVER COMPONENT estático: muestra el
// logo, los datos de contacto (teléfono, celular, correo), las redes,
// el horario de atención y la ubicación en Google Maps.
//
// Los datos de contacto y la dirección se leen de
// lib/data/jardines-contenido (fuente: docs/jardin-<slug>.md). No
// incluye formulario de mensajes: el envío no está contemplado en la BD.
// ============================================================
import { notFound } from "next/navigation";
import { MapPin, Phone, Smartphone, Mail, Clock } from "lucide-react";

import { getJardinBySlug } from "@/lib/dal/jardines";
import { jardinesContenido } from "@/lib/data/jardines-contenido";

// Redes con ícono de marca (SVG inline) y su color oficial, con
// animación al pasar el cursor. Solo Facebook y YouTube.
const REDES = [
  {
    nombre: "Facebook",
    color: "#1877F2",
    href: "https://facebook.com",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    nombre: "YouTube",
    color: "#FF0000",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default async function ContactoJardin({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  // Datos institucionales del jardín (teléfono, celular, correo,
  // dirección, clave, turno…). Fuente: docs/jardin-<slug>.md.
  // Pueden estar pendientes (null) para algún jardín.
  const datosJardin = jardinesContenido[slug]?.contacto ?? null;

  const mapsUrl = datosJardin?.direccion
    ? "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(datosJardin.direccion)
    : null;

  // Datos de contacto directos (teléfono, celular, correo).
  const datos = datosJardin
    ? ([
        {
          icon: Phone,
          valor: datosJardin.telefono,
          href: `tel:${datosJardin.telefono.replace(/\s/g, "")}`,
        },
        {
          icon: Smartphone,
          valor: datosJardin.celular,
          href: `tel:${datosJardin.celular.replace(/\s/g, "")}`,
        },
        {
          icon: Mail,
          valor: datosJardin.email,
          href: `mailto:${datosJardin.email}`,
        },
      ] as { icon: typeof Phone; valor: string; href: string }[])
    : [];

  return (
    <div className="font-texto mx-auto max-w-5xl px-6 py-12 md:py-16">
      {/* Encabezado */}
      <div className="flex flex-col items-center text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--jardin-primario)" }}
        >
          Contacto
        </p>
        <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
          Escríbenos
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-marron-suave">
          ¿Tienes preguntas sobre inscripciones, niveles o nuestras actividades?
          Con gusto te atendemos en {jardin.nombre}.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* COLUMNA 1 — Datos de contacto + datos del jardín */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm md:p-7">
            <h2 className="font-titulo text-xl font-bold text-marron">
              Datos de contacto
            </h2>

            {datos.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {datos.map(({ icon: Icono, valor, href }) => (
                  <li key={valor} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                        color: "var(--jardin-primario)",
                      }}
                    >
                      <Icono size={18} />
                    </span>
                    <a
                      href={href}
                      className="pt-2 text-marron-suave transition-colors hover:text-marron"
                    >
                      {valor}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-marron-suave">
                Pronto publicaremos nuestros datos de contacto.
              </p>
            )}
          </div>

          {/* Datos institucionales del jardín (clave, turno, incorporación,
              número de acuerdo y correo). Solo si están cargados. */}
          {datosJardin && (
            <div
              className="rounded-2xl p-6 md:p-7"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--jardin-primario) 10%, white)",
              }}
            >
              <h3 className="font-titulo text-sm font-bold uppercase tracking-widest text-marron-suave">
                Datos del jardín
              </h3>
              <dl className="mt-4 space-y-3">
                {[
                  { t: "Clave", v: datosJardin.clave },
                  { t: "Turno", v: datosJardin.turno },
                  { t: "Incorporación", v: datosJardin.incorporacion },
                  { t: "Número de acuerdo", v: datosJardin.numeroAcuerdo },
                  { t: "Correo", v: datosJardin.email },
                ].map(({ t, v }) => (
                  <div key={t} className="flex flex-col">
                    <dt
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "var(--jardin-primario)" }}
                    >
                      {t}
                    </dt>
                    <dd className="mt-0.5 break-words text-sm text-marron">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* COLUMNA 2 — Síguenos + horario + encuéntranos */}
        <div className="space-y-8">
          {/* Síguenos + horario de atención */}
          <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm md:p-7">
            <h2 className="font-titulo text-xl font-bold text-marron">
              Síguenos
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {REDES.map((r) => (
                <a
                  key={r.nombre}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--brand": r.color } as React.CSSProperties}
                  className="group flex items-center gap-3 rounded-2xl border border-arena bg-white p-4 text-marron transition-all hover:scale-105 hover:border-transparent hover:bg-[color:var(--brand)] hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 fill-[color:var(--brand)] transition-colors group-hover:fill-white"
                    aria-hidden
                  >
                    <path d={r.path} />
                  </svg>
                  <span className="text-sm font-semibold">{r.nombre}</span>
                </a>
              ))}
            </div>

            <hr className="my-7 border-arena" />

            <h3 className="font-titulo text-lg font-bold text-marron">
              Horario de atención
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                    color: "var(--jardin-primario)",
                  }}
                >
                  <Clock size={16} />
                </span>
                <span>
                  <span className="block font-medium text-marron">
                    Lunes a Viernes
                  </span>
                  <span className="text-marron-suave">8:00 – 13:30 h</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                    color: "var(--jardin-primario)",
                  }}
                >
                  <Clock size={16} />
                </span>
                <span>
                  <span className="block font-medium text-marron">
                    Sábados y domingos
                  </span>
                  <span className="text-marron-suave">Sin atención</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Encuéntranos — ubicación en Google Maps */}
          <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm md:p-7">
            <h2 className="font-titulo text-xl font-bold text-marron">
              Encuéntranos
            </h2>

            {datosJardin?.direccion ? (
              <div className="mt-5 flex flex-col items-center rounded-2xl bg-arena/40 px-5 py-10 text-center">
                <MapPin
                  size={40}
                  style={{ color: "var(--jardin-primario)" }}
                />
                <p className="mt-3 text-sm font-medium text-marron">
                  {datosJardin.direccion}
                </p>
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-95"
                    style={{ backgroundColor: "var(--jardin-primario)" }}
                  >
                    <MapPin size={16} /> Ver en Google Maps
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm text-marron-suave">
                Pronto publicaremos nuestra ubicación.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
