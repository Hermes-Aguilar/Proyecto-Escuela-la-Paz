// RUTA: src/app/(public)/pastoral-misionera/page.tsx
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaHandsHelping,
  FaCross,
  FaUsers,
  FaLeaf,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";

const slidesHero: SlideHero[] = [
  {
    imagen: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600",
    categoria: "PASTORAL MISIONERA",
    titulo: "Id a todo el mundo y anunciad",
    descripcion:
      "Llevamos la Buena Noticia a donde más se necesita, con los pies en la tierra y el corazón en Dios",
  },
  {
    imagen: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600",
    categoria: "MISIONES POPULARES",
    titulo: "Misioneras al estilo de Francisco",
    descripcion:
      "Llegamos a comunidades indígenas, rurales y periurbanas de México con amor y servicio",
  },
  {
    imagen: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1600",
    categoria: "SERVICIO INTEGRAL",
    titulo: "Acompañar en dignidad",
    descripcion:
      "No solo anunciamos la fe: acompañamos a las personas en su dignidad, cultura y derechos",
  },
];

const programas = [
  {
    icon: <FaHandsHelping size={22} />,
    titulo: "Misiones populares",
    desc: "Equipos misioneros que visitan comunidades rurales y periféricas llevando el mensaje del Evangelio y atención integral.",
  },
  {
    icon: <FaCross size={22} />,
    titulo: "Animación bíblica",
    desc: "Grupos de lectio divina y catequesis que profundizan la fe de las comunidades locales.",
  },
  {
    icon: <FaUsers size={22} />,
    titulo: "Formación de líderes",
    desc: "Capacitación de agentes de pastoral comunitaria para sostener la misión en cada territorio.",
  },
  {
    icon: <FaLeaf size={22} />,
    titulo: "Ecología integral",
    desc: "Proyectos de cuidado de la casa común desde la espiritualidad franciscana y el servicio a las comunidades.",
  },
];

const zonas = [
  { zona: "Sierra Tarahumara", estado: "Chihuahua", comunidades: 12, activa: true },
  { zona: "Mixteca Alta", estado: "Oaxaca", comunidades: 8, activa: true },
  { zona: "Selva Lacandona", estado: "Chiapas", comunidades: 6, activa: true },
  { zona: "Huasteca Potosina", estado: "San Luis Potosí", comunidades: 5, activa: false },
];

export default function PastoralMisionera() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO — carrusel del portal general */}
      <CarruselHero slides={slidesHero} />

      {/* MISIÓN */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2 mb-5">
              Misioneras al estilo de Francisco
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-4">
              La Pastoral Misionera nació del espíritu itinerante de Francisco de Asís, que
              salía al encuentro del otro sin más equipaje que el amor. Hoy continuamos esa
              tradición llegando a comunidades indígenas, rurales y periurbanas de México.
            </p>
            <p className="text-[#5A4232] leading-relaxed mb-6">
              Nuestra misión no es solo religiosa: acompañamos integralmente a las personas
              en su dignidad, sus derechos, su cultura y su fe. Escuchamos antes de hablar.
              Servimos antes de enseñar.
            </p>
            <div className="bg-dorado/10 border-l-4 border-dorado pl-4 py-3 rounded-r-lg">
              <p className="text-[#3B2314] italic text-sm">
                "Quien siembra en amor, cosecha para la eternidad."
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {programas.map((p) => (
              <div key={p.titulo} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4D7BC] hover:shadow-md transition-shadow">
                <div className="text-dorado mb-3">{p.icon}</div>
                <h4 className="font-bold text-[#3B2314] text-sm mb-1">{p.titulo}</h4>
                <p className="text-xs text-[#7A6352] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONAS MISIONERAS */}
      <section className="bg-[#F0EAE0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Presencia territorial</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Zonas de misión</h2>
            <p className="text-[#7A6352] mt-3 max-w-xl mx-auto">
              Actualmente trabajamos en cuatro regiones prioritarias de México con alta vulnerabilidad y riqueza cultural.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {zonas.map((z) => (
              <div key={z.zona} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4D7BC]">
                <div className="flex items-center justify-between mb-3">
                  <FaMapMarkerAlt className="text-azul-institucional" size={18} />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${z.activa ? "bg-dorado/15 text-dorado" : "bg-gray-100 text-gray-500"}`}>
                    {z.activa ? "Activa" : "En pausa"}
                  </span>
                </div>
                <h3 className="font-bold text-[#3B2314] mb-1">{z.zona}</h3>
                <p className="text-sm text-[#7A6352] mb-3">{z.estado}</p>
                <p className="text-xs text-[#9A8B7A]">
                  <span className="font-semibold text-azul-institucional">{z.comunidades}</span> comunidades acompañadas
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Números que hablan</span>
          <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Nuestra presencia en números</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "31+", label: "Comunidades acompañadas", icon: <FaUsers /> },
            { num: "15", label: "Hermanas misioneras activas", icon: <FaHeart /> },
            { num: "4", label: "Zonas de misión en México", icon: <FaMapMarkerAlt /> },
            { num: "20+", label: "Años de presencia misionera", icon: <FaStar /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-7 text-center shadow-sm border border-[#E4D7BC]">
              <div className="text-dorado flex justify-center mb-3 text-xl">{stat.icon}</div>
              <p className="text-4xl font-black text-azul-institucional mb-2">{stat.num}</p>
              <p className="text-sm text-[#7A6352]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3B2314] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Quieres sumarte a la misión?</h2>
          <p className="text-[#C8B99A] mb-8">
            Hay muchas formas de participar: oración, apoyo económico, voluntariado o animación misionera
            en tu comunidad. Juntos llegamos más lejos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto" className="bg-azul-institucional hover:bg-azul-oscuro text-white px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors">
              <FaEnvelope /> Contactar
            </Link>
            <a href="tel:+5255000000" className="border-2 border-white/30 text-white hover:bg-white/10 px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors">
              <FaPhoneAlt /> Llamar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}