// ============================================================
// components/admin/FormularioPublicacion.tsx
// CU-06/CU-08 · Formulario compartido de crear/editar publicación.
//
// Client component: editor de BLOQUES. La moderadora arma el cuerpo
// de la publicación como una lista ordenada de bloques (texto, foto,
// video) que puede reordenar (↑↓) y eliminar (×). El título y el
// tipo siguen siendo campos aparte.
//
// Contrato del FormData (definido por el backend):
//   · titulo (string), tipo (string)
//   · bloques (JSON de ContenidoBorrador: las imágenes nuevas usan
//     `nuevaRef`; las existentes, `medioId`)
//   · imagenes (File) + imagenesRefs (string) en PARES paralelos:
//     cada File con la `nuevaRef` del bloque que lo referencia.
// Las imágenes existentes que se quitan del cuerpo se borran solas:
// el backend elimina todo Medio que ya no referencie ningún bloque.
// ============================================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { TipoPublicacion } from "@prisma/client";

import {
  crearPublicacion,
  editarPublicacion,
} from "@/lib/actions/publicaciones.actions";
import {
  MAX_IMAGENES,
  MAX_VIDEOS,
  YOUTUBE_REGEX,
} from "@/lib/validations/publicacion";
import type { Bloque, ContenidoBorrador } from "@/types/bloques";

// ---------- Props (datos planos; el DTO completo es server-only) ----------

export interface PublicacionActual {
  id: number;
  titulo: string;
  tipo: TipoPublicacion;
  contenido: Bloque[];
  /** Para resolver la URL de cada BloqueImagen al precargar el editor. */
  medios: { id: number; url: string }[];
}

type Props =
  | { modo: "crear"; publicacion?: undefined }
  | { modo: "editar"; publicacion: PublicacionActual };

// ---------- Estado de un bloque en el editor ----------
//
// Imagen existente: `medioId` definido, `file` null (preview = URL de
// Cloudinary). Imagen nueva: `file` definido, `medioId` null
// (preview = object URL local). Reemplazar una existente la convierte
// en nueva (medioId→null, file→nuevo).

type BloqueUI =
  | { uid: string; tipo: "texto"; valor: string }
  | {
      uid: string;
      tipo: "imagen";
      medioId: number | null;
      file: File | null;
      preview: string;
    }
  | { uid: string; tipo: "video"; url: string };

const TIPOS: { valor: TipoPublicacion; etiqueta: string; activo: string }[] = [
  { valor: "NOTICIA", etiqueta: "Noticia", activo: "bg-olivo/15 text-olivo ring-olivo" },
  { valor: "EVENTO", etiqueta: "Evento", activo: "bg-terracota/15 text-terracota ring-terracota" },
  { valor: "AVISO", etiqueta: "Aviso", activo: "bg-arena/70 text-marron-suave ring-marron-suave" },
];

const CLASES_INPUT =
  "w-full rounded-lg border border-arena bg-white px-3 py-2.5 text-marron outline-none transition placeholder:text-marron-suave/60 focus:border-terracota focus:ring-2 focus:ring-terracota/30";

const uid = () => crypto.randomUUID();

/** Construye los bloques iniciales del editor a partir de la publicación. */
function bloquesIniciales(pub?: PublicacionActual): BloqueUI[] {
  if (!pub) return [{ uid: uid(), tipo: "texto", valor: "" }];
  const urlPorId = new Map(pub.medios.map((m) => [m.id, m.url]));
  const ui = pub.contenido.map<BloqueUI>((b) => {
    if (b.tipo === "texto") return { uid: uid(), tipo: "texto", valor: b.valor };
    if (b.tipo === "video") return { uid: uid(), tipo: "video", url: b.url };
    return {
      uid: uid(),
      tipo: "imagen",
      medioId: b.medioId,
      file: null,
      preview: urlPorId.get(b.medioId) ?? "",
    };
  });
  return ui.length > 0 ? ui : [{ uid: uid(), tipo: "texto", valor: "" }];
}

// ---------- Textarea que crece con el contenido ----------

function TextareaAuto({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={2}
      placeholder="Escribe aquí..."
      className={`${CLASES_INPUT} resize-none overflow-hidden`}
    />
  );
}

