// RUTA: src/app/(public)/pastoral-vocacional/page.tsx
import Link from "next/link";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaPray,
  FaHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaChurch,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";

const slidesHero: SlideHero[] = [
  {
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
    categoria: "PASTORAL VOCACIONAL",
    titulo: "Descubre tu llamado",
    descripcion:
      "Si en tu corazón hay una inquietud que no se calla, quizás Dios te está llamando",
  },
  {
    imagen: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600",
    categoria: "DISCERNIMIENTO",
    titulo: "Escuchar la voz interior",
    descripcion:
      "Te acompañamos en el proceso de descubrir el proyecto de Dios en tu vida",
  },
  {
    imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600",
    categoria: "RETIROS Y ENCUENTROS",
    titulo: "Espacios para encontrarte contigo",
    descripcion:
      "Fines de semana de silencio, oración y fraternidad para jóvenes que buscan",
  },
];

const etapas = [
  {
    num: "01",
    titulo: "Primer acercamiento",
    desc: "Un encuentro abierto para quienes sienten inquietud vocacional. Espacio de escucha, oración y diálogo sin compromiso.",
    duracion: "1–3 meses",
  },
  {
    num: "02",
    titulo: "Prenoviciado",
    desc: "Acompañamiento más cercano con la comunidad. Formación básica en espiritualidad franciscana, vida comunitaria y discernimiento.",
    duracion: "6–12 meses",
  },
  {
    num: "03",
    titulo: "Noviciado",
    desc: "Etapa formal de iniciación a la vida religiosa franciscana. Formación espiritual, humana, intelectual y apostólica intensiva.",
    duracion: "1–2 años",
  },
  {
    num: "04",
    titulo: "Profesión temporal",
    desc: "Primeros votos de pobreza, castidad y obediencia. Integración plena en la misión y obra de la fraternidad.",
    duracion: "3–6 años",
  },
];

const actividades = [
  { icon: <FaPray size={20} />, titulo: "Retiros vocacionales", desc: "Fines de semana de oración, silencio y discernimiento en comunidad." },
  { icon: <FaUsers size={20} />, titulo: "Grupos de discernimiento", desc: "Encuentros mensuales para jóvenes que exploran su llamado." },
  { icon: <FaCalendarAlt size={20} />, titulo: "Jornadas de puertas abiertas", desc: "Visitas a nuestras comunidades para conocer nuestra vida por dentro." },
  { icon: <FaHeart size={20} />, titulo: "Acompañamiento espiritual", desc: "Dirección espiritual personalizada con una hermana de la fraternidad." },
];

const sedes = [
  { nombre: "Casa Central — CDMX", responsable: "Hna. María de la Paz", contacto: "vocacion.cdmx@franciscanas.org" },
  { nombre: "Sede Guadalajara", responsable: "Hna. Esperanza Ruiz", contacto: "vocacion.gdl@franciscanas.org" },
  { nombre: "Sede Monterrey", responsable: "Hna. Verónica Santos", contacto: "vocacion.mty@franciscanas.org" },
];

export default function PastoralVocacional() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO — carrusel del portal general */}
      <CarruselHero slides={slidesHero} />

      {/* MISIÓN */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Nuestra misión</span>
          <h2 className="text-3xl font-bold text-[#3B2314] mt-2 mb-5">
            Acompañar el discernimiento vocacional
          </h2>
          <p className="text-[#5A4232] leading-relaxed mb-4">
            La Pastoral Vocacional de nuestra fraternidad busca despertar, acoger y acompañar
            a quienes sienten el llamado a la vida consagrada franciscana. No buscamos reclutar:
            buscamos escuchar junto con la persona lo que Dios está diciendo en su vida.
          </p>
          <p className="text-[#5A4232] leading-relaxed mb-6">
            Creemos que toda vocación es un regalo y una responsabilidad. Por eso nuestro
            acompañamiento es cercano, respetuoso del ritmo de cada persona y profundamente espiritual.
          </p>
          <div className="bg-[#C25B35]/10 border-l-4 border-[#C25B35] pl-4 py-3 rounded-r-lg">
            <p className="text-[#3B2314] italic text-sm">
              "El que escucha con amor, descubre lo que Dios quiere decirle."
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {actividades.map((act) => (
            <div key={act.titulo} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4D7BC] hover:shadow-md transition-shadow">
              <div className="text-[#C25B35] mb-3">{act.icon}</div>
              <h4 className="font-bold text-[#3B2314] text-sm mb-1">{act.titulo}</h4>
              <p className="text-xs text-[#7A6352] leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPAS DEL CAMINO */}
      <section className="bg-[#3B2314] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">El camino</span>
            <h2 className="text-3xl font-bold text-white mt-2">Etapas del proceso vocacional</h2>
            <p className="text-[#C8B99A] mt-3 max-w-xl mx-auto">
              Cada etapa es un paso de madurez, discernimiento y entrega progresiva.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {etapas.map((e) => (
              <div key={e.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="text-[#C25B35] text-4xl font-black opacity-60">{e.num}</span>
                <h3 className="text-white font-bold text-lg mt-2 mb-2">{e.titulo}</h3>
                <p className="text-[#C8B99A] text-sm leading-relaxed mb-4">{e.desc}</p>
                <span className="text-xs bg-[#C25B35]/20 text-[#C25B35] px-3 py-1 rounded-full">
                  {e.duracion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEDES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Ubicaciones</span>
          <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Sedes vocacionales</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {sedes.map((sede) => (
            <div key={sede.nombre} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4D7BC]">
              <div className="flex items-center gap-3 mb-4">
                <FaChurch className="text-[#C25B35]" size={20} />
                <h3 className="font-bold text-[#3B2314]">{sede.nombre}</h3>
              </div>
              <p className="text-sm text-[#5A4232] mb-1"><span className="font-medium">Responsable:</span> {sede.responsable}</p>
              <a href={`mailto:${sede.contacto}`} className="text-sm text-[#C25B35] hover:underline flex items-center gap-1">
                <FaEnvelope size={12} /> {sede.contacto}
              </a>
            </div>
          ))}
        </div>
      </section>

    {/* CTA CONTACTO */}
    <section className="bg-[#E4D7BC] py-16">
    <div className="max-w-3xl mx-auto px-6 text-center">
    <FaEnvelope
      size={40}
      className="text-[#C25B35]/70 mx-auto mb-4"
    />

    <h2 className="font-display text-3xl font-bold text-[#3B2314] mb-4">
      ¿Te gustaría dar el primer paso?
    </h2>

    <p className="text-[#5A4232] text-lg mb-8">
      No tienes que tener todo claro. Solo necesitas el deseo de escuchar.
      Contáctanos y conversemos sin compromiso.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <Link
        href="/contacto"
        className="bg-[#C25B35] hover:bg-[#a84928] text-white px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
      >
        <FaEnvelope />
        Escribirnos
      </Link>

      <a
        href="tel:+5255000000"
        className="border-2 border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314]/10 px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
      >
        <FaPhoneAlt />
        Llamar
      </a>
    </div>
  </div>
</section>
    </div>
  );
}