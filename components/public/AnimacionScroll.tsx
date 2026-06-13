// ============================================================
// components/public/AnimacionScroll.tsx
// Wrapper de animación de entrada al hacer scroll. Client Component
// mínimo: observa su propio nodo con IntersectionObserver y, al
// entrar en viewport, conmuta las clases de Tailwind para hacer
// fade-in + slide-up (opacity 0→1, translateY 20px→0).
//
// Las secciones que envuelve siguen siendo Server Components: solo
// este wrapper es cliente. `delay` permite escalonar (stagger) la
// entrada de varios elementos (p. ej. las tarjetas de jardines).
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";

export function AnimacionScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Retraso de la transición en ms (para escalonar entradas). */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // anima una sola vez
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[600ms] ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
