// ============================================================
// lib/dal/contacto.ts
// DAL del formulario de contacto (CU-04).
//
// Caso PÚBLICO: NO requiere sesión (igual que getJardinBySlug).
// El jardinId NO sale de la sesión —no la hay— sino del jardín que
// la action resolvió por slug y pasa ya validado. Aun así el
// insert es seguro: el visitante nunca elige un jardinId arbitrario
// desde el formulario, solo el slug de la página donde está.
// ============================================================
import "server-only";
import { db } from "@/lib/db";

export interface CrearMensajeData {
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
}

export async function crearMensajeContacto(
  jardinId: number,
  data: CrearMensajeData,
): Promise<void> {
  await db.mensajeContacto.create({
    data: {
      jardinId,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      asunto: data.asunto,
      mensaje: data.mensaje,
    },
  });
}
