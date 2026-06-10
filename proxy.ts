// ============================================================
// proxy.ts  (antes "middleware.ts" — renombrado en Next.js 16)
// Primera barrera de seguridad: protege /dashboard/* por prefijo.
//
// Reexporta el wrapper `auth` de Auth.js, que evalúa el callback
// `authorized` (ver lib/auth.ts). Sin sesión → redirige a /login.
// Corre en runtime Node.js (el único soportado por `proxy`), así
// que convive con bcrypt/Prisma sin problema.
//
// El `matcher` solo cubre /dashboard/*, de modo que las rutas
// públicas ( /, /pastoral-educativa, /librerias, /contacto ) ni
// siquiera pasan por aquí.
// ============================================================
export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};
