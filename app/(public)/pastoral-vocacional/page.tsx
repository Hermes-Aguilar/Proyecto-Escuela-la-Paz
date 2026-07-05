// RUTA: src/app/(public)/pastoral-vocacional/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  FaBook,
  FaChurch,
  FaCompass,
  FaEnvelope,
  FaHandsHelping,
  FaLeaf,
  FaPhoneAlt,
  FaPlay,
  FaPray,
  FaQuoteLeft,
  FaSeedling,
  FaYoutube,
} from "react-icons/fa";
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { GaleriaMisionera } from "@/components/public/GaleriaMisionera";

// Carrusel del hero (orden acordado: 3 → 1 → 5 → 7).
const slidesHero: SlideHero[] = [
  {
    imagen: "/images/Pastoral3.jpeg",
    categoria: "PASTORAL VOCACIONAL",
    titulo: "Ven y sígueme",
    descripcion:
      "«Ser misionero ha sido una llamita que ha iluminado mi vida y calentado mi corazón» — N.P.F. Luis Fiacro Guerrero",
  },
  {
    imagen: "/images/Pastoral1.jpeg",
    categoria: "NUESTRA CONVICCIÓN",
    titulo: "Todas somos promotoras vocacionales",
    descripcion:
      "Promovemos el nacimiento, crecimiento, discernimiento y acompañamiento de la vocación a la que Dios llama a cada persona, para que le responda con certeza y fidelidad",
  },
  {
    imagen: "/images/Pastoral5.jpeg",
    categoria: "LA REGLA DE ORO",
    titulo: "Venid y veréis (Jn 1,39)",
    descripcion:
      "La invitación de Jesús sigue siendo hoy la regla de oro de la pastoral vocacional: presentar el atractivo de la persona del Señor Jesús y la belleza de la entrega total a la causa del Evangelio",
  },
  {
    imagen: "/images/Pastoral7.jpeg",
    categoria: "VIDA DE ORACIÓN",
    titulo: "Orad al dueño de la mies (Mt 9,38)",
    descripcion:
      "La vocación es un don de Dios: la llamada y la respuesta solo pueden resonar y hacerse sentir en la oración",
  },
];

// Los cuatro momentos que la Congregación promueve en toda vocación.
const momentos = [
  {
    icon: <FaSeedling size={20} />,
    titulo: "Nacimiento",
    desc: "Despertar la inquietud vocacional dando a conocer nuestro carisma con la palabra y el ejemplo.",
  },
  {
    icon: <FaLeaf size={20} />,
    titulo: "Crecimiento",
    desc: "Alimentar la respuesta a los impulsos que el Espíritu inspira en cada corazón.",
  },
  {
    icon: <FaCompass size={20} />,
    titulo: "Discernimiento",
    desc: "Ayudar a descubrir el sentido de la vida y el proyecto que Dios tiene para cada uno.",
  },
  {
    icon: <FaHandsHelping size={20} />,
    titulo: "Acompañamiento",
    desc: "Acompañar cuidadosamente a todos los que el Señor llama en su proceso de discernimiento.",
  },
];

// Fundamentos del plan "Ven y sígueme".
const fundamentosPlan = [
  {
    icon: <FaBook size={18} />,
    titulo: "Planeación Participativa",
    desc: "Tomamos como modelo los Pasos de una Planeación Participativa ofrecido por nuestra Diócesis (2016), analizando y reflexionando la realidad de la pastoral vocacional en la Congregación.",
  },
  {
    icon: <FaChurch size={18} />,
    titulo: "VII Capítulo General",
    desc: "Consideramos el documento Plan de Animación Vocacional emanado del VII Capítulo General, dando a conocer nuestro carisma.",
  },
  {
    icon: <FaPray size={18} />,
    titulo: "Nuestros intercesores",
    desc: "Confiamos en la valiosa intercesión de San José, Patrono de las vocaciones, y en Nuestro Padre Fundador, presbítero Lic. Luis Fiacro Guerrero Ramírez.",
  },
];

