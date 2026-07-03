// RUTA: src/app/(public)/pastoral-juvenil/page.tsx
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { DirectorioComunidades } from "@/components/public/DirectorioComunidades";
import { Revelar } from "@/components/public/Revelar";

// Comunidad misionera de la MSCG (tarjeta + ventana con su información).
const comunidadEspirituSanto = {
  nombre: "Comunidad Espíritu Santo",
  ubicacion: "Riaba, Malabo · Guinea Ecuatorial, África",
  foto: "/images/pastoral-misionera7.jpeg",
  intro:
    "Es una comunidad misionera, pero también una comunidad local. Está formada por tres hermanas. Acompañamos la pastoral de la zona y atendemos a los grupos que realizan su retiro o ejercicios espirituales en el Centro de Espiritualidad.",
  areas: [
    {
      titulo: "Hermanas de la comunidad",
      items: [
        "M. Altagracia Guadalupe Soriano Ramírez",
        "Hna. Catalina Rodríguez Vásquez",
        "Hna. Angélica Elena Pavía Balbuena",
      ],
    },
    {
      titulo: "En la pastoral",
      items: [
        "Formación de catequistas",
        "Formación de monaguillos",
        "Formación a las asociaciones",
        "Formación de jóvenes y adolescentes",
        "Formación sacramental de adultos",
        "Celebración de la Palabra",
        "Visitas a las familias y formación en valores",
        "Formación de lectores",
        "Atención a la liturgia",
      ],
    },
    {
      titulo: "En el Centro de Espiritualidad",
      items: [
        "Atención a obispos y sacerdotes",
        "Diferentes grupos parroquiales",
        "Retiros y ejercicios espirituales de religiosas(os) consagrados y seminaristas",
        "Retiros a familias",
      ],
    },
  ],
};

// Comunidad Santa Teresita (San Juan Copala, Oaxaca). Información pendiente:
// por ahora solo se muestra el nombre y la ubicación.
const comunidadSantaTeresita = {
  nombre: "Comunidad Santa Teresita",
  ubicacion: "San Juan Copala, Juxtlahuaca, Oaxaca",
  foto: "/images/comunidad-Copala.png",
  intro:
    "Hace 65 años inició la misión de las Hermanas Misioneras del Señor de los Corazones y de Santa María de Guadalupe en San Juan Copala. Al principio fueron por tres meses y luego esporádicamente, hasta fundar la misión permanente en la parroquia de San Juan Copala en septiembre de 1964. Poco a poco se fueron ganando la confianza del pueblo triqui: se metieron en su cultura para conocerla, comprenderla, respetarla y procurar elevarla, atrayendo a los niños con dulces, juegos y, sobre todo, con amor. Les ayudamos a encauzar sus sentimientos desde la pedagogía de Jesús de Nazaret y así, poco a poco, abren su corazón a la Palabra de Dios y al amor maternal de Santa María de Guadalupe. Esta es una hermosa misión en la que Dios te necesita y de la cual tú puedes ser misionero o misionera.",
  areas: [
    {
      titulo: "Obras y apostolados",
      items: [
        "Curso de alfabetización para adultos, a petición del sacerdote de la comunidad",
        "Escuela primaria «Vasco de Quiroga» e internado para los niños",
        "Jardín de niños",
        "Dispensario médico: atención a la salud con medicamentos y curaciones, a cargo de una hermana con formación profesional para este servicio",
      ],
    },
    {
      titulo: "Apoyo a la parroquia",
      items: [
        "Misiones en Semana Santa",
        "Días de muertos, en noviembre",
        "Novena de las posadas de Navidad",
        "Rezo del santo rosario en mayo y junio, en la parroquia y en las casas de familia",
        "Acompañamiento en los novenarios de difuntos, con la representación de los finados",
      ],
    },
    {
      titulo: "Vocaciones de la región",
      items: [
        "Tres hermanas triquis: dos con votos perpetuos y una aspirante",
        "Todas egresadas de la escuela primaria «Vasco de Quiroga»",
      ],
    },
  ],
};

