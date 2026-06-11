// ============================================================
// proxy.ts  (antes "middleware.ts" — renombrado en Next.js 16)
// Primera barrera de seguridad (CU-05 / CU-10).
//
// Reexporta el wrapper `auth` de Auth.js, que evalúa el callback
// `authorized` (ver lib/auth.ts). Hace dos cosas:
//   · /dashboard/*  sin sesión   → redirige a /login.
//   · /login        con sesión   → redirige a /dashboard.
// La SEGUNDA barrera (revalidación de sesión y de jardinId) vive
// en lib/dal/session.ts: defensa en profundidad.
//
// Corre en runtime Node.js (el único soportado por `proxy`), así
// que convive con bcrypt/Prisma sin problema.
//
// El `matcher` solo cubre /dashboard/* y /login, de modo que las
// rutas públicas ( /, /pastoral-educativa, /librerias, /contacto ),
// /api/auth/* y los estáticos (_next, imágenes) ni siquiera pasan
// por aquí.
// ============================================================
export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
