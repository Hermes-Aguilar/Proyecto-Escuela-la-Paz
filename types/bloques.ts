// ============================================================
// types/bloques.ts
// Modelo de contenido de una publicación: bloques intercalados.
//
// El contenido de una publicación ES un array ordenado de bloques
// (texto, imagen, video). La moderadora los arma en el orden que
// quiera: texto → foto → texto → dos fotos → video → texto.
//
// Sin dependencias de servidor: se importa igual en cliente
// (FormularioPublicacion) y en servidor (DAL, actions, vistas).
// ============================================================

// ---------- Bloques CANÓNICOS (lo que vive en la BD y en los DTO) ----------

/** Párrafo de texto libre. */
export interface BloqueTexto {
  tipo: "texto";
  valor: string;
}

/** Imagen: referencia el id de un Medio ya existente en ESTA publicación. */
export interface BloqueImagen {
  tipo: "imagen";
  medioId: number;
}

/** Video de YouTube embebido. La URL se guarda en línea (no es un Medio). */
export interface BloqueVideo {
  tipo: "video";
  url: string;
}

export type Bloque = BloqueTexto | BloqueImagen | BloqueVideo;

/** El array de bloques ES el contenido de la publicación. */
export type Contenido = Bloque[];

// ---------- Bloques BORRADOR (formato de transporte cliente → action) ----------
//
// Una imagen NUEVA todavía no tiene un Medio en la BD (ni su id),
// así que en el borrador referencia su File por una clave temporal
// (`nuevaRef`). La action sube el File, inserta el Medio, obtiene su
// id real y reescribe el bloque a su forma canónica (`medioId`).

export type BloqueImagenBorrador =
  | { tipo: "imagen"; medioId: number } // imagen ya guardada (editar)
  | { tipo: "imagen"; nuevaRef: string }; // imagen nueva (un File por subir)

export type BloqueBorrador = BloqueTexto | BloqueImagenBorrador | BloqueVideo;

export type ContenidoBorrador = BloqueBorrador[];
