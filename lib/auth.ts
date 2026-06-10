// ============================================================
// lib/auth.ts
// Configuración central de Auth.js (NextAuth v5).
//
// Estrategia: Credentials (usuario + contraseña) con sesión JWT
// de 24 h en cookie httpOnly. El token transporta jardinId y rol
// para sostener el aislamiento por jardín (ver docs/casos-de-uso
// CU-05). La contraseña se verifica con bcrypt.compare.
// ============================================================
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/lib/db";

// Validación mínima de las credenciales que llegan del formulario.
const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const SESSION_MAX_AGE = 60 * 60 * 24; // 24 horas en segundos

export const { handlers, auth, signIn, signOut } = NextAuth({
  // El proyecto guarda el secreto como JWT_SECRET (Auth.js usa AUTH_SECRET
  // por convención); aceptamos cualquiera de los dos.
  secret: process.env.AUTH_SECRET ?? process.env.JWT_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: SESSION_MAX_AGE },
  pages: { signIn: "/login" },

  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        // 1. Validar forma de las credenciales.
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { username, password } = parsed.data;

        // 2. Buscar al usuario por username.
        const user = await db.usuario.findUnique({ where: { username } });
        if (!user) return null;

        // 3. Comparar la contraseña contra el hash almacenado.
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        // 4. Devolver solo lo necesario para el token (nunca el hash).
        return {
          id: String(user.id),
          username: user.username,
          rol: user.rol,
          jardinId: user.jardinId,
        };
      },
    }),
  ],

  callbacks: {
    // Primera barrera: usada por proxy.ts para proteger /dashboard/*.
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) return isLoggedIn; // false → redirige a /login
      return true;
    },

    // Al iniciar sesión, copiamos los datos de dominio al token.
    jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.username = user.username;
        token.rol = user.rol;
        token.jardinId = user.jardinId;
      }
      return token;
    },

    // Exponemos esos datos en la sesión que lee el servidor.
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.rol = token.rol;
      session.user.jardinId = token.jardinId;
      return session;
    },
  },
});
