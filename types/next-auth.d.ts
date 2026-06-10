// ============================================================
// types/next-auth.d.ts
// Extiende los tipos de Auth.js para que la sesión y el JWT
// lleven los datos propios del dominio: jardinId, rol y username.
// Así el aislamiento por jardín queda tipado en toda la app.
// ============================================================
import type { DefaultSession } from "next-auth";
import type { Rol } from "@prisma/client";

declare module "next-auth" {
  /** Objeto devuelto por el callback `authorize` del provider. */
  interface User {
    username: string;
    rol: Rol;
    jardinId: number;
  }

  /** Sesión accesible vía `auth()` en servidor. */
  interface Session {
    user: {
      id: string;
      username: string;
      rol: Rol;
      jardinId: number;
    } & DefaultSession["user"];
  }
}

// La interfaz JWT real vive en @auth/core/jwt (next-auth solo la
// re-exporta), así que el augment debe apuntar ahí para que fusione.
declare module "@auth/core/jwt" {
  /** Payload del token JWT (cookie httpOnly). */
  interface JWT {
    id: string;
    username: string;
    rol: Rol;
    jardinId: number;
  }
}