// Voces de la Iglesia y de la Congregación sobre la pastoral vocacional.
const citas = [
  {
    fuente: "Const. 64",
    texto:
      "Nuestro apostolado principal es el testimonio de nuestra vida consagrada, que fomentamos con la oración y la penitencia. Esmérense las hermanas en vivir su consagración, siguiendo a Jesús y dando testimonio de vida evangélica en el mundo.",
  },
  {
    fuente: "VC 64",
    texto:
      "El problema de las vocaciones es un auténtico desafío que interpela directamente a los Institutos, pero que concierne a toda la Iglesia. En el campo de la pastoral vocacional se invierten muchas energías espirituales y materiales, aunque los resultados no siempre corresponden a las expectativas y a los esfuerzos realizados.",
  },
  {
    fuente: "VC 64",
    texto:
      "Es preciso que la tarea de promover las vocaciones se desarrolle de manera que aparezca cada vez más como un compromiso coral de toda la Iglesia. Se requiere, por tanto, la colaboración activa de pastores, religiosos, familias y educadores. Esta colaboración activa de todo el Pueblo de Dios, sostenida por la Providencia, suscitará sin duda la abundancia de los dones divinos.",
  },
  {
    fuente: "Const. 74",
    texto:
      "En el instituto se tiene la tarea de evangelizar a los jóvenes, este es un sector que necesita ser atendido de forma integral. Procuremos llevar un proceso de formación adecuada y dinámica en nuestras casas de estudiantes, para que las jóvenes que están en ella, descubran su lugar en la Iglesia y en el mundo.",
  },
];

// Fotos de la galería (las que no van en el carrusel ni en las secciones).
const imagenesGaleria = [
  "/images/Pastoral2.jpeg",
  "/images/Pastoral4.jpeg",
  "/images/Pastoral9.jpeg",
  "/images/Pastoral10.jpeg",
  "/images/vocacional1.jpeg",
  "/images/vocacional2.jpeg",
  "/images/vocacional3.jpeg",
  "/images/vocacional4.jpeg",
  "/images/vocacional5.jpeg",
];

