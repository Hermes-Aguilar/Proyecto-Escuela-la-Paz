// ============================================================
// app/(public)/la-congregacion/historia/page.tsx
// Nuestra Historia — "Historia de la Fundación" (texto íntegro de
// docs/congregacion.md) + línea de tiempo con las 17 comunidades
// fundadas y sus fechas.
// ============================================================
import { SubHero } from "../_components/SubHero";

const PRIMERAS_HERMANAS = [
  "Soledad Bautista Arias",
  "Francisca Martínez González",
  "Guadalupe Lima Guzmán",
  "María del Carmen Guevara Camacho",
];

const FUNDACION: string[] = [
  "El 12 de mayo de 1957 fue la fecha en que Nuestro Padre Fundador Luis Fiacro Guerrero Ramírez inició la fundación de las Misioneras del Señor de los Corazones y de Santa María de Guadalupe con la bendición del entonces Excmo. Sr. Obpo. Don Celestino Fernández y Fernández. Se alojaron al principio en una casa prestada en lo que ahora es la Casa de la Cultura de la Ciudad de Huajuapan de León, Oax., posteriormente adquirieron una propiedad en la calle Matamoros Núm. 13 de la misma Ciudad, en donde hasta la fecha es la Casa General.",
];

const FUNDACION_CONT: string[] = [
  "El Padre Luis con la finalidad de que las jovencitas tuvieran una formación integral, solicitó algún miembro a diversas Congregaciones, pero sólo después de 4 meses obtuvo respuesta de las Carmelitas Misioneras de Santa Teresa y el 27 de septiembre llegó la Madre Elisa María del Sagrado Corazón (Castro Chaverth) quien durante 22 años acompañó a la Congregación, fue la Superiora General y Formadora de las hermanas. Ella hasta su muerte el 9 de marzo de 1980 siguió siendo Carmelita, nunca renunció a su Congregación.",
  "A los dos meses de su primera profesión religiosa, las primeras misioneras empiezan a evangelizar en las parroquias de: Chinantla, Coixtlahuaca, Mixtepec, San Juan Copala, Tecomatlán, Tecomaxtlahuaca, San Pablo Anicano, San Pedro Yeloixtlahuca. Nuestro Padre Fundador ha infundido en cada Misionera del Señor de los Corazones y de Santa María de Guadalupe el deseo de llevar la semilla del Evangelio a todos los pueblos de la Diócesis, gracias al amor tan grande que manifestó a la Congregación que la acompañó hasta el dia 24 de diciembre de 1996, año en que recibe de Dios la corona de la gloria.",
];

