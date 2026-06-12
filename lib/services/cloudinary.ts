// ============================================================
// lib/services/cloudinary.ts
// Servicio de imágenes (CU-06/08/09).
//
// Cloudinary aloja las fotos de las publicaciones; en la BD solo
// guardamos la URL y el public_id (tabla medios). Los videos de
// YouTube NO pasan por aquí (solo se guarda su link).
//
// "server-only": usa las credenciales secretas de Cloudinary, así
// que jamás debe ejecutarse en el cliente.
// ============================================================
import "server-only";
import {
  v2 as cloudinary,
  type UploadApiErrorResponse,
  type UploadApiResponse,
} from "cloudinary";

// Carpeta por defecto si la action no especifica una (la action
// pasa congregacion/{slug-del-jardin}/publicaciones).
const CARPETA_DEFECTO = "congregacion/publicaciones";

// Configuración a partir de las variables de entorno. Se ejecuta
// una vez al cargar el módulo (en el servidor).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface ImagenSubida {
  url: string;
  publicId: string;
}

/**
 * CU-06 · Sube una imagen a Cloudinary con compresión y límite de
 * tamaño automáticos (f_auto, q_auto, w_1600, c_limit) y devuelve
 * la URL segura y el public_id, que se persisten en la tabla
 * medios.
 *
 * El SDK no recibe un File del navegador directamente, así que lo
 * convertimos a Buffer y lo enviamos por upload_stream.
 */
export async function subirImagen(
  file: File,
  carpeta: string = CARPETA_DEFECTO,
): Promise<ImagenSubida> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<ImagenSubida>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: carpeta,
        resource_type: "image",
        transformation: [
          {
            width: 1600,
            crop: "limit", // no agranda; solo limita el ancho máximo
            quality: "auto", // q_auto: compresión inteligente
            fetch_format: "auto", // f_auto: mejor formato por navegador
          },
        ],
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary no devolvió respuesta"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    stream.end(buffer);
  });
}

/**
 * CU-08/09 · Borra una imagen de Cloudinary por su public_id. Se
 * usa al cambiar una foto (editar) o al eliminar una publicación.
 * El public_id sale del campo guardado en medios, sin parsear URLs.
 */
export async function eliminarImagen(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
