// ============================================================
// app/(public)/la-congregacion/superioras/page.tsx
// Superioras Generales — las 9 superioras con sus periodos y obras,
// texto íntegro de docs/congregacion.md, en orden cronológico.
// Para los periodos con gobierno general documentado (1986-1992,
// 2001-2007 y 2007-2013) se incluye el detalle del Consejo General
// (vicaría, consejeras, secretaría y ecónoma) en un bloque expandible.
// ============================================================
import Image from "next/image";

import { SubHero } from "../_components/SubHero";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";
import { CarruselFoto } from "@/components/public/CarruselFoto";

const SUPERIORAS: {
  orden: string;
  nombre: string;
  periodo: string;
  obras: string[];
  /** Foto de la Superiora o de su gobierno general, si existe. */
  foto?: string;
  fotoAlt?: string;
  /** Varias fotos que se alternan en un mini carrusel (crossfade). */
  fotos?: { src: string; alt?: string }[];
  /** Consejo General del periodo (cuando está documentado). */
  gobierno?: { cargo: string; nombre: string }[];
}[] = [
  {
    orden: "1ª Superiora General",
    nombre: "M. Elisa María del Sagrado Corazón (Castro Chaverth)",
    periodo: "27 de septiembre de 1957 – 9 de marzo de 1980 (23 años)",
    obras: [
      "Durante este periodo se inició la formación integral de las primeras hermanas. El apostolado de este tiempo se dio en gran parte en las misiones por periodos de quince días o de meses. Se hizo la primera fundación en San Juan Copala, la comunidad de Santa Teresita, y se comenzó a trabajar en los jardines de niños Nazareth y Tepeyac. Se funda la comunidad del Niño de Praga en Tamazulapan, Oax.",
    ],
    foto: "/images/superiora-elisa.png",
    fotoAlt: "M. Elisa María del Sagrado Corazón (Castro Chaverth), 1ª Superiora General",
  },
  {
    orden: "2ª Superiora General",
    nombre: "M. Carmen del Sagrado Corazón (Guevara Camacho)",
    periodo: "1980–1986",
    obras: [
      "En este periodo, terminan tres hermanas la Licenciatura en Educación Primaria; durante todo el sexenio se conservaron dos equipos de misiones recorriendo la Diócesis; se iniciaron las Jornadas vocacionales; el 29 de agosto de 1981 se aprobaron las primeras constituciones; el 12 de mayo de 1985 se celebraron las Bodas de Plata del Instituto; se fundó la comunidad de Tehuitzingo, Puebla; el 4 de noviembre de 1984 se fundó la comunidad en Texcoco, Edo. de Méx. El 12 de enero de 1985 se celebraron las Bodas de Plata de las madres iniciadoras del Instituto.",
    ],
    foto: "/images/superiora-mariadelcarmen.jpeg",
    fotoAlt: "M. Carmen del Sagrado Corazón (Guevara Camacho), 2ª Superiora General",
  },
  {
    orden: "3ª Superiora General",
    nombre: "M. Catalina del Espíritu Santo (Martínez González)",
    periodo: "1986–1992",
    obras: [
      "El 4 de septiembre de 1989 se celebraron las Bodas de Plata de la comunidad de Santa Teresita en San Juan Copala; en ese mismo año el 18 de septiembre se hizo la fundación de la comunidad del Señor de los Corazones en la comunidad de Chila de las Flores, Puebla; ocho hermanas empezaron sus estudios de Preparatoria; el 23 de marzo de 1990 se celebraron las Bodas de Oro de Ordenación de Nuestro Padre Fundador; en febrero de 1991 fueron las Bodas de Plata de los Jardines de Niños Tepeyac y Nazareth; el 1º de abril de 1992 se funda la Comunidad Nazareth en el Jardín de Niños que ya funcionaba con este nombre.",
    ],
    fotos: [
      {
        src: "/images/superiora-catalina.jpeg",
        alt: "M. Catalina del Espíritu Santo (Martínez González), 3ª Superiora General",
      },
      {
        src: "/images/gobierno-1986-1992.jpg",
        alt: "Gobierno General de la Congregación, periodo 1986–1992",
      },
    ],
    gobierno: [
      { cargo: "Superiora General", nombre: "M. Catalina del Espíritu Santo (Martínez González)" },
      { cargo: "Vicaria y Primera Consejera", nombre: "M. Carmen del Sagrado Corazón (Guevara Camacho)" },
      { cargo: "Segunda Consejera", nombre: "M. Francisca de la Eucaristía (Martínez González)" },
      { cargo: "Tercera Consejera", nombre: "M. Acela de Jesús (Vázquez Hernández)" },
      { cargo: "Cuarta Consejera y Secretaria General", nombre: "M. Ma. del Carmen del Señor de los Corazones (Lucero Rosario)" },
    ],
  },
  {
    orden: "4ª Superiora General",
    nombre: "M. María del Carmen del Sagrado Corazón (Guevara Camacho)",
    periodo: "1992–2001",
    obras: [
      "19 hermanas terminan la preparatoria. En junio de 2000 se reinicia el proceso para la aprobación diocesana de Roma. Se funda la comunidad del Señor de los Corazones en Chila de las Flores, Puebla y la del Señor de Santa María de Guadalupe en Juxtlahuaca, Oax. Se comienza a dar el servicio en la Casa Hogar «El Ángel». Se inicia la primera etapa de construcción del noviciado en la localidad del Molino.",
    ],
    foto: "/images/superiora-mariadelcarmen.jpeg",
    fotoAlt: "M. María del Carmen del Sagrado Corazón (Guevara Camacho), 4ª Superiora General",
  },
  {
    orden: "5ª Superiora General",
    nombre: "M. Ma. del Carmen del Señor de los Corazones (Lucero Rosario)",
    periodo: "2001–2007",
    obras: [
      "Se obtuvo la aprobación Diocesana del Instituto Misioneras del Señor de los Corazones y de Santa María de Guadalupe. Se terminó la construcción de la capilla del noviciado, y se trasladaron las hermanas formandas que hasta entonces habían vivido en la Casa Central.",
    ],
    fotos: [
      {
        src: "/images/superiora-lucerorosario.jpeg",
        alt: "M. Ma. del Carmen del Señor de los Corazones (Lucero Rosario), 5ª Superiora General",
      },
      {
        src: "/images/superiora-lucero-rosario.png",
        alt: "Visita de la Superiora General M. Ma. del Carmen Lucero Rosario al Jardín de Niños Nazareth",
      },
    ],
    gobierno: [
      { cargo: "Superiora General", nombre: "M. Ma. del Carmen del Señor de los Corazones (Lucero Rosario)" },
      { cargo: "Vicaria General y Primera Consejera", nombre: "M. María del Carmen del Sagrado Corazón (Guevara Camacho)" },
      { cargo: "Segunda Consejera", nombre: "M. Altagracia del Divino Verbo (Soriano Ramírez)" },
      { cargo: "Tercera Consejera y Secretaria General", nombre: "M. Gema de San Elías (Herrera Morales)" },
      { cargo: "Ecónoma General", nombre: "M. Luz María de Jesús (Orta Cid)" },
    ],
  },
  {
    orden: "6ª Superiora General",
    nombre: "M. Clara de la Eucaristía (Herrera Soriano)",
    periodo: "31 de julio de 2007 – 31 de julio de 2013",
    obras: [
      "En mayo 26 de 2011 se reinició el proceso de aprobación Diocesana, finalizándose en el año 2013; un equipo de hermanas inicia el servicio de atención a jóvenes estudiantes en Santo Domingo Tonalá, Oax., el 26 de agosto de 2010; el 13 de noviembre de 2011 se funda la primera comunidad en el extranjero en la Isla de Chira perteneciente al país de Costa Rica.",
      "Desde la fundación de la Congregación se ha prestado servicios eventuales en el Seminario Mayor, en la Casa de Ejercicios «San José», en la Secretaría de la Sagrada Mitra, se ha atendido a algunos obispos: Mons. Felipe Padilla Cardona mientras estuvo en la Diócesis y al irse solicitó la presencia de las hermanas en su nueva Diócesis, Tehuantepec; al Sr. Héctor González Martínez en la Ciudad de Oaxaca, hasta su traslado a Durango, se prestó el servicio al Excmo. Sr. Obpo. Teodoro Enrique Pino Miranda en el Obispado hasta su fallecimiento y en la secretaria de la Vicaría de Pastoral.",
    ],
    foto: "/images/superiora-clara.jpeg",
    fotoAlt: "M. Clara de la Eucaristía (Herrera Soriano), 6ª Superiora General",
    gobierno: [
      { cargo: "Superiora General", nombre: "M. Clara de la Eucaristía (Herrera Soriano)" },
      { cargo: "Vicaria General y Primera Consejera", nombre: "M. Gema de San Elías (Herrera Morales)" },
      { cargo: "Segunda Consejera", nombre: "M. Altagracia del Divino Verbo (Soriano Ramírez)" },
      { cargo: "Tercera Consejera", nombre: "M. Lidia de Jesús Sacerdote (Ortiz Solano)" },
      { cargo: "Cuarta Consejera y Secretaria General", nombre: "M. María de San José (Solano Valladares)" },
      { cargo: "Ecónoma General", nombre: "M. Carmen Teresita del Niño Jesús (Nieves Romero)" },
    ],
  },
  {
    orden: "7ª Superiora General",
    nombre: "M. Inés de la Santa Faz (Balbuena Pavía)",
    periodo: "1 de agosto de 2013 – 31 de julio de 2019",
    obras: [
      "Se continúa el proceso de redacción, revisión y aprobación del directorio, estudio sobre el carisma y apoyo en la formación humana. Se hacen dos fundaciones: en la Diócesis de Ciudad Obregón, Sonora, apoyo directo al Sr. Obispo Felipe Padilla Cardona, y en la Diócesis de Tlapa, Guerrero, casa misión en la parroquia de Cualác. Se ha elaborado el Plan Congregacional. Dos hermanas terminaron los estudios de Licenciatura en Ciencias Religiosas en la Universidad Pontificia de México, y otra hermana estudió en Guadalajara la Licenciatura en Catequesis. Una hermana terminó la Licenciatura en Pedagogía.",
      "Se celebró en los días 14 al 31 de julio del año 2019 el VII Capítulo General, el cual estuvo lleno de muchas luces del Espíritu Santo y como fruto del mismo emanaron varios documentos para trabajar todo el sexenio.",
    ],
    foto: "/images/superiora-ines.jpeg",
    fotoAlt: "M. Inés de la Santa Faz (Balbuena Pavía), 7ª Superiora General",
  },
  {
    orden: "8ª Superiora General",
    nombre: "M. Ana Lidia del Sagrado Corazón de María (Méndez Barragán)",
    periodo: "1 de agosto de 2019 – 31 de julio de 2025",
    obras: [
      "Electa el 31 de julio del año 2019 durante el VII Capítulo General.",
    ],
    foto: "/images/superiora-analidia.jpeg",
    fotoAlt: "M. Ana Lidia del Sagrado Corazón de María (Méndez Barragán), 8ª Superiora General",
  },
  {
    orden: "9ª Superiora General",
    nombre: "M. Celia Teodora del Corazón Eucarístico (Corro Salazar)",
    periodo: "31 de julio de 2025 – actual",
    obras: [
      "Electa el 31 de julio del año 2025, actual Superiora General de la Congregación.",
    ],
    foto: "/images/Superiora.png",
    fotoAlt: "M. Celia Teodora del Corazón Eucarístico (Corro Salazar), 9ª y actual Superiora General",
  },
];

