// ============================================================
// app/(admin)/login/page.tsx
// CU-05 · Iniciar Sesión.
// Formulario simple (usuario + contraseña) que invoca signIn de
// Auth.js mediante una Server Action. Éxito → /dashboard.
// Credenciales inválidas → vuelve con ?error=1 y muestra aviso.
// ============================================================
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
    <main style={{ maxWidth: 320, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1>Iniciar sesión</h1>

      {error && (
        <p role="alert" style={{ color: "#b00020" }}>
          Usuario o contraseña incorrectos
        </p>
      )}

      <form action={autenticar} style={{ display: "grid", gap: "0.75rem" }}>
        <label>
          Usuario
          <input name="username" type="text" required autoComplete="username" />
        </label>

        <label>
          Contraseña
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </label>

        <button type="submit">Ingresar</button>
      </form>
    </main>
  );
}
