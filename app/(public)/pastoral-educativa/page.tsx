// RUTA: src/app/(public)/pastoral-educativa/page.tsx
import Link from "next/link";
import {
  FaGraduationCap,
  FaLeaf,
  FaUsers,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChalkboardTeacher,
  FaPaintBrush,
  FaTree,
  FaChild,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { MdChildCare } from "react-icons/md";

import { SubmenuPastoral } from "./SubmenuPastoral";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";

const programas = [
  {
    icon: <MdChildCare size={22} />,
    titulo: "Educación preescolar",
    desc: "Desarrollo integral de niñas y niños en sus primeros años, con enfoque en valores, creatividad y amor a la naturaleza.",
  },
  {
    icon: <FaChalkboardTeacher size={22} />,
    titulo: "Formación en valores",
    desc: "Programa transversal que integra los valores franciscanos en todas las actividades del jardín.",
  },
  {
    icon: <FaPaintBrush size={22} />,
    titulo: "Arte y expresión",
    desc: "Talleres de plástica, música y danza como lenguajes de crecimiento espiritual y personal.",
  },
  {
    icon: <FaTree size={22} />,
    titulo: "Ecología franciscana",
    desc: "Huerto escolar, cuidado de la naturaleza y educación ambiental inspirada en el amor de Francisco a la creación.",
  },
];

const jardines = [
  {
    nombre: "Jardín La Paz",
    ciudad: "Guadalajara",
    descripcion: "Ambiente de calma y serenidad. Nos inspira en la paz interior y comunitaria que Francisco buscaba.",
    colores: ["#137E86", "#18B4C7", "#F4EFE3"],
    tag: "tema propio · calma",
    slug: "la-paz",
    primario: "#137E86",
  },
  {
    nombre: "Jardín Porvenir",
    ciudad: "Monterrey",
    descripcion: "Espacio soleado y esperanzador. Su nombre evoca el futuro, la alegría y el crecimiento de cada niña.",
    colores: ["#F4C438", "#C25B35", "#F6EBD0"],
    tag: "tema propio · esperanza",
    slug: "porvenir",
    primario: "#F4C438",
  },
];

export default function PastoralEducativa() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3f2d23] via-[#b5532f] to-[#5c6b1e] px-6 py-24">
        {/* Patrón de puntos sutil (textura sin distraer) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/pastoral-educativa"
            className="mb-6 inline-flex items-center gap-1 text-sm text-[#E4D7BC] transition-colors hover:text-white"
          >
            ← Pastoral Educativa
          </Link>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-terracota/40 bg-terracota/20 px-4 py-1.5">
            <FaGraduationCap size={18} className="text-[#f2c4ad]" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#f2c4ad]">
              Pastoral Educativa
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Sembrando vida<br />
            <span className="text-[#E4D7BC]">desde la infancia</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/80">
            Educamos desde los valores del Evangelio y el carisma franciscano: amor, sencillez,
            respeto a la creación y fraternidad. Cada jardín es un espacio donde los niños crecen
            como personas íntegras y felices.
          </p>

          {/* Llamados a la acción del hero */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#jardines"
              className="inline-flex items-center gap-2 rounded-xl bg-terracota px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-terracota-oscuro"
            >
              Ver nuestros jardines
            </a>
            <a
              href="#mision"
              className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conocer la misión
            </a>
          </div>
        </div>
      </section>

      {/* SUBMENÚ · navegación secundaria de Pastoral Educativa */}
      <SubmenuPastoral />

      {/* MISIÓN */}
      <section id="mision" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20">
        <AnimacionScroll>
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-terracota">
                Nuestra misión
              </span>
              <h2 className="mb-5 mt-2 text-3xl font-bold text-[#3B2314]">
                Una educación que transforma desde adentro
              </h2>
              <p className="mb-4 leading-relaxed text-[#5A4232]">
                Nuestra pastoral educativa cree que la educación es mucho más que transmitir
                conocimientos: es acompañar el desarrollo integral de cada persona, desde sus
                primeros años, en un ambiente de amor, seguridad y valores auténticos.
              </p>
              <p className="mb-6 leading-relaxed text-[#5A4232]">
                Inspiradas en el carisma de San Francisco, buscamos que nuestros jardines sean
                comunidades donde los niños aprendan a amar a Dios, a los demás y a la naturaleza,
                construyendo así un mundo mejor desde la raíz.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-full border border-terracota/20 bg-terracota/10 px-4 py-2 text-sm font-medium text-terracota">
                  <FaChild size={14} /> Desarrollo integral
                </span>
                <span className="flex items-center gap-2 rounded-full border border-terracota/20 bg-terracota/10 px-4 py-2 text-sm font-medium text-terracota">
                  <FaHeart size={14} /> Valores franciscanos
                </span>
                <span className="flex items-center gap-2 rounded-full border border-terracota/20 bg-terracota/10 px-4 py-2 text-sm font-medium text-terracota">
                  <FaLeaf size={14} /> Amor a la creación
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {programas.map((p) => (
                <div
                  key={p.titulo}
                  className="rounded-2xl border border-[#E4D7BC] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 text-[#8E9A3C]">{p.icon}</div>
                  <h4 className="mb-1 text-sm font-bold text-[#3B2314]">{p.titulo}</h4>
                  <p className="text-xs leading-relaxed text-[#7A6352]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimacionScroll>
      </section>

      {/* JARDINES */}
      <section id="jardines" className="scroll-mt-32 bg-[#F0EAE0] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <AnimacionScroll>
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#C25B35]">
                Nuestros jardines
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#3B2314]">Comunidades educativas</h2>
              <p className="mx-auto mt-3 max-w-xl text-[#7A6352]">
                Cada jardín tiene su propia identidad, sus colores, su nombre y su espíritu.
                Aquí te presentamos nuestras comunidades educativas.
              </p>
            </div>
          </AnimacionScroll>

          <div className="grid gap-8 md:grid-cols-2">
            {jardines.map((jardín, i) => (
              <AnimacionScroll key={jardín.nombre} delay={i * 150}>
                <Link
                  href={`/pastoral-educativa/${jardín.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[#E4D7BC] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Paleta de colores del jardín (barra gruesa, todo el ancho) */}
                  <div className="flex h-3">
                    {jardín.colores.map((c, j) => (
                      <div key={j} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="p-8">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#3B2314]">{jardín.nombre}</h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-[#7A6352]">
                          <FaMapMarkerAlt size={11} className="text-terracota" /> {jardín.ciudad}
                        </p>
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${jardín.primario}26`,
                          color: jardín.primario,
                          borderColor: `${jardín.primario}4D`,
                        }}
                      >
                        {jardín.tag}
                      </span>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-[#5A4232]">{jardín.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {jardín.colores.map((c, j) => (
                          <div
                            key={j}
                            className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow transition-all group-hover:gap-3 ${
                          jardín.slug === "porvenir" ? "text-marron" : "text-white"
                        }`}
                        style={{ backgroundColor: jardín.primario }}
                      >
                        Entrar al jardín <FaArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimacionScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <AnimacionScroll>
          <div className="grid items-center gap-10 rounded-3xl bg-[#3B2314] p-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-white">¿Quieres inscribir a tu hija o hijo?</h2>
              <p className="mb-6 leading-relaxed text-[#C8B99A]">
                Contáctate con el jardín de tu localidad. Con gusto te orientamos sobre el proceso
                de inscripción, los programas disponibles y los valores que nos mueven.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:educativa@franciscanas.org"
                  className="flex items-center gap-3 text-[#E4D7BC] transition-colors hover:text-white"
                >
                  <FaEnvelope className="text-terracota" /> educativa@franciscanas.org
                </a>
                <a
                  href="tel:+5255000001"
                  className="flex items-center gap-3 text-[#E4D7BC] transition-colors hover:text-white"
                >
                  <FaPhoneAlt className="text-terracota" /> +52 55 0000 0001
                </a>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-terracota px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-terracota-oscuro"
              >
                Ir a contacto <FaArrowRight />
              </Link>
            </div>
          </div>
        </AnimacionScroll>
      </section>
    </div>
  );
}
