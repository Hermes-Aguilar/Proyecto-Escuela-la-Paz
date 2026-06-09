#!/usr/bin/env bash
# ============================================================
# scaffold.sh - Crea la estructura VACIA del proyecto
# Patron: Server Actions + DAL (escala congregacion)
# Uso:  bash scaffold.sh    (ejecutar en la raiz del repo)
# ============================================================
set -e

echo "Creando carpetas..."
mkdir -p \
  prisma \
  "src/app/(public)/pastoral-educativa/[jardin]/noticias/[id]" \
  "src/app/(public)/librerias" \
  "src/app/(public)/contacto" \
  "src/app/(admin)/login" \
  "src/app/(admin)/dashboard/nueva" \
  "src/app/(admin)/dashboard/editar/[id]" \
  "src/app/api/auth/[...nextauth]" \
  src/lib/dal \
  src/lib/actions \
  src/lib/contracts \
  src/lib/validations \
  src/lib/services \
  src/components/ui \
  src/components/public \
  src/components/admin \
  src/config \
  src/types \
  public

echo "Creando archivos vacios (la logica va en Semana 2+)..."
touch \
  "src/app/globals.css" \
  "src/app/api/auth/[...nextauth]/route.ts" \
  "src/middleware.ts" \
  "src/lib/db.ts" \
  "src/lib/auth.ts" \
  "src/lib/dal/session.ts" \
  "src/lib/dal/publicaciones.ts" \
  "src/lib/dal/jardines.ts" \
  "src/lib/actions/publicaciones.actions.ts" \
  "src/lib/actions/contacto.actions.ts" \
  "src/lib/contracts/result.ts" \
  "src/lib/validations/publicacion.ts" \
  "src/lib/services/cloudinary.ts" \
  "src/config/temas.ts" \
  "src/types/next-auth.d.ts"

# .gitkeep para que git conserve las carpetas aun vacias
touch \
  "src/components/ui/.gitkeep" \
  "src/components/public/.gitkeep" \
  "src/components/admin/.gitkeep" \
  "public/.gitkeep"

echo "Creando stubs minimos para que Next compile..."

# Layout raiz (OBLIGATORIO que lleve html y body)
cat > "src/app/layout.tsx" <<'TSX'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
TSX

# Layouts de grupo
for L in "src/app/(public)/layout.tsx" "src/app/(admin)/dashboard/layout.tsx"; do
cat > "$L" <<'TSX'
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
TSX
done

# Pages (stub que devuelve null por ahora)
for P in \
  "src/app/(public)/page.tsx" \
  "src/app/(public)/pastoral-educativa/page.tsx" \
  "src/app/(public)/pastoral-educativa/[jardin]/page.tsx" \
  "src/app/(public)/pastoral-educativa/[jardin]/noticias/[id]/page.tsx" \
  "src/app/(public)/librerias/page.tsx" \
  "src/app/(public)/contacto/page.tsx" \
  "src/app/(admin)/login/page.tsx" \
  "src/app/(admin)/dashboard/page.tsx" \
  "src/app/(admin)/dashboard/nueva/page.tsx" \
  "src/app/(admin)/dashboard/editar/[id]/page.tsx" ; do
cat > "$P" <<'TSX'
export default function Page() {
  return null;
}
TSX
done

echo ""
echo "Listo. Estructura creada."
echo "Recuerda mover schema.prisma y seed.ts a la carpeta prisma/."