export default function Superioras() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Superioras Generales"
        titulo="Quienes han guiado la Congregación"
        descripcion="Nueve Superioras Generales y las obras realizadas durante su servicio, desde 1957 hasta hoy."
        imagenFondo="/images/Imagen principal de misioneras.png"
        posicionFondo="bg-top"
        veloClase="bg-gradient-to-br from-marron/88 via-marron/82 to-dorado-oscuro/82"
      />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="space-y-8">
          {SUPERIORAS.map((s, i) => {
            const tieneFoto = !!s.foto || !!s.fotos?.length;
            // Con poca información, apilamos: imagen arriba y texto abajo,
            // centrado (evita el hueco blanco al lado del texto corto).
            const apilar = tieneFoto && s.obras.join(" ").length < 220;
            return (
            <AnimacionScroll key={i} delay={(i % 2) * 100}>
              <article className="overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
                <div className="border-l-4 border-dorado p-7 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-titulo text-sm font-semibold uppercase tracking-widest text-azul-institucional">
                      {s.orden}
                    </p>
                    <p className="rounded-full bg-crema px-3 py-1 text-xs font-medium text-marron-suave">
                      {s.periodo}
                    </p>
                  </div>
                  <h2 className="font-titulo mt-2 text-xl font-bold text-marron md:text-2xl">
                    {s.nombre}
                  </h2>

                  {/* Contenido: foto (si existe) junto al texto de obras.
                      En móvil se apila; en md+ la foto va en columna lateral. */}
                  <div
                    className={
                      apilar
                        ? "mt-5 flex flex-col items-center gap-5 text-center"
                        : tieneFoto
                          ? "mt-5 flex flex-col gap-6 md:flex-row md:items-start"
                          : "mt-4"
                    }
                  >
                    {s.fotos ? (
                      <figure className="mx-auto w-full max-w-sm md:mx-0 md:w-80 md:shrink-0">
                        <CarruselFoto fotos={s.fotos} />
                      </figure>
                    ) : (
                      s.foto && (
                        <figure className="mx-auto w-full max-w-sm md:mx-0 md:w-80 md:shrink-0">
                          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl border border-arena bg-crema shadow-sm">
                            <Image
                              src={s.foto}
                              alt={s.fotoAlt ?? s.nombre}
                              width={768}
                              height={960}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          {s.fotoAlt && (
                            <figcaption className="mt-2 px-1 text-center text-xs italic leading-snug text-marron-suave">
                              {s.fotoAlt}
                            </figcaption>
                          )}
                        </figure>
                      )
                    )}

                    <div
                      className={
                        apilar
                          ? "max-w-2xl space-y-4 leading-relaxed text-marron-suave"
                          : "space-y-4 text-justify leading-relaxed text-marron-suave"
                      }
                    >
                      {s.obras.map((o, j) => (
                        <p key={j}>{o}</p>
                      ))}
                    </div>
                  </div>

                  {/* Consejo General del periodo (expandible) */}
                  {s.gobierno && (
                    <details className="group mt-5 rounded-xl border border-arena bg-crema/60">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-5 py-3 font-titulo text-sm font-semibold text-azul-institucional transition-colors hover:bg-arena/40">
                        Consejo General del periodo
                        <span className="text-marron-suave transition-transform group-open:rotate-180">
                          ▾
                        </span>
                      </summary>
                      <dl className="divide-y divide-arena/70 px-5 pb-4">
                        {s.gobierno.map((g, k) => (
                          <div
                            key={k}
                            className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-3"
                          >
                            <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-dorado-oscuro sm:w-56">
                              {g.cargo}
                            </dt>
                            <dd className="text-sm text-marron">{g.nombre}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  )}
                </div>
              </article>
            </AnimacionScroll>
            );
          })}
        </div>
      </section>
    </div>
  );
}
