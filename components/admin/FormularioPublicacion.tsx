// ============================================================
// components/admin/FormularioPublicacion.tsx
// CU-06/CU-08 · Formulario compartido de crear/editar publicación.
//
// Client component: maneja previews de fotos, lista dinámica de
// videos de YouTube y el estado de envío. Llama directamente a las
// Server Actions (crearPublicacion / editarPublicacion), que
// devuelven Result<T>; aquí solo se mapean los códigos a mensajes
// junto al campo correspondiente o a una alerta general.
//
// Contrato del FormData (definido por el backend):
//   titulo, contenido, tipo, N× imagenes (File),
//   N× videosYoutube (string) y, al editar, N× mediosEliminar (id).
// Los medios EXISTENTES no se reenvían: quitarlos = mediosEliminar.
// ============================================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TipoPublicacion, TipoMedio } from "@prisma/client";

import {
  crearPublicacion,
  editarPublicacion,
} from "@/lib/actions/publicaciones.actions";
import {
  MAX_IMAGENES,
  MAX_VIDEOS,
  YOUTUBE_REGEX,
} from "@/lib/validations/publicacion";

// ---------- Props (datos planos; el DTO completo es server-only) ----------

export interface MedioActual {
  id: number;
  url: string;
  tipo: TipoMedio;
}

export interface PublicacionActual {
  id: number;
  titulo: string;
  contenido: string;
  tipo: TipoPublicacion;
  medios: MedioActual[];
}

type Props =
  | { modo: "crear"; publicacion?: undefined }
  | { modo: "editar"; publicacion: PublicacionActual };

// ---------- Selector de tipo (mismos colores que los badges) ----------

const TIPOS: {
  valor: TipoPublicacion;
  etiqueta: string;
  activo: string;
}[] = [
  { valor: "NOTICIA", etiqueta: "Noticia", activo: "bg-olivo/15 text-olivo ring-olivo" },
  { valor: "EVENTO", etiqueta: "Evento", activo: "bg-terracota/15 text-terracota ring-terracota" },
  { valor: "AVISO", etiqueta: "Aviso", activo: "bg-arena/70 text-marron-suave ring-marron-suave" },
];

const CLASES_INPUT =
  "w-full rounded-lg border border-arena bg-white px-3 py-2.5 text-marron outline-none transition placeholder:text-marron-suave/60 focus:border-terracota focus:ring-2 focus:ring-terracota/30";

