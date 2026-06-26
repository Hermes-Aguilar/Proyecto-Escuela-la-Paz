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
  patron,
  imagenFondo,
  posicionFondo = "bg-center",
  veloClase = "bg-gradient-to-br from-azul-institucional/85 to-azul-oscuro/90",
}: {
  eyebrow?: string;
  titulo: string;
  descripcion?: string;
  /** Imagen de patrón (p. ej. cruces) que se superpone al gradiente
   *  como textura de fondo. Opcional: si no se pasa, el header queda
   *  con el gradiente liso como en el resto de subpáginas. */
  patron?: string;
  /** Fotografía de fondo a pantalla completa del cuadro (p. ej. un
   *  jardín). Lleva un velo encima para mantener el contraste del
   *  texto blanco y que combine con la paleta de la congregación. */
  imagenFondo?: string;
  /** Posición de `imagenFondo` (utilidad Tailwind, p. ej. `bg-top`).
   *  Por defecto centrada; usa `bg-top` cuando las caras de una foto
   *  grupal queden cortadas por el recorte del hero. */
  posicionFondo?: string;
  /** Clases del velo que cubre `imagenFondo`. Por defecto azul
   *  institucional; para fotos cálidas conviene un velo marrón
   *  (p. ej. la pintura de la Historia) para no chocar de color. */
  veloClase?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-azul-institucional to-azul-oscuro">
      {imagenFondo && (
        <>
          {/* Foto de fondo con efecto reveal (queda fija al hacer scroll). */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-fixed ${posicionFondo} bg-cover`}
            style={{ backgroundImage: `url('${imagenFondo}')` }}
          />
          {/* Velo para legibilidad y armonía de paleta (color configurable). */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 ${veloClase}`}
          />
        </>
      )}
      {patron && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-fixed bg-center bg-cover opacity-60"
          style={{ backgroundImage: `url('${patron}')` }}
        />
      )}
      <div className="relative mx-auto max-w-4xl px-6 py-14 text-center md:py-20">
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
