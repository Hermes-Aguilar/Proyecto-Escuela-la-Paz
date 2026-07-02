// RUTA: src/app/(public)/librerias/page.tsx
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import {
  DirectorioLibrerias,
  type Libreria,
} from "@/components/public/DirectorioLibrerias";

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
    corto: "Señor de los Corazones",
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
    corto: "La Purísima",
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
    corto: "Casa Central",
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
    corto: "Atrio Catedral",
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
    corto: "San José",
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
    corto: "La Providencia",
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
            <p className="text-marron-suave mt-3 max-w-xl mx-auto">
              Elige una librería de la lista para ver sus fotos, horarios, datos de
              contacto y los artículos que ofrece.
            </p>
          </div>

          <DirectorioLibrerias librerias={librerias} />
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