// Comunidad Nazaret, ligada al Jardín de Niños Nazaret (hoy "Porvenir"),
// en Huajuapan de León. Fundada el 1° de abril de 1992.
const comunidadNazaret = {
  nombre: "Comunidad Nazaret",
  ubicacion: "Huajuapan de León, Oaxaca",
  foto: "/images/comunidad-Nazaret.png",
  intro:
    "El 1° de abril de 1992 inició oficialmente el caminar de la Comunidad Nazaret, abrazando un proyecto que ya había dado abundantes frutos: el Jardín de Niños Nazaret, que para entonces contaba con 26 años de servicio en la educación preescolar. A lo largo de los años, muchas hermanas han dejado una huella imborrable, sembrando con dulzura y paciencia la semilla del Evangelio en los más pequeños y también en los padres de familia, transformando hogares enteros. Hoy esa semilla sigue floreciendo con la misma vocación y alegría de servir a Dios a través de la educación y la cercanía con su pueblo.",
  areas: [
    {
      titulo: "Las pioneras · comunidad fundadora (1992)",
      items: [
        "Superiora: M. Gema de San Elías",
        "Vicaria: Clara de la Eucaristía",
        "Ecónoma: M. Carmen Teresita del Niño Jesús",
        "Auxiliar de Economía: Hna. Julia de la Inmaculada Niña",
        "Cronista: Hna. Margarita del Corazón Eucarístico",
        "Auxiliar de Cronista: Hna. Verónica del Corazón Eucarístico",
        "Espiritualidad: Hnas. Aurora de Santa Teresa y María de la Encarnación",
      ],
    },
    {
      titulo: "El legado continúa · comunidad actual",
      items: [
        "Superiora, Ecónoma y responsable de Pastoral Juvenil: Hna. Bertha del Verbo Encarnado",
        "Vicaria: Hna. Asela de Jesús",
        "Cronista: Hna. Isabel de la Virgen de la Luz",
        "Ecónoma General: M. Evelia de la Asunción",
      ],
    },
  ],
};

// Comunidad Sagrada Familia. Ubicación e información pendientes de confirmar.
const comunidadSagradaFamilia = {
  nombre: "Comunidad Sagrada Familia",
  ubicacion: "Ubicación por confirmar",
  foto: "/images/comunidad-Sagradafamilia.png",
  intro: "Información próximamente.",
  areas: [],
};

// Comunidad San José (Tehuitzingo, Puebla). Apostolado en la Parroquia de
// San Miguel.
const comunidadSanJose = {
  nombre: "Comunidad San José",
  ubicacion: "Tehuitzingo, Puebla",
  foto: "/images/comunidad-Tehuitzingo.png",
  intro:
    "Comunidad San José de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe, ubicada en la calle 14 de marzo, en Tehuitzingo, Puebla. Su apostolado se realiza en la Parroquia de San Miguel, al servicio de la evangelización y de la vida sacramental de la comunidad, todo para mayor gloria de Dios.",
  areas: [
    {
      titulo: "Apostolado en la Parroquia de San Miguel",
      items: [
        "Coordinación general del Itinerario Catequístico",
        "Pláticas presacramentales para papás y padrinos",
        "Coordinación de la Vela Perpetua",
        "Atención a los Ministros Extraordinarios de la Sagrada Comunión",
        "Formación de adolescentes, jóvenes y adultos para algún sacramento",
        "Hora Santa",
        "Oración por los fieles difuntos",
        "Integrantes del Consejo Parroquial",
      ],
    },
    {
      titulo: "Evangelización a través de la librería",
      items: [
        "Venta de libros y artículos religiosos",
        "Ornamentos, vasos sagrados y cuadros de imágenes",
      ],
    },
  ],
};

// Comunidad Cuna de Belén. Ubicación e información pendientes de confirmar.
const comunidadCunaDeBelen = {
  nombre: "Comunidad Cuna de Belén",
  ubicacion: "Ubicación por confirmar",
  foto: "/images/comunidad-Cunadebelén.jpeg",
  intro: "Información próximamente.",
  areas: [],
};

// Comunidad "de los Ángeles" (Acatlán de Osorio, Puebla). Apostolado en las
// parroquias de San Juan Bautista y San Gabriel.
const comunidadAngeles = {
  nombre: "Misioneras del Señor de los Corazones y de Santa María de Guadalupe",
  ubicacion: "Reforma #77, Acatlán de Osorio, Puebla",
  foto: "/images/comunidad-Acatlan.jpeg",
  intro:
    "Comunidad «de los Ángeles» de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe, ubicada en Reforma #77, Acatlán de Osorio, Puebla. Su apostolado propaga la fe a través de libros y artículos religiosos y acompaña la vida sacramental de la comunidad, en colaboración con las parroquias de San Juan Bautista y San Gabriel.",
  areas: [
    {
      titulo: "Apostolado",
      items: [
        "Propagar la fe a través de libros y artículos religiosos",
        "Pláticas pre-sacramentales para papás y padrinos, en la parroquia de San Juan Bautista",
      ],
    },
    {
      titulo: "Colaboración en la parroquia de San Gabriel",
      items: [
        "Comisión social, penitenciaria y liturgia (CERESO Acatlán)",
        "Ministerios",
      ],
    },
  ],
};

