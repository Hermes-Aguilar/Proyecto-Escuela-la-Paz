// ============================================================
// components/admin/BotonBorrar.tsx
// CU-09 · Borrar publicación con modal de confirmación.
//
// Usa el elemento nativo <dialog> + showModal(): el navegador ya
// atrapa el foco, cierra con Escape y expone el ::backdrop, así la
// accesibilidad base no depende de JS propio. El clic fuera se
// detecta comparando el target con el propio dialog (el backdrop
// ES el dialog para eventos).
//
// La limpieza real (Cloudinary + BD + revalidatePath) la hace la
// action borrarPublicacion; aquí solo se confirma, se muestra el
// progreso y se refresca la lista.
// ============================================================
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { borrarPublicacion } from "@/lib/actions/publicaciones.actions";

export function BotonBorrar({ id, titulo }: { id: number; titulo: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [borrando, setBorrando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function abrir() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function cerrar() {
    if (!borrando) dialogRef.current?.close();
  }

  async function confirmar() {
    setBorrando(true);
    setError(null);

    const result = await borrarPublicacion(id);

    if (result.ok) {
      dialogRef.current?.close();
      router.refresh();
      return;
    }
    setBorrando(false);

    if (result.code === "NOT_FOUND") {
      setError("La publicación ya no existe; la lista se actualizó.");
      // La tarjeta detrás del modal ya es obsoleta: refrescar la lista.
      router.refresh();
    } else if (result.code === "FORBIDDEN") {
      setError("No tienes permiso para eliminar esta publicación.");
    } else {
      setError("No se pudo eliminar. Intenta de nuevo.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        className="flex-1 py-2.5 text-sm font-medium text-error transition hover:bg-error/10"
      >
        Borrar
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`borrar-titulo-${id}`}
        // Escape dispara "cancel": bloquearlo mientras se borra.
        onCancel={(e) => {
          if (borrando) e.preventDefault();
        }}
        // Clic en el backdrop: el target es el propio <dialog>.
        onClick={(e) => {
          if (e.target === dialogRef.current) cerrar();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-arena bg-white p-0 shadow-xl backdrop:bg-marron/50 backdrop:backdrop-blur-sm"
      >
        <div className="font-texto p-6">
          <h2
            id={`borrar-titulo-${id}`}
            className="font-titulo text-lg font-semibold text-marron"
          >
            ¿Eliminar esta publicación?
          </h2>
          <p className="mt-2 text-sm text-marron-suave">
            Estás por eliminar{" "}
            <span className="font-medium text-marron">“{titulo}”</span> y todas
            sus fotos y videos.
          </p>
          <p className="mt-1 text-sm font-medium text-error">
            Esta acción no se puede deshacer.
          </p>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-error/10 px-3 py-2 text-sm font-medium text-error"
            >
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={cerrar}
              disabled={borrando}
              className="rounded-lg border border-arena bg-white px-5 py-2.5 font-medium text-marron transition hover:bg-arena/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmar}
              disabled={borrando}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-error px-5 py-2.5 font-medium text-white shadow transition hover:brightness-90 disabled:cursor-wait disabled:opacity-75"
            >
              {borrando && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 animate-spin"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-25"
                  />
                  <path
                    d="M22 12a10 10 0 0 0-10-10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {borrando ? "Eliminando…" : "Eliminar"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
