// RUTA: src/app/(public)/pastoral-juvenil/page.tsx
import Link from "next/link";
import {
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaMusic,
  FaHiking,
  FaPray,
  FaHandsHelping,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";

const slidesHero: SlideHero[] = [
  {
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600",
    categoria: "COMUNIDADES",
    titulo: "Jóvenes con fe, con fuego, en misión",
    descripcion:
      "La juventud no es solo una etapa: es una fuerza que puede cambiar el mundo",
  },
  {
    imagen: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600",
    categoria: "FRATERNIDAD",
    titulo: "Crecer juntos en el camino",
    descripcion:
      "Grupos de jóvenes que se acompañan mutuamente en la fe y el servicio",
  },
  {
    imagen: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600",
    categoria: "COMPROMISO",
    titulo: "La fe que mueve montañas",
    descripcion:
      "Caminamos juntos en la búsqueda de sentido, fe y compromiso con los demás",
  },
];

const actividades = [
  {
    icon: <FaPray size={22} />,
    titulo: "Retiros espirituales",
    desc: "Fines de semana de oración, silencio y encuentro para jóvenes que buscan profundizar su fe.",
    frecuencia: "Mensual",
  },
  {
    icon: <FaMusic size={22} />,
    titulo: "Animación litúrgica",
    desc: "Grupos de música y ministerio para animación de misas, celebraciones y encuentros comunitarios.",
    frecuencia: "Semanal",
  },
  {
    icon: <FaHiking size={22} />,
    titulo: "Caminatas franciscanas",
    desc: "Salidas a la naturaleza que combinan espiritualidad, fraternidad y cuidado del medio ambiente.",
    frecuencia: "Trimestral",
  },
  {
    icon: <FaHandsHelping size={22} />,
    titulo: "Voluntariado social",
    desc: "Jornadas de servicio en comunidades vulnerables que forman el corazón solidario de los jóvenes.",
    frecuencia: "Mensual",
  },
  {
    icon: <FaUsers size={22} />,
    titulo: "Formación franciscana",
    desc: "Talleres y charlas sobre el carisma, la historia de la orden y la espiritualidad para jóvenes.",
    frecuencia: "Quincenal",
  },
  {
    icon: <FaCalendarAlt size={22} />,
    titulo: "Encuentros regionales",
    desc: "Grandes celebraciones juveniles a nivel regional que fortalecen la identidad y la comunión.",
    frecuencia: "Anual",
  },
];

const grupos = [
  { nombre: "Jóvenes San Francisco CDMX", miembros: 45, ciudad: "Ciudad de México", activo: true },
  { nombre: "Fraternidad Juvenil GDL", miembros: 32, ciudad: "Guadalajara", activo: true },
  { nombre: "JFran Monterrey", miembros: 28, ciudad: "Monterrey", activo: true },
  { nombre: "Jóvenes Paz y Bien Puebla", miembros: 20, ciudad: "Puebla", activo: true },
];

export default function PastoralJuvenil() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

      {/* QUÉ HACEMOS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Nuestra propuesta</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">Actividades y programas</h2>
          <p className="text-marron-suave mt-3 max-w-xl mx-auto">
            Una propuesta integral que combina espiritualidad, fraternidad, servicio y cultura franciscana.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actividades.map((act) => (
            <div key={act.titulo} className="bg-white rounded-2xl p-6 shadow-sm border border-arena hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-azul-institucional bg-azul-institucional/10 p-3 rounded-xl group-hover:bg-azul-institucional group-hover:text-white transition-colors">
                  {act.icon}
                </div>
                <span className="text-xs bg-dorado/10 text-dorado px-2 py-1 rounded-full font-medium">
                  {act.frecuencia}
                </span>
              </div>
              <h3 className="font-bold text-azul-institucional mb-2">{act.titulo}</h3>
              <p className="text-sm text-marron-suave leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GRUPOS */}
      <section id="grupos" className="bg-azul-oscuro py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Comunidades</span>
            <h2 className="text-3xl font-bold text-white mt-2">Grupos juveniles franciscanos</h2>
            <p className="text-white/75 mt-3">Encuéntrate con el grupo más cercano a ti</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {grupos.map((g) => (
              <div key={g.nombre} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <FaUsers className="text-dorado" />
                  <span className="text-xs bg-dorado/20 text-dorado px-2 py-0.5 rounded-full">
                    {g.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{g.nombre}</h3>
                <p className="text-white/75 text-xs flex items-center gap-1 mb-3">
                  <FaMapMarkerAlt size={10} /> {g.ciudad}
                </p>
                <p className="text-dorado font-bold text-xl">{g.miembros}</p>
                <p className="text-white/55 text-xs">miembros activos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REDES + CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Redes */}
          <div className="bg-azul-suave rounded-3xl p-8">
            <h3 className="text-xl font-bold text-azul-institucional mb-3">Síguenos en redes</h3>
            <p className="text-marron text-sm mb-6">
              Comparte el carisma franciscano, conoce las últimas actividades y conecta con otros jóvenes.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-2 rounded-lg">
                  <FaInstagram size={18} />
                </div>
                <div>
                  <p className="font-semibold text-marron text-sm">@pastoralfransciscana</p>
                  <p className="text-xs text-marron-suave">Instagram · Fotos y stories</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#25D366] text-white p-2 rounded-lg">
                  <FaWhatsapp size={18} />
                </div>
                <div>
                  <p className="font-semibold text-marron text-sm">Grupo WhatsApp Juvenil</p>
                  <p className="text-xs text-marron-suave">WhatsApp · Comunidad activa</p>
                </div>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-azul-institucional rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">¿Quieres ser parte?</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                No importa dónde estás en tu camino de fe. Si tienes entre 15 y 30 años y
                quieres vivir algo significativo, hay un lugar para ti en la Pastoral Juvenil Franciscana.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 bg-white text-azul-institucional hover:bg-azul-suave px-6 py-3 rounded-xl font-bold transition-colors"
              >
                <FaEnvelope /> Escribirnos
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}