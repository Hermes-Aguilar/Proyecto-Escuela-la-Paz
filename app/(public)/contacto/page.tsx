// RUTA: app/(public)/contacto/page.tsx
// Página de contacto del portal general. Página informativa (sin
// formulario: el portal general no tiene backend de mensajes). Arriba se
// reserva un espacio para una imagen estática (pendiente de definir);
// debajo, un directorio de contacto: bloques general y Pastoral Vocacional
// más la ubicación, seguidos de las librerías y las comunidades con datos
// de contacto (los jardines tienen su propia página de contacto y no se
// incluyen aquí). Server Component: solo muestra datos, sin estado de cliente.

import Image from "next/image";
import { Phone, Mail, MapPin, Clock, BookOpen, Users } from "lucide-react";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// ── Datos institucionales (portal general) ──
const TELEFONO = "953 532 0711";
const TELEFONO_TEL = "+529535320711";
const CORREO = "mcgmayo12@hotmail.com";
const CORREO_SEC = "secmscg@gmail.com"; // Secretaría / Casa Central
const FACEBOOK = "https://www.facebook.com/share/1D7TQAJyP8/";

// ── Contacto de Pastoral Vocacional ──
const PV_TELEFONO = "953 126 1376";
const PV_TELEFONO_TEL = "+529531261376";
const PV_CORREO = "pastoralvocacionalmscg@gmail.com";

const DIRECCION =
  "Calle Matamoros Núm. 13, Col. Centro, Huajuapan de León, Oaxaca";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Calle Matamoros 13, Centro, Huajuapan de León, Oaxaca");

// ── Librerías MSCG (datos extraídos de /librerias) ──
const LIBRERIAS = [
  {
    nombre: "Librería MSCG Casa Central",
    ciudad: "Huajuapan de León, Oaxaca",
    direccion: "Matamoros N°13, Colonia Centro, Huajuapan de León, Oax.",
    horario: "Todos los días: 8:00 – 18:00 h",
    telefonos: ["953 532 0711"],
  },
  {
    nombre: 'Librería MSCG "Señor de los Corazones"',
    ciudad: "Juxtlahuaca, Oaxaca",
    direccion: "Lázaro Cárdenas Norte #304, Juxtlahuaca, Oax.",
    horario: "Todos los días: 9:00 – 17:00 h",
    telefonos: ["953 116 2871"],
  },
  {
    nombre: 'Librería "La Purísima"',
    ciudad: "Chila de las Flores, Puebla",
    direccion:
      "Mercado Municipal, planta alta, a un costado de la parroquia, Chila de las Flores, Pue.",
    horario: "Domingo a viernes: 10:00 – 14:00 h",
    telefonos: ["55 6178 3237"],
  },
  {
    nombre: "Librería MSCG Atrio Catedral",
    ciudad: "Huajuapan de León, Oaxaca",
    direccion: "Atrio de la Catedral, Huajuapan de León, Oax.",
    horario: "Lunes a viernes: 10:00 – 14:00 h y 18:00 – 19:00 h",
    telefonos: ["953 690 1954"],
  },
  {
    nombre: 'Librería MSCG "San José"',
    ciudad: "Tehuitzingo, Puebla",
    direccion: "Calle Venustiano Carranza, Tehuitzingo, Pue.",
    horario: "Martes a domingo: 9:00 – 16:00 h",
    telefonos: ["953 537 1121"],
  },
  {
    nombre: 'Librería "La Providencia"',
    ciudad: "Acatlán de Osorio, Puebla",
    direccion:
      "Calle Revolución #9, Zona Centro, a un costado del templo parroquial de San Juan Bautista, Acatlán de Osorio, Pue.",
    horario:
      "Lun, mar, jue, vie y sáb: 9:30 – 17:00 h · Domingos: 9:30 – 15:00 h",
    telefonos: ["953 534 1283", "953 100 0659"],
  },
];

// ── Comunidades con datos de contacto (datos extraídos de /pastoral-juvenil).
// Solo se incluyen las que tienen teléfono, WhatsApp o correo; los jardines no. ──
const COMUNIDADES = [
  {
    nombre: "Comunidad Cuna de Belén (Casa Central)",
    ubicacion: "Matamoros #13, Centro, Huajuapan de León, Oaxaca",
    telefonos: ["953 532 0711"],
    correo: "secmscg@gmail.com",
  },
  {
    nombre: "Comunidad Tepeyac",
    ubicacion: "Morelos 121, colonia Tepeyac, Huajuapan de León, Oaxaca",
    telefonos: ["953 532 0634"],
  },
  {
    nombre: "Comunidad Sagrada Familia",
    ubicacion: "Lázaro Cárdenas #8, Santo Domingo Tonalá, Oaxaca",
    telefonos: ["953 531 0022"],
  },
  {
    nombre: "Comunidad Casa de la Misericordia",
    ubicacion: "Valerio Trujano #101 A, El Calvario, Huajuapan de León, Oaxaca",
    telefonos: ["953 532 0094"],
  },
  {
    nombre: "Comunidad Nuestra Señora del Pilar",
    ubicacion: "Avenida Príncipe Héritier n.º 24, 90050 Asilah, Marruecos",
    telefonos: ["+212 5394-16204"],
    whatsapp: "+52 55 2675 5063",
  },
];