// Comunidad Nuestra Señora del Pilar. Ubicación e información por confirmar.
const comunidadNuestraSenoraDelPilar = {
  nombre: "Comunidad Nuestra Señora del Pilar",
  ubicacion: "Ubicación por confirmar",
  foto: "/images/comunidad-Señoradelpilar.png",
  intro: "Información próximamente.",
  areas: [],
};

// Comunidad Luis Fiacro (Isla de Chira, Costa Rica). Información por confirmar.
const comunidadLuisFiacro = {
  nombre: "Comunidad Luis Fiacro",
  ubicacion: "Isla de Chira, Costa Rica",
  foto: "/images/comunidad-costarica.png",
  intro: "Información próximamente.",
  areas: [],
};

// Comunidad Niño de Praga (Tamazulapam del Progreso, Teposcolula, Oaxaca).
// Apostolado en la Parroquia de Nuestra Señora de la Natividad.
const comunidadNinoDePraga = {
  nombre: "Comunidad Niño de Praga",
  ubicacion: "Tamazulapam del Progreso, Teposcolula, Oaxaca",
  foto: "/images/comunidad-NiñodePraga.png",
  intro:
    "Las Hermanas Misioneras del Señor de los Corazones y de Santa María de Guadalupe se encuentran en la Parroquia de Nuestra Señora de la Natividad, en la Villa de Tamazulapam del Progreso, Teposcolula, Oaxaca. Dirección: Calle Emilio Carranza #14A, Barrio San Francisco.",
  areas: [
    {
      titulo: "Miembros de la comunidad",
      items: [
        "Hna. Claudia del Divino Rostro",
        "Hna. Agustina de Jesús Redentor",
        "Hna. Diana del Divino Misionero",
      ],
    },
    {
      titulo: "Apostolado",
      items: [
        "Servicio en el Jardín de Niños Carito Chavert",
        "Pláticas de bautismo para padres y padrinos",
        "Apoyo en la parroquia como parte del Consejo de Pastoral",
        "Vigilias de difuntos y rosarios para quienes lo soliciten",
      ],
    },
  ],
};

const comunidadesMisioneras = [
  comunidadEspirituSanto,
  comunidadSantaTeresita,
  comunidadNazaret,
  comunidadSagradaFamilia,
  comunidadSanJose,
  comunidadCunaDeBelen,
  comunidadAngeles,
  comunidadNuestraSenoraDelPilar,
  comunidadLuisFiacro,
  comunidadNinoDePraga,
];

const slidesHero: SlideHero[] = [
  {
    imagen: "/images/comunidades-carrusel1.png",
    categoria: "COMUNIDADES",
    titulo: "Jóvenes con fe, con fuego, en misión",
    descripcion:
      "La juventud no es solo una etapa: es una fuerza que puede cambiar el mundo",
  },
  {
    imagen: "/images/comunidades-carrusel2.png",
    categoria: "FRATERNIDAD",
    titulo: "Crecer juntos en el camino",
    descripcion:
      "Grupos de jóvenes que se acompañan mutuamente en la fe y el servicio",
  },
  {
    imagen: "/images/comunidades-carrusel3.jpeg",
    categoria: "COMPROMISO",
    titulo: "La fe que mueve montañas",
    descripcion:
      "Caminamos juntos en la búsqueda de sentido, fe y compromiso con los demás",
  },
];

export default function PastoralJuvenil() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

      {/* COMUNIDADES MISIONERAS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Revelar className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Dónde estamos</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">Nuestras comunidades misioneras</h2>
          <p className="text-marron-suave mt-3 max-w-xl mx-auto">
            Conoce las comunidades de la MSCG. Haz clic en una tarjeta para ver toda su información.
          </p>
        </Revelar>
        <DirectorioComunidades comunidades={comunidadesMisioneras} />
      </section>
      </div>
    </div>
  );
}