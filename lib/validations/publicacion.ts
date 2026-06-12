// ============================================================
// lib/validations/publicacion.ts
// Validación de entrada de publicaciones (CU-06 / CU-08) con zod.
//
// Reglas de negocio (se validan AQUÍ, en la capa de aplicación,
// no en la BD): título 1–200, contenido obligatorio, tipo válido,
// máximo 10 fotos y 5 videos de YouTube, y que cada link sea
// realmente de YouTube. La Server Action corre estos schemas antes
// de tocar Cloudinary o la BD.
// ============================================================
import { z } from "zod";

export const TIPOS_PUBLICACION = ["NOTICIA", "EVENTO", "AVISO"] as const;

export const MAX_IMAGENES = 10;
export const MAX_VIDEOS = 5;
const MAX_PESO_IMAGEN = 8 * 1024 * 1024; // 8 MB por imagen

// youtube.com/watch?v=ID  ó  youtu.be/ID
const YOUTUBE_REGEX =
  /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=[\w-]{11}|youtu\.be\/[\w-]{11})/i;

const imagenSchema = z
  .instanceof(File)
  .refine((f) => f.size > 0, "La imagen está vacía")
  .refine((f) => f.size <= MAX_PESO_IMAGEN, "Cada imagen debe pesar máximo 8 MB")
  .refine((f) => f.type.startsWith("image/"), "Solo se permiten imágenes");

const videoYoutubeSchema = z
  .string()
  .trim()
  .regex(YOUTUBE_REGEX, "El enlace debe ser de YouTube");

// Schema base para crear una publicación.
export const publicacionSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(200, "El título admite máximo 200 caracteres"),
  contenido: z.string().trim().min(1, "El contenido es obligatorio"),
  tipo: z.enum(TIPOS_PUBLICACION),
  imagenes: z
    .array(imagenSchema)
    .max(MAX_IMAGENES, `Máximo ${MAX_IMAGENES} fotos por publicación`),
  videosYoutube: z
    .array(videoYoutubeSchema)
    .max(MAX_VIDEOS, `Máximo ${MAX_VIDEOS} videos por publicación`),
});

// Al editar se añaden los ids de medios existentes que el usuario
// quitó. Las imágenes/videos del schema base son los NUEVOS a añadir.
export const editarPublicacionSchema = publicacionSchema.extend({
  mediosEliminar: z.array(z.number().int().positive()),
});

export type PublicacionInput = z.infer<typeof publicacionSchema>;
export type EditarPublicacionInput = z.infer<typeof editarPublicacionSchema>;
