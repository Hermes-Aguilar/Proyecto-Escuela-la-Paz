// ============================================================
// components/public/IconoJardin.tsx
// Ícono representativo de cada jardín (CU-02): paloma (La Paz) o
// estrella (Porvenir). Toma su color de `currentColor`, así el
// llamador decide el tono vía className (text-white, text-[color:...]).
//
// Se comparte entre el menú superior (MenuJardin) y el hero del inicio
// (HeroJardin) para que la identidad del jardín sea consistente.
// ============================================================

export default function IconoJardin({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  if (slug === "porvenir") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d="M12 2.6l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.3 19.7l1.4-6.3L2.9 9.1l6.4-.6z" />
      </svg>
    );
  }
  // La Paz (y por defecto): paloma en vuelo.
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={className}>
      <path d="M4 36C16 18 28 18 32 32 36 18 48 18 60 36 46 30 36 33 32 40 28 33 18 30 4 36Z" />
    </svg>
  );
}
