// ============================================================
// app/(admin)/dashboard/editar/[id]/page.tsx
// CU-08 · Editar Publicación. Server Component: carga la
// publicación con getPublicacionById (que revalida la propiedad
// por jardinId) y renderiza el formulario compartido en modo
// "editar". Si no existe O es de otro jardín → 404, sin revelar
// si la publicación existe (no fuga de datos entre jardines).
// ============================================================
import Link from "next/link";
import { notFound, redirect, unstable_rethrow } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/dal/session";
import { getJardinById } from "@/lib/dal/jardines";
import {
  getPublicacionById,
  type PublicacionDTO,
} from "@/lib/dal/publicaciones";
import { FormularioPublicacion } from "@/components/admin/FormularioPublicacion";

export default async function EditarPublicacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum <= 0) notFound();

  const user = await getAuthenticatedUser();
  const jardin = await getJardinById(user.jardinId);
  if (!jardin) redirect("/login");

  let publicacion: PublicacionDTO;
  try {
    publicacion = await getPublicacionById(idNum);
  } catch (e) {
    // Respeta el redirect() interno de la sesión; NotFound y
    // Forbidden se colapsan en el mismo 404.
    unstable_rethrow(e);
    notFound();
  }

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
            Editar publicación
          </h1>
          <p className="mt-1 text-sm text-marron-suave">
            Jardín {jardin.nombre} · los cambios se reflejan de inmediato en el
            muro.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 md:px-6">
        <FormularioPublicacion
          modo="editar"
          publicacion={{
            id: publicacion.id,
            titulo: publicacion.titulo,
            tipo: publicacion.tipo,
            contenido: publicacion.contenido,
            medios: publicacion.medios.map((m) => ({ id: m.id, url: m.url })),
          }}
        />
      </main>
    </div>
  );
}