// Las 17 comunidades, en el orden del documento.
const COMUNIDADES: { nombre: string; fecha: string; desc: string }[] = [
  {
    nombre: "Santa Teresita, San Juan Copala",
    fecha: "4 de septiembre de 1964",
    desc: "Zona indígena Triqui. Las hermanas se dedican a la educación académica, humana y cristiana en la escuela-internado «Vasco de Quiroga». Además un dispensario médico en donde se busca la curación física y espiritual. Todos los servicios son gratuitos para los alumnos.",
  },
  {
    nombre: "Jardines de Niños La Paz y Porvenir",
    fecha: "17 de febrero de 1966",
    desc: "Se comenzó a dar educación a los niños pequeños en los Jardines de Niños, antes Tepeyac y Nazareth, ahora La Paz y Porvenir. Se atiende además a los padres de familia con diversas actividades.",
  },
  {
    nombre: "Niño de Praga, Tamazulapan del Progreso",
    fecha: "25 de agosto de 1979",
    desc: "Se atiende el Jardín de Niños Carito Chavert.",
  },
  {
    nombre: "San Miguel Arcángel, Tehuitzingo, Puebla",
    fecha: "19 de septiembre de 1984",
    desc: "Primera comunidad dedicada totalmente a la evangelización en la parroquia de San Miguel Arcángel.",
  },
  {
    nombre: "Texcoco, Estado de México",
    fecha: "4 de noviembre de 1984",
    desc: "Para apoyar en la evangelización de la Diócesis.",
  },
  {
    nombre: "Señor de los Corazones, Chila de las Flores, Puebla",
    fecha: "18 de septiembre de 1989",
    desc: "Se apoyaba en la Escuela Primaria Particular Parroquial «Rafael Amador» y en la participación en las actividades parroquiales. Desde el año 2019 es casa de formación aspirantado.",
  },
  {
    nombre: "Nazareth, Jardín de Niños Porvenir",
    fecha: "1 de abril de 1992",
    desc: "Se brinda la atención al Jardín de Niños «Porvenir». Ya se daba el servicio desde el año 1966; hasta esta fecha se decide vivir en el mismo domicilio que el jardín de niños.",
  },
  {
    nombre: "Sagrado Corazón",
    fecha: "Agosto de 1995",
    desc: "Casa de formación de las aspirantes, actualmente es para misión.",
  },
  {
    nombre: "Santiago Juxtlahuaca, Oax.",
    fecha: "22 de agosto de 1997",
    desc: "Servicio al Instituto «Teresa de Cepeda y Ahumada», que cuenta con Jardín de Niños, Primaria, Secundaria, Preparatoria y Academia Comercial. Además de la atención a los padres de familia y en la parroquia.",
  },
  {
    nombre: "Casa Noviciado «Elisa María», Molino, Huajuapan",
    fecha: "11 de febrero de 2005",
    desc: "Para brindar mejor acompañamiento y formación a las hermanas en esa etapa importante de toda vida de comunidad.",
  },
  {
    nombre: "Sagrada Familia, Santiago Tonalá, Oaxaca",
    fecha: "26 de agosto de 2010",
    desc: "Apostolado de apoyar a jóvenes que llegan de otras comunidades más pequeñas para estudiar y no tienen donde hospedarse. Se lleva un proyecto con ellas para que sigan una formación adecuada.",
  },
  {
    nombre: "Luis Fiacro, Isla Chira, Costa Rica",
    fecha: "13 de noviembre de 2001",
    desc: "Primera comunidad fuera del país. Por petición del Señor Obispo Mons. Oscar Fernández Guillen, las hermanas atienden a toda la población de la isla.",
  },
  {
    nombre: "Los Ángeles, Acatlán de Osorio, Puebla",
    fecha: "28 de agosto de 2012",
    desc: "Se atiende una librería y se apoya en la pastoral de la parroquia.",
  },
  {
    nombre: "Diócesis de Ciudad Obregón, Sonora",
    fecha: "10 de agosto de 2018",
    desc: "Atención en la casa Episcopal y apoyo en la Curia Diocesana. Actualmente en la Ciudad de León, Guanajuato.",
  },
  {
    nombre: "Divina Providencia, Cualác, Tlapa, Guerrero",
    fecha: "26 de febrero de 2019",
    desc: "Apoyo en la pastoral de la parroquia: catequesis en niños, adultos, pastoral juvenil, catequistas, ministros de la Eucaristía.",
  },
  {
    nombre: "Nuestra Señora de la Paz, Tlacotepec, Guerrero",
    fecha: "21 de agosto de 2022",
    desc: "Por petición del Señor Obispo de Chilpancingo.",
  },
  {
    nombre: "Espíritu Santo, Malabo, África",
    fecha: "Octubre de 2022",
    desc: "Última comunidad fundada hasta el momento.",
  },
];

export default function Historia() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Nuestra Historia"
        titulo="Historia de la Fundación"
        descripcion="Desde una casa prestada en 1957 hasta 17 comunidades en México, Costa Rica y África."
      />

      {/* Historia de la Fundación */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-5 text-lg leading-relaxed text-marron-suave">
          {FUNDACION.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Primeras jovencitas que formaron la Congregación */}
        <div className="my-8 rounded-2xl border border-arena bg-white p-7 shadow-sm">
          <h2 className="font-titulo text-lg font-bold text-marron">
            Las primeras jovencitas que formaron la Congregación
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRIMERAS_HERMANAS.map((nombre) => (
              <li
                key={nombre}
                className="flex items-center gap-3 text-marron-suave"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-dorado" />
                {nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-marron-suave">
          {FUNDACION_CONT.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {/* Línea de tiempo de comunidades fundadas */}
      <section className="bg-arena/40 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="font-titulo text-sm font-semibold uppercase tracking-widest text-azul-institucional">
              Crecimiento
            </span>
            <h2 className="font-titulo mt-2 text-3xl font-bold text-marron">
              Comunidades Fundadas
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-marron-suave">
              Cada comunidad es un paso más en la misión de llevar el Evangelio
              a nuevos pueblos.
            </p>
          </div>

          {/* Timeline vertical */}
          <ol className="relative border-l-2 border-dorado/40 pl-8">
            {COMUNIDADES.map((c, i) => (
              <li key={i} className="relative mb-10 last:mb-0">
                {/* Punto del timeline */}
                <span className="absolute -left-[2.55rem] flex h-7 w-7 items-center justify-center rounded-full bg-azul-institucional text-xs font-bold text-white ring-4 ring-crema">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-dorado-oscuro">
                    {c.fecha}
                  </p>
                  <h3 className="font-titulo mt-1 text-lg font-bold text-marron">
                    {c.nombre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-marron-suave">
                    {c.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
