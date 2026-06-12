// ============================================================
// lib/dal/session.ts
// Segunda barrera de seguridad (defensa en profundidad).
//
// getAuthenticatedUser() lee la sesión activa y, si no existe,
// redirige a /login. Devuelve solo los datos de dominio que el
// resto del DAL necesita para filtrar por jardinId.
//
// "server-only": jamás debe ejecutarse en el cliente.
//
// Nota de diseño: `auth` y `redirect` se importan de forma
// perezosa (dynamic import) para que cargar este módulo no arrastre
// next/navigation, que solo es válido dentro de un request HTTP.
// Esto permite, además, ejecutar el DAL desde scripts (scripts/**)
// con una sesión simulada vía runWithSimulatedUser().
// ============================================================
import "server-only";
import { cache } from "react";
import { AsyncLocalStorage } from "node:async_hooks";
import type { Rol } from "@prisma/client";

export interface AuthenticatedUser {
  id: string;
  username: string;
  rol: Rol;
  jardinId: number;
}

// ---- Seam de pruebas: sesión simulada para scripts (NUNCA producción) ----
// Permite a scripts/** correr el DAL con un usuario fijo sin un request
// real. En producción el store siempre está vacío y se bloquea su uso.
const sesionSimulada = new AsyncLocalStorage<AuthenticatedUser>();

export function runWithSimulatedUser<T>(
  user: AuthenticatedUser,
  fn: () => Promise<T>,
): Promise<T> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("runWithSimulatedUser no puede usarse en producción");
  }
  return sesionSimulada.run(user, fn);
}

// Implementación real: lee la sesión de Auth.js. cache() la memoiza
// durante un mismo request/render para no releerla varias veces.
const leerSesionReal = cache(async (): Promise<AuthenticatedUser> => {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (session?.user) {
    return {
      id: session.user.id,
      username: session.user.username,
      rol: session.user.rol,
      jardinId: session.user.jardinId,
    };
  }

  const { redirect } = await import("next/navigation");
  redirect("/login");
  // redirect() lanza siempre; tras un dynamic import TS no infiere `never`.
  throw new Error("redirect no interrumpió el flujo");
});

export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  // El seam de pruebas tiene prioridad y se lee FRESCO (sin memoizar),
  // para que cada sesión simulada distinta se respete.
  const simulada =
    process.env.NODE_ENV !== "production"
      ? sesionSimulada.getStore()
      : undefined;
  if (simulada) return simulada;

  return leerSesionReal();
}
