// ============================================================
// lib/actions/contacto.actions.ts
// Server Action del formulario de contacto público (CU-04).
//
// Es PÚBLICO: no hay sesión. El jardinId se resuelve por el slug de
// la página del jardín (parámetro), NUNCA de un campo del
// formulario ni de la sesión. Contrato Result<T>: errores mapeados
// a VALIDATION / NOT_FOUND / INTERNAL, sin filtrar stack al cliente.
// ============================================================
"use server";

import { unstable_rethrow } from "next/navigation";
import type { ZodError } from "zod";

import { ok, fail, type Result } from "@/lib/contracts/result";
import { NotFoundError, ValidationError } from "@/lib/dal/errors";
import { getJardinBySlug } from "@/lib/dal/jardines";
import { crearMensajeContacto } from "@/lib/dal/contacto";
import { contactoSchema } from "@/lib/validations/contacto";

function mapError(e: unknown): Result<never> {
  if (e instanceof ValidationError) return fail("VALIDATION", e.message);
  if (e instanceof NotFoundError) return fail("NOT_FOUND", "No encontrado");
  return fail("INTERNAL", "Error del servidor");
}

function primerError(error: ZodError): string {
  return error.issues[0]?.message ?? "Datos inválidos";
}

export async function enviarMensaje(
  slugJardin: string,
  formData: FormData,
): Promise<Result<void>> {
  try {
    // 1. Resolver el jardín por slug (público, sin sesión).
    const jardin = await getJardinBySlug(slugJardin);
    if (!jardin) return fail("NOT_FOUND", "No encontrado");

    // 2. Validar los datos del formulario.
    const parsed = contactoSchema.safeParse({
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono") ?? undefined,
      asunto: formData.get("asunto") ?? undefined,
      mensaje: formData.get("mensaje"),
    });
    if (!parsed.success) return fail("VALIDATION", primerError(parsed.error));

    // 3. Insertar con el jardinId del jardín encontrado (no de sesión).
    await crearMensajeContacto(jardin.id, parsed.data);

    return ok(undefined);
  } catch (e) {
    unstable_rethrow(e);
    return mapError(e);
  }
}
