// RUTA: app/(public)/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Lora } from "next/font/google";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";
import {
  FaCross,
  FaBook,
  FaGlobeAmericas,
  FaUsers,
  FaStar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChurch,
  FaDove,
  FaHandHoldingHeart,
  FaGraduationCap,
} from "react-icons/fa";

// Tipografía serif elegante para los títulos
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

const areas = [
  {
    icon: <FaDove size={28} />,
    title: "Pastoral Vocacional",
    desc: "Acompañamos a quienes sienten el llamado a la vida consagrada y misionera, discerniendo juntos el camino hacia la entrega a Dios.",
    href: "/pastoral-vocacional",
    color: "bg-azul-institucional",
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "Pastoral Educativa",
    desc: "Formamos personas íntegras en nuestros jardines y programas educativos, sembrando valores evangélicos desde la infancia.",
    href: "/pastoral-educativa",
    color: "bg-dorado",
  },
  {
    icon: <FaGlobeAmericas size={28} />,
    title: "Pastoral Misionera",
    desc: "Llevamos la semilla del Evangelio a los pueblos y comunidades más alejados de la Diócesis, con espíritu misionero y servicio generoso.",
    href: "/pastoral-misionera",
    color: "bg-azul-institucional",
  },
  {
    icon: <FaHandHoldingHeart size={28} />,
    title: "Comunidades",
    desc: "Caminamos con los jóvenes en su búsqueda de sentido, fe y compromiso, animando su protagonismo en la Iglesia.",
    href: "/pastoral-juvenil",
    color: "bg-dorado",
  },
];

const sedes = [
  { ciudad: "Huajuapan de León, Oaxaca", nombre: "Casa General", tipo: "Casa fundadora · 1957" },
  { ciudad: "San Juan Copala, Oaxaca", nombre: "Comunidad Santa Teresita", tipo: "1ª fundación · 1964" },
  { ciudad: "Huajuapan de León, Oaxaca", nombre: "Jardines La Paz y Porvenir", tipo: "2ª fundación · 1966" },
  { ciudad: "Tamazulapan del Progreso, Oaxaca", nombre: "Comunidad Niño de Praga", tipo: "4ª fundación · 1979" },
  { ciudad: "Santiago Juxtlahuaca, Oaxaca", nombre: "Instituto Teresa de Cepeda y Ahumada", tipo: "10ª fundación · 1997" },
  { ciudad: "El Molino, Huajuapan de León", nombre: "Casa Noviciado «Elisa María»", tipo: "Casa de Noviciado · 2005" },
];

const librerias = [
  { nombre: "Librería San Francisco", ciudad: "CDMX Centro", horario: "Lun–Sáb 9–18h" },
  { nombre: "Librería La Porciúncula", ciudad: "Guadalajara", horario: "Lun–Vie 9–17h" },
  { nombre: "Librería Paz y Bien", ciudad: "Monterrey", horario: "Lun–Sáb 10–18h" },
];

const slidesHero: SlideHero[] = [
  {
    imagen: "/images/hero-vida-consagrada.jpg",
    categoria: "SEÑOR DE LOS CORAZONES",
    titulo: "Misioneras al servicio de la Iglesia",
    descripcion:
      "Damos a conocer las riquezas de Jesucristo, Rey y Señor de los Corazones, y el amor maternal de Santa María de Guadalupe",
  },
  {
    imagen: "/images/hero-dispensario.jpg",
    categoria: "NUESTRA MISIÓN",
    titulo: "Sirviendo donde más se necesita",
    descripcion:
      "Llevamos la semilla del Evangelio a los pueblos de la Diócesis de Huajuapan y más allá, con los pies en la tierra y el corazón en Dios",
  },
  {
    imagen: "/images/hero-paseo-hermanas.jpg",
    categoria: "ÚNETE A NOSOTRAS",
    titulo: "Una llamada que transforma vidas",
    descripcion:
      "Si sientes el llamado a la vida consagrada y misionera, aquí te acompañamos a discernirlo",
  },
];

