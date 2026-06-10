// ============================================================
// lib/dal/session.ts
// Segunda barrera de seguridad (defensa en profundidad).
//
// getAuthenticatedUser() lee la sesión activa y, si no existe,
// redirige a /login. Devuelve solo los datos de dominio que el
// resto del DAL necesita para filtrar por jardinId.
//
// "server-only": jamás debe ejecutarse en el cliente.
// cache(): memoiza el resultado durante un mismo render/request,
// evitando releer la sesión varias veces.
// ============================================================
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { Rol } from "@prisma/client";

import { auth } from "@/lib/auth";

export interface AuthenticatedUser {
  id: string;
  username: string;
  rol: Rol;
  jardinId: number;
}

export const getAuthenticatedUser = cache(
  async (): Promise<AuthenticatedUser> => {
    const session = await auth();

    if (!session?.user) {
      redirect("/login");
    }

    return {
      id: session.user.id,
      username: session.user.username,
      rol: session.user.rol,
      jardinId: session.user.jardinId,
    };
  },
);