// Construye un href tel: a partir del número visible. Si no trae código de
// país (+), asume México (+52).
function telHref(numero: string): string {
  const limpio = numero.replace(/[^\d+]/g, "");
  return limpio.startsWith("+") ? `tel:${limpio}` : `tel:+52${limpio}`;
}

// Construye un enlace wa.me a partir del número visible de WhatsApp.
function waHref(numero: string): string {
  const digitos = numero.replace(/\D/g, "");
  return `https://wa.me/${digitos}`;
}

// Íconos de marca (lucide ya no los incluye): SVG inline.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
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
                <FilaContacto
                  icon={Mail}
                  label="Correo (secretaría)"
                  valor={CORREO_SEC}
                  href={`mailto:${CORREO_SEC}`}
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

      {/* LIBRERÍAS */}
      <section className="mx-auto max-w-6xl px-6 pb-4 md:pb-6">
        <AnimacionScroll>
          <div className="mb-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-azul-institucional">
              Directorio
            </span>
            <h2 className="font-titulo mt-2 text-2xl font-bold text-marron md:text-3xl">
              Librerías MSCG
            </h2>
            <p className="mt-2 max-w-2xl text-marron-suave">
              Nuestros puntos de venta de artículos religiosos y objetos
              litúrgicos. Escríbenos o llámanos para conocer disponibilidad.
            </p>
          </div>
        </AnimacionScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LIBRERIAS.map((lib, i) => (
            <AnimacionScroll key={lib.nombre} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-arena bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <BookOpen size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-titulo text-lg font-bold leading-snug text-marron">
                      {lib.nombre}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-marron-suave">
                      {lib.ciudad}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <p className="flex items-start gap-2 text-marron-suave">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-azul-institucional" />
                    <span>{lib.direccion}</span>
                  </p>
                  <p className="flex items-start gap-2 text-marron-suave">
                    <Clock size={16} className="mt-0.5 shrink-0 text-azul-institucional" />
                    <span>{lib.horario}</span>
                  </p>
                  {lib.telefonos.map((tel) => (
                    <a
                      key={tel}
                      href={telHref(tel)}
                      className="flex items-center gap-2 font-medium text-marron transition-colors hover:text-azul-institucional"
                    >
                      <Phone size={16} className="shrink-0 text-azul-institucional" />
                      {tel}
                    </a>
                  ))}
                </div>
              </div>
            </AnimacionScroll>
          ))}
        </div>
      </section>

      {/* COMUNIDADES */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <AnimacionScroll>
          <div className="mb-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-azul-institucional">
              Directorio
            </span>
            <h2 className="font-titulo mt-2 text-2xl font-bold text-marron md:text-3xl">
              Comunidades
            </h2>
            <p className="mt-2 max-w-2xl text-marron-suave">
              Comunidades de las Misioneras con datos de contacto directo.
            </p>
          </div>
        </AnimacionScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMUNIDADES.map((com, i) => (
            <AnimacionScroll key={com.nombre} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-arena bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-azul-institucional/10 p-2 text-azul-institucional">
                    <Users size={18} />
                  </span>
                  <h3 className="font-titulo text-lg font-bold leading-snug text-marron">
                    {com.nombre}
                  </h3>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <p className="flex items-start gap-2 text-marron-suave">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-azul-institucional" />
                    <span>{com.ubicacion}</span>
                  </p>
                  {com.telefonos.map((tel) => (
                    <a
                      key={tel}
                      href={telHref(tel)}
                      className="flex items-center gap-2 font-medium text-marron transition-colors hover:text-azul-institucional"
                    >
                      <Phone size={16} className="shrink-0 text-azul-institucional" />
                      {tel}
                    </a>
                  ))}
                  {com.whatsapp && (
                    <a
                      href={waHref(com.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium text-marron transition-colors hover:text-azul-institucional"
                    >
                      <Phone size={16} className="shrink-0 text-azul-institucional" />
                      WhatsApp {com.whatsapp}
                    </a>
                  )}
                  {com.correo && (
                    <a
                      href={`mailto:${com.correo}`}
                      className="flex items-center gap-2 font-medium text-marron transition-colors hover:text-azul-institucional"
                    >
                      <Mail size={16} className="shrink-0 text-azul-institucional" />
                      {com.correo}
                    </a>
                  )}
                </div>
              </div>
            </AnimacionScroll>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
