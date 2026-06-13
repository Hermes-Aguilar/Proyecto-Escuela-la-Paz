// ============================================================
// app/(admin)/login/page.tsx
// CU-05 · Iniciar Sesión.
// Imagen religiosa a pantalla completa + panel de vidrio
// esmerilado a la IZQUIERDA con el formulario. A la derecha,
// el mensaje de bienvenida sobre la foto (oculto en móvil).
// Server Action invoca signIn. Éxito → /dashboard.
// Credenciales inválidas → ?error=1.
// ============================================================
import Image from "next/image";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function autenticar(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: "/dashboard",
      });
    } catch (e) {
      // Credenciales incorrectas → AuthError. Volvemos con el aviso.
      if (e instanceof AuthError) {
        redirect("/login?error=1");
      }
      // signIn lanza un redirect interno en caso de éxito: hay que
      // re-lanzarlo para que la navegación a /dashboard ocurra.
      throw e;
    }
  }

  return (
    <main className="font-texto relative min-h-screen overflow-hidden">
      {/* FONDO · Imagen religiosa a pantalla completa */}
      <Image
        src="/images/Login.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Velo cálido global para que todo el texto sea legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-marron/60 via-marron/20 to-marron/40" />

      {/* CONTENIDO */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* IZQUIERDA · Panel de vidrio con el formulario */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-sm rounded-2xl border border-white/25 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <header className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Pastoral Educativa
              </p>
              <h1 className="font-titulo mt-2 text-3xl font-semibold text-white drop-shadow">
                Iniciar sesión
              </h1>
              <p className="mt-2 text-sm text-white/75">
                Panel de administración del jardín
              </p>
            </header>

            {error && (
              <p
                role="alert"
                className="mb-5 rounded-lg bg-error/30 px-3 py-2 text-center text-sm text-white"
              >
                Usuario o contraseña incorrectos
              </p>
            )}

            <form action={autenticar} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white/90"
                >
                  Usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  autoFocus
                  className="mt-1 w-full border-b-2 border-white/40 bg-transparent px-1 py-2.5 text-white outline-none transition placeholder:text-white/40 focus:border-white"
                  placeholder="Tu usuario"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/90"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-1 w-full border-b-2 border-white/40 bg-transparent px-1 py-2.5 text-white outline-none transition placeholder:text-white/40 focus:border-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-terracota px-4 py-2.5 font-medium text-white shadow-lg transition hover:bg-terracota-oscuro focus:outline-none focus:ring-2 focus:ring-white/50 active:translate-y-px"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>

        {/* DERECHA · Mensaje de bienvenida sobre la foto (oculto en móvil) */}
        <div className="hidden flex-col items-center justify-center p-12 text-center text-white md:flex">
          <h2
            className="font-titulo text-6xl font-semibold lg:text-7xl"
            style={{
              textShadow:
                "0 2px 4px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            Paz y bien
          </h2>
          <p
            className="mt-4 max-w-md text-xl font-medium text-white"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Religiosas Franciscanas de Nuestra Señora del Refugio
          </p>
        </div>
      </div>
    </main>
  );
}
