// ============================================================
// app/(public)/la-congregacion/_components/SubHero.tsx
// Hero pequeño + botón "← Volver a La Congregación", compartido por
// las 5 subpáginas de La Congregación para que se vean como un
// conjunto coherente. Server Component (sin estado).
// ============================================================
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export function SubHero({
  eyebrow = "La Congregación",
  titulo,
  descripcion,
}: {
  eyebrow?: string;
  titulo: string;
  descripcion?: string;
}) {
  return (
    <header className="bg-gradient-to-br from-azul-institucional to-azul-oscuro">
      <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-20">
        <Link
          href="/la-congregacion"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          <FaArrowLeft size={12} /> Volver a La Congregación
        </Link>
        <p className="font-titulo text-sm font-semibold uppercase tracking-widest text-dorado">
          {eyebrow}
        </p>
        <h1 className="font-titulo mt-2 text-3xl font-extrabold text-white md:text-5xl">
          {titulo}
        </h1>
        {descripcion && (
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">
            {descripcion}
          </p>
        )}
        <div className="mx-auto mt-6 w-24 border-t border-dorado/50" />
      </div>
    </header>
  );
}