export function FormularioPublicacion({ modo, publicacion }: Props) {
  const router = useRouter();

  const [titulo, setTitulo] = useState(publicacion?.titulo ?? "");
  const [tipo, setTipo] = useState<TipoPublicacion>(
    publicacion?.tipo ?? "NOTICIA",
  );
  const [bloques, setBloques] = useState<BloqueUI[]>(() =>
    bloquesIniciales(publicacion),
  );

  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorContenido, setErrorContenido] = useState<string | null>(null);
  // Error por bloque (uid → mensaje): video sin/mal enlace, foto sin elegir.
  const [erroresBloque, setErroresBloque] = useState<Record<string, string>>({});

  const totalFotos = bloques.filter((b) => b.tipo === "imagen").length;
  const totalVideos = bloques.filter((b) => b.tipo === "video").length;
  const subiendoFotos = bloques.some((b) => b.tipo === "imagen" && b.file);

  // ---------- Operaciones sobre la lista ----------

  function actualizar(uidObjetivo: string, cambio: Partial<BloqueUI>) {
    setBloques((prev) =>
      prev.map((b) =>
        b.uid === uidObjetivo ? ({ ...b, ...cambio } as BloqueUI) : b,
      ),
    );
    setErroresBloque((prev) => {
      const { [uidObjetivo]: _, ...resto } = prev;
      return resto;
    });
  }

  function agregarTexto() {
    setBloques((prev) => [...prev, { uid: uid(), tipo: "texto", valor: "" }]);
  }

  function agregarImagen() {
    if (totalFotos >= MAX_IMAGENES) return;
    setBloques((prev) => [
      ...prev,
      { uid: uid(), tipo: "imagen", medioId: null, file: null, preview: "" },
    ]);
  }

  function agregarVideo() {
    if (totalVideos >= MAX_VIDEOS) return;
    setBloques((prev) => [...prev, { uid: uid(), tipo: "video", url: "" }]);
  }

  function eliminar(uidObjetivo: string) {
    setBloques((prev) => {
      const b = prev.find((x) => x.uid === uidObjetivo);
      // Liberar el object URL de una foto nueva.
      if (b?.tipo === "imagen" && b.file && b.preview) {
        URL.revokeObjectURL(b.preview);
      }
      return prev.filter((x) => x.uid !== uidObjetivo);
    });
  }

  function mover(indice: number, direccion: -1 | 1) {
    setBloques((prev) => {
      const destino = indice + direccion;
      if (destino < 0 || destino >= prev.length) return prev;
      const copia = [...prev];
      [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
      return copia;
    });
  }

  function elegirImagen(uidObjetivo: string, file: File | undefined) {
    if (!file) return;
    setBloques((prev) =>
      prev.map((b) => {
        if (b.uid !== uidObjetivo || b.tipo !== "imagen") return b;
        if (b.file && b.preview) URL.revokeObjectURL(b.preview);
        return {
          ...b,
          medioId: null,
          file,
          preview: URL.createObjectURL(file),
        };
      }),
    );
    setErroresBloque((prev) => {
      const { [uidObjetivo]: _, ...resto } = prev;
      return resto;
    });
  }

  // ---------- Envío ----------

  async function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorGeneral(null);
    setErrorTitulo(null);
    setErrorContenido(null);

    if (titulo.trim().length === 0) {
      setErrorTitulo("El título es obligatorio");
      return;
    }

    // Validación inline por bloque ANTES de enviar.
    const errores: Record<string, string> = {};
    let tieneTexto = false;
    for (const b of bloques) {
      if (b.tipo === "texto") {
        if (b.valor.trim().length > 0) tieneTexto = true;
      } else if (b.tipo === "video") {
        const limpio = b.url.trim();
        if (!limpio) errores[b.uid] = "Agrega el enlace del video";
        else if (!YOUTUBE_REGEX.test(limpio))
          errores[b.uid] = "Debe ser un enlace de YouTube (youtube.com/watch… o youtu.be/…)";
      } else if (b.tipo === "imagen") {
        if (!b.file && b.medioId == null)
          errores[b.uid] = "Selecciona una imagen o elimina el bloque";
      }
    }
    if (!tieneTexto) {
      setErrorContenido("Escribe al menos un bloque de texto con contenido");
      return;
    }
    if (Object.keys(errores).length > 0) {
      setErroresBloque(errores);
      return;
    }

    // Arma el contenido borrador + los Files con su ref (= uid del bloque).
    const draft: ContenidoBorrador = [];
    const archivos: { ref: string; file: File }[] = [];
    for (const b of bloques) {
      if (b.tipo === "texto") draft.push({ tipo: "texto", valor: b.valor });
      else if (b.tipo === "video") draft.push({ tipo: "video", url: b.url.trim() });
      else if (b.file) {
        draft.push({ tipo: "imagen", nuevaRef: b.uid });
        archivos.push({ ref: b.uid, file: b.file });
      } else if (b.medioId != null) {
        draft.push({ tipo: "imagen", medioId: b.medioId });
      }
    }

    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("tipo", tipo);
    formData.set("bloques", JSON.stringify(draft));
    archivos.forEach(({ ref, file }) => {
      formData.append("imagenes", file);
      formData.append("imagenesRefs", ref);
    });

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
      const msg = result.error.toLowerCase();
      if (msg.includes("título")) setErrorTitulo(result.error);
      else if (msg.includes("texto") || msg.includes("foto") || msg.includes("video") || msg.includes("imagen"))
        setErrorContenido(result.error);
      else setErrorGeneral(result.error);
    } else if (result.code === "FORBIDDEN") {
      setErrorGeneral("No tienes permiso para realizar esta acción.");
    } else if (result.code === "NOT_FOUND") {
      setErrorGeneral("La publicación ya no existe. Vuelve al panel.");
    } else {
      setErrorGeneral("Ocurrió un error en el servidor. Intenta de nuevo.");
    }
  }

  // ---------- Render ----------

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

      {/* TÍTULO + TIPO */}
      <section className="space-y-5 rounded-2xl border border-arena bg-white p-5 shadow-sm md:p-6">
        <div>
          <label htmlFor="titulo" className="mb-1 block text-sm font-medium text-marron">
            Título <span className="text-error">*</span>
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            maxLength={200}
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              setErrorTitulo(null);
            }}
            placeholder="Ej. Festival de primavera"
            className={CLASES_INPUT}
          />
          {errorTitulo && <p className="mt-1 text-sm text-error">{errorTitulo}</p>}
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
      </section>

      {/* CUERPO · editor de bloques */}
      <section className="space-y-4 rounded-2xl border border-arena bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-titulo text-lg font-semibold text-marron">Cuerpo</h3>
          <span className="text-sm font-medium text-marron-suave">
            {totalFotos}/{MAX_IMAGENES} fotos · {totalVideos}/{MAX_VIDEOS} videos
          </span>
        </div>
        {errorContenido && <p className="text-sm text-error">{errorContenido}</p>}

        <ol className="space-y-3">
          {bloques.map((b, i) => (
            <li
              key={b.uid}
              className="rounded-xl border border-arena bg-crema/40 p-3 md:p-4"
            >
              {/* Cabecera del bloque: etiqueta + controles */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-marron-suave">
                  {b.tipo === "texto" ? "Texto" : b.tipo === "imagen" ? "Foto" : "Video"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => mover(i, -1)}
                    disabled={i === 0}
                    aria-label="Subir bloque"
                    className="rounded-md border border-arena bg-white px-2 py-1 text-sm text-marron transition hover:bg-crema disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => mover(i, 1)}
                    disabled={i === bloques.length - 1}
                    aria-label="Bajar bloque"
                    className="rounded-md border border-arena bg-white px-2 py-1 text-sm text-marron transition hover:bg-crema disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => eliminar(b.uid)}
                    aria-label="Eliminar bloque"
                    className="rounded-md border border-arena bg-white px-2 py-1 text-sm font-medium text-error transition hover:bg-error/10"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Cuerpo del bloque según su tipo */}
              {b.tipo === "texto" && (
                <TextareaAuto
                  value={b.valor}
                  onChange={(v) => actualizar(b.uid, { valor: v })}
                />
              )}

              {b.tipo === "imagen" && (
                <div>
                  <input
                    id={`file-${b.uid}`}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => elegirImagen(b.uid, e.target.files?.[0])}
                  />
                  {b.preview ? (
                    <div className="space-y-2">
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-arena bg-white">
                        {b.file ? (
                          // Preview local (object URL): next/image no aplica.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.preview}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Image
                            src={b.preview}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 40rem, 100vw"
                            className="object-contain"
                          />
                        )}
                      </div>
                      <label
                        htmlFor={`file-${b.uid}`}
                        className="inline-block cursor-pointer rounded-lg border border-arena bg-white px-3 py-1.5 text-sm font-medium text-marron transition hover:bg-crema"
                      >
                        Reemplazar imagen
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor={`file-${b.uid}`}
                      className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-arena bg-white px-4 py-6 text-center transition hover:bg-crema"
                    >
                      <span className="text-sm font-medium text-marron">
                        Seleccionar imagen
                      </span>
                      <span className="text-xs text-marron-suave">
                        Una foto · máx. 8 MB
                      </span>
                    </label>
                  )}
                </div>
              )}

              {b.tipo === "video" && (
                <input
                  type="url"
                  value={b.url}
                  onChange={(e) => actualizar(b.uid, { url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=…"
                  aria-invalid={Boolean(erroresBloque[b.uid])}
                  className={`${CLASES_INPUT} ${
                    erroresBloque[b.uid]
                      ? "border-error focus:border-error focus:ring-error/30"
                      : ""
                  }`}
                />
              )}

              {erroresBloque[b.uid] && (
                <p className="mt-1 text-sm text-error">{erroresBloque[b.uid]}</p>
              )}
            </li>
          ))}
        </ol>

        {/* Botones para añadir bloques */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={agregarTexto}
            className="rounded-lg border border-arena bg-white px-4 py-2 text-sm font-medium text-marron transition hover:bg-crema"
          >
            + Texto
          </button>
          <button
            type="button"
            onClick={agregarImagen}
            disabled={totalFotos >= MAX_IMAGENES}
            className="rounded-lg border border-arena bg-white px-4 py-2 text-sm font-medium text-marron transition hover:bg-crema disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Foto
          </button>
          <button
            type="button"
            onClick={agregarVideo}
            disabled={totalVideos >= MAX_VIDEOS}
            className="rounded-lg border border-arena bg-white px-4 py-2 text-sm font-medium text-marron transition hover:bg-crema disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Video
          </button>
        </div>
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
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {enviando
            ? subiendoFotos
              ? "Subiendo fotos…"
              : "Guardando…"
            : modo === "crear"
              ? "Guardar"
              : "Guardar cambios"}
        </button>
      </div>
      {enviando && subiendoFotos && (
        <p className="text-center text-sm text-marron-suave">
          Las fotos se están subiendo, esto puede tardar unos segundos…
        </p>
      )}
    </form>
  );
}
