// RUTA: src/app/(public)/pastoral-misionera/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUsers,
  FaHeart,
  FaBook,
  FaHome,
  FaStar,
  FaCross,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { GaleriaMisionera } from "@/components/public/GaleriaMisionera";

// Fotos de la galería "La misión en imágenes" (en /public/images).
// Todas son .jpeg salvo la 2, que es .png.
const imagenesGaleria = Array.from({ length: 14 }, (_, i) => {
  const n = i + 1;
  const ext = n === 2 ? "png" : "jpeg";
  return `/images/pastoral-misionera${n}.${ext}`;
});

const slidesHero: SlideHero[] = [
  {
    imagen: "/images/pastoral-misionera1.jpeg",
    categoria: "PASTORAL MISIONERA",
    titulo: "Id por todo el mundo y predicad el Evangelio",
    descripcion:
      "Llevamos con alegría la semilla del Evangelio preferencialmente a los más necesitados, a ejemplo de Santa María de Guadalupe",
  },
  {
    imagen: "/images/pastoral-misionera6.jpeg",
    categoria: "NUESTRO CARISMA",
    titulo: "Misionero, Oblativo, Liberador",
    descripcion:
      "Ser misioneras, viviendo el amor oblativo del Señor de los Corazones, llevando con alegría la semilla del Evangelio preferencialmente a los más necesitados a ejemplo de Santa María de Guadalupe, para gloria de Dios y edificación de la Iglesia.",
  },
  {
    imagen: "/images/pastoral-misionera11.jpeg",
    categoria: "OBJETIVO GENERAL",
    titulo: "Transmitir el mensaje con dinamismo y alegría",
    descripcion:
      "Fortalecer y vivir el espíritu misionero de la MSCG desde la Palabra de Dios, el Magisterio de la Iglesia y nuestras Constituciones",
  },
];

const programas = [
  {
    icon: <FaHome size={22} />,
    titulo: "Casa de estudiantes",
    desc: "Ambiente acogedor, cercano y familiar para el crecimiento integral de jóvenes y niños, con un método transversal desde el carisma MSCG. (Art. 74)",
  },
  {
    icon: <FaUsers size={22} />,
    titulo: "Pueblos indígenas",
    desc: "Acompañamiento e inculturación del Evangelio en comunidades originarias, fortaleciendo sus culturas y lenguas originarias. (Art. 75)",
  },
  {
    icon: <FaHeart size={22} />,
    titulo: "Pastoral familiar",
    desc: "Visita a familias en sus hogares, acompañándoles en alegría y tristeza con novenarios, rosarios y orientación familiar. (Art. 76)",
  },
  {
    icon: <FaBook size={22} />,
    titulo: "Pastoral juvenil",
    desc: "Itinerario en tres etapas: iniciación, profundización y compromiso, en las áreas de formación, acción y espiritualidad. (Art. 77-78)",
  },
];

