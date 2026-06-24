// ============================================================
// lib/data/jardines-contenido.ts
// Contenido ESTÁTICO de cada jardín (historia, objetivo, misión,
// visión, valores, clases adicionales, actividades extra, datos de
// contacto institucional y espiritualidad).
//
// Fuente de la verdad: docs/jardin-la-paz.md (transcrito íntegro, sin
// resumir). NO incluye lo dinámico (publicaciones, nombre/colores del
// jardín), que vive en la BD y se lee con getJardinBySlug.
//
// La misión, la visión y los valores son INSTITUCIONALES (de las
// MSCG): se comparten entre todos los jardines. Lo propio de cada
// escuela (historia, objetivo general, contacto) puede estar pendiente
// (null) hasta contar con la información real.
//
// El campo `icono` de clases/actividades guarda el NOMBRE de un ícono
// de lucide-react; cada página lo resuelve con su propio registro.
// ============================================================

export interface ClaseAdicional {
  nombre: string;
  icono: string;
}

export interface ActividadExtra {
  nombre: string;
  icono: string;
}

export interface ContactoInstitucional {
  // Todos opcionales: cada jardín completa lo que tenga documentado.
  telefono?: string;
  celular?: string;
  email?: string;
  direccion?: string;
  clave?: string;
  turno?: string;
  incorporacion?: string;
  numeroAcuerdo?: string;
  // Redes sociales (sección "Síguenos"). whatsapp puede ser número o URL.
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface EspiritualidadContenido {
  /** Texto íntegro de la formación espiritual del jardín. */
  descripcion: string;
  /** Llamada/compromiso destacado (p. ej. el retiro de los papás). */
  nota: string;
  /** Galería de fotos de la vida espiritual del jardín (rutas en
   *  /public). Opcional: si falta o está vacía, no se muestra galería. */
  imagenes?: string[];
}

export interface MiembroEquipo {
  /** Nombre de la persona. Puede faltar: hay puestos para los que aún
   *  solo se conoce el rol (se muestran únicamente con su rol). */
  nombre?: string;
  rol: string;
}

export interface JardinContenido {
  /** Texto íntegro de la sección Historia (párrafos separados por `\n\n`;
   *  los listados de hermanas son líneas que empiezan con "- "). */
  historia: string | null;
  /** Foto histórica opcional para la sección Historia (con su pie). */
  historiaImagen?: { src: string; pie: string };
  objetivoGeneral: string | null;
  mision: string | null;
  vision: string | null;
  valores: string[];
  clasesAdicionales: ClaseAdicional[];
  actividadesExtras: ActividadExtra[];
  contacto: ContactoInstitucional | null;
  espiritualidad: EspiritualidadContenido | null;
  /** Equipo de trabajo del jardín. Los puestos con persona conocida
   *  llevan `nombre`; los demás se listan solo con su `rol`. */
  equipo: MiembroEquipo[];
}

// ── Contenido institucional compartido (MSCG) ──────────────

const MISION_MSCG =
  "Formar la identidad católica de la comunidad educativa, educando con lazos de amor liberador y trascendente para responder a los retos de la sociedad.";

const VISION_MSCG =
  "Ser una institución de alto rendimiento y excelencia humana, espiritual y académica, líder en la promoción de cambios culturales y sociales.";

const VALORES_MSCG = [
  "Amor",
  "Servicio",
  "Alegría",
  "Libertad",
  "Humildad",
  "Cuidado de la casa común",
  "Respeto a la dignidad humana",
  "Justicia",
];

const OBJETIVO_GENERAL_MSCG =
  "Desde la espiritualidad de las MSCG crear un ambiente evangelizador centrado en promover los valores entre los alumnos prioritariamente fomentando el diálogo para suscitar un ambiente de reflexión y aprendizaje profundo.";

// Galerías de la vida espiritual. El texto es institucional (MSCG), pero
// las fotos son propias de cada jardín. La Paz usa las "…paz", Porvenir
// las que no llevan sufijo.
const ESPIRITUALIDAD_IMAGENES_LA_PAZ = [1, 2, 3, 4, 5, 6].map(
  (n) => `/images/Espiritualidad${n}paz.jpeg`,
);
const ESPIRITUALIDAD_IMAGENES_PORVENIR = [
  ...[1, 2, 3, 4, 5, 6].map((n) => `/images/Espiritualidad${n}.jpeg`),
  ...[1, 2, 3].map((n) => `/images/ViacrusisPorvenir${n}.jpeg`),
];

// Formación espiritual: institucional (MSCG), compartida por los jardines.
const ESPIRITUALIDAD_MSCG: EspiritualidadContenido = {
  descripcion:
    "El Jardín de Niños es de carácter católico, tienen formación doctrinal, como apoyo a su vida espiritual los Padres de Familia como sus hijos. Observando la realidad donde nos encontramos inmersos, urge dicha formación. Esta será mediante la catequesis infantil y de adultos. Participan en las Eucaristías dominicales y mensuales en la Institución. Reciben mensualmente el periódico Caminar Diocesano y trabajan las secciones con sus niños de acuerdo a la indicación de las maestras. La educación se hace efectiva si hay colaboración moral, social, económica y espiritual.",
  nota: "Los papás asisten al Retiro o Plan de Formación Católica.",
};

// Clases adicionales propias de cada jardín (su oferta concreta).
const CLASES_LA_PAZ: ClaseAdicional[] = [
  { nombre: "Educación física", icono: "Dumbbell" },
  { nombre: "Computación", icono: "Monitor" },
  { nombre: "Inglés", icono: "Globe" },
  { nombre: "Música", icono: "Music" },
  { nombre: "Educación en la Fe", icono: "Heart" },
];

const CLASES_PORVENIR: ClaseAdicional[] = [
  { nombre: "Valores", icono: "Heart" },
  { nombre: "Educación Física", icono: "Dumbbell" },
  { nombre: "Inglés", icono: "Globe" },
  { nombre: "Canto", icono: "Music" },
  { nombre: "Danza", icono: "Music2" },
];

// Actividades extra: por ahora idénticas en ambos jardines (Porvenir aún
// no cuenta con un documento propio de actividades).
const ACTIVIDADES_EXTRAS: ActividadExtra[] = [
  { nombre: "Eventos deportivos", icono: "Trophy" },
  { nombre: "Campamento", icono: "Tent" },
  { nombre: "Recreación acuática", icono: "Waves" },
  { nombre: "Pijamadas", icono: "Moon" },
];

// ── Equipo de trabajo de La Paz (docs/jardin-la-paz.md) ────
// Los puestos con persona conocida llevan nombre; el resto se muestra
// solo con su rol hasta contar con el nombre real.
const EQUIPO_LA_PAZ: MiembroEquipo[] = [
  { nombre: "Hna. Ma. de los Ángeles Machado Ramos", rol: "Directora" },
  { nombre: "Hna. Gloria Martínez Martínez", rol: "Educadora · 1.er grupo" },
  { nombre: "Norma Barbosa Guzmán", rol: "Educadora · 2.º grupo" },
  { nombre: "Aida Rojas Martínez", rol: "Educadora · 3.er grupo" },
  { rol: "Maestro de Educación Física" },
  { rol: "Maestro de Música" },
  { rol: "Maestra de Inglés" },
  { rol: "Maestro de Computación" },
  { rol: "Hermana de Educación en la Fe" },
  { rol: "Intendente" },
  { rol: "Apoyo general" },
];

// ── Equipo de trabajo de Porvenir (docs/jardin-porvenir.md) ─
const EQUIPO_PORVENIR: MiembroEquipo[] = [
  { nombre: "Bertha Figueroa Hernández", rol: "Directora" },
  { nombre: "Yuritzi Reyes Cruz", rol: "Educadora · 1.er grupo" },
  { nombre: "Erika Daniela Campos Vázquez", rol: "Educadora · 2.º grupo" },
  { nombre: "Isabel Cruz Andrade", rol: "Educadora · 3.er grupo" },
];

// ── Historia íntegra de La Paz (docs/jardin-la-paz.md) ─────

const HISTORIA_LA_PAZ = `Narran las crónicas que Nuestro Padre fundador Luis Fiacro Guerrero Ramírez en el año 1964 inició con la ayuda de los Señores Portillo la obra y bendición de la primera piedra del Jardín de niños, por Nuestro Padre y el Padre Narciso Villa, rector del seminario. Esto transcurrió en julio del año 1965 siendo el albañil el Sr. Procopio Martínez, colocando los cimientos de la primera parte de la casa, donde están los salones.

A los 6 meses se terminó la primera parte de la construcción, consistió en la dirección, un salón grande, una entrada amplia y un salón más pequeño concluyéndose el 4 de febrero de 1966, de color azul fue la primera pintura que tuvo la Escuela.

Y el gran día fue el 17 de febrero de 1966, donde se inició el apostolado de Educación llevando el nombre de: JARDÍN DE NIÑOS TEPEYAC. Preescolar y primaria, la matrícula de preescolar 30 y 20 de primero de primaria, la responsable de preescolar fue la hna. Catalina del Espíritu Santo (Martínez González) y primaria la hna. María del Carmen del señor de los corazones (Lucero Rosario).

Se realizó el primer festival del 10 de mayo en el mismo año, su primer uniforme fue sencillo, Madrecita diseñó la batita color guinda con bolitas blancas para niñas y niños pantalón azul marino y camisa blanca con cuello de marinero, las batas las hicieron las Madres Soledad de San José y Francisca de la Eucaristía. El 27 de octubre del mismo año se terminó el ciclo escolar, culminando con 35 niños de preescolar y 22 de primer grado de primaria.

En el año 1967 se inscribieron 83 niños, la Madre Catalina siguió dando clases a primer grado de preescolar con 50 alumnos.

Siguió la construcción de la segunda parte de la escuela, el 21 de diciembre de 1966 y el Excmo. sr. Obispo Celestino Fernández y Fernández bendijo todo el edificio, estando presentes Nuestro Padre Fundador, Madrecita, bienhechores, el P. Francisco Rojas y la mayor parte de la comunidad en abril de 1967.

La primera Eucaristía fue en el oratorio por Nuestro Padre, estando presentes los bienhechores, Sr. Manuel y Ma. Eugenia del portillo, madrecita junto a la comunidad, así mismo la primera Eucaristía de Nuestro Padre para todas las mamás el 10 de mayo de 1967, en el oratorio.

La fundación de la comunidad se realizó el 26 de noviembre de 1967, llamada comunidad Tepeyac, para atender a los 3 grados de preescolar, las hermanas que formaron la comunidad fueron:
- Hna. Catalina del Espíritu Santo, hna. Mayor
- Hna. Ma. del Carmen del señor de los corazones
- Hna. Evangelina de santa Teresita
- Hna. Ma. Antonieta de la Cruz
- Hna. Aurora de santa Teresa
- Hna. Emma de la sagrada Familia

El señor Obispo D. José López Lara realizó la primera visita al Jardín después de su llegada a la diócesis 1968.

Se realizó el primer desfile en las calles, el 21 de marzo de 1970, iniciando los alumnos de primaria.

El 12 de agosto del año 2003 se realizó la incorporación al IEEPOO de Oaxaca con el número de acuerdo 202020803052, llevando el nombre de: JARDÍN DE NIÑOS LA PAZ, otorgando la clave: 20PJN0055B, turno matutino. Cuenta con correo electrónico: jnlapaz12@gmail.com. Conformando en ese año la comunidad:
- Superiora local: M. Ma. De Jesús Salvador (Enríquez Espinoza)
- Hna. Gloria del Dulce Corazón de María (Martínez Martínez)
- Hna. Bertha del Verbo Encarnado (Figueroa Hernández) — Directora
- Hna. Luz del Carmen del Divino Rostro (Velasco Mejía)
- Hna. Ma. Guadalupe de Jesús (Vázquez Hernández) — de apoyo

El Jardín de Niños cumplió 60 años y se caracteriza por ayudar a los Padres de familia en la formación integral de sus hijos.`;

// ── Historia íntegra de Porvenir (docs/jardin-porvenir.md) ──

const HISTORIA_PORVENIR = `Hace más de seis décadas, el 17 de febrero de 1966, nació un sueño educativo que marcaría la vida de muchas generaciones: el Jardín de Niños Nazareth.

Con entusiasmo, entrega y una profunda vocación de servicio, la M. María del Carmen del Sagrado Corazón y la Hna. Flora de la Inmaculada y Teresita del Niño Jesús iniciaron esta hermosa misión educativa, sembrando las primeras semillas de una formación basada en el amor, la fe y los valores.

Durante 37 años, el Jardín de Niños Nazareth fue un espacio donde innumerables niñas y niños dieron sus primeros pasos en el aprendizaje, creciendo en un ambiente de alegría, respeto y fraternidad.

En el año 2003, al obtener la incorporación oficial con la Clave del Centro de Trabajo 20PJN0054C, la institución adoptó el nombre de Jardín de Niños Porvenir, reflejando así su compromiso de seguir formando a la niñez con la mirada puesta en un futuro lleno de esperanza.

Hoy, después de 60 años de trayectoria y de haber acompañado la formación de 60 generaciones, el Jardín de Niños Porvenir continúa siendo un lugar donde se educa con amor, se fortalecen los valores y se construyen las bases para un mejor mañana.

Porque en el Jardín de Niños Porvenir, cada niña y cada niño son el presente que inspira y el futuro que transforma nuestra sociedad.`;

// ── Registro por jardín ────────────────────────────────────

export const jardinesContenido: Record<string, JardinContenido> = {
  "la-paz": {
    historia: HISTORIA_LA_PAZ,
    objetivoGeneral: OBJETIVO_GENERAL_MSCG,
    mision: MISION_MSCG,
    vision: VISION_MSCG,
    valores: VALORES_MSCG,
    clasesAdicionales: CLASES_LA_PAZ,
    actividadesExtras: ACTIVIDADES_EXTRAS,
    contacto: {
      telefono: "953 532 0634",
      celular: "953 125 6461",
      email: "jnlapaz12@gmail.com",
      direccion:
        "Calle Morelos 121, esq. con Guadalupe Victoria, col. Tepeyac, Heroica Ciudad de Huajuapan de León, Oaxaca.",
      clave: "20PJN0055B",
      turno: "Matutino",
      incorporacion: "IEEPOO de Oaxaca (12 de agosto de 2003)",
      numeroAcuerdo: "202020803052",
      // Links de redes pendientes de confirmar (placeholder por ahora).
      facebook: "https://facebook.com",
      youtube: "https://www.youtube.com/@PazyPorvenir",
    },
    espiritualidad: {
      ...ESPIRITUALIDAD_MSCG,
      imagenes: ESPIRITUALIDAD_IMAGENES_LA_PAZ,
    },
    equipo: EQUIPO_LA_PAZ,
  },

  porvenir: {
    historia: HISTORIA_PORVENIR,
    historiaImagen: {
      src: "/images/VISITA DE NUESTRO PADRE FUNDADOR AL JARDIN DE NIÑOS NAZARETH..jpg",
      pie: "Visita de nuestro Padre Fundador al Jardín de Niños Nazareth.",
    },
    // Objetivo general, misión, visión y valores son institucionales
    // (MSCG): idénticos a La Paz.
    objetivoGeneral: OBJETIVO_GENERAL_MSCG,
    mision: MISION_MSCG,
    vision: VISION_MSCG,
    valores: VALORES_MSCG,
    clasesAdicionales: CLASES_PORVENIR,
    actividadesExtras: ACTIVIDADES_EXTRAS,
    contacto: {
      // Datos documentados en docs/jardin-porvenir.md.
      telefono: "953 532 2315",
      celular: "953 110 3700",
      email: "jardinporvenir3@gmail.com",
      direccion:
        "Calle Matamoros No. 13, col. Centro, Heroica Ciudad de Huajuapan de León, Oaxaca.",
      clave: "20PJN0054C",
      turno: "Matutino",
      incorporacion: "2003",
      facebook: "https://www.facebook.com/share/1CxmWG4Pat/",
      youtube: "https://www.youtube.com/@PazyPorvenir",
      whatsapp: "9531103700",
    },
    espiritualidad: {
      ...ESPIRITUALIDAD_MSCG,
      imagenes: ESPIRITUALIDAD_IMAGENES_PORVENIR,
    },
    equipo: EQUIPO_PORVENIR,
  },
};
