// ============================================================
// components/public/Revelar.tsx
// Envoltura que revela su contenido al entrar en pantalla: fundido
// + leve subida. Usa IntersectionObserver (robusto en todos los
// navegadores) y solo anima una vez. Con `delay` se logra el efecto
// escalonado (stagger) en cuadrículas. Respeta prefers-reduced-motion:
// si el usuario pide menos movimiento, el contenido aparece sin animar.
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";

export function Revelar({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Retardo en ms para el efecto escalonado. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    // Accesibilidad: con prefers-reduced-motion el contenido se muestra fijo,
    // sin desplazamiento ni transición (variantes motion-reduce de Tailwind).
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0! motion-reduce:opacity-100! motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
