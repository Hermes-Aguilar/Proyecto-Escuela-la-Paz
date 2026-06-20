// RUTA: src/app/(public)/librerias/page.tsx
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";

const slidesHero: SlideHero[] = [
  {
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600",
    categoria: "LIBRERÍAS FRANCISCANAS",
    titulo: "Fe, cultura y encuentro",
    descripcion:
      "Nuestras librerías son espacios de evangelización con libros, artículos religiosos y recursos espirituales",
  },
  {
    imagen: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600",
    categoria: "MATERIAL RELIGIOSO",
    titulo: "Recursos para tu vida espiritual",
    descripcion:
      "Encuentra todo lo que necesitas para nutrir tu fe y la de tu comunidad",
  },
  {
    imagen: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600",
    categoria: "ENCUENTRO Y SERVICIO",
    titulo: "Más que una librería",
    descripcion:
      "Un espacio de acogida, donde cada visita es una oportunidad de encuentro",
  },
];

const librerias = [
  {
    nombre: "Librería San Francisco",
    ciudad: "CDMX — Centro Histórico",
    direccion: "Av. Madero 15, Col. Centro, CDMX",
    horario: { semana: "Lun–Vie: 9:00 – 18:00 h", sabado: "Sáb: 9:00 – 15:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 55 1234 5678",
    email: "sanfrancisco@libreriasfran.org",
    principal: true,
    descripcion: "Nuestra librería insignia, ubicada en el corazón del Centro Histórico. La más completa colección de material franciscano y espiritualidad cristiana.",
  },
  {
    nombre: "Librería La Porciúncula",
    ciudad: "Guadalajara, Jalisco",
    direccion: "Av. Hidalgo 340, Col. Guadalajara Centro",
    horario: { semana: "Lun–Vie: 9:00 – 17:00 h", sabado: "Sáb: 9:00 – 14:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 33 9876 5432",
    email: "porciuncula@libreriasfran.org",
    principal: false,
    descripcion: "Espacio de encuentro y evangelización en Guadalajara. Especializada en material para grupos juveniles y catequesis.",
  },
  {
    nombre: "Librería Paz y Bien",
    ciudad: "Monterrey, Nuevo León",
    direccion: "Calle Morelos 88, Col. Centro, Monterrey",
    horario: { semana: "Lun–Vie: 10:00 – 18:00 h", sabado: "Sáb: 10:00 – 16:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 81 5555 1212",
    email: "pazbien@libreriasfran.org",
    principal: false,
    descripcion: "La librería más nueva de nuestra red, con especial enfoque en espiritualidad franciscana contemporánea y recursos digitales.",
  },
];

export default function Librerias() {
  return (
    <div className="bg-crema">
      {/* HERO — carrusel del portal general */}
      <CarruselHero slides={slidesHero} />

      {/* DIRECTORIO DE LIBRERÍAS */}
      <section className="bg-azul-suave py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Directorio</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2">Nuestras librerías</h2>
          </div>

          <div className="space-y-8">
            {librerias.map((lib) => (
              <div key={lib.nombre} className={`bg-white rounded-3xl overflow-hidden shadow-sm border ${lib.principal ? "border-azul-institucional" : "border-arena"}`}>
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  {/* Info principal */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-azul-institucional mb-1">{lib.nombre}</h3>
                    <p className="text-azul-institucional font-semibold text-sm mb-3">{lib.ciudad}</p>
                    <p className="text-marron text-sm leading-relaxed mb-5">{lib.descripcion}</p>
                    <div className="flex items-start gap-2 text-sm text-marron-suave mb-2">
                      <FaMapMarkerAlt className="mt-0.5 text-azul-institucional shrink-0" />
                      <span>{lib.direccion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-marron-suave mb-2">
                      <FaPhoneAlt className="text-dorado shrink-0" />
                      <a href={`tel:${lib.telefono}`} className="hover:text-azul-institucional transition-colors">{lib.telefono}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-marron-suave">
                      <FaEnvelope className="text-dorado shrink-0" />
                      <a href={`mailto:${lib.email}`} className="hover:text-azul-institucional transition-colors">{lib.email}</a>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="bg-crema rounded-2xl p-5">
                    <h4 className="font-bold text-azul-institucional flex items-center gap-2 mb-4">
                      <FaClock className="text-azul-institucional" size={14} /> Horarios de atención
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-marron-suave">Lunes – Viernes</span>
                        <span className="font-medium text-marron">{lib.horario.semana.split(": ")[1]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-marron-suave">Sábado</span>
                        <span className="font-medium text-marron">{lib.horario.sabado.split(": ")[1]}</span>
                      </div>
                      <div className="flex justify-between border-t border-arena pt-2 mt-2">
                        <span className="text-marron-suave">Domingo</span>
                        <span className="text-marron-suave">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-dorado rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">¿Tienes alguna consulta o pedido especial?</h2>
            <p className="text-white/80">
              Contáctanos y con gusto te ayudamos a encontrar lo que necesitas para tu comunidad.
            </p>
          </div>
          <Link
            href="/contacto"
            className="shrink-0 bg-white text-azul-institucional hover:bg-azul-suave px-7 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
          >
            Ir a contacto <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}