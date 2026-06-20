// ============================================================
// app/(public)/la-congregacion/superioras/page.tsx
// Superioras Generales — las 8 superioras con sus periodos y obras,
// texto íntegro de docs/congregacion.md, en orden cronológico.
// ============================================================
import { SubHero } from "../_components/SubHero";

const SUPERIORAS: {
  orden: string;
  nombre: string;
  periodo: string;
  obras: string[];
}[] = [
  {
    orden: "1ª Superiora General",
    nombre: "M. Elisa María del Sagrado Corazón (Castro Chaverth)",
    periodo: "27 de septiembre de 1957 – 9 de marzo de 1980 (23 años)",
    obras: [
      "Durante este periodo se inició la formación integral de las primeras hermanas. El apostolado de este tiempo se dio en gran parte en las misiones por periodos de quince días o de meses. Se hizo la primera fundación en San Juan Copala, la comunidad de Santa Teresita, y se comenzó a trabajar en los jardines de niños Nazareth y Tepeyac. Se funda la comunidad del Niño de Praga en Tamazulapan, Oax.",
    ],
  },
  {
    orden: "2ª Superiora General",
    nombre: "M. Carmen del Sagrado Corazón (Guevara Camacho)",
    periodo: "1980–1986",
    obras: [
      "En este periodo, terminan tres hermanas la Licenciatura en Educación Primaria; durante todo el sexenio se conservaron dos equipos de misiones recorriendo la Diócesis; se iniciaron las Jornadas vocacionales; el 29 de agosto de 1981 se aprobaron las primeras constituciones; el 12 de mayo de 1985 se celebraron las Bodas de Plata del Instituto; se fundó la comunidad de Tehuitzingo, Puebla; el 4 de noviembre de 1984 se fundó la comunidad en Texcoco, Edo. de Méx. El 12 de enero de 1985 se celebraron las Bodas de Plata de las madres iniciadoras del Instituto.",
    ],
  },
  {
    orden: "3ª Superiora General",
    nombre: "M. Catalina del Espíritu Santo (Martínez González)",
    periodo: "1986–1992",
    obras: [
      "El 4 de septiembre de 1989 se celebraron las Bodas de Plata de la comunidad de Santa Teresita en San Juan Copala; en ese mismo año el 18 de septiembre se hizo la fundación de la comunidad del Señor de los Corazones en la comunidad de Chila de las Flores, Puebla; ocho hermanas empezaron sus estudios de Preparatoria; el 23 de marzo de 1990 se celebraron las Bodas de Oro de Ordenación de Nuestro Padre Fundador; en febrero de 1991 fueron las Bodas de Plata de los Jardines de Niños Tepeyac y Nazareth; el 1º de abril de 1992 se funda la Comunidad Nazareth en el Jardín de Niños que ya funcionaba con este nombre.",
    ],
  },
  {
    orden: "4ª Superiora General",
    nombre: "M. María del Carmen del Sagrado Corazón (Guevara Camacho)",
    periodo: "1992–2001",
    obras: [
      "19 hermanas terminan la preparatoria. En junio de 2000 se reinicia el proceso para la aprobación diocesana de Roma. Se funda la comunidad del Señor de los Corazones en Chila de las Flores, Puebla y la del Señor de Santa María de Guadalupe en Juxtlahuaca, Oax. Se comienza a dar el servicio en la Casa Hogar «El Ángel». Se inicia la primera etapa de construcción del noviciado en la localidad del Molino.",
    ],
  },
  {
    orden: "5ª Superiora General",
    nombre: "M. Ma. del Carmen del Señor de los Corazones (Lucero Rosario)",
    periodo: "2001–2007",
    obras: [
      "Se obtuvo la aprobación Diocesana del Instituto Misioneras del Señor de los Corazones y de Santa María de Guadalupe. Se terminó la construcción de la capilla del noviciado, y se trasladaron las hermanas formandas que hasta entonces habían vivido en la Casa Central.",
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
  },
  {
    orden: "7ª Superiora General",
    nombre: "M. Inés de la Santa Faz (Balbuena Pavía)",
    periodo: "1 de agosto de 2013 – 31 de julio de 2019",
    obras: [
      "Se continúa el proceso de redacción, revisión y aprobación del directorio, estudio sobre el carisma y apoyo en la formación humana. Se hacen dos fundaciones: en la Diócesis de Ciudad Obregón, Sonora, apoyo directo al Sr. Obispo Felipe Padilla Cardona, y en la Diócesis de Tlapa, Guerrero, casa misión en la parroquia de Cualác. Se ha elaborado el Plan Congregacional. Dos hermanas terminaron los estudios de Licenciatura en Ciencias Religiosas en la Universidad Pontificia de México, y otra hermana estudió en Guadalajara la Licenciatura en Catequesis. Una hermana terminó la Licenciatura en Pedagogía.",
      "Se celebró en los días 14 al 31 de julio del año 2019 el VII Capítulo General, el cual estuvo lleno de muchas luces del Espíritu Santo y como fruto del mismo emanaron varios documentos para trabajar todo el sexenio.",
    ],
  },
  {
    orden: "8ª Superiora General",
    nombre: "M. Ana Lidia del Sagrado Corazón de María (Méndez Barragán)",
    periodo: "1 de agosto de 2019 – actual",
    obras: [
      "Electa el 31 de julio del año 2019 durante el VII Capítulo General.",
    ],
  },
];

export default function Superioras() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Superioras Generales"
        titulo="Quienes han guiado la Congregación"
        descripcion="Ocho Superioras Generales y las obras realizadas durante su servicio, desde 1957 hasta hoy."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="space-y-8">
          {SUPERIORAS.map((s, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-arena bg-white shadow-sm"
            >
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
                <div className="mt-4 space-y-4 leading-relaxed text-marron-suave">
                  {s.obras.map((o, j) => (
                    <p key={j}>{o}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
