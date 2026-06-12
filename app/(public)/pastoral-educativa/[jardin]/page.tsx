import Link from "next/link";
import { notFound } from "next/navigation";
import { getJardin, jardines } from "../jardines";

export function generateStaticParams() {
  return jardines.map((j) => ({ jardin: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin } = await params;
  const data = getJardin(jardin);
  if (!data) return { title: "Jardín no encontrado" };
  return {
    title: `${data.nombre} | Pastoral Educativa`,
    description: data.resumen,
  };
}

export default async function JardinPage({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin } = await params;
  const data = getJardin(jardin);
  if (!data) notFound();

  const { tema } = data;

  return (
    <>
      {/* Hero temático */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${tema.marca}, ${tema.acento})` }}
      >
        {/* Vignette: asegura contraste del texto blanco en cualquier tema */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 45%, rgba(22,16,11,0.34), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <Link
            href="/pastoral-educativa"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            ← Pastoral Educativa
          </Link>
          <h1 className="mt-6 font-titulo text-4xl font-medium text-white drop-shadow-sm sm:text-6xl">
            {data.nombre}
          </h1>
          <p className="mt-4 font-titulo text-lg italic text-white/95 sm:text-2xl">
            {data.lema}
          </p>
        </div>
        {/* Arcada base */}
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          className="relative block h-8 w-full"
          style={{ color: tema.superficie }}
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={i} d={`M${i * 120} 50 V28 a60 48 0 0 1 120 0 V50 Z`} fill="currentColor" />
          ))}
        </svg>
      </section>

      {/* Descripción */}
      <section style={{ backgroundColor: tema.superficie }}>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: tema.texto }}
          >
            El jardín
          </p>
          <p className="mt-5 font-titulo text-2xl leading-snug text-[var(--tinta)] sm:text-3xl">
            {data.descripcion}
          </p>
        </div>
      </section>

      {/* Niveles + Valores */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-titulo text-2xl text-[var(--tinta)]">Niveles que ofrecemos</h2>
            <ul className="mt-6 space-y-3">
              {data.niveles.map((n) => (
                <li
                  key={n}
                  className="flex items-center gap-3 rounded-xl border border-[var(--linea)] px-5 py-4"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center u-arco-sm text-sm font-semibold text-white"
                    style={{ background: tema.solido }}
                  >
                    ✓
                  </span>
                  <span className="text-[0.95rem] text-[var(--tinta)]">{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-titulo text-2xl text-[var(--tinta)]">Nuestros valores</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {data.valores.map((v) => (
                <li
                  key={v}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ background: tema.superficie, color: tema.texto }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: tema.solido }} />
                  {v}
                </li>
              ))}
            </ul>

            {/* Paleta del jardín */}
            <h3 className="mt-10 font-titulo text-lg text-[var(--tinta)]">Identidad de color</h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {tema.swatches.map((s) => (
                <div key={s.n}>
                  <div
                    className="h-16 w-full rounded-xl border border-black/5"
                    style={{ background: s.c }}
                  />
                  <p className="mt-2 text-xs font-medium text-[var(--tinta)]">{s.n}</p>
                  <p className="text-[0.7rem] uppercase text-[var(--tinta-suave)]">{s.c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: tema.solido }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-12 text-center sm:flex-row sm:text-left">
          <p className="font-titulo text-2xl text-white sm:text-3xl">
            ¿Te gustaría conocer {data.nombre}?
          </p>
          <Link
            href="/contacto"
            className="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ color: tema.texto }}
          >
            Solicitar información
          </Link>
        </div>
      </section>
    </>
  );
}