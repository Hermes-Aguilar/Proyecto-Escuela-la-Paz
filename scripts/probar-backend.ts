// ============================================================
// scripts/probar-backend.ts
// Prueba de humo del backend contra la BD local + Cloudinary REAL.
//
// Cómo correrlo (los flags importan):
//   npx tsx --conditions=react-server --env-file=.env.local \
//     scripts/probar-backend.ts
//
//   · --conditions=react-server → resuelve "server-only" a un módulo
//     vacío (si no, lanza al importarlo desde un script de Node).
//   · --env-file=.env.local → carga DATABASE_URL y las claves de
//     Cloudinary (tsx no lee .env.local por sí solo).
//
// Qué prueba (CU-06/08/09 + aislamiento):
//   1. Crear publicación (sesión admin_lapaz) + 1 imagen real a
//      Cloudinary → verifica publicación + medio con url y publicId.
//   2. Editar: quitar la foto → se borra de Cloudinary y de BD.
//   3. Borrar publicación → BD limpia.
//   4. Negativo: admin_porvenir intenta editar esa publicación →
//      debe lanzar ForbiddenError (el action lo mapea a FORBIDDEN).
//
// Los actions no se pueden importar en un script (arrastran
// next/navigation y next/cache, válidos solo dentro de un request),
// así que se ejercita la MISMA lógica una capa abajo: DAL + servicio
// Cloudinary + validaciones zod, con la sesión simulada del DAL.
//
// Al terminar deja la BD como estaba (borra lo que creó), incluso
// si algo falla a la mitad.
// ============================================================
import { v2 as cloudinary } from "cloudinary";

import { db } from "@/lib/db";
import {
  runWithSimulatedUser,
  type AuthenticatedUser,
} from "@/lib/dal/session";
import { getJardinBySlug } from "@/lib/dal/jardines";
import {
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  type ImagenNueva,
} from "@/lib/dal/publicaciones";
import { subirImagen, eliminarImagen } from "@/lib/services/cloudinary";
import { ForbiddenError } from "@/lib/dal/errors";
import {
  publicacionSchema,
  imagenesSchema,
} from "@/lib/validations/publicacion";
import type { ContenidoBorrador } from "@/types/bloques";

// PNG 1×1 transparente para una subida real pero mínima.
const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

let pasaron = 0;
let fallaron = 0;
function check(cond: boolean, etiqueta: string) {
  if (cond) {
    pasaron++;
    console.log(`  ✓ ${etiqueta}`);
  } else {
    fallaron++;
    console.log(`  ✗ ${etiqueta}`);
  }
}

// Estado para limpiar al final pase lo que pase.
const limpieza: {
  publicacionId?: number;
  publicIds: string[];
} = { publicIds: [] };

// Cloudinary solo se ejercita si hay credenciales reales en el entorno.
const cloudinaryActivo = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

