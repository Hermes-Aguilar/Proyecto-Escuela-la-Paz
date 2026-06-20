// ============================================================
// app/(public)/la-congregacion/primeras-hermanas/page.tsx
// Primeras Hermanas — las 4 fundadoras de la Congregación
// (docs/congregacion.md). Sin fotos disponibles: se usan avatares
// con iniciales, como en el equipo de los jardines.
// ============================================================
import { SubHero } from "../_components/SubHero";

const HERMANAS: {
  nombre: string;
  apellidos: string;
  iniciales: string;
  fallecida?: boolean;
}[] = [
  {
    nombre: "M. Carmen del Sagrado Corazón",
    apellidos: "Guevara Camacho",
    iniciales: "CG",
  },
  {
    nombre: "M. Guadalupe de Jesús Crucificado",
    apellidos: "Lima Guzmán",
    iniciales: "GL",
  },
  {
    nombre: "M. Francisca de Santa Teresa",
    apellidos: "Martínez González",
    iniciales: "FM",
  },
  {
    nombre: "M. Soledad de San José",
    apellidos: "Bautista Arias",
    iniciales: "SB",
    fallecida: true,
  },
];

export default function PrimerasHermanas() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Primeras Hermanas"
        titulo="Las cuatro fundadoras"
        descripcion="Las jovencitas que el 12 de mayo de 1957 dieron inicio a esta obra de Dios y de la Santísima Virgen."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-marron-suave">
            El domingo 12 de mayo de 1957, ante el Excmo. Sr. Obispo Don
            Celestino Fernández y Fernández, cuatro jovencitas principiaron la
            vida comunitaria, recibiendo el Santo Cristo y «La Imitación de
            Cristo». Su vida se reducía a oración, estudio y trabajo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {HERMANAS.map((h) => (
            <article
              key={h.nombre}
              className="flex flex-col items-center rounded-2xl border border-arena bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Avatar con iniciales */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-azul-institucional to-azul-oscuro shadow-inner">
                <span className="font-titulo text-3xl font-bold text-white">
                  {h.iniciales}
                </span>
              </div>
              <h2 className="font-titulo mt-5 text-lg font-bold leading-snug text-marron">
                {h.nombre}
              </h2>
              <p className="mt-1 text-sm text-marron-suave">{h.apellidos}</p>
              {h.fallecida && (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-crema px-3 py-1 text-xs font-medium text-marron-suave">
                  <span className="text-dorado-oscuro">†</span> En la casa del
                  Padre
                </span>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center font-titulo italic text-marron-suave">
          «Sea todo para la mayor gloria de Dios Nuestro Señor, salud de estas
          primeras cuatro hermanas y de tantas otras que en el correr de los
          años serán traídas para el Divino Esposo.»
        </p>
      </section>
    </div>
  );
}
