// RUTA: app/(public)/contacto/page.tsx
// Página de contacto del portal general. Página informativa (sin
// formulario: el portal general no tiene backend de mensajes). Arriba se
// reserva un espacio para una imagen estática (pendiente de definir);
// debajo, dos bloques de contacto —general y Pastoral Vocacional— más la
// ubicación. Server Component: solo muestra datos, sin estado de cliente.

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// ── Datos institucionales (portal general) ──
const TELEFONO = "953 532 0711";
const TELEFONO_TEL = "+529535320711";
const CORREO = "mcgmayo12@hotmail.com";
const FACEBOOK = "https://www.facebook.com/share/1D7TQAJyP8/";
const WHATSAPP = "https://wa.me/529535320711";

// ── Contacto de Pastoral Vocacional ──
const PV_TELEFONO = "953 126 1376";
const PV_TELEFONO_TEL = "+529531261376";
const PV_CORREO = "pastoralvocacionalmscg@gmail.com";

const DIRECCION =
  "Calle Matamoros Núm. 13, Col. Centro, Huajuapan de León, Oaxaca";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Calle Matamoros 13, Centro, Huajuapan de León, Oaxaca");

// Íconos de marca (lucide ya no los incluye): SVG inline.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.943-11.893a11.821 11.821 0 0 0-3.416-8.408" />
    </svg>
  );
}

// Fila de contacto reutilizable (ícono + etiqueta + valor enlazable).
function FilaContacto({
  icon: Icon,
  label,
  valor,
  href,
  externo = false,
}: {
  icon: typeof Phone;
  label: string;
  valor: string;
  href: string;
  externo?: boolean;
}) {
  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      className="group -mx-2 flex items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-crema"
    >
      <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-marron-suave">
          {label}
        </span>
        <span className="block break-words text-sm font-medium text-marron transition-colors group-hover:text-azul-institucional">
          {valor}
        </span>
      </span>
    </a>
  );
}

export default function Contacto() {
  // El contenedor raíz NO lleva fondo opaco: taparía la imagen fija (-z-10).
  return (
    <div>
      {/* IMAGEN DE FONDO FIJA — mismo efecto "reveal" del inicio: la imagen
          queda quieta detrás y el contenido (capa crema) sube por encima al
          hacer scroll, revelándola poco a poco. */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/Imagen de contracto.png"
          alt="Contacto · Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 65%" }}
        />
      </div>

      {/* Zona que revela la imagen antes de que suba el contenido. */}
      <section className="h-[42vh] md:h-[58vh]" aria-hidden />

      {/* CONTENIDO — capa opaca que se desplaza por encima de la imagen fija. */}
      <div className="relative z-10 bg-crema">
      {/* ENCABEZADO */}
      <section className="mx-auto max-w-6xl px-6 pt-14 md:pt-16">
        <AnimacionScroll>
          <span className="text-sm font-semibold uppercase tracking-widest text-azul-institucional">
            Contacto
          </span>
          <h1 className="font-titulo mt-2 text-3xl font-bold text-marron md:text-4xl">
            Comunícate con nosotros
          </h1>
          <p className="mt-3 max-w-xl text-marron-suave">
            Estamos para escucharte. Elige el medio que prefieras y con gusto te
            respondemos.
          </p>
        </AnimacionScroll>
      </section>

      {/* TARJETAS DE CONTACTO */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* COLUMNA 1 — Contacto general */}
          <AnimacionScroll delay={0}>
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">
                Contacto general
              </h2>
              <p className="mt-1 text-sm text-marron-suave">
                Misioneras del Señor de los Corazones y de Santa María de Guadalupe
              </p>

              <div className="mt-5 space-y-1">
                <FilaContacto
                  icon={Phone}
                  label="Teléfono"
                  valor={TELEFONO}
                  href={`tel:${TELEFONO_TEL}`}
                />
                <FilaContacto
                  icon={Mail}
                  label="Correo"
                  valor={CORREO}
                  href={`mailto:${CORREO}`}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
                >
                  <FacebookIcon className="h-4 w-4" /> Facebook
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </AnimacionScroll>

          {/* COLUMNA 2 — Pastoral Vocacional */}
          <AnimacionScroll delay={150}>
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">
                Contacto de Pastoral Vocacional
              </h2>
              <p className="mt-1 text-sm text-marron-suave">
                ¿Sientes el llamado? Escríbenos, con gusto te acompañamos.
              </p>

              <div className="mt-5 space-y-1">
                <FilaContacto
                  icon={Phone}
                  label="Teléfono"
                  valor={PV_TELEFONO}
                  href={`tel:${PV_TELEFONO_TEL}`}
                />
                <FilaContacto
                  icon={Mail}
                  label="Correo"
                  valor={PV_CORREO}
                  href={`mailto:${PV_CORREO}`}
                />
              </div>
            </div>
          </AnimacionScroll>

          {/* COLUMNA 3 — Ubicación */}
          <AnimacionScroll delay={300}>
            <div className="rounded-3xl border border-arena bg-white p-7 shadow-sm">
              <h2 className="font-titulo text-2xl font-bold text-marron">
                Encuéntranos
              </h2>

              <div className="mt-5 flex flex-col items-center rounded-2xl bg-arena/40 px-5 py-9 text-center">
                <MapPin size={40} className="text-azul-institucional" />
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
            </div>
          </AnimacionScroll>
        </div>
      </section>
      </div>
    </div>
  );
}
