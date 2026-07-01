// RUTA: src/app/(public)/librerias/page.tsx
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { GaleriaLibreriaModal } from "@/components/public/GaleriaLibreriaModal";

// Fotos de la Librería MSCG de Juxtlahuaca (public/images).
const fotosJuxtlahuaca = Array.from(
  { length: 7 },
  (_, i) => `/images/libreria-Juxtlahuaca${i + 1}.jpeg`,
);

// Fotos de la Librería "La Purísima" de Chila de las Flores (public/images).
const fotosChila = Array.from(
  { length: 13 },
  (_, i) => `/images/libreria-ChiladelasFlores${i + 1}.jpeg`,
);

// Fotos de la Librería MSCG "San José" de Tehuitzingo (public/images).
const fotosTehuitzingo = Array.from(
  { length: 12 },
  (_, i) => `/images/libreria-Tehuitzingo${i + 1}.jpeg`,
);

// Fotos de la Librería "La Providencia" de Acatlán de Osorio (public/images).
const fotosAcatlan = Array.from(
  { length: 29 },
  (_, i) => `/images/libreria-Acatlan${i + 1}.jpeg`,
);

// Fotos de la Librería MSCG del Atrio de la Catedral, Huajuapan (public/images).
// La foto 1 es .png; las demás .jpeg, por eso se listan explícitamente.
const fotosCatedral = [
  "/images/libreria-Catedral1.png",
  "/images/libreria-Catedral2.jpeg",
  "/images/libreria-Catedral3.jpeg",
  "/images/libreria-Catedral4.jpeg",
];

// Fotos de la Librería MSCG Casa Central, Huajuapan (public/images).
const fotosCasaCentral = Array.from(
  { length: 6 },
  (_, i) => `/images/libreria-Casacentral${i + 1}.jpeg`,
);

const slidesHero: SlideHero[] = [
  {
    imagen: "/images/libreriacarrusel1.png",
    categoria: "LIBRERÍAS MSCG",
    titulo: "Fe, cultura y encuentro",
    descripcion:
      "Nuestras librerías son espacios de evangelización con artículos religiosos, libros y recursos espirituales",
  },
  {
    imagen: "/images/libreriacarrusel2.png",
    categoria: "ARTÍCULOS RELIGIOSOS",
    titulo: "Recursos para tu vida espiritual",
    descripcion:
      "Encuentra todo lo que necesitas para nutrir tu fe y la de tu comunidad",
  },
  {
    imagen: "/images/libreriacarrusel3.png",
    categoria: "ENCUENTRO Y SERVICIO",
    titulo: "Más que una librería",
    descripcion:
      "Un espacio de acogida, donde cada visita es una oportunidad de encuentro",
  },
];

type Libreria = {
  nombre: string;
  ciudad: string;
  direccion: string;
  /** Horario de atención en texto libre. Opcional si aún no se confirma. */
  horario?: string;
  /** Teléfonos de contacto (uno o varios). Opcional. */
  telefono?: string[];
  email?: string;
  principal: boolean;
  descripcion: string;
  /** Artículos religiosos que ofrece la librería. */
  productos?: string[];
  /** Fotos de la librería; se muestran en un carrusel dentro de un modal. */
  fotos?: string[];
};

// Artículos compartidos por los dos puntos de la Librería MSCG de Huajuapan
// (Casa Central y Atrio Catedral): cuando falta algo en uno, se surte del otro.
const productosHuajuapan = [
  "Imágenes de bulto",
  "Cuadros de resina y de marco dorado",
  "Cristos y lienzos sagrados",
  "Rosarios, pulseras y escapularios",
  "Medallas, llaveros y separadores",
  "Libros, biblias y novenas",
  "Estampas, cédulas y pósters",
  "Manteles, casullas, albas y juego de altar",
  "Cortinas, floreros y recuerdos",
  "Cálices, copones, vinajeras y relicarios",
  "Incensarios, acetres y vasos ciriales",
  "Cirios, incienso y carbón litúrgico",
  "Bases y varillas para estandarte",
  "Vino de consagrar y material para sacramentos",
];

