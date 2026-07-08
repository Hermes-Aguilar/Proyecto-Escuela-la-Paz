// ============================================================
// app/(public)/la-congregacion/primeras-hermanas/page.tsx
// Primeras Hermanas — las 4 iniciadoras de la Congregación
// (docs/congregacion.md). Se usa la foto histórica real de las
// primeras hermanas con la Madre Elisa María, y los nombres como
// pie de foto (en el orden "de izq. a der." del documento).
// ============================================================
import Image from "next/image";

import { SubHero } from "../_components/SubHero";
import { AnimacionScroll } from "@/components/public/AnimacionScroll";

const HERMANAS: {
  nombre: string;
  apellidos: string;
  fallecida?: boolean;
}[] = [
  {
    nombre: "M. Carmen del Sagrado Corazón",
    apellidos: "Guevara Camacho",
  },
  {
    nombre: "M. Guadalupe de Jesús Crucificado",
    apellidos: "Lima Guzmán",
  },
  {
    nombre: "M. Francisca de Santa Teresa",
    apellidos: "Martínez González",
  },
  {
    nombre: "M. Soledad de San José",
    apellidos: "Bautista Arias",
    fallecida: true,
  },
];

export default function PrimerasHermanas() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Primeras Hermanas"
        titulo="Las cuatro iniciadoras"
        descripcion="Las jovencitas que el 12 de mayo de 1957 dieron inicio a esta obra de Dios y de la Santísima Virgen."
        imagenFondo="/images/fundadoras principal1.png"
        posicionFondo="bg-bottom"
        veloClase="bg-gradient-to-br from-marron/88 via-marron/82 to-terracota-oscuro/82"
      />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <AnimacionScroll>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-justify text-lg leading-relaxed text-marron-suave">
              El domingo 12 de mayo de 1957, ante el Excmo. Sr. Obispo Don
              Celestino Fernández y Fernández, cuatro jovencitas principiaron la
              vida comunitaria, recibiendo el Santo Cristo y «La Imitación de
              Cristo». Su vida se reducía a oración, estudio y trabajo.
            </p>
          </div>
        </AnimacionScroll>

        {/* Foto histórica real + pie de foto con los nombres */}
        <AnimacionScroll>
          <figure className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-arena bg-white shadow-sm">
            <Image
              src="/images/primeras-hermanas.jpg"
              alt="Las primeras hermanas que iniciaron la Congregación, con la Madre Elisa María del Sagrado Corazón"
              width={1024}
              height={768}
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="border-t border-arena px-6 py-5">
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-azul-institucional">
                Primeras hermanas que iniciaron la Congregación
              </p>
              <p className="mt-1 text-center text-xs text-marron-suave">
                Junto a la Madre Elisa María del Sagrado Corazón, primera Superiora
                General y Formadora · de izq. a der.:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {HERMANAS.map((h) => (
                  <li key={h.nombre} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-dorado" />
                    <span>
                      <span className="font-titulo font-bold text-marron">
                        {h.nombre}
                      </span>{" "}
                      <span className="text-marron-suave">({h.apellidos})</span>
                      {h.fallecida && (
                        <span className="ml-1 text-dorado-oscuro" title="En la casa del Padre">
                          †
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </AnimacionScroll>

        <p className="mx-auto mt-12 max-w-2xl text-center font-titulo italic text-marron-suave">
          «Sea todo para la mayor gloria de Dios Nuestro Señor, salud de estas
          primeras cuatro hermanas y de tantas otras que en el correr de los
          años serán traídas para el Divino Esposo.»
        </p>
      </section>
    </div>
  );
}
