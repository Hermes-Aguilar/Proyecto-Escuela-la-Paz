// ============================================================
// app/(public)/la-congregacion/page.tsx
// Página principal del apartado "La Congregación".
// Server Component estático. Datos reales tomados de
// docs/congregacion.md. Paleta institucional (tokens de globals.css).
// ============================================================
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight,
  FaUserTie,
  FaLandmark,
  FaCrown,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// Las 5 subpáginas, en tarjetas enlazadas.
const tarjetas = [
  {
    href: "/la-congregacion/fundador",
    icon: <FaUserTie size={22} />,
    titulo: "El Fundador",
    desc: "Pbro. Lic. Luis Fiacro Guerrero Ramírez, quien inició esta obra el 12 de mayo de 1957.",
  },
  {
    href: "/la-congregacion/historia",
    icon: <FaLandmark size={22} />,
    titulo: "Nuestra Historia",
    desc: "Desde una casa prestada hasta 17 comunidades en México, Costa Rica y África.",
  },
  {
    href: "/la-congregacion/superioras",
    icon: <FaCrown size={22} />,
    titulo: "Superioras Generales",
    desc: "Conoce a quienes han guiado la Congregación a lo largo de su historia.",
  },
  {
    href: "/la-congregacion/primeras-hermanas",
    icon: <FaUsers size={22} />,
    titulo: "Primeras Hermanas",
    desc: "Las cuatro jovencitas que dieron inicio a esta obra de Dios.",
  },
  {
    href: "/la-congregacion/escudo",
    icon: <FaShieldAlt size={22} />,
    titulo: "Nuestro Escudo",
    desc: "Cada símbolo de nuestro escudo cuenta una parte de nuestra identidad.",
  },
];

const situacion = [
  { numero: "2", label: "Pre-aspirantes" },
  { numero: "3", label: "Aspirantes" },
  { numero: "6", label: "Junioras" },
  { numero: "64", label: "Votos Perpetuos" },
];

export default function LaCongregacion() {
  return (
    <div className="bg-crema">
      {/* ============================================================
          1 · HERO — imagen estática (gradiente institucional + escudo).
          ============================================================ */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-azul-institucional via-azul-oscuro to-marron">
        {/* Velo oscuro encima para realzar el texto. */}
        <div className="absolute inset-0 -z-10 bg-black/30" />
        {/* Escudo difuminado como textura de fondo. */}
        <Image
          src="/images/escudo.png"
          alt=""
          aria-hidden
          width={1024}
          height={1536}
          className="pointer-events-none absolute -right-10 top-1/2 -z-10 hidden h-[120%] w-auto -translate-y-1/2 opacity-10 md:block"
        />
        <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="font-titulo text-sm font-semibold uppercase tracking-widest text-dorado">
            Instituto de Misioneras
          </p>
          <h1 className="font-titulo mt-3 text-4xl font-extrabold text-white drop-shadow-sm md:text-6xl">
            La Congregación
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
            Señor de los Corazones y de Santa María de Guadalupe — una obra de
            Dios al servicio de la Iglesia desde 1957.
          </p>
          <div className="mx-auto mt-7 w-28 border-t border-dorado/60" />
        </div>
      </section>

      {/* ============================================================
          2 · SECCIÓN PRINCIPAL — escudo + texto editorial.
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <AnimacionScroll>
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            {/* Imagen: escudo de la congregación. */}
            <div className="flex justify-center">
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)",
                  }}
                />
                <Image
                  src="/images/escudo.png"
                  alt="Escudo del Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                  width={1024}
                  height={1536}
                  className="h-auto w-64 object-contain drop-shadow-md md:w-72 lg:w-80"
                />
              </div>
            </div>

            {/* Texto editorial. */}
            <div>
              <span className="font-titulo text-sm font-semibold uppercase tracking-widest text-azul-institucional">
                Quiénes somos
              </span>
              <h2 className="font-titulo mt-2 text-3xl font-bold leading-tight text-marron md:text-4xl">
                Somos el Instituto de Misioneras del Señor de los Corazones y de
                Santa María de Guadalupe
              </h2>

              {/* Párrafo con letra capital decorativa. */}
              <p className="mt-6 leading-relaxed text-marron-suave [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:font-titulo [&::first-letter]:text-6xl [&::first-letter]:font-bold [&::first-letter]:leading-none [&::first-letter]:text-dorado">
                Instituto fundado el 12 de mayo de 1957 en Huajuapan de León,
                Oaxaca, por el Pbro. Lic. Luis Fiacro Guerrero Ramírez, con la
                bendición del Excmo. Sr. Obispo Don Celestino Fernández y
                Fernández.
              </p>

              <p className="mt-5 leading-relaxed text-marron-suave">
                Nuestro carisma es <em>ser en la Iglesia miembros activos en la
                construcción del Reino de Dios, mediante el dar a conocer a
                nuestros hermanos las riquezas de Jesucristo Rey y Señor de los
                Corazones y el amor maternal de Santa María de Guadalupe.</em>
              </p>

              <p className="mt-5 leading-relaxed text-marron-suave">
                Hoy la Congregación tiene presencia en Oaxaca, Puebla, el Estado
                de México, Guerrero, Sonora y Guanajuato, y ha cruzado fronteras
                con comunidades en Costa Rica y en Malabo, África, llevando la
                semilla del Evangelio a cada pueblo.
              </p>
            </div>
          </div>
        </AnimacionScroll>
      </section>

      {/* ============================================================
          3 · TARJETAS — acceso a las 5 subpáginas.
          ============================================================ */}
      <section className="bg-arena/40 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <AnimacionScroll>
            <div className="mb-12 text-center">
              <span className="font-titulo text-sm font-semibold uppercase tracking-widest text-azul-institucional">
                Conoce más
              </span>
              <h2 className="font-titulo mt-2 text-3xl font-bold text-marron">
                Nuestra identidad
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-marron-suave">
                Recorre la historia, las personas y los símbolos que dan vida a
                nuestra Congregación.
              </p>
            </div>
          </AnimacionScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tarjetas.map((t, i) => (
              <AnimacionScroll key={t.href} delay={i * 100}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-arena bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex w-fit rounded-xl bg-azul-institucional/10 p-3 text-azul-institucional transition-colors group-hover:bg-azul-institucional group-hover:text-white">
                    {t.icon}
                  </div>
                  <h3 className="font-titulo mb-2 text-xl font-bold text-marron">
                    {t.titulo}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-marron-suave">
                    {t.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-azul-institucional transition-all group-hover:gap-3">
                    Leer más <FaArrowRight size={12} />
                  </span>
                </Link>
              </AnimacionScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4 · SITUACIÓN ACTUAL — números destacados.
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <AnimacionScroll>
          <div className="rounded-3xl bg-marron p-10 md:p-14">
            <div className="mb-10 text-center">
              <span className="font-titulo text-sm font-semibold uppercase tracking-widest text-dorado">
                Hoy
              </span>
              <h2 className="font-titulo mt-2 text-3xl font-bold text-white">
                Situación Actual de la Congregación
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {situacion.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <p className="font-titulo text-5xl font-extrabold text-dorado">
                    {s.numero}
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/80">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimacionScroll>
      </section>
    </div>
  );
}