export default function PastoralMisionera() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

      {/* MISIÓN — misma composición editorial (foto al costado, cita como
          pieza central y programas en franja con filetes) pero abierta sobre
          el fondo claro de la página, sin panel que la encierre. Así se
          distingue del "Quiénes somos" del inicio (tarjetas 2×2). */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          {/* Foto alta que acompaña todo el texto */}
          <div className="relative min-h-72 overflow-hidden rounded-3xl shadow-md lg:min-h-full">
            <Image
              src="/images/pastoral-misionera.png"
              alt="Hermanas MSCG en misión"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2 mb-6 leading-snug">
              Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe
            </h2>
            <p className="text-marron leading-relaxed mb-4 text-justify">
              El Proyecto Misionero tiene como fin principal suscitar el espíritu misionero de la MSCG.
              Es un Proyecto colegial, respecto a una de las dos vertientes de nuestro carisma. A través
              de este Proyecto, también queremos alcanzar que la MSCG transmita el mensaje evangélico
              con dinamismo, alegría y oblación.
            </p>
            <p className="text-marron leading-relaxed mb-8 text-justify">
              Es una herramienta que se brinda a la Congregación para unificar criterios en la realización
              de la misión desde las etapas iniciales de formación. Todas las hermanas en las misiones den
              a conocer los valores del Reino que son las riquezas del Señor de los Corazones, y el amor
              maternal de Santa María de Guadalupe.
            </p>
            {/* Cita bíblica como pieza central, con filete dorado */}
            <div className="border-t border-dorado/40 pt-6">
              <p className="font-titulo text-dorado-oscuro text-xl md:text-2xl leading-relaxed">
                «Id por todo el mundo y predicad el Evangelio a toda criatura»
              </p>
              <span className="mt-2 block text-xs uppercase tracking-widest text-marron-suave">
                Cfr. Mc. 16, 15
              </span>
            </div>
          </div>
        </div>

        {/* Programas: franja horizontal con filetes finos (gap-px), abierta
            sobre el fondo de la página. */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-arena bg-arena sm:grid-cols-2 lg:grid-cols-4">
          {programas.map((p) => (
            <div key={p.titulo} className="bg-crema p-6">
              <div className="text-dorado mb-3">{p.icon}</div>
              <h4 className="font-bold text-azul-institucional text-sm mb-1">{p.titulo}</h4>
              <p className="text-xs text-marron-suave leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OBJETIVOS */}
      <section className="bg-azul-suave py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Nuestro norte</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2">Objetivos de la pastoral misionera</h2>
            <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-justify">
              «Fortalecer y vivir el espíritu misionero de la MSCG, desde la Palabra de Dios, el Magisterio
              de la Iglesia y de nuestras Constituciones, para transmitir con dinamismo, alegría y espíritu
              de oblación, el mensaje evangelizador a todos nuestros hermanos.»
            </p>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-arena">
              <div className="flex items-center gap-3 mb-3">
                <FaBook className="text-azul-institucional" size={18} />
                <h3 className="font-bold text-azul-institucional">Constituciones y Directorio</h3>
              </div>
              <p className="text-sm text-marron-suave text-justify">
                Suscitar en las hermanas el estudio y profundización de las Constituciones y Directorio
                propio, a fin de despertar el espíritu misionero.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-arena">
              <div className="flex items-center gap-3 mb-3">
                <FaUsers className="text-azul-institucional" size={18} />
                <h3 className="font-bold text-azul-institucional">Identidad MSCG</h3>
              </div>
              <p className="text-sm text-marron-suave text-justify">
                Estudiar a profundidad la identidad de la MSCG para fortalecer la entrega en la misión
                y transmitir el mensaje con dinamismo, alegría y oblación.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-arena">
              <div className="flex items-center gap-3 mb-3">
                <FaStar className="text-azul-institucional" size={18} />
                <h3 className="font-bold text-azul-institucional">Sagrada Escritura y Magisterio</h3>
              </div>
              <p className="text-sm text-marron-suave text-justify">
                Despertar en la MSCG la importancia del estudio de la Sagrada Escritura, el Magisterio
                de la Iglesia y los documentos de la Congregación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORIDADES MISIONERAS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Evangelización</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">Prioridades misioneras de las MSCG</h2>
          <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-justify">
            La educación cristiana, la cultura y la solidaridad con los pobres, los discriminados,
            los marginados y oprimidos: nuestra tarea primordial.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-marron leading-relaxed mb-5 text-justify">
              La Congregación MSCG tiene como misión fundamental evangelizar, proclamando la Buena
              Nueva del Evangelio a los más necesitados. Esta tarea abarca un proceso integral de
              formación, acompañamiento y crecimiento espiritual, enfrentando desafíos como el
              relativismo moral, la individualización de la Fe y la crisis de valores.
            </p>
            <p className="text-marron leading-relaxed mb-5 text-justify">
              El Papa Francisco aprobó el Directorio para la catequesis el 23 de marzo de 2020,
              ofreciendo los principios teológico-pastorales fundamentales para la enseñanza de la
              catequesis y la misión evangelizadora de la Iglesia.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-arena">
              <div className="flex items-center gap-3 mb-4">
                <FaCross className="text-azul-institucional" size={16} />
                <h3 className="font-bold text-azul-institucional">Obras Misionales Pontificias (Art. 79)</h3>
              </div>
              <p className="text-sm text-marron-suave mb-4 text-justify">
                Desde el VII Capítulo General (2019), la Congregación MSCG se ha apropiado de tres aspectos:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-dorado mt-1 flex-shrink-0" size={13} />
                  <p className="text-sm text-marron-suave text-justify">
                    Promover el espíritu de misión universal en la Iglesia que peregrina en México.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-dorado mt-1 flex-shrink-0" size={13} />
                  <p className="text-sm text-marron-suave text-justify">
                    Cooperar en la preparación de animadores misioneros que trabajen en las Iglesias particulares.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-dorado mt-1 flex-shrink-0" size={13} />
                  <p className="text-sm text-marron-suave text-justify">
                    Cooperar en el incremento de las vocaciones misioneras nativas.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                num: "1",
                titulo: "Casa de estudiantes — Art. 74",
                desc: "Las religiosas MSCG procuren aportar un ambiente acogedor, cercano, tranquilo y familiar para el desarrollo de los estudios, con herramientas que ayuden al crecimiento integral de jóvenes y niños mediante un método transversal.",
              },
              {
                num: "2",
                titulo: "Indígenas — Art. 75",
                desc: "Acompañamiento y formación integral en la inserción e inculturación del Evangelio. Las hermanas esfuércense en luchar contra la pobreza, ayudándoles a fortalecer sus culturas y lenguas originarias.",
              },
              {
                num: "3",
                titulo: "Familia — Art. 76",
                desc: "Visitar a las familias en sus casas, acompañándoles tanto en sus momentos de alegría como de tristeza, con novenarios, rosarios y orientación familiar.",
              },
              {
                num: "4",
                titulo: "Jóvenes — Art. 77 y 78",
                desc: "Itinerario de pastoral juvenil en tres áreas: formación, acción y espiritualidad, construido a través de las etapas de iniciación, profundización y compromiso.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-2xl p-5 shadow-sm border border-arena flex gap-4">
                <span className="text-2xl font-black text-dorado/40 leading-none">{item.num}</span>
                <div>
                  <h4 className="font-bold text-azul-institucional text-sm mb-1">{item.titulo}</h4>
                  <p className="text-xs text-marron-suave leading-relaxed text-justify">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA DE IMÁGENES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Testimonio</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">La misión en imágenes</h2>
          <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-center">
            Momentos de nuestras hermanas misioneras llevando con alegría la semilla del Evangelio a los más necesitados.
          </p>
        </div>

        <GaleriaMisionera imagenes={imagenesGaleria} />
      </section>

      {/* CTA */}
      <section className="bg-azul-oscuro py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Quieres sumarte a la misión?</h2>
          <p className="text-white/75 mb-8 text-justify">
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
    </div>
  );
}