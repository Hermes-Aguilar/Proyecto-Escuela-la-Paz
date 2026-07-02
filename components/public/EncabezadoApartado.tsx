// ============================================================
// components/public/EncabezadoApartado.tsx
// Banda de encabezado a ancho completo con el TINTE del jardín, para las
// páginas interiores (Nosotros, Oferta, Contacto…). Da a cada apartado su
// color propio (eyebrow + título + intro opcional) y deja el cuerpo en crema,
// replicando la alternancia tinte↔crema del inicio. El tinte sale de
// --jardin-primario (tema por jardín), así La Paz da teal y Porvenir amarillo.
// Server Component.
// ============================================================
import type { ReactNode } from "react";

export function EncabezadoApartado({
  eyebrow,
  titulo,
  intro,
  ancho = "max-w-4xl",
  id,
}: {
  eyebrow: string;
  titulo: string;
  intro?: ReactNode;
  /** Ancho del contenedor interno (mismo que el cuerpo de la página). */
  ancho?: string;
  /** Ancla opcional (para enlaces del menú, p. ej. #oferta). */
  id?: string;
}) {
  return (
    <section
      className="py-12 md:py-16"
      style={{
        backgroundColor: "color-mix(in srgb, var(--jardin-primario) 12%, white)",
      }}
    >
      <div className={`mx-auto ${ancho} px-6`}>
        <p
          id={id}
          className={`text-sm font-semibold uppercase tracking-widest${
            id ? " scroll-mt-24" : ""
          }`}
          style={{ color: "var(--jardin-primario)" }}
        >
          {eyebrow}
        </p>
        <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
          {titulo}
        </h1>
        {intro && (
          <div className="mt-4 text-base leading-relaxed text-marron-suave">
            {intro}
          </div>
        )}
      </div>
    </section>
  );
}
