// ============================================================
// app/(admin)/dashboard/nueva/page.tsx
// CU-06 · Crear Publicación. Server Component: resuelve el tema
// del jardín de la sesión (igual que el dashboard) y renderiza el
// formulario compartido en modo "crear".
// ============================================================
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/dal/session";
import { getJardinById } from "@/lib/dal/jardines";
import { FormularioPublicacion } from "@/components/admin/FormularioPublicacion";

export default async function NuevaPublicacionPage() {
  const user = await getAuthenticatedUser();
  const jardin = await getJardinById(user.jardinId);
  if (!jardin) redirect("/login");

  return (
    <div
      style={
        {
          "--primario": jardin.colorPrimario,
          "--secundario": jardin.colorSecundario,
        } as React.CSSProperties
      }
      className="font-texto min-h-screen bg-crema"
    >
      <header className="border-b border-arena bg-white shadow-sm">
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(to right, var(--primario), var(--secundario))",
          }}
        />
        <div className="mx-auto max-w-2xl px-4 py-5 md:px-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-marron-suave transition hover:text-marron"
          >
            ← Volver al panel
          </Link>
          <h1
            className="font-titulo mt-1 text-2xl font-semibold md:text-3xl"
            style={{ color: "var(--primario)" }}
          >
            Nueva publicación
          </h1>
          <p className="mt-1 text-sm text-marron-suave">
            Jardín {jardin.nombre} · comparte una noticia, evento o aviso con
            las familias.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 md:px-6">
        <FormularioPublicacion modo="crear" />
      </main>
    </div>
  );
}
