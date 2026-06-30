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

// Íconos de marca (SVG inline) con su color oficial. Los links salen de
// los datos de cada jardín (lib/data/jardines-contenido).
const ICONOS_RED = {
  facebook: {
    nombre: "Facebook",
    color: "#1877F2",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  youtube: {
    nombre: "YouTube",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  whatsapp: {
    nombre: "WhatsApp",
    color: "#25D366",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.943-11.893a11.821 11.821 0 0 0-3.416-8.408",
  },
} as const;

// Normaliza el WhatsApp (número o URL) a un enlace wa.me. Si el número
// trae 10 dígitos (MX sin lada de país), antepone 52.
function whatsappHref(valor: string): string {
  if (/^https?:\/\//i.test(valor)) return valor;
  const digitos = valor.replace(/\D/g, "");
  const numero = digitos.length === 10 ? `52${digitos}` : digitos;
  return `https://wa.me/${numero}`;
}

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

  // Datos de contacto directos (teléfono, celular, correo). Solo los
  // que el jardín tenga documentados.
  const datos = datosJardin
    ? ([
        datosJardin.telefono && {
          icon: Phone,
          valor: datosJardin.telefono,
          href: `tel:${datosJardin.telefono.replace(/\s/g, "")}`,
        },
        datosJardin.celular && {
          icon: Smartphone,
          valor: datosJardin.celular,
          href: `tel:${datosJardin.celular.replace(/\s/g, "")}`,
        },
        datosJardin.email && {
          icon: Mail,
          valor: datosJardin.email,
          href: `mailto:${datosJardin.email}`,
        },
      ].filter(Boolean) as { icon: typeof Phone; valor: string; href: string }[])
    : [];

  // Pares (etiqueta, valor) de "Datos del jardín", solo los presentes.
  const datosInstitucionales = datosJardin
    ? ([
        { t: "Clave", v: datosJardin.clave },
        { t: "Turno", v: datosJardin.turno },
        { t: "Incorporación", v: datosJardin.incorporacion },
        { t: "Correo", v: datosJardin.email },
      ].filter((d) => d.v) as { t: string; v: string }[])
    : [];

  // Redes sociales (sección "Síguenos"), solo las que tenga el jardín.
  const redes = datosJardin
    ? ([
        datosJardin.facebook && {
          ...ICONOS_RED.facebook,
          href: datosJardin.facebook,
        },
        datosJardin.youtube && {
          ...ICONOS_RED.youtube,
          href: datosJardin.youtube,
        },
        datosJardin.whatsapp && {
          ...ICONOS_RED.whatsapp,
          href: whatsappHref(datosJardin.whatsapp),
        },
      ].filter(Boolean) as {
        nombre: string;
        color: string;
        path: string;
        href: string;
      }[])
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

          {/* Datos institucionales del jardín (clave, turno, incorporación
              y correo). Solo los que estén cargados. */}
          {datosInstitucionales.length > 0 && (
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
                {datosInstitucionales.map(({ t, v }) => (
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

            {redes.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {redes.map((r) => (
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
            ) : (
              <p className="mt-5 text-sm text-marron-suave">
                Pronto compartiremos nuestras redes sociales.
              </p>
            )}

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
