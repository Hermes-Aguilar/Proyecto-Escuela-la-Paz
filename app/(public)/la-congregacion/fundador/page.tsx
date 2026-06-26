// ============================================================
// app/(public)/la-congregacion/fundador/page.tsx
// El Fundador — relato en primera persona del Padre Fundador,
// texto íntegro de docs/congregacion.md ("Idea y Origen",
// "Comunicación de la Idea", "La Casa", "Arreglo de la Casa",
// "Nuevas Dificultades", "Principia el Instituto").
// ============================================================
import Image from "next/image";

import { SubHero } from "../_components/SubHero";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";

// Cada sección del relato, con su título y párrafos íntegros.
const SECCIONES: { titulo: string; parrafos: string[] }[] = [
  {
    titulo: "Idea y Origen del Instituto",
    parrafos: [
      "Ser misionero ha sido una llamita que ha iluminado mi vida, y calentado mi corazón. Pasaron los años de seminarista y la llamita no se apagaba, terminando el tercer año de sagrada Teología 1938 y obedeciendo la voluntad de mi Dignísimo y amado Prelado, Jenaro Méndez del Rio, viajar hacia el viejo Continente, terminar los estudios Eclesiásticos en la Ciudad de Roma, así pasaron cuatro años felices. Me ordené sacerdote el 23 de marzo de 1940, conocí al Santo Padre Pío XI y Pío XII, sentí los sufrimientos de Guerra Mundial y volví a esta ciudad de Huajuapan en agosto de 1942; en Roma Ser misionero, aumentó este deseo porque sentí crecer en mi corazón el amor a Jesucristo, a la Iglesia, al Papa, a mi Obispo, a mi Diócesis de Huajuapan, tan pobre y triste como es ella. Mucho sentí dejar la Ciudad eterna, Roma, pero la idea seré misionero en mi Patria, en mi Diócesis me animaba, el deseo de trabajar en el Seminario para buscarme compañeros misioneros.",
      "Cuánto sufrí, cuando mi primer destino fue ser Vicario coadjutor de Huajuapan y tres meses después de Tezoatlán y el 17 de marzo de 1943 mi nombramiento a la Parroquia de Mariscala y unos meses después nombramiento de párroco de Mariscala mi deseo era trabajar no un territorio de una parroquia sino en toda la Diócesis. En enero de 1945 me ordenaron trasladarme dejando a Mariscala y al Seminario como Maestro de latín, pero sin poder hacer algo más, y llenar los deseos de mi corazón, y así pasaron los años.",
      "Ser misionero y vino a mi corazón la idea que siempre me causa fortaleza en las penas fundar una beca perpetua misional, para un misionero jesuita de nacionalidad China, escribí al R. P. Romero S.J. y aceptó mi idea, enviándole mensualmente lo que pudiera reunir, y la dediqué al Excmo. Sr. Rafael Amador, la principié el 12 de mayo de 1948, creía imposible reunir pronto los $10,000.00 diez mil pesos pero bendito sea Dios se terminó el trabajo el 12 de mayo de 1952, con este trabajo conocí a la Señorita Soledad Bautista quien me ayudó colectando. En Septiembre de 1952 fui nombrado capellán del templo del Calvario y el deseo de ser misionero, pero no solo sino acompañado fue creciendo y en trabajo en ese templo conocí a las señoritas Francisca y Catalina Martínez y Guadalupe Lima quienes mucho me ayudaron para sostener el culto divino y arreglo del templo, y fueron dejando las fiestas y aprendiendo a sufrir un poco por Nuestro Señor. Fueron a ellas a quienes principalmente descubrí mis deseos fueran Religiosas Misioneras para nuestra Diócesis de Huajuapan.",
    ],
  },
  {
    titulo: "Comunicación de la Idea",
    parrafos: [
      "Por el año de 1955 al año 1956, principié a tener amistad con el Pbro. Porfirio López Alavéz Canónigo de la Santa Iglesia Catedral, por ciertas invitaciones que le hacía siendo yo capellán del Calvario. Fue entonces cuando le comuniqué la idea de necesidad y conveniencia para nuestra Diócesis tener sus Religiosas propias «Misioneras Diocesanas», para cumplir y tener en las parroquias su Colegio, un centro de Beneficencia y misiones populares, aceptó la idea con ardor, y conforme pasaban los días, semanas y meses, aumentaba nuestro deseo de «Misioneras Diocesanas», el Pbro. López muchas veces se molestó porque no se principiaba desde luego. Por mi parte sentía miedo y temor para principiar, la parte económica y la espiritual? El tomaría la parte espiritual y yo la parte del dinero.",
    ],
  },
  {
    titulo: "La Casa",
    parrafos: [
      "En varias ocasiones acompañado del M. I. Sr. López Alavés buscamos casa, apropiada para la fundación de las Misioneras Diocesanas, visitamos a la Srita. Laura Villalva, su respuesta fue negativa, a la Sra. María Eugenia Cubas de Flores, nos dio esperanzas. el Pbro. López habló con el Sr. Guillermo Abascal Gutiérrez, apoderado del Lic. Juan de Dios Flores y tanto el Sr. López como yo escribimos al Lic. nos prestara su casa, ubicada en la calle Independencia No. 4, colindando con el parque, calle de por medio, casa del mismo señor licenciado y con la casa de la Sra. Consuelo Arámburo de Luna. Gracias a Dios, con un telegrama el Licenciado contestó favorablemente, y el Señor Abascal entregó al Señor López las llaves de la casa, más aún, sin determinar tiempo y sin ninguna renta, ¡bendito sea Dios! Y esto fue el 20 del mes de marzo del año del Señor 1957.",
    ],
  },
  {
    titulo: "Arreglo de la Casa",
    parrafos: [
      "Acompañado del Sr. López Alavés fuimos a la Casa «Regalos Martínez Corro», para hacer la compra de 10 camas individuales y sus colchones, con la Sra. Conchita Martínez Corro, por el valor de $220.00 c/u y $110.00 cada mes. Por esta fecha el Sr. Cango. D. Juan de Dios Mendoza nos dio $400.00 que fueron dados como enganche, por lo tanto el valor total fue de $3,300.00 quedó reducido a $2,900.00, se pagarían en 12 letras mensuales, aumentaron por este motivo 15% a dicha cantidad, resultando así $3,480.00. Esto pagó por el 20 de marzo de 1957.",
    ],
  },
  {
    titulo: "Nuevas Dificultades",
    parrafos: [
      "Pasaban los días, teníamos ya casa y camas y arreglada la luz y agua y al mismo tiempo la amenaza del Señor López, que si no principiábamos el dia 3 de mayo, ya no contáramos con su ayuda, ya había pasado por las casas de las señoritas y hablado con sus papacitos y conseguido su consentimiento. Las cosas de Dios, sufren dificultades que vencerse. De la señorita Soledad que su mamá estaba enferma, la señorita Guadalupe que se sentía enferma, las señoritas Francisca y Catalina dificultades serias de familia, la única que no tenía dificultades era la señorita Carmen Guevara, penas que realmente para mi pobre corazón eran grandes, por otra parte, la M. Araceli, Franciscana de María Inmaculada, cuando en México años antes le platicaba mi idea, me decía, «Padre, es muy difícil lo que usted quiere nosotras las religiosas somos muy exigentes». Sentía una gran confianza en el Señor del Calvario, del Señor Obispo Diocesano Dr. D. Celestino Fernández y Fernández tenía su aprobación, ya había leído lo poco que había escrito de Constituciones. Dinero nada tenía y el Señor Obispo nada daría por cuenta de la Diócesis, el Señor López me decía que me ayudaría pero nada de dinero. Con estos horizontes tan negros y al mismo tiempo tan claros, venidos de Dios y reafirmados en los santos Ejercicios Espirituales del año 1956, tomados y practicados por el mes de noviembre. Contaba con Dios, con la Santísima Virgen, de palabra también con el Sr. Vicario General el Sr. Camarillo, con el Secretario de la Sagrada Mitra Arnulfo de Jesús Barragán y especialmente con el Sr. López Alavéz. Yo me obligué a darles mensualmente $300.00, como una ayuda, siempre.",
    ],
  },
  {
    titulo: "Principia el Instituto",
    parrafos: [
      "Domingo 12 de mayo de 1957, se determinó fuera el dia principiar esta obra de Dios y de la Santísima Virgen, porque el 12 de mayo de 1903 fue la erección de la Diócesis. El miércoles 8 de mayo, acompañado del Señor López, fuimos a la casa con la señorita Carmen Guevara Camacho, para decirles a sus papás la fecha y hora de entrada, anuncio que mucho agradó a sus papacitos, aunque eran unos pocos días de preparación, fuimos a la casa de la señorita Soledad, encontramos a su mamá encamada, y su papá D. Manuel Bautista nos dijo que estaba conforme con lo que manifestara su mamá, la señora María Arias, estuvo de acuerdo. A los papás de la Señorita Francisca, como a la mamá de la señorita Guadalupe ya no fuimos en este dia porque ya estaban en lo dicho, de la señorita Catalina, entraría después.",
      "El domingo 12 de mayo de 1957 a las 8 p.m. estarían las señoritas, sus papás y siendo los testigos del principio del Instituto Religioso Diocesano. A las 6 p.m. terminando el Rosario en el Calvario, llevé al Santísimo Sacramento a la casa Independencia #4, a las 8 p.m. El Excmo. Sr. Obispo con su presencia y con sus palabras, autorizaba el que las cuatro principiaran la vida comunitaria, sin ninguna fórmula, y solo imponiéndoles el Santo Cristo y dando a cada una «La Imitación de Cristo». La vida se reducía a poco, oración-estudio y trabajo. Así principiaron mis trabajos, penas y sufrimientos de cada dia, mis amarguras todo era para la gloria de Dios y de la Santísima Virgen, bien espiritual de la Diócesis de Huajuapan, la salud de estas primeras cuatro hermanas y de tantas otras que el correr de los años, el Señor las traería, para el crecimiento de su Instituto, que se llamaría del Señor de los Corazones, Cristo crucificado que es propio de nuestra amada Diócesis.",
      "Amada institución. Así principiaron mis penas, amarguras, años, meses, semanas y días de tristezas. Pero sea todo para la mayor gloria de Dios N.S. salud de estas primeras cuatro hermanas y de tantas otras que en el correr de los años, serán traídas para el Divino Esposo.",
    ],
  },
];

