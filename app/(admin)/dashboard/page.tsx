// ============================================================
// app/(admin)/dashboard/page.tsx
// CU-07 · Dashboard de la moderadora: lista las publicaciones
// de SU jardín (el DAL filtra por el jardinId de la sesión).
//
// El tema del jardín (colorPrimario/colorSecundario, leídos de la
// BD) se inyecta como CSS vars y acenta el header y el botón
// "+ Nueva publicación"; la base sigue siendo la paleta
// institucional (crema/marron/arena).
// ============================================================
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { TipoPublicacion } from "@prisma/client";

import { signOut } from "@/lib/auth";
import { getAuthenticatedUser } from "@/lib/dal/session";
import { getJardinById } from "@/lib/dal/jardines";
import {
  getPublicaciones,
  type PublicacionDTO,
} from "@/lib/dal/publicaciones";
import { BotonBorrar } from "@/components/admin/BotonBorrar";

// ---------- Presentación por tipo de publicación ----------

const TIPO_BADGE: Record<TipoPublicacion, { etiqueta: string; clases: string }> =
  {
    NOTICIA: { etiqueta: "Noticia", clases: "bg-olivo/15 text-olivo" },
    EVENTO: { etiqueta: "Evento", clases: "bg-terracota/15 text-terracota" },
    AVISO: { etiqueta: "Aviso", clases: "bg-arena/70 text-marron-suave" },
  };

function IconoTipo({ tipo }: { tipo: TipoPublicacion }) {
  const trazos: Record<TipoPublicacion, React.ReactNode> = {
    // Periódico
    NOTICIA: (
      <path d="M4 5h13v14H6a2 2 0 0 1-2-2V5Zm13 4h3v8a2 2 0 0 1-2 2h-1M7 9h7M7 13h7M7 16h4" />
    ),
    // Calendario
    EVENTO: (
      <path d="M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm3-2v4m8-4v4M4 11h16" />
    ),
    // Megáfono
    AVISO: (
      <path d="M4 11v2a1 1 0 0 0 1 1h2l3 5h2v-5m-7-3 11-5v13l-11-5m11-2a3 3 0 0 1 3 2" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12"
      aria-hidden
    >
      {trazos[tipo]}
    </svg>
  );
}

// "12 de junio de 2026"
function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function primeraImagen(pub: PublicacionDTO): string | null {
  return pub.medios.find((m) => m.tipo === "IMAGEN")?.url ?? null;
}

// ---------- Página ----------

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  const jardin = await getJardinById(user.jardinId);
  // Sesión sin jardín válido: estado imposible salvo datos corruptos.
  if (!jardin) redirect("/login");

  const publicaciones = await getPublicaciones();

  async function cerrarSesion() {
    "use server";
    await signOut({ redirectTo: "/login" });
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
      {/* HEADER · acento con los colores del jardín */}
      <header className="border-b border-arena bg-white shadow-sm">
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(to right, var(--primario), var(--secundario))",
          }}
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-marron-suave">
              Pastoral Educativa
            </p>
            <h1
              className="font-titulo text-2xl font-semibold md:text-3xl"
              style={{ color: "var(--primario)" }}
            >
              Jardín {jardin.nombre}
            </h1>
            <p className="mt-1 text-sm text-marron-suave">
              Hola, <span className="font-medium text-marron">{user.username}</span>{" "}
              · aquí gestionas el muro de tu jardín.
            </p>
          </div>

          <form action={cerrarSesion}>
            <button
              type="submit"
              className="rounded-lg border border-arena bg-white px-4 py-2 text-sm font-medium text-marron transition hover:bg-arena/40"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Encabezado de sección + acción principal */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-titulo text-xl font-semibold text-marron">
              Publicaciones
            </h2>
            <p className="text-sm text-marron-suave">
              {publicaciones.length === 0
                ? "Tu muro está esperando su primera historia."
                : `${publicaciones.length} ${
                    publicaciones.length === 1 ? "publicación" : "publicaciones"
                  } en tu muro`}
            </p>
          </div>

          <Link
            href="/dashboard/nueva"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white shadow-lg transition hover:brightness-95 active:translate-y-px"
            style={{ backgroundColor: "var(--primario)" }}
          >
            <span className="text-lg leading-none">+</span> Nueva publicación
          </Link>
        </div>

        {publicaciones.length === 0 ? (
          /* ESTADO VACÍO */
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-arena bg-white px-6 py-16 text-center shadow-sm">
            <div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-crema"
              style={{ color: "var(--primario)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
                aria-hidden
              >
                {/* Retoño: el muro está por florecer */}
                <path d="M12 21v-7m0 0c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6Zm0-2c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6ZM5 21h14" />
              </svg>
            </div>
            <h3 className="font-titulo text-lg font-semibold text-marron">
              Aún no has publicado nada
            </h3>
            <p className="mt-1 max-w-sm text-sm text-marron-suave">
              ¡Crea tu primer aviso! Las familias de tu jardín verán aquí las
              noticias, eventos y avisos que compartas.
            </p>
            <Link
              href="/dashboard/nueva"
              className="mt-6 rounded-lg px-5 py-2.5 font-medium text-white shadow transition hover:brightness-95"
              style={{ backgroundColor: "var(--primario)" }}
            >
              Crear mi primera publicación
            </Link>
          </div>
        ) : (
          /* LISTA · tarjetas apiladas en móvil, grid en desktop */
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {publicaciones.map((pub) => {
              const imagen = primeraImagen(pub);
              const badge = TIPO_BADGE[pub.tipo];

              return (
                <li
                  key={pub.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-arena bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Miniatura: primera imagen, o ícono según tipo */}
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-crema to-arena">
                    {imagen ? (
                      <Image
                        src={imagen}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full items-center justify-center opacity-50"
                        style={{ color: "var(--primario)" }}
                      >
                        <IconoTipo tipo={pub.tipo} />
                      </div>
                    )}
                    {!pub.publicado && (
                      <span className="absolute right-3 top-3 rounded-full bg-marron/80 px-2.5 py-0.5 text-xs font-medium text-white">
                        Borrador
                      </span>
                    )}
                  </div>

                  {/* Cuerpo */}
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <span
                      className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.clases}`}
                    >
                      {badge.etiqueta}
                    </span>
                    <h3 className="font-titulo line-clamp-2 text-lg font-semibold leading-snug text-marron">
                      {pub.titulo}
                    </h3>
                    <p className="mt-auto text-sm text-marron-suave">
                      {formatearFecha(pub.creadoEn)}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex divide-x divide-arena border-t border-arena">
                    <Link
                      href={`/dashboard/ver/${pub.id}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium text-marron-suave transition hover:bg-crema hover:text-marron"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/dashboard/editar/${pub.id}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium text-marron-suave transition hover:bg-crema hover:text-marron"
                    >
                      Editar
                    </Link>
                    <BotonBorrar id={pub.id} titulo={pub.titulo} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
