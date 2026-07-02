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
  FaQuoteLeft,
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

// Comunidades de la congregación. Debe coincidir con el apartado de
// Comunidades (app/(public)/pastoral-juvenil/page.tsx). En el inicio solo se
// muestra un adelanto (las primeras 6); las que aún no tienen ubicación van al
// final para no mostrarse en ese adelanto.
const comunidades = [
  { nombre: "Comunidad Espíritu Santo", ciudad: "Riaba, Malabo · Guinea Ecuatorial" },
  { nombre: "Comunidad Santa Teresita", ciudad: "San Juan Copala, Juxtlahuaca, Oaxaca" },
  { nombre: "Comunidad Nazaret", ciudad: "Huajuapan de León, Oaxaca" },
  { nombre: "Comunidad San José", ciudad: "Tehuitzingo, Puebla" },
  { nombre: "Comunidad Niño de Praga", ciudad: "Tamazulapam del Progreso, Teposcolula, Oaxaca" },
  { nombre: "Comunidad Luis Fiacro", ciudad: "Isla de Chira, Costa Rica" },
  { nombre: "Comunidad de los Ángeles", ciudad: "Acatlán de Osorio, Puebla" },
  { nombre: "Misioneras del Señor de los Corazones y de Santa María de Guadalupe", ciudad: "Chila de las Flores, Puebla" },
  { nombre: "Comunidad Sagrada Familia", ciudad: "Por confirmar" },
  { nombre: "Comunidad Cuna de Belén", ciudad: "Por confirmar" },
  { nombre: "Comunidad Nuestra Señora del Pilar", ciudad: "Por confirmar" },
];

const librerias = [
  { nombre: 'Librería MSCG "Señor de los Corazones"', ciudad: "Juxtlahuaca, Oax.", horario: "Todos los días 9–17h" },
  { nombre: 'Librería "La Purísima"', ciudad: "Chila de las Flores, Pue.", horario: "Dom–Vie 10–14h" },
  { nombre: "Librería MSCG Casa Central", ciudad: "Huajuapan de León, Oax.", horario: "Todos los días 8–18h" },
  { nombre: "Librería MSCG Atrio Catedral", ciudad: "Huajuapan de León, Oax.", horario: "Lun–Vie 10–14 y 18–19h" },
  { nombre: 'Librería MSCG "San José"', ciudad: "Tehuitzingo, Pue.", horario: "Mar–Dom 9–16h" },
  { nombre: 'Librería "La Providencia"', ciudad: "Acatlán de Osorio, Pue.", horario: "Lun–Sáb 9:30–17h" },
];

