// ============================================================
// lib/validations/publicacion.ts
// Validación de entrada de publicaciones (CU-06 / CU-08) con zod.
//
// El contenido ahora es un ARRAY DE BLOQUES intercalados (texto,
// imagen, video) — ver types/bloques.ts. Las reglas de negocio se
// validan AQUÍ, en la capa de aplicación, no en la BD:
//   · título 1–200
//   · al menos 1 bloque de texto con ≥1 carácter
//   · máximo 10 imágenes y 5 videos, CONTADOS desde los bloques
//   · cada video debe ser un link de YouTube
// La Server Action corre estos schemas antes de tocar Cloudinary
// o la BD.
// ============================================================
import { z } from "zod";

export const TIPOS_PUBLICACION = ["NOTICIA", "EVENTO", "AVISO"] as const;

export const MAX_IMAGENES = 10;
export const MAX_VIDEOS = 5;
const MAX_PESO_IMAGEN = 8 * 1024 * 1024; // 8 MB por imagen

// youtube.com/watch?v=ID  ó  youtu.be/ID
// Exportado: la UI lo usa para validar inline antes de enviar.
export const YOUTUBE_REGEX =
  /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=[\w-]{11}|youtu\.be\/[\w-]{11})/i;

// ---------- Imágenes nuevas (Files que sube la action) ----------

const imagenSchema = z
  .instanceof(File)
  .refine((f) => f.size > 0, "La imagen está vacía")
  .refine((f) => f.size <= MAX_PESO_IMAGEN, "Cada imagen debe pesar máximo 8 MB")
  .refine((f) => f.type.startsWith("image/"), "Solo se permiten imágenes");

/** Los Files de imágenes nuevas llegan aparte del JSON de bloques. */
export const imagenesSchema = z
  .array(imagenSchema)
  .max(MAX_IMAGENES, `Máximo ${MAX_IMAGENES} fotos por publicación`);

// ---------- Bloques ----------

const bloqueTextoSchema = z.object({
  tipo: z.literal("texto"),
  valor: z.string(),
});

const bloqueVideoSchema = z.object({
  tipo: z.literal("video"),
  url: z.string().trim().regex(YOUTUBE_REGEX, "El enlace debe ser de YouTube"),
});

// Imagen CANÓNICA: ya referencia un Medio por su id.
const bloqueImagenSchema = z.object({
  tipo: z.literal("imagen"),
  medioId: z.number().int().positive(),
});

// Imagen BORRADOR: un Medio existente (medioId) o un File nuevo (nuevaRef).
const bloqueImagenBorradorSchema = z.union([
  bloqueImagenSchema,
  z.object({ tipo: z.literal("imagen"), nuevaRef: z.string().min(1) }),
]);

/** Bloque canónico (forma almacenada en la BD). */
export const bloqueSchema = z.discriminatedUnion("tipo", [
  bloqueTextoSchema,
  bloqueImagenSchema,
  bloqueVideoSchema,
]);

/** Lectura desde la BD: solo valida ESTRUCTURA, no las reglas de negocio. */
export const contenidoLecturaSchema = z.array(bloqueSchema);

const bloqueBorradorSchema = z.union([
  bloqueTextoSchema,
  bloqueImagenBorradorSchema,
  bloqueVideoSchema,
]);

/** Reglas de negocio del cuerpo de una publicación (crear/editar). */
function aplicarReglasContenido(
  bloques: z.infer<typeof bloqueBorradorSchema>[],
  ctx: z.RefinementCtx,
) {
  const tieneTexto = bloques.some(
    (b) => b.tipo === "texto" && b.valor.trim().length >= 1,
  );
  if (!tieneTexto) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Escribe al menos un bloque de texto con contenido",
    });
  }
  const imagenes = bloques.filter((b) => b.tipo === "imagen").length;
  if (imagenes > MAX_IMAGENES) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo ${MAX_IMAGENES} fotos por publicación`,
    });
  }
  const videos = bloques.filter((b) => b.tipo === "video").length;
  if (videos > MAX_VIDEOS) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo ${MAX_VIDEOS} videos por publicación`,
    });
  }
}

/** Contenido en formato borrador, con las reglas de negocio aplicadas. */
export const contenidoBorradorSchema = z
  .array(bloqueBorradorSchema)
  .superRefine(aplicarReglasContenido);

// ---------- Schema de la publicación ----------

export const publicacionSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(200, "El título admite máximo 200 caracteres"),
  tipo: z.enum(TIPOS_PUBLICACION),
  contenido: contenidoBorradorSchema,
});

// Editar comparte el mismo contrato: los ids de medios a eliminar se
// derivan en la Server Action (medios existentes que ya no referencia
// ningún bloque), no llegan del formulario.
export const editarPublicacionSchema = publicacionSchema;

export type PublicacionInput = z.infer<typeof publicacionSchema>;
