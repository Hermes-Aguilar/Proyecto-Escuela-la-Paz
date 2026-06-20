// RUTA: app/(public)/contacto/page.tsx
// Página de contacto del portal general (CAMBIO 3). Sin carrusel:
// diseño cálido en dos tiempos — hero degradado crema→arena con
// ilustración + sección de tres columnas (formulario, redes/horarios
// y mapa). El formulario es decorativo (UI): no consume el backend del
// portal general, solo simula el envío.
"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// Datos institucionales del portal general.
const TELEFONO = "953 53 2 07 11";
const TELEFONO_TEL = "+529535320711";
const CORREO = "mcgmayo12@hotmail.com";
const DIRECCION =
  "Calle Matamoros Núm. 13, Col. Centro, Huajuapan de León, Oaxaca";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Calle Matamoros 13, Centro, Huajuapan de León, Oaxaca");

const ASUNTOS = [
  "Información general",
  "Pastoral Vocacional",
  "Pastoral Educativa",
  "Librerías",
  "Otro",
];

// Iconos de marca como SVG inline (sin react-icons), con su color oficial.
const REDES = [
  {
    nombre: "Facebook",
    color: "#1877F2",
    href: "https://facebook.com",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    nombre: "Instagram",
    color: "#E4405F",
    href: "https://instagram.com",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.44 1.44 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    nombre: "YouTube",
    color: "#FF0000",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    nombre: "WhatsApp",
    color: "#25D366",
    href: "https://wa.me/529535320711",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.943-11.893a11.821 11.821 0 0 0-3.416-8.408",
  },
];

// Ilustración: paloma estilizada (símbolo de paz), en azul institucional translúcido.
function PalomaInstitucional() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="200"
      height="200"
      role="img"
      aria-label="Paloma de la paz"
      className="text-azul-institucional"
    >
      <circle cx="100" cy="100" r="96" fill="currentColor" fillOpacity={0.08} />
      {/* Cuerpo y cabeza de la paloma en vuelo */}
      <path
        d="M40 116 C72 78 112 84 132 74 C148 66 158 54 168 42 C171 60 164 80 150 90 C166 92 180 88 190 80 C176 108 150 116 126 110 C118 134 102 156 88 166 C92 146 94 132 93 120 C72 122 54 124 40 116 Z"
        fill="currentColor"
        fillOpacity={0.2}
      />
      {/* Ala interior (acento un poco más marcado) */}
      <path
        d="M72 110 C96 92 124 96 146 92 C124 110 98 116 80 116 Z"
        fill="currentColor"
        fillOpacity={0.32}
      />
      {/* Ojo */}
      <circle cx="156" cy="62" r="3.2" fill="currentColor" fillOpacity={0.7} />
      {/* Ramita de olivo desde el pico */}
      <path
        d="M168 44 C176 40 186 40 194 36"
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="186" cy="38" r="3" fill="currentColor" fillOpacity={0.45} />
      <circle cx="178" cy="41" r="3" fill="currentColor" fillOpacity={0.45} />
    </svg>
  );
}

const DATOS_RAPIDOS = [
  { icon: Phone, label: "Teléfono", valor: TELEFONO, href: `tel:${TELEFONO_TEL}` },
  { icon: Mail, label: "Correo", valor: CORREO, href: `mailto:${CORREO}` },
  { icon: MapPin, label: "Dirección", valor: "Huajuapan de León, Oaxaca", href: MAPS_URL },
];

const VACIO = { nombre: "", email: "", telefono: "", asunto: ASUNTOS[0], mensaje: "" };

