// ============================================================
// lib/db.ts
// Cliente único (singleton) de Prisma para toda la app.
//
// "server-only": si este módulo se importa por error desde un
// Client Component, el build falla — así las credenciales y el
// acceso a la BD nunca llegan al navegador.
//
// El patrón de singleton evita que el hot-reload de desarrollo
// abra una conexión nueva en cada recarga (lo que agotaría el
// pool de PostgreSQL). En producción se crea una sola vez.
// ============================================================
import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