const librerias: Libreria[] = [
  {
    nombre: 'Librería MSCG "Señor de los Corazones"',
    ciudad: "Juxtlahuaca, Oaxaca",
    direccion: "Lázaro Cárdenas Norte #304, Juxtlahuaca, Oax.",
    horario: "Todos los días: 9:00 – 17:00 h",
    principal: true,
    descripcion:
      "Librería de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe. Un espacio de evangelización donde encontrarás artículos religiosos, imágenes sagradas y todo lo necesario para la vida litúrgica y devocional de tu comunidad.",
    productos: [
      "Imágenes de bulto",
      "Cuadros de resina y de marco dorado",
      "Cristos",
      "Rosarios y pulseras",
      "Libros y novenas",
      "Manteles, casullas, palios y lienzos sagrados",
      "Cálices, vinajeras y relicarios",
      "Material para sacramentos",
      "Cirios y floreros",
      "Bases y varillas para estandarte",
      "Objetos sagrados",
    ],
    fotos: fotosJuxtlahuaca,
  },
  {
    nombre: 'Librería "La Purísima"',
    ciudad: "Chila de las Flores, Puebla",
    direccion:
      "Mercado Municipal, planta alta, a un costado de la parroquia, Chila de las Flores, Pue.",
    horario: "Domingo a viernes: 10:00 – 14:00 h",
    telefono: ["55 6178 3237"],
    principal: false,
    descripcion:
      "Librería de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe en Chila de las Flores. Artículos religiosos y devocionales para acompañar la vida de fe de la comunidad.",
    productos: [
      "Rosarios",
      "Escapularios",
      "Ofrendas",
      "Velas",
      "Artículos de primera comunión",
      "Artículos de confirmación",
      "Pulseras",
      "Libros en variedad",
    ],
    fotos: fotosChila,
  },
  {
    nombre: "Librería MSCG Casa Central",
    ciudad: "Huajuapan de León, Oaxaca",
    direccion: "Matamoros N°13, Colonia Centro, Huajuapan de León, Oax.",
    horario: "Todos los días: 8:00 – 18:00 h",
    principal: false,
    descripcion:
      "Librería de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe en Huajuapan de León. Punto principal con artículos religiosos, objetos litúrgicos y material para sacramentos al servicio de la comunidad.",
    productos: productosHuajuapan,
    fotos: fotosCasaCentral,
  },
  {
    nombre: "Librería MSCG Atrio Catedral",
    ciudad: "Huajuapan de León, Oaxaca",
    direccion: "Atrio de la Catedral, Huajuapan de León, Oax.",
    horario: "Lunes a viernes: 10:00 – 14:00 h y 18:00 – 19:00 h",
    principal: false,
    descripcion:
      "Segundo punto de atención de la Librería MSCG en Huajuapan de León, ubicado en el atrio de la Catedral. Complementa a la Casa Central para acercar los artículos religiosos y litúrgicos a la comunidad.",
    productos: productosHuajuapan,
    fotos: fotosCatedral,
  },
  {
    nombre: 'Librería MSCG "San José"',
    ciudad: "Tehuitzingo, Puebla",
    direccion: "Calle Venustiano Carranza, Tehuitzingo, Pue.",
    horario: "Martes a domingo: 9:00 – 16:00 h",
    principal: false,
    descripcion:
      'Librería de artículos religiosos "San José" de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe en Tehuitzingo. Ofrece imágenes, objetos litúrgicos y material para sacramentos al servicio de la comunidad.',
    productos: [
      "Imágenes y cuadros",
      "Cristos",
      "Rosarios y pulseras",
      "Libros y libros de catequesis escolarizada",
      "Manteles y ornamentos",
      "Cirios y velas para sacramentos",
      "Cáliz, vinajeras y relicario",
      "Incensario e incienso",
      "Campanas",
      "Vino para consagrar y hostias",
      "Objetos litúrgicos",
    ],
    fotos: fotosTehuitzingo,
  },
  {
    nombre: 'Librería "La Providencia"',
    ciudad: "Acatlán de Osorio, Puebla",
    direccion:
      "Calle Revolución #9, Zona Centro, a un costado del templo parroquial de San Juan Bautista, Acatlán de Osorio, Pue.",
    telefono: ["953 534 1283", "953 100 0659"],
    horario:
      "Lun, mar, jue, vie y sáb: 9:30 – 17:00 h · Domingos: 9:30 – 15:00 h",
    principal: false,
    descripcion:
      'Artículos religiosos "La Providencia" de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe en Acatlán de Osorio. Un espacio de evangelización con artículos religiosos y devocionales para la comunidad.',
    // Artículos observados en las fotos de la librería (public/images).
    productos: [
      "Imágenes de bulto y estatuas de santos",
      "Cristos y crucifijos",
      "Cuadros y láminas religiosas",
      "Rosarios y pulseras",
      "Escapularios y medallas",
      "Estampas y cédulas de santos",
      "Libros, biblias y catecismos",
      "Novenas, misales y devocionarios",
      "Manteles y purificadores de altar",
      "Ornamentos litúrgicos",
      "Veladoras y cirios",
      "Artículos para primera comunión y sacramentos",
    ],
    fotos: fotosAcatlan,
  },
  // TODO: agregar las otras 3 librerías (nombre, ciudad, dirección,
  // horario, descripción, productos y fotos). Para las fotos, sube las
  // imágenes a public/images y crea su arreglo igual que `fotosJuxtlahuaca`.
];