async function existeEnCloudinary(publicId: string): Promise<boolean> {
  try {
    await cloudinary.api.resource(publicId);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // --- Datos base (jardines + encargadas del seed) ---
  const lapaz = await getJardinBySlug("la-paz");
  const porvenir = await getJardinBySlug("porvenir");
  if (!lapaz || !porvenir) {
    throw new Error("Faltan jardines del seed (la-paz / porvenir). Corre npm run db:seed.");
  }
  const adminLapaz = await db.usuario.findUnique({ where: { username: "admin_lapaz" } });
  const adminPorvenir = await db.usuario.findUnique({
    where: { username: "admin_porvenir" },
  });
  if (!adminLapaz || !adminPorvenir) {
    throw new Error("Faltan encargadas del seed (admin_lapaz / admin_porvenir).");
  }

  const sesionLapaz: AuthenticatedUser = {
    id: String(adminLapaz.id),
    username: adminLapaz.username,
    rol: adminLapaz.rol,
    jardinId: lapaz.id,
  };
  const sesionPorvenir: AuthenticatedUser = {
    id: String(adminPorvenir.id),
    username: adminPorvenir.username,
    rol: adminPorvenir.rol,
    jardinId: porvenir.id,
  };

  // ====================================================
  // 1. Crear publicación (CU-06) — sesión admin_lapaz + imagen real
  // ====================================================
  console.log("\n[1] crearPublicacion (admin_lapaz): bloques texto→imagen→texto");
  const imagen = new File([PNG_1X1], "prueba.png", { type: "image/png" });
  const NUEVA_REF = "img-0";
  // Contenido en bloques: texto → imagen (nuevaRef) → texto.
  const bloques: ContenidoBorrador = [
    { tipo: "texto", valor: "Primer párrafo, antes de la foto." },
    { tipo: "imagen", nuevaRef: NUEVA_REF },
    { tipo: "texto", valor: "Segundo párrafo, después de la foto." },
  ];
  // Valida igual que la action: bloques por publicacionSchema, File por imagenesSchema.
  const datosPub = publicacionSchema.parse({
    titulo: "Publicación de prueba",
    tipo: "NOTICIA",
    contenido: bloques,
  });
  imagenesSchema.parse([imagen]);

  const carpeta = `congregacion/${lapaz.slug}/publicaciones`;
  let subida: { url: string; publicId: string };
  if (cloudinaryActivo) {
    subida = await subirImagen(imagen, carpeta);
    limpieza.publicIds.push(subida.publicId);
    check(subida.url.startsWith("http"), "Cloudinary devolvió una url real");
    check(subida.publicId.length > 0, "Cloudinary devolvió un publicId real");
  } else {
    console.log("  ⚠ Cloudinary sin credenciales → medio SIMULADO (se omiten checks de Cloudinary)");
    subida = { url: "https://example.com/simulado.png", publicId: "simulado/test" };
  }

  const imagenes: ImagenNueva[] = [
    { nuevaRef: NUEVA_REF, url: subida.url, publicId: subida.publicId },
  ];
  const pub = await runWithSimulatedUser(sesionLapaz, () =>
    createPublicacion({
      titulo: datosPub.titulo,
      tipo: datosPub.tipo,
      bloques: datosPub.contenido,
      imagenes,
    }),
  );
  limpieza.publicacionId = pub.id;

  const pubEnBd = await db.publicacion.findUnique({
    where: { id: pub.id },
    include: { medios: true },
  });
  check(pubEnBd !== null, "la publicación quedó en BD");
  check(pubEnBd?.jardinId === lapaz.id, "la publicación se asignó al jardín de la sesión");
  check(pubEnBd?.medios.length === 1, "tiene exactamente 1 medio (la imagen)");
  check(pubEnBd?.medios[0]?.url === subida.url, "el medio guardó la url");
  check(
    pubEnBd?.medios[0]?.publicId === subida.publicId,
    "el medio guardó el publicId",
  );
  if (cloudinaryActivo) {
    check(await existeEnCloudinary(subida.publicId), "la imagen existe en Cloudinary");
  }

  const medioId = pubEnBd!.medios[0].id;

  // --- Serialización/deserialización del contenido en bloques ---
  check(pub.contenido.length === 3, "el DAL devolvió 3 bloques");
  check(pub.contenido[0]?.tipo === "texto", "bloque 0 es texto");
  const bloqueImg = pub.contenido[1];
  check(
    bloqueImg?.tipo === "imagen" && bloqueImg.medioId === medioId,
    "bloque 1 es imagen y referencia el medioId real (nuevaRef→id)",
  );
  check(pub.contenido[2]?.tipo === "texto", "bloque 2 es texto");
  // El JSON crudo en BD también es un array de 3 bloques.
  const crudo = pubEnBd!.contenido;
  check(
    Array.isArray(crudo) && crudo.length === 3,
    "el contenido en BD es un array JSON de 3 bloques",
  );

  // ====================================================
  // 2. Editar (CU-08) — quitar la foto
  // ====================================================
  console.log("\n[2] editarPublicacion: quitar el bloque de imagen");
  // La action borra primero de Cloudinary las fotos quitadas...
  if (cloudinaryActivo) {
    await eliminarImagen(subida.publicId);
  }
  // ...y luego el DAL actualiza con el contenido SIN el bloque de imagen.
  await runWithSimulatedUser(sesionLapaz, () =>
    updatePublicacion(pub.id, {
      titulo: datosPub.titulo,
      tipo: datosPub.tipo,
      bloques: [
        { tipo: "texto", valor: "Primer párrafo, antes de la foto." },
        { tipo: "texto", valor: "Segundo párrafo, después de la foto." },
      ],
      imagenesNuevas: [],
      mediosEliminar: [medioId],
    }),
  );
  const mediosRestantes = await db.medio.count({ where: { publicacionId: pub.id } });
  check(mediosRestantes === 0, "el medio se eliminó de la BD");
  const trasEditar = await db.publicacion.findUnique({
    where: { id: pub.id },
    select: { contenido: true },
  });
  const contTrasEditar = trasEditar!.contenido;
  check(
    Array.isArray(contTrasEditar) &&
      contTrasEditar.every(
        (b) => (b as { tipo: string }).tipo !== "imagen",
      ),
    "el contenido ya no tiene bloques de imagen",
  );
  if (cloudinaryActivo) {
    check(
      !(await existeEnCloudinary(subida.publicId)),
      "la imagen se eliminó de Cloudinary",
    );
  }

  // ====================================================
  // 3. Negativo (aislamiento) — admin_porvenir edita pub de la-paz
  //    (se prueba antes del borrado, mientras la publicación existe)
  // ====================================================
  console.log("\n[3] editarPublicacion con sesión admin_porvenir → FORBIDDEN");
  let forbidden = false;
  try {
    await runWithSimulatedUser(sesionPorvenir, () =>
      updatePublicacion(pub.id, {
        titulo: "intento de secuestro",
        tipo: "AVISO",
        bloques: [{ tipo: "texto", valor: "no debería poder" }],
        imagenesNuevas: [],
        mediosEliminar: [],
      }),
    );
  } catch (e) {
    forbidden = e instanceof ForbiddenError;
    if (!forbidden) throw e;
  }
  check(forbidden, "el DAL lanzó ForbiddenError (action lo mapearía a FORBIDDEN)");
  const sigueIgual = await db.publicacion.findUnique({ where: { id: pub.id } });
  check(
    sigueIgual?.titulo === datosPub.titulo,
    "la publicación NO fue modificada por el otro jardín",
  );

  // ====================================================
  // 4. Borrar (CU-09)
  // ====================================================
  console.log("\n[4] borrarPublicacion (admin_lapaz)");
  // (paso 4: se ejecuta tras la prueba negativa, con la publicación aún viva)
  await runWithSimulatedUser(sesionLapaz, () => deletePublicacion(pub.id));
  const borrada = await db.publicacion.findUnique({ where: { id: pub.id } });
  check(borrada === null, "la publicación se borró de la BD");
  if (borrada === null) limpieza.publicacionId = undefined;
}

async function limpiar() {
  console.log("\n[limpieza] dejando la BD como estaba…");
  if (limpieza.publicacionId) {
    // cascade borra los medios
    await db.publicacion.deleteMany({ where: { id: limpieza.publicacionId } });
  }
  for (const publicId of limpieza.publicIds) {
    try {
      await eliminarImagen(publicId);
    } catch {
      // ya borrada o inexistente: ignorar
    }
  }
}

main()
  .catch((e) => {
    fallaron++;
    console.error("\n✗ Error inesperado:", e);
  })
  .finally(async () => {
    await limpiar();
    console.log(`\nResultado: ${pasaron} pasaron, ${fallaron} fallaron.`);
    await db.$disconnect();
    process.exit(fallaron > 0 ? 1 : 0);
  });
