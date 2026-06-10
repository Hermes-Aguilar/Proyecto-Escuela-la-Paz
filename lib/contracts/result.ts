// ============================================================
// lib/contracts/result.ts
// Contrato uniforme de retorno para las Server Actions.
//
// Toda action devuelve un Result<T>: o salió bien (ok: true con
// los datos) o falló (ok: false con un mensaje y un código que la
// UI puede mapear). Nunca lanzamos excepciones crudas al cliente.
// ============================================================

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: string };

/** Atajo para un resultado exitoso. */
export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

/** Atajo para un resultado fallido (code = etiqueta estable, error = mensaje legible). */
export function fail(code: string, error: string): Result<never> {
  return { ok: false, error, code };
}