export default function Fundador() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="El Fundador"
        titulo="Pbro. Lic. Luis Fiacro Guerrero Ramírez"
        descripcion="El relato, de su puño y letra, del nacimiento de esta obra de Dios."
        imagenFondo="/images/Imagen principal del fundador.png"
        veloClase="bg-gradient-to-br from-marron/90 via-marron/85 to-dorado-oscuro/80"
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* Retrato del Padre Fundador */}
        <AnimacionScroll>
          <figure className="mb-12 overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
            <Image
              src="/images/fundador-jardin.jpg"
              alt="Nuestro Padre Fundador, Pbro. Lic. Luis Fiacro Guerrero Ramírez, paseando en el jardín de la Casa Central"
              width={1024}
              height={768}
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="border-t border-arena px-6 py-3 text-center text-sm italic text-marron-suave">
              Nuestro Padre Fundador paseando en el jardín de la Casa Central.
            </figcaption>
          </figure>
        </AnimacionScroll>

        {SECCIONES.map((seccion, i) => (
          <AnimacionScroll key={seccion.titulo}>
            <section className={i > 0 ? "mt-12" : ""}>
              <h2 className="font-titulo text-2xl font-bold text-marron md:text-3xl">
                {seccion.titulo}
              </h2>
              <div className="mt-3 h-1 w-16 rounded bg-dorado" />
              <div className="mt-6 space-y-5 text-justify text-lg leading-relaxed text-marron-suave">
                {seccion.parrafos.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          </AnimacionScroll>
        ))}

        <p className="mt-12 border-t border-arena pt-6 text-center font-titulo italic text-marron-suave">
          Escrito de puño y letra de Nuestro Padre Fundador
          <br />
          Pbro. Lic. Luis Fiacro Guerrero Ramírez
        </p>
      </article>
    </div>
  );
}
