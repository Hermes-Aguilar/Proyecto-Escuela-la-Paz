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
  FaMusicNote,
  FaTree,
  FaChild,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { MdChildCare } from "react-icons/md";

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
  },
  {
    nombre: "Jardín Porvenir",
    ciudad: "Monterrey",
    descripcion: "Espacio soleado y esperanzador. Su nombre evoca el futuro, la alegría y el crecimiento de cada niña.",
    colores: ["#F4C438", "#C25B35", "#F6EBD0"],
    tag: "tema propio · esperanza",
  },
];

export default function PastoralEducativa() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#8E9A3C] via-[#6d7830] to-[#3B2314] py-24 px-6 relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-5">
          <FaGraduationCap size={200} className="text-white" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="text-[#E4D7BC] text-sm hover:text-white mb-6 inline-flex items-center gap-1 transition-colors">
            ← Inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <FaGraduationCap size={28} className="text-white" />
            </div>
            <span className="text-[#E4D7BC] text-sm font-semibold tracking-widest uppercase">Pastoral Educativa</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Sembrando vida<br />
            <span className="text-[#E4D7BC]">desde la infancia</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
            Educamos desde los valores del Evangelio y el carisma franciscano: amor, sencillez,
            respeto a la creación y fraternidad. Cada jardín es un espacio donde los niños crecen
            como personas íntegras y felices.
          </p>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Nuestra misión</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2 mb-5">
              Una educación que transforma desde adentro
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-4">
              Nuestra pastoral educativa cree que la educación es mucho más que transmitir
              conocimientos: es acompañar el desarrollo integral de cada persona, desde sus
              primeros años, en un ambiente de amor, seguridad y valores auténticos.
            </p>
            <p className="text-[#5A4232] leading-relaxed mb-6">
              Inspiradas en el carisma de San Francisco, buscamos que nuestros jardines sean
              comunidades donde los niños aprendan a amar a Dios, a los demás y a la naturaleza,
              construyendo así un mundo mejor desde la raíz.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#8E9A3C]/10 text-[#8E9A3C] border border-[#8E9A3C]/30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaChild size={14} /> Desarrollo integral
              </span>
              <span className="bg-[#C25B35]/10 text-[#C25B35] border border-[#C25B35]/30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaHeart size={14} /> Valores franciscanos
              </span>
              <span className="bg-[#8E9A3C]/10 text-[#8E9A3C] border border-[#8E9A3C]/30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaLeaf size={14} /> Amor a la creación
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {programas.map((p) => (
              <div key={p.titulo} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4D7BC] hover:shadow-md transition-shadow">
                <div className="text-[#8E9A3C] mb-3">{p.icon}</div>
                <h4 className="font-bold text-[#3B2314] text-sm mb-1">{p.titulo}</h4>
                <p className="text-xs text-[#7A6352] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JARDINES */}
      <section className="bg-[#F0EAE0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Nuestros jardines</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Comunidades educativas</h2>
            <p className="text-[#7A6352] mt-3 max-w-xl mx-auto">
              Cada jardín tiene su propia identidad, sus colores, su nombre y su espíritu.
              Aquí te presentamos nuestras comunidades educativas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {jardines.map((jardín) => (
              <div key={jardín.nombre} className="bg-white rounded-2xl shadow-sm border border-[#E4D7BC] overflow-hidden">
                {/* Paleta de colores del jardín */}
                <div className="flex h-3">
                  {jardín.colores.map((c, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#3B2314]">{jardín.nombre}</h3>
                      <p className="text-sm text-[#7A6352] flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt size={11} className="text-[#C25B35]" /> {jardín.ciudad}
                      </p>
                    </div>
                    <span className="text-xs bg-[#8E9A3C]/10 text-[#8E9A3C] border border-[#8E9A3C]/20 px-3 py-1 rounded-full font-medium">
                      {jardín.tag}
                    </span>
                  </div>
                  <p className="text-[#5A4232] text-sm leading-relaxed mb-5">{jardín.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {jardín.colores.map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-xs text-[#9A8B7A] italic">
                      * Para conocer más sobre este jardín, contáctanos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#9A8B7A] mt-6">
            La información detallada de cada jardín está disponible directamente con cada comunidad.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#3B2314] rounded-3xl p-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">¿Quieres inscribir a tu hija o hijo?</h2>
            <p className="text-[#C8B99A] leading-relaxed mb-6">
              Contáctate con el jardín de tu localidad. Con gusto te orientamos sobre el proceso
              de inscripción, los programas disponibles y los valores que nos mueven.
            </p>
            <div className="space-y-3">
              <a href="mailto:educativa@franciscanas.org" className="flex items-center gap-3 text-[#E4D7BC] hover:text-white transition-colors">
                <FaEnvelope className="text-[#8E9A3C]" /> educativa@franciscanas.org
              </a>
              <a href="tel:+5255000001" className="flex items-center gap-3 text-[#E4D7BC] hover:text-white transition-colors">
                <FaPhoneAlt className="text-[#8E9A3C]" /> +52 55 0000 0001
              </a>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-[#8E9A3C] hover:bg-[#6d7830] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Ir a contacto <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}