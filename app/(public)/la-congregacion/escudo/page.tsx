// ============================================================
// app/(public)/la-congregacion/escudo/page.tsx
// Nuestro Escudo — imagen del escudo grande y centrada + explicación
// de sus cuatro cuadrantes, el lema y la leyenda perimetral.
// ============================================================
import Image from "next/image";
import { FaCross, FaStar, FaMountain, FaRainbow } from "react-icons/fa";

import { SubHero } from "../_components/SubHero";

const CUADRANTES = [
  {
    icon: <FaCross size={20} />,
    titulo: "Cristo crucificado",
    desc: "El Señor de los Corazones, Cristo crucificado, patrono y centro del Instituto, propio de la Diócesis de Huajuapan de León.",
  },
  {
    icon: <FaStar size={20} />,
    titulo: "Virgen de Guadalupe",
    desc: "Santa María de Guadalupe, madre y patrona de la Congregación, cuyo amor maternal acompaña la misión de las hermanas.",
  },
  {
    icon: <FaMountain size={20} />,
    titulo: "Paisaje con león",
    desc: "Evoca a Huajuapan de León, la tierra y la Diócesis donde nació esta obra de Dios el 12 de mayo de 1957.",
  },
  {
    icon: <FaRainbow size={20} />,
    titulo: "Paisaje con arcoíris",
    desc: "Signo de la alianza y de la esperanza que ilumina el camino misionero hacia todos los pueblos.",
  },
];

export default function Escudo() {
  return (
    <div className="bg-crema">
      <SubHero
        eyebrow="Nuestro Escudo"
        titulo="Los símbolos de nuestra identidad"
        descripcion="Cada elemento del escudo cuenta una parte de quiénes somos y de la misión que nos fue confiada."
      />

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          {/* Imagen del escudo, grande y centrada */}
          <div className="flex justify-center">
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(193,154,58,0.25) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/images/escudo.png"
                alt="Escudo del Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe"
                width={1024}
                height={1536}
                className="h-auto w-72 object-contain drop-shadow-md md:w-80 lg:w-96"
              />
            </div>
          </div>

          {/* Leyenda perimetral + lema */}
          <div>
            <h2 className="font-titulo text-2xl font-bold text-marron md:text-3xl">
              Un escudo, una misión
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-dorado" />
            <p className="mt-6 leading-relaxed text-marron-suave">
              Rodeando el óvalo, el escudo lleva grabado nuestro lema:
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-dorado bg-white p-6 shadow-sm">
              <p className="font-script text-2xl leading-tight text-dorado-oscuro md:text-3xl">
                Alegrémonos de sufrir por Cristo en favor de su Iglesia
              </p>
            </blockquote>
            <p className="mt-6 leading-relaxed text-marron-suave">
              Y, abrazando la imagen, la leyenda que nos da nombre y origen:{" "}
              <span className="font-medium text-marron">
                «Misioneras del Señor de los Corazones y de Sta. Ma. de Gpe. —
                Dióc. de Huajuapan de León, Oax.»
              </span>
            </p>
          </div>
        </div>

        {/* Los cuatro cuadrantes */}
        <div className="mt-16">
          <h3 className="font-titulo text-center text-2xl font-bold text-marron">
            Los cuatro cuadrantes
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CUADRANTES.map((c) => (
              <div
                key={c.titulo}
                className="flex gap-4 rounded-2xl border border-arena bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-azul-institucional/10 text-azul-institucional">
                  {c.icon}
                </div>
                <div>
                  <h4 className="font-titulo font-bold text-marron">
                    {c.titulo}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-marron-suave">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