export default function Librerias() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

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
                <div className="flex flex-col md:flex-row md:items-stretch">
                  {/* Portada / galería de la librería */}
                  {lib.fotos && lib.fotos.length > 0 && (
                    <div className="p-4 md:w-2/5 md:shrink-0 md:p-5">
                      <GaleriaLibreriaModal imagenes={lib.fotos} titulo={lib.nombre} />
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="flex-1 p-8 grid sm:grid-cols-3 gap-8">
                    {/* Info principal */}
                    <div className="sm:col-span-2">
                      <h3 className="text-2xl font-bold text-azul-institucional mb-1">{lib.nombre}</h3>
                      <p className="text-azul-institucional font-semibold text-sm mb-3">{lib.ciudad}</p>
                      <p className="text-marron text-sm leading-relaxed mb-5">{lib.descripcion}</p>
                      <div className="flex items-start gap-2 text-sm text-marron-suave mb-2">
                        <FaMapMarkerAlt className="mt-0.5 text-azul-institucional shrink-0" />
                        <span>{lib.direccion}</span>
                      </div>
                      {lib.telefono?.map((tel) => (
                        <div key={tel} className="flex items-center gap-2 text-sm text-marron-suave mb-2">
                          <FaPhoneAlt className="text-dorado shrink-0" />
                          <a href={`tel:${tel.replace(/\s+/g, "")}`} className="hover:text-azul-institucional transition-colors">{tel}</a>
                        </div>
                      ))}
                      {lib.email && (
                        <div className="flex items-center gap-2 text-sm text-marron-suave">
                          <FaEnvelope className="text-dorado shrink-0" />
                          <a href={`mailto:${lib.email}`} className="hover:text-azul-institucional transition-colors">{lib.email}</a>
                        </div>
                      )}

                      {/* Artículos que ofrece */}
                      {lib.productos && (
                        <div className="mt-6">
                          <h4 className="font-bold text-azul-institucional mb-3">Artículos que ofrecemos</h4>
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                            {lib.productos.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-sm text-marron-suave">
                                <FaCheck className="mt-0.5 text-dorado shrink-0" size={12} />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Horario */}
                    <div className="bg-crema rounded-2xl p-5 self-start">
                      <h4 className="font-bold text-azul-institucional flex items-center gap-2 mb-4">
                        <FaClock className="text-azul-institucional" size={14} /> Horario de atención
                      </h4>
                      <p className={`text-sm font-medium ${lib.horario ? "text-marron" : "italic text-marron-suave"}`}>
                        {lib.horario ?? "Días y horario por confirmar"}
                      </p>
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
    </div>
  );
}