export default function PastoralVocacional() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

      {/* QUIÉNES SOMOS — composición propia de esta página: imagen panorámica
          con la cita del Fundador superpuesta, texto editorial a dos columnas
          y los cuatro momentos de la vocación como un camino con hitos. */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2 max-w-3xl mx-auto">
            Misioneras del Señor de los Corazones y de Santa María de Guadalupe
          </h2>
        </div>

        {/* Imagen ancha con cita flotante del Padre Fundador */}
        <div className="relative mb-16 md:mb-24">
          <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/images/Pastoral6.jpeg"
              alt="Pastoral vocacional de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-azul-oscuro/60 via-transparent to-transparent" />
          </div>
          <figure className="relative -mt-12 mx-4 bg-white rounded-2xl p-6 shadow-lg border border-arena md:absolute md:-bottom-12 md:right-10 md:mx-0 md:mt-0 md:max-w-md">
            <FaQuoteLeft className="text-dorado mb-3" size={18} />
            <blockquote className="text-marron italic leading-relaxed">
              Ser misionero ha sido una llamita que ha iluminado mi vida y calentado mi corazón.
            </blockquote>
            <figcaption className="text-sm font-semibold text-azul-institucional mt-3">
              — N.P.F. Luis Fiacro Guerrero
            </figcaption>
          </figure>
        </div>

        {/* Texto editorial a dos columnas */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <p className="text-marron leading-relaxed text-justify md:border-l-4 md:border-dorado md:pl-5">
            La Pastoral Vocacional es la acción que &ldquo;acompaña cuidadosamente a todos los que
            el Señor llama; es responsabilidad de todo el pueblo de Dios, para ayudar a descubrir
            el sentido de la vida y el proyecto que Dios tenga para cada uno, acompañándolos en su
            proceso de discernimiento&rdquo; (DA 314).
          </p>
          <p className="text-marron leading-relaxed text-justify md:border-l-4 md:border-azul-institucional md:pl-5">
            Convencidas de que <strong>todas somos promotoras vocacionales</strong>, ejercemos
            nuestro papel con compromiso sirviendo a la Congregación y a la Iglesia al promover el
            nacimiento, crecimiento, discernimiento y acompañamiento de la vocación específica a la
            que Dios llama a cada persona, para que le responda con certeza y fidelidad,
            iluminándola con la Palabra de Dios y el Magisterio de la Iglesia.
          </p>
        </div>

        {/* El camino de toda vocación: cuatro hitos unidos por una línea */}
        <div>
          <h3 className="text-center text-xl font-bold text-azul-institucional mb-10">
            Lo que promovemos en cada vocación
          </h3>
          <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Línea que conecta los hitos (solo en escritorio) */}
            <div aria-hidden className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-dorado/30 via-dorado to-dorado/30" />
            {momentos.map((m, i) => (
              <div key={m.titulo} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-azul-institucional text-dorado shadow-md ring-4 ring-crema">
                  {m.icon}
                </div>
                <span className="mt-3 text-xs font-black tracking-widest text-dorado">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-bold text-azul-institucional mt-1 mb-2">{m.titulo}</h4>
                <p className="text-sm text-marron-suave leading-relaxed max-w-[16rem]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN "VEN Y SÍGUEME" */}
      <section className="bg-azul-suave py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Nuestro plan</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2">&ldquo;Ven y sígueme&rdquo;</h2>
            <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-justify">
              Desde esta convicción, como Misioneras del Señor de los Corazones y de Santa María de
              Guadalupe, dando a conocer nuestro carisma y analizando la realidad de la pastoral
              vocacional en la Congregación, hemos realizado el presente Plan: &ldquo;Ven y
              sígueme&rdquo;. Es muy valioso poder contar con el apoyo, interés y compromiso de cada
              una de las hermanas en esta labor pastoral tan importante para la Iglesia y la
              Congregación.
            </p>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
            {fundamentosPlan.map((f) => (
              <div key={f.titulo} className="bg-white rounded-2xl p-6 shadow-sm border border-arena">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-azul-institucional">{f.icon}</span>
                  <h3 className="font-bold text-azul-institucional">{f.titulo}</h3>
                </div>
                <p className="text-sm text-marron-suave text-justify">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTICIPACIÓN EN LA PASTORAL VOCACIONAL */}
      <section className="bg-azul-oscuro py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-dorado text-sm font-semibold tracking-widest uppercase">Una tarea de todos</span>
            <h2 className="text-3xl font-bold text-white mt-2">Participación en la pastoral vocacional</h2>
            <p className="text-white/75 mt-3 max-w-3xl mx-auto text-justify">
              Para la Congregación, la pastoral vocacional es una actividad de todos y cada uno de
              los miembros de la Congregación y de la Iglesia, que consiste en promover el
              nacimiento, crecimiento, discernimiento y acompañamiento de la vocación específica a
              la que Dios llama a cada persona para que le responda con certeza y fidelidad.
            </p>
            <p className="text-white/75 mt-4 max-w-3xl mx-auto text-justify">
              Como Congregación hemos llegado a la conclusión de que la familia es la base
              importante para cualquier estado de vida: nuestros padres nos inculcan los valores y
              nos ayudan con su testimonio. Tristemente, en la actualidad se han perdido los valores
              humanos y cristianos en varias familias y la juventud se ha dejado arrastrar por el
              mal uso de la tecnología, a lo que se agrega el anti-testimonio de los diferentes
              estados de vida, especialmente de la vida consagrada.
            </p>
          </div>

          {/* Cita destacada: la primera tarea de todas las hermanas. */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <span className="text-xs bg-dorado/20 text-dorado px-3 py-1 rounded-full">Const. 96</span>
            <p className="text-white/85 leading-relaxed mt-4 text-justify">
              &ldquo;La invitación de Jesús: Venid y veréis (Jn 1,39), sigue siendo aún hoy la regla
              de oro de la pastoral vocacional. Con ella se pretende presentar, en nuestro Instituto,
              el atractivo de la persona del Señor Jesús y la belleza de la entrega total de sí mismo
              a la causa del Evangelio. Por lo tanto, la <strong>primera tarea de todas las
              hermanas</strong> es proponer con la palabra y el ejemplo el ideal del seguimiento de
              Cristo, alimentando y manteniendo en las aspirantes y formadas la respuesta a los
              impulsos que el Espíritu inspira en sus corazones.&rdquo;
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {citas.map((c, i) => (
              <div key={`${c.fuente}-${i}`} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="text-xs bg-dorado/20 text-dorado px-3 py-1 rounded-full">{c.fuente}</span>
                <p className="text-white/75 text-sm leading-relaxed mt-4 text-justify">&ldquo;{c.texto}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUESTRO OBJETIVO Y CAMINAR */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Nuestro objetivo</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2 mb-5">
              Un itinerario de fe que lleva al encuentro con Cristo
            </h2>
            <p className="text-marron leading-relaxed mb-4 text-justify">
              Promover, desde la Palabra de Dios, el Magisterio de la Iglesia y el Carisma
              Congregacional, el nacimiento, crecimiento, discernimiento y acompañamiento de la
              vocación específica a la que Dios llama a cada persona para que le responda con
              certeza y fidelidad.
            </p>
            <p className="text-marron leading-relaxed mb-4 text-justify">
              Como Congregación hemos recorrido 69 años juntas en una continua Misión Evangelizadora;
              somos depositarias de la Buena Noticia, por ello podemos decir que toda la pastoral de
              la Iglesia es Pastoral Vocacional, ya que la tarea Evangelizadora de la Iglesia está
              llamada a ser descubierta por cada creyente sin mirar raza o condición social.
            </p>
            <p className="text-marron leading-relaxed mb-4 text-justify">
              Al vivir conscientemente nuestra propia vocación siendo testimonio para los demás,
              contribuimos a descubrir el camino concreto para realizar el proyecto de vida al que
              Dios los llama. Que la pastoral vocacional sea realmente un itinerario de fe que lleve
              al encuentro con Cristo; seguir colaborando para que todo trabajo sea fructífero.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/Pastoral8.jpeg"
                alt="Hermanas de la Congregación en la animación vocacional"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-dorado/10 border-l-4 border-dorado pl-4 py-3 rounded-r-lg">
              <p className="text-marron italic text-sm text-justify">
                &ldquo;Orad al dueño de la mies que envíe obreros a su mies.&rdquo; (Mt 9,38) —
                Tenemos la obligación de animar esta pastoral mediante la oración, puesto que la
                vocación es un don de Dios: la llamada y la respuesta solo pueden resonar y hacerse
                sentir en la oración.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS — uno horizontal (video normal) y uno vertical (Short). */}
      <section className="bg-azul-suave py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Míranos</span>
            <h2 className="text-3xl font-bold text-azul-institucional mt-2">La vocación en video</h2>
            <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-center">
              Conoce de cerca nuestra pastoral vocacional y déjate interpelar por la invitación del
              Señor: &ldquo;Ven y sígueme&rdquo;.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-5 md:items-center">
            {/* Video principal — horizontal (16:9), reproductor incrustado */}
            <div className="md:col-span-3 aspect-video overflow-hidden rounded-2xl border border-arena bg-black shadow-md">
              <iframe
                src="https://www.youtube.com/embed/GlQgFQtMQ1M?rel=0"
                title="Pastoral vocacional — video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            {/* Short — vertical (9:16). El autor deshabilitó la reproducción
                incrustada, así que se muestra la miniatura y se abre en
                YouTube al hacer clic. */}
            <a
              href="https://youtube.com/shorts/SaZyamDQ-Nc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver el Short de pastoral vocacional en YouTube"
              className="group relative md:col-span-2 mx-auto block aspect-9/16 w-full max-w-[300px] overflow-hidden rounded-2xl border border-arena bg-black shadow-md"
            >
              <Image
                src="https://img.youtube.com/vi/SaZyamDQ-Nc/oardefault.jpg"
                alt="Short de pastoral vocacional en YouTube"
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Velo + botón de reproducción */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                  <FaPlay className="ml-1 text-azul-institucional" size={22} />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                <FaYoutube className="text-red-600" size={22} />
                <span className="text-sm font-semibold text-white drop-shadow">
                  Ver el Short en YouTube
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* GALERÍA DE IMÁGENES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Testimonio</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">La pastoral vocacional en imágenes</h2>
          <p className="text-marron-suave mt-3 max-w-2xl mx-auto text-center">
            Momentos de nuestra labor de animación vocacional: proponer con la palabra y el ejemplo
            el ideal del seguimiento de Cristo.
          </p>
        </div>

        <GaleriaMisionera imagenes={imagenesGaleria} etiqueta="la pastoral vocacional" />
      </section>

      {/* CTA CONTACTO */}
      <section className="bg-azul-suave py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FaEnvelope size={40} className="text-azul-institucional/70 mx-auto mb-4" />

          <h2 className="font-display text-3xl font-bold text-azul-institucional mb-4">
            ¿Sientes el llamado del Señor?
          </h2>

          <p className="text-marron text-lg mb-8">
            &ldquo;Venid y veréis&rdquo; (Jn 1,39). No tienes que tener todo claro: solo el deseo de
            escuchar. Contáctanos y conversemos sin compromiso.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="bg-azul-institucional hover:bg-azul-oscuro text-white px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
              <FaEnvelope />
              Escríbenos
            </Link>

            <a
              href="tel:+5255000000"
              className="border-2 border-azul-institucional text-azul-institucional hover:bg-azul-institucional/10 px-7 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
              <FaPhoneAlt />
              Llamar
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