export function FormularioPublicacion({ modo, publicacion }: Props) {
  const router = useRouter();

  const [tipo, setTipo] = useState<TipoPublicacion>(
    publicacion?.tipo ?? "NOTICIA",
  );
  // Fotos nuevas con su object URL para el preview local.
  const [fotosNuevas, setFotosNuevas] = useState<
    { file: File; preview: string }[]
  >([]);
  // Ids de medios existentes marcados para quitar (se borran al guardar).
  const [mediosEliminar, setMediosEliminar] = useState<number[]>([]);
  const [videosNuevos, setVideosNuevos] = useState<string[]>([]);

  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorContenido, setErrorContenido] = useState<string | null>(null);
  const [errorFotos, setErrorFotos] = useState<string | null>(null);
  const [errorVideos, setErrorVideos] = useState<string | null>(null);
  // Error de formato por fila de video nuevo (índice → mensaje).
  const [erroresVideo, setErroresVideo] = useState<Record<number, string>>({});

  // ---------- Derivados: medios existentes aún visibles ----------

  const visibles = (publicacion?.medios ?? []).filter(
    (m) => !mediosEliminar.includes(m.id),
  );
  const fotosActuales = visibles.filter((m) => m.tipo === "IMAGEN");
  const videosActuales = visibles.filter((m) => m.tipo === "VIDEO");

  const totalFotos = fotosActuales.length + fotosNuevas.length;
  const totalVideos = videosActuales.length + videosNuevos.length;

  // ---------- Fotos ----------

  function agregarFotos(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorFotos(null);
    const archivos = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/"),
    );
    // Permitir volver a elegir el mismo archivo después de quitarlo.
    e.target.value = "";

    const espacio = MAX_IMAGENES - totalFotos;
    if (archivos.length > espacio) {
      setErrorFotos(
        `Solo caben ${espacio} foto${espacio === 1 ? "" : "s"} más (máximo ${MAX_IMAGENES}).`,
      );
    }
    const aceptadas = archivos.slice(0, espacio).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFotosNuevas((prev) => [...prev, ...aceptadas]);
  }

  function quitarFotoNueva(indice: number) {
    setFotosNuevas((prev) => {
      URL.revokeObjectURL(prev[indice].preview);
      return prev.filter((_, i) => i !== indice);
    });
  }

  function marcarParaEliminar(id: number) {
    setMediosEliminar((prev) => [...prev, id]);
  }

  // ---------- Videos ----------

  function cambiarVideo(indice: number, valor: string) {
    setVideosNuevos((prev) => prev.map((v, i) => (i === indice ? valor : v)));
    setErroresVideo((prev) => {
      const { [indice]: _quitado, ...resto } = prev;
      return resto;
    });
  }

  function quitarVideo(indice: number) {
    setVideosNuevos((prev) => prev.filter((_, i) => i !== indice));
    setErroresVideo({});
  }

  // ---------- Envío ----------

  async function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorGeneral(null);
    setErrorTitulo(null);
    setErrorContenido(null);
    setErrorVideos(null);

    // Validación inline de los links ANTES de enviar (las filas
    // vacías simplemente se descartan).
    const errores: Record<number, string> = {};
    const videosLimpios: string[] = [];
    videosNuevos.forEach((v, i) => {
      const limpio = v.trim();
      if (!limpio) return;
      if (YOUTUBE_REGEX.test(limpio)) videosLimpios.push(limpio);
      else errores[i] = "Debe ser un enlace de YouTube (youtube.com/watch… o youtu.be/…)";
    });
    if (Object.keys(errores).length > 0) {
      setErroresVideo(errores);
      return;
    }

    // titulo y contenido salen de los inputs del form; el resto se
    // arma a mano siguiendo el contrato del backend.
    const formData = new FormData(e.currentTarget);
    formData.set("tipo", tipo);
    fotosNuevas.forEach(({ file }) => formData.append("imagenes", file));
    videosLimpios.forEach((v) => formData.append("videosYoutube", v));
    mediosEliminar.forEach((id) =>
      formData.append("mediosEliminar", String(id)),
    );

    setEnviando(true);
    const result =
      modo === "crear"
        ? await crearPublicacion(formData)
        : await editarPublicacion(publicacion.id, formData);

    if (result.ok) {
      // enviando queda en true mientras navega: evita doble submit.
      router.push("/dashboard");
      return;
    }
    setEnviando(false);

    if (result.code === "VALIDATION") {
      // Acercar el mensaje al campo cuando el texto lo delata.
      const msg = result.error.toLowerCase();
      if (msg.includes("título")) setErrorTitulo(result.error);
      else if (msg.includes("contenido")) setErrorContenido(result.error);
      else if (msg.includes("imagen") || msg.includes("foto"))
        setErrorFotos(result.error);
      else if (msg.includes("youtube") || msg.includes("video"))
        setErrorVideos(result.error);
      else setErrorGeneral(result.error);
    } else if (result.code === "FORBIDDEN") {
      setErrorGeneral("No tienes permiso para realizar esta acción.");
    } else if (result.code === "NOT_FOUND") {
      setErrorGeneral("La publicación ya no existe. Vuelve al panel.");
    } else {
      setErrorGeneral("Ocurrió un error en el servidor. Intenta de nuevo.");
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="space-y-5">
      {errorGeneral && (
        <p
          role="alert"
          className="rounded-lg bg-error/10 px-4 py-3 text-sm font-medium text-error"
        >
          {errorGeneral}
        </p>
      )}

      {/* DATOS PRINCIPALES */}
      <section className="space-y-5 rounded-2xl border border-arena bg-white p-5 shadow-sm md:p-6">
        <div>
          <label
            htmlFor="titulo"
            className="mb-1 block text-sm font-medium text-marron"
          >
            Título <span className="text-error">*</span>
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            required
            maxLength={200}
            defaultValue={publicacion?.titulo}
            placeholder="Ej. Festival de primavera"
            className={CLASES_INPUT}
          />
          {errorTitulo && (
            <p className="mt-1 text-sm text-error">{errorTitulo}</p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-marron">
            Tipo de publicación
          </legend>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button
                key={t.valor}
                type="button"
                onClick={() => setTipo(t.valor)}
                aria-pressed={tipo === t.valor}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  tipo === t.valor
                    ? `${t.activo} ring-2`
                    : "border border-arena bg-white text-marron-suave hover:bg-crema"
                }`}
              >
                {t.etiqueta}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="contenido"
            className="mb-1 block text-sm font-medium text-marron"
          >
            Contenido <span className="text-error">*</span>
          </label>
          <textarea
            id="contenido"
            name="contenido"
            required
            rows={8}
            defaultValue={publicacion?.contenido}
            placeholder="Escribe aquí el aviso para las familias…"
            className={`${CLASES_INPUT} resize-y`}
          />
          {errorContenido && (
            <p className="mt-1 text-sm text-error">{errorContenido}</p>
          )}
        </div>
      </section>

      {/* FOTOS */}
      <section className="space-y-4 rounded-2xl border border-arena bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-titulo text-lg font-semibold text-marron">
            Fotos
          </h3>
          <span className="text-sm font-medium text-marron-suave">
            {totalFotos}/{MAX_IMAGENES} fotos
          </span>
        </div>

        {(fotosActuales.length > 0 || fotosNuevas.length > 0) && (
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {/* Imágenes ya guardadas (Cloudinary) */}
            {fotosActuales.map((m) => (
              <li
                key={`actual-${m.id}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-arena"
              >
                <Image
                  src={m.url}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 25vw, 33vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => marcarParaEliminar(m.id)}
                  className="absolute inset-x-0 bottom-0 bg-marron/75 py-1 text-xs font-medium text-white transition hover:bg-error/90"
                >
                  Eliminar
                </button>
              </li>
            ))}
            {/* Fotos nuevas (aún sin subir) */}
            {fotosNuevas.map((f, i) => (
              <li
                key={f.preview}
                className="relative aspect-square overflow-hidden rounded-lg border border-arena"
              >
                {/* Preview local con object URL: next/image no aplica aquí */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.preview}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-marron-suave">
                  Nueva
                </span>
                <button
                  type="button"
                  onClick={() => quitarFotoNueva(i)}
                  className="absolute inset-x-0 bottom-0 bg-marron/75 py-1 text-xs font-medium text-white transition hover:bg-error/90"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        <label
          className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed border-arena bg-crema/60 px-4 py-6 text-center transition hover:bg-crema ${
            totalFotos >= MAX_IMAGENES ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <span className="text-sm font-medium text-marron">
            {totalFotos >= MAX_IMAGENES
              ? "Alcanzaste el máximo de fotos"
              : "Agregar fotos"}
          </span>
          <span className="text-xs text-marron-suave">
            Puedes elegir varias a la vez · máx. 8 MB por foto
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={totalFotos >= MAX_IMAGENES}
            onChange={agregarFotos}
            className="sr-only"
          />
        </label>
        {errorFotos && <p className="text-sm text-error">{errorFotos}</p>}
      </section>

      {/* VIDEOS DE YOUTUBE */}
      <section className="space-y-4 rounded-2xl border border-arena bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-titulo text-lg font-semibold text-marron">
            Videos de YouTube
          </h3>
          <span className="text-sm font-medium text-marron-suave">
            {totalVideos}/{MAX_VIDEOS} videos
          </span>
        </div>

        {/* Videos ya guardados */}
        {videosActuales.length > 0 && (
          <ul className="space-y-2">
            {videosActuales.map((m) => (
              <li
                key={`video-${m.id}`}
                className="flex items-center gap-3 rounded-lg border border-arena bg-crema/60 px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-marron">
                  {m.url}
                </span>
                <button
                  type="button"
                  onClick={() => marcarParaEliminar(m.id)}
                  className="shrink-0 text-sm font-medium text-error transition hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Videos nuevos */}
        {videosNuevos.map((v, i) => (
          <div key={i}>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={v}
                onChange={(e) => cambiarVideo(i, e.target.value)}
                placeholder="https://www.youtube.com/watch?v=…"
                aria-invalid={Boolean(erroresVideo[i])}
                className={`${CLASES_INPUT} flex-1 ${
                  erroresVideo[i] ? "border-error focus:border-error focus:ring-error/30" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => quitarVideo(i)}
                className="shrink-0 text-sm font-medium text-error transition hover:underline"
              >
                Quitar
              </button>
            </div>
            {erroresVideo[i] && (
              <p className="mt-1 text-sm text-error">{erroresVideo[i]}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setVideosNuevos((prev) => [...prev, ""])}
          disabled={totalVideos >= MAX_VIDEOS}
          className="rounded-lg border border-arena bg-white px-4 py-2 text-sm font-medium text-marron transition hover:bg-crema disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Agregar video
        </button>
        {errorVideos && <p className="text-sm text-error">{errorVideos}</p>}
      </section>

      {/* ACCIONES */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/dashboard"
          className="rounded-lg border border-arena bg-white px-5 py-2.5 text-center font-medium text-marron transition hover:bg-arena/40"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 font-medium text-white shadow-lg transition hover:brightness-95 active:translate-y-px disabled:cursor-wait disabled:opacity-75"
          style={{ backgroundColor: "var(--primario)" }}
        >
          {enviando && (
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
          {enviando
            ? fotosNuevas.length > 0
              ? "Subiendo fotos…"
              : "Guardando…"
            : modo === "crear"
              ? "Guardar"
              : "Guardar cambios"}
        </button>
      </div>
      {enviando && fotosNuevas.length > 0 && (
        <p className="text-center text-sm text-marron-suave">
          Las fotos se están subiendo, esto puede tardar unos segundos…
        </p>
      )}
    </form>
  );
}