export default function Contacto() {
  const [form, setForm] = useState(VACIO);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidos, setInvalidos] = useState<Set<string>>(new Set());

  const cambiar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (invalidos.has(name)) {
      setInvalidos((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación visual de obligatorios (formulario decorativo).
    const faltan = new Set<string>();
    (["nombre", "email", "mensaje"] as const).forEach((c) => {
      if (!form[c].trim()) faltan.add(c);
    });
    if (faltan.size > 0) {
      setInvalidos(faltan);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setEnviado(true);
  };

  const claseInput = (campo: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-marron placeholder:text-marron-suave/60 outline-none transition focus:ring-2 ${
      invalidos.has(campo)
        ? "border-error focus:ring-error/30"
        : "border-arena focus:border-azul-institucional focus:ring-azul-institucional/20"
    }`;

  return (
    <div className="bg-crema">
      {/* HERO — degradado cálido, sin imagen, dos columnas */}
      <section className="bg-gradient-to-br from-crema to-arena px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          {/* Texto + datos rápidos */}
          <div className="w-full md:max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-azul-institucional">
              Contacto
            </span>
            <h1 className="font-titulo mt-2 text-4xl font-bold text-marron md:text-5xl">
              Hablemos
            </h1>
            <p className="mt-3 max-w-md text-marron-suave">
              Estamos aquí para escucharte. Una pregunta, una inquietud o el deseo de
              conocernos: con gusto te respondemos.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {DATOS_RAPIDOS.map(({ icon: Icon, label, valor, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 rounded-2xl border border-arena bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-marron-suave">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium text-marron">
                      {valor}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Ilustración */}
          <div className="flex shrink-0 justify-center">
            <PalomaInstitucional />
          </div>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL — tres columnas */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* COLUMNA 1 — Formulario */}
          <AnimacionScroll delay={0} className="lg:col-span-1">
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">
                Envíanos un mensaje
              </h2>

              {enviado ? (
                <div className="mt-6 flex flex-col items-center rounded-2xl border border-dorado/40 bg-dorado/10 px-6 py-10 text-center">
                  <CheckCircle2 size={44} className="text-dorado" />
                  <h3 className="font-titulo mt-3 text-lg font-bold text-marron">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-1 text-sm text-marron-suave">
                    Gracias por escribirnos. Te responderemos lo antes posible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEnviado(false);
                      setForm(VACIO);
                    }}
                    className="mt-5 text-sm font-semibold text-azul-institucional hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={enviar} noValidate className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-marron">
                      Nombre <span className="text-azul-institucional">*</span>
                    </label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={cambiar}
                      placeholder="Tu nombre completo"
                      className={claseInput("nombre")}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-marron">
                      Correo <span className="text-azul-institucional">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={cambiar}
                      placeholder="tu@correo.com"
                      className={claseInput("email")}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-marron">
                      Teléfono
                    </label>
                    <input
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={cambiar}
                      placeholder="Opcional"
                      className={claseInput("telefono")}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-marron">
                      Asunto
                    </label>
                    <select
                      name="asunto"
                      value={form.asunto}
                      onChange={cambiar}
                      className={`${claseInput("asunto")} cursor-pointer`}
                    >
                      {ASUNTOS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-marron">
                      Mensaje <span className="text-azul-institucional">*</span>
                    </label>
                    <textarea
                      name="mensaje"
                      rows={5}
                      value={form.mensaje}
                      onChange={cambiar}
                      placeholder="Cuéntanos en qué podemos ayudarte…"
                      className={`${claseInput("mensaje")} resize-y`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-azul-institucional px-5 py-3 font-semibold text-white shadow transition hover:bg-azul-oscuro disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="animate-pulse">Enviando…</span>
                    ) : (
                      <>
                        <Send size={18} /> Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimacionScroll>

          {/* COLUMNA 2 — Redes y horarios */}
          <AnimacionScroll delay={150} className="lg:col-span-1">
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">Síguenos</h2>

              <div className="mt-6 grid grid-cols-2 gap-3">
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
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Clock size={16} />
                  </span>
                  <span>
                    <span className="block font-medium text-marron">
                      Lunes a Viernes
                    </span>
                    <span className="text-marron-suave">8:00 – 17:00 h</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Clock size={16} />
                  </span>
                  <span>
                    <span className="block font-medium text-marron">
                      Sábados y domingos
                    </span>
                    <span className="text-marron-suave">Solo urgencias</span>
                  </span>
                </li>
              </ul>
            </div>
          </AnimacionScroll>

          {/* COLUMNA 3 — Mapa y dirección */}
          <AnimacionScroll delay={300} className="lg:col-span-1">
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">Encuéntranos</h2>

              {/* Mapa placeholder */}
              <div className="mt-6 flex flex-col items-center rounded-2xl bg-arena/40 px-5 py-10 text-center">
                <MapPin size={44} className="text-azul-institucional" />
                <p className="mt-3 text-sm font-medium text-marron">{DIRECCION}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-azul-institucional px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-azul-oscuro"
                >
                  <MapPin size={16} /> Ver en Google Maps
                </a>
              </div>

              {/* Contacto directo */}
              <div className="mt-6 space-y-3 text-sm">
                <a
                  href={`mailto:${CORREO}`}
                  className="flex items-center gap-3 text-marron transition-colors hover:text-azul-institucional"
                >
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Mail size={16} />
                  </span>
                  {CORREO}
                </a>
                <a
                  href={`tel:${TELEFONO_TEL}`}
                  className="flex items-center gap-3 text-marron transition-colors hover:text-azul-institucional"
                >
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Phone size={16} />
                  </span>
                  {TELEFONO}
                </a>
              </div>
            </div>
          </AnimacionScroll>
        </div>
      </section>
    </div>
  );
}