export default function Home() {
  // El contenedor raíz no lleva fondo opaco: taparía el hero fijo (-z-10).
  // El fondo crema lo aportan la capa de contenido y el footer.
  return (
    <div className={lora.variable}>
      {/* Serif solo para los títulos */}
      <style>{`
        .font-display { font-family: var(--font-lora), Georgia, serif; }
      `}</style>

      {/* HERO — modo fondoFijo: SOLO las imágenes quedan fijas (fondo a pantalla
          completa detrás de todo). La caja de texto y los controles van en el
          flujo normal de la sección, así suben al hacer scroll mientras la imagen
          permanece quieta y el menú/contenido se desplazan por encima.
          La altura de la sección controla cuánta imagen se ve antes del contenido. */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza por encima de la imagen fija. */}
      <div className="relative z-10 bg-[#FAF7F2]">
      {/* BIENVENIDA / CARISMA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimacionScroll>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3B2314] mt-2 mb-5 leading-tight">
              Un carisma vivo al
              <br />
              servicio del Reino de Dios
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-4 text-justify">
              Somos el <strong className="text-[#3B2314]">Instituto de Misioneras del Señor de los
              Corazones y de Santa María de Guadalupe</strong>, una congregación religiosa fundada
              el 12 de mayo de 1957 en Huajuapan de León, Oaxaca, por el Pbro. Lic. Luis Fiacro
              Guerrero Ramírez.
            </p>
            <p className="text-[#5A4232] leading-relaxed mb-6 text-justify">
              Nuestro carisma es ser en la Iglesia miembros activos en la construcción del Reino de
              Dios, mediante el dar a conocer a nuestros hermanos las riquezas de Jesucristo Rey y
              Señor de los Corazones y el amor maternal de Santa María de Guadalupe.
            </p>
            <div className="bg-azul-institucional/10 border-l-4 border-azul-institucional pl-4 py-3 rounded-r-lg mb-6">
              <p className="font-display text-lg italic text-[#3B2314]">
                «Alegrémonos de sufrir por Cristo en favor de su Iglesia»
              </p>
              <span className="text-xs text-[#7A6352] uppercase tracking-wide">Nuestro lema</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaCross className="text-azul-institucional" /> Señor de los Corazones
              </span>
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaStar className="text-dorado" /> Santa María de Guadalupe
              </span>
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaUsers className="text-azul-institucional" /> Vida misionera
              </span>
            </div>
          </div>

          {/* Cards de carisma */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <FaGlobeAmericas />, title: "Misión", desc: "Llevar el Evangelio a los pueblos de la Diócesis y más allá" },
              { icon: <FaGraduationCap />, title: "Educación", desc: "Formar a la niñez y la juventud desde los valores del Evangelio" },
              { icon: <FaHandHoldingHeart />, title: "Servicio", desc: "Presencia cercana a quienes más lo necesitan" },
              { icon: <FaDove />, title: "Entrega", desc: "Sufrir por Cristo en favor de su Iglesia, con alegría" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#E4D7BC] hover:shadow-md transition-shadow"
              >
                <div className="text-azul-institucional mb-2 text-2xl">{c.icon}</div>
                <h4 className="font-display font-bold text-[#3B2314] mb-1 text-lg">{c.title}</h4>
                <p className="text-xs text-[#7A6352] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </AnimacionScroll>
      </section>

      {/* FUNDADORES */}
      <section className="bg-[#F0EAE0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimacionScroll>
            <div className="text-center mb-12">
              <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Nuestras raíces</span>
              <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2">Fundadores e inspiradores</h2>
            </div>
          </AnimacionScroll>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                nombre: "Pbro. Lic. Luis Fiacro Guerrero Ramírez",
                rol: "Nuestro Padre Fundador",
                desc: "Inició el Instituto el 12 de mayo de 1957 en Huajuapan de León, Oaxaca, con el deseo de formar religiosas misioneras para la Diócesis.",
                foto: "/images/fundador.jpeg",
              },
              {
                nombre: "Madre Elisa María del Sagrado Corazón",
                rol: "Primera Superiora General y Formadora",
                desc: "Carmelita Misionera de Santa Teresa que acompañó a la Congregación durante 22 años, hasta su muerte en 1980.",
                foto: "/images/madre-elisa.jpeg",
              },
            ].map((f, i) => (
              <AnimacionScroll key={f.nombre} delay={i * 120}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#E4D7BC] text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-[110px] h-[110px] overflow-hidden rounded-full border-4 border-[#F0EAE0] shadow-inner">
                      <Image
                        src={f.foto}
                        alt={f.nombre}
                        fill
                        sizes="110px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-[#3B2314] text-lg mb-1">{f.nombre}</h3>
                  <span className="text-xs text-azul-institucional font-semibold uppercase tracking-wide">{f.rol}</span>
                  <p className="text-[#5A4232] text-sm leading-relaxed mt-3 text-justify">{f.desc}</p>
                </div>
              </AnimacionScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS PASTORALES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimacionScroll>
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Lo que hacemos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3B2314] mt-2">Áreas pastorales</h2>
            <p className="text-[#7A6352] mt-3 max-w-xl mx-auto">
              Nuestra misión se despliega en cuatro grandes áreas que abarcan todos los momentos de la vida.
            </p>
          </div>
        </AnimacionScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <AnimacionScroll key={area.title} delay={i * 90} className="h-full">
            <Link
              href={area.href}
              className="group flex h-full flex-col bg-white rounded-2xl p-6 shadow-sm border border-[#E4D7BC] hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`${area.color} text-white rounded-xl p-3 inline-flex mb-4 group-hover:scale-110 transition-transform`}
              >
                {area.icon}
              </div>
              <h3 className="font-display font-bold text-[#3B2314] mb-2 leading-snug">{area.title}</h3>
              <p className="text-sm text-[#7A6352] leading-relaxed mb-4">{area.desc}</p>
              <span className="mt-auto text-azul-institucional text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Conocer más <FaArrowRight size={12} />
              </span>
            </Link>
            </AnimacionScroll>
          ))}
        </div>
      </section>

      {/* SEDES — claro */}
      <section className="bg-[#F0EAE0] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimacionScroll>
            <div className="text-center mb-12">
              <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Presencia</span>
              <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2">Nuestras comunidades</h2>
              <p className="text-[#7A6352] mt-2">Una congregación con presencia en México y el extranjero</p>
            </div>
          </AnimacionScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sedes.map((sede, i) => (
              <AnimacionScroll key={sede.nombre} delay={i * 90}>
                <div className="bg-white border border-[#E4D7BC] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-azul-institucional mt-1 shrink-0" />
                    <div>
                      <p className="text-[#3B2314] font-semibold">{sede.nombre}</p>
                      <p className="text-[#7A6352] text-sm">{sede.ciudad}</p>
                      <span className="inline-block mt-1 text-xs bg-[#E4D7BC] text-azul-institucional px-2 py-0.5 rounded-full">
                        {sede.tipo}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimacionScroll>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRERÍAS preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimacionScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Librerías</span>
            <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2 mb-4">
              Espacios de fe,
              <br />
              cultura y encuentro
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-6 text-justify">
              Nuestras librerías son mucho más que puntos de venta: son lugares de
              encuentro, formación y evangelización. Encontrarás libros, artículos religiosos,
              música y recursos para tu vida espiritual.
            </p>
            <Link
              href="/librerias"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-oscuro text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver todas las librerías <FaArrowRight />
            </Link>
          </div>
          <div className="space-y-3">
            {librerias.map((lib) => (
              <div
                key={lib.nombre}
                className="bg-white border border-[#E4D7BC] rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-dorado/10 rounded-lg p-3 shrink-0">
                  <FaBook className="text-dorado" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-[#3B2314]">{lib.nombre}</p>
                  <p className="text-sm text-[#7A6352]">
                    {lib.ciudad} · {lib.horario}
                  </p>
                </div>
              </div>
            ))}
            <Link href="/librerias" className="block text-center text-sm text-azul-institucional font-semibold hover:underline mt-2">
              Ver más librerías →
            </Link>
          </div>
        </div>
        </AnimacionScroll>
      </section>

      {/* CTA final — suave */}
      <section className="bg-[#E4D7BC] py-16">
        <AnimacionScroll className="max-w-3xl mx-auto px-6 text-center">
          <FaChurch size={40} className="text-azul-institucional/70 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-[#3B2314] mb-4">
            ¿Sientes el llamado a la vida misionera consagrada?
          </h2>
          <p className="text-[#5A4232] text-lg mb-8">
            Acompáñanos en este camino de fe, entrega y servicio misionero. Siempre hay un lugar para ti.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pastoral-vocacional"
              className="bg-azul-institucional hover:bg-azul-oscuro text-white px-7 py-3 rounded-lg font-bold transition-colors"
            >
              Descubrir la vocación
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314]/10 px-7 py-3 rounded-lg font-bold transition-colors"
            >
              Escríbenos
            </Link>
          </div>
        </AnimacionScroll>
      </section>
      </div>
    </div>
  );
}