const slidesHero: SlideHero[] = [
  {
    imagen: "/images/Principal1.jpeg",
    categoria: "SEÑOR DE LOS CORAZONES",
    titulo: "Una comunidad reunida en oración",
    descripcion:
      "Ante el Señor de los Corazones y Santa María de Guadalupe, renovamos cada día nuestra entrega misionera al servicio de la Iglesia",
  },
  {
    imagen: "/images/Principal3.jpeg",
    categoria: "VIDA EN COMUNIDAD",
    titulo: "Hermanas que caminan juntas",
    descripcion:
      "Nos reunimos como una sola familia para crecer en la fe, formarnos y compartir el carisma que nos une como Congregación",
  },
  {
    imagen: "/images/Principal2.jpeg",
    categoria: "ALEGRÍA FRATERNA",
    titulo: "La alegría de servir a Dios",
    descripcion:
      "Vivimos la vida consagrada con espíritu fraterno y gozoso, sosteniéndonos unas a otras en el camino de la entrega",
  },
  {
    imagen: "/images/Principal4.jpeg",
    categoria: "ÚNETE A NOSOTRAS",
    titulo: "Una llamada que transforma vidas",
    descripcion:
      "Si sientes el llamado a la vida consagrada y misionera, aquí te acompañamos a discernirlo con alegría y esperanza",
  },
  {
    imagen: "/images/principalinicio 1.jpeg",
    categoria: "NUESTRA CONGREGACIÓN",
    titulo: "Un carisma que sigue vivo",
    descripcion:
      "Servimos a la Iglesia con el corazón puesto en Dios y en los más necesitados, fieles al espíritu de nuestras fundadoras",
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
      <div className="relative z-10 bg-crema">
      {/* MENSAJE DE BIENVENIDA · Superiora General. Fondo azul-suave (litúrgico),
          alternando con las secciones crema como el resto del portal. */}
      <section className="bg-azul-suave py-16">
        <div className="max-w-7xl mx-auto px-6">
        <AnimacionScroll>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Foto de la superiora */}
            <div className="mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-arena shadow-md">
                <Image
                  src="/images/Superiora.png"
                  alt="Superiora General de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                  width={1122}
                  height={1402}
                  sizes="(min-width: 640px) 24rem, 80vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm uppercase tracking-widest text-marron-suave">
                Superiora General
              </p>
            </div>

            {/* Mensaje */}
            <div>
              <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">
                Mensaje de bienvenida
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-azul-institucional mt-2 mb-5 leading-tight">
                Un saludo desde el corazón de la Congregación
              </h2>
              <FaQuoteLeft className="text-dorado text-2xl mb-3" />
              <p className="text-marron leading-relaxed mb-4 text-justify">
                Con inmensa alegría les doy la bienvenida a este espacio, donde
                deseamos compartir con ustedes el carisma que Dios ha sembrado en
                nuestro Instituto. Cada rincón de esta casa está animado por el
                amor del Señor de los Corazones y la ternura de Santa María de
                Guadalupe.
              </p>
              <p className="text-marron leading-relaxed mb-6 text-justify">
                Que quienes nos visiten encuentren aquí una familia que ora,
                sirve y camina con esperanza. Los llevamos en nuestra oración,
                confiando en que el Señor siga bendiciendo a cada una de sus
                familias.
              </p>
              <div className="border-t border-arena pt-4">
                <p className="font-display text-lg font-bold text-azul-institucional">
                  M. Celia Teodora Corro Salazar
                </p>
                <span className="text-xs uppercase tracking-wide text-marron-suave">
                  Superiora General · MSCG
                </span>
              </div>
            </div>
          </div>
        </AnimacionScroll>
        </div>
      </section>

      {/* BIENVENIDA / CARISMA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimacionScroll>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-azul-institucional mt-2 mb-5 leading-tight">
              Un carisma vivo al
              <br />
              servicio del Reino de Dios
            </h2>
            <p className="text-marron leading-relaxed mb-4 text-justify">
              Somos el <strong className="text-marron">Instituto de Misioneras del Señor de los
              Corazones y de Santa María de Guadalupe</strong>, una congregación religiosa fundada
              el 12 de mayo de 1957 en Huajuapan de León, Oaxaca, por el Pbro. Lic. Luis Fiacro
              Guerrero Ramírez.
            </p>
            {/* Carisma resaltado: etiqueta en caligrafía (font-script) y el
                texto en la tipografía de títulos, con frases clave en oro. */}
            <div className="mb-6 rounded-2xl border border-dorado/30 bg-dorado-suave/40 p-6">
              <p className="font-script text-3xl leading-none text-dorado-oscuro">
                Nuestro carisma
              </p>
              <p className="font-titulo text-marron text-xl md:text-2xl leading-relaxed mt-3">
                Ser <span className="font-semibold text-dorado-oscuro">misioneras</span>, viviendo el{" "}
                <span className="font-semibold text-dorado-oscuro">amor oblativo del Señor de los Corazones</span>,
                llevando con alegría la semilla del Evangelio preferencialmente a los más necesitados a
                ejemplo de <span className="font-semibold text-dorado-oscuro">Santa María de Guadalupe</span>,
                para gloria de Dios y edificación de la Iglesia.
              </p>
            </div>
            <div className="bg-azul-institucional/10 border-l-4 border-azul-institucional pl-4 py-3 rounded-r-lg mb-6">
              <p className="font-display text-lg italic text-marron">
                «Alegrémonos de sufrir por Cristo en favor de su Iglesia»
              </p>
              <span className="text-xs text-marron-suave uppercase tracking-wide">Nuestro lema</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-azul-suave text-marron px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaCross className="text-azul-institucional" /> Señor de los Corazones
              </span>
              <span className="bg-azul-suave text-marron px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaStar className="text-dorado" /> Santa María de Guadalupe
              </span>
              <span className="bg-azul-suave text-marron px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaUsers className="text-azul-institucional" /> Vida misionera
              </span>
            </div>
          </div>

          {/* Cards de carisma + foto */}
          <div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <FaGlobeAmericas />, title: "Misión", desc: "Llevar el Evangelio a los pueblos de la Diócesis y más allá" },
              { icon: <FaGraduationCap />, title: "Educación", desc: "Formar a la niñez y la juventud desde los valores del Evangelio" },
              { icon: <FaHandHoldingHeart />, title: "Servicio", desc: "Presencia cercana a quienes más lo necesitan" },
              { icon: <FaDove />, title: "Entrega", desc: "Sufrir por Cristo en favor de su Iglesia, con alegría" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl p-5 shadow-sm border border-arena hover:shadow-md transition-shadow"
              >
                <div className="text-azul-institucional mb-2 text-2xl">{c.icon}</div>
                <h4 className="font-display font-bold text-azul-institucional mb-1 text-lg">{c.title}</h4>
                <p className="text-xs text-marron-suave leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Foto del carisma, bajo las tarjetas */}
          <div className="mt-4 overflow-hidden rounded-xl border border-arena shadow-sm">
            <Image
              src="/images/inicio 12.jpeg"
              alt="Misioneras del Señor de los Corazones en misión"
              width={1280}
              height={720}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          </div>
        </div>
        </AnimacionScroll>
      </section>

      {/* FUNDADORES */}
      <section className="bg-azul-suave py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimacionScroll>
            <div className="text-center mb-12">
              <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Nuestras raíces</span>
              <h2 className="font-display text-3xl font-bold text-azul-institucional mt-2">Fundadores e inspiradores</h2>
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
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-arena text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-[110px] h-[110px] overflow-hidden rounded-full border-4 border-arena shadow-inner">
                      <Image
                        src={f.foto}
                        alt={f.nombre}
                        fill
                        sizes="110px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-azul-institucional text-lg mb-1">{f.nombre}</h3>
                  <span className="text-xs text-azul-institucional font-semibold uppercase tracking-wide">{f.rol}</span>
                  <p className="text-marron text-sm leading-relaxed mt-3 text-justify">{f.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-azul-institucional mt-2">Áreas pastorales</h2>
            <p className="text-marron-suave mt-3 max-w-xl mx-auto">
              Nuestra misión se despliega en cuatro grandes áreas que abarcan todos los momentos de la vida.
            </p>
          </div>
        </AnimacionScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <AnimacionScroll key={area.title} delay={i * 90} className="h-full">
            <Link
              href={area.href}
              className="group flex h-full flex-col bg-white rounded-2xl p-6 shadow-sm border border-arena hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`${area.color} text-white rounded-xl p-3 inline-flex mb-4 group-hover:scale-110 transition-transform`}
              >
                {area.icon}
              </div>
              <h3 className="font-display font-bold text-azul-institucional mb-2 leading-snug">{area.title}</h3>
              <p className="text-sm text-marron-suave leading-relaxed mb-4">{area.desc}</p>
              <span className="mt-auto text-azul-institucional text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Conocer más <FaArrowRight size={12} />
              </span>
            </Link>
            </AnimacionScroll>
          ))}
        </div>
      </section>

      {/* SEDES — claro */}
      <section className="bg-azul-suave py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimacionScroll>
            <div className="text-center mb-12">
              <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Presencia</span>
              <h2 className="font-display text-3xl font-bold text-azul-institucional mt-2">Nuestras comunidades</h2>
              <p className="text-marron-suave mt-2">Una congregación con presencia en México y el extranjero</p>
            </div>
          </AnimacionScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comunidades.slice(0, 6).map((com, i) => (
              <AnimacionScroll key={com.nombre} delay={i * 90}>
                <div className="bg-white border border-arena rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-azul-institucional mt-1 shrink-0" />
                    <div>
                      <p className="text-marron font-semibold">{com.nombre}</p>
                      <p className="text-marron-suave text-sm">{com.ciudad}</p>
                    </div>
                  </div>
                </div>
              </AnimacionScroll>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pastoral-juvenil"
              className="inline-flex items-center gap-2 text-azul-institucional font-semibold hover:underline"
            >
              Ver todas las comunidades <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* LIBRERÍAS preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimacionScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Librerías</span>
            <h2 className="font-display text-3xl font-bold text-azul-institucional mt-2 mb-4">
              Espacios de fe,
              <br />
              cultura y encuentro
            </h2>
            <p className="text-marron leading-relaxed mb-6 text-justify">
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
            {librerias.slice(0, 3).map((lib) => (
              <div
                key={lib.nombre}
                className="bg-white border border-arena rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-dorado/10 rounded-lg p-3 shrink-0">
                  <FaBook className="text-dorado" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-marron">{lib.nombre}</p>
                  <p className="text-sm text-marron-suave">
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
      <section className="bg-azul-suave py-16">
        <AnimacionScroll className="max-w-3xl mx-auto px-6 text-center">
          <FaChurch size={40} className="text-azul-institucional/70 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-azul-institucional mb-4">
            ¿Sientes el llamado a la vida misionera consagrada?
          </h2>
          <p className="text-marron text-lg mb-8">
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
              className="border-2 border-azul-institucional text-azul-institucional hover:bg-azul-institucional/10 px-7 py-3 rounded-lg font-bold transition-colors"
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