// ============================================================
// prisma/seed.ts
// Carga inicial: 2 jardines (con sus colores) y 2 encargadas.
// Las contrasenas se guardan hasheadas con bcrypt, nunca en texto plano.
//
// Como ejecutarlo:  npm run db:seed
// (requiere el script "db:seed" en package.json, ver instrucciones)
// ============================================================

import { PrismaClient, Rol } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Limpieza previa para poder re-ejecutar el seed sin duplicar
  // (orden: primero los hijos, luego los padres)
  await prisma.medio.deleteMany();
  await prisma.publicacion.deleteMany();
  await prisma.mensajeContacto.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.jardin.deleteMany();

  // ----- Jardines -----
  const laPaz = await prisma.jardin.create({
    data: {
      nombre: "La Paz",
      slug: "la-paz",
      descripcion: "Jardin de ninos La Paz.",
      colorPrimario: "#137E86",
      colorSecundario: "#18B4C7",
      ciudad: "Ciudad Capital",
    },
  });

  const porvenir = await prisma.jardin.create({
    data: {
      nombre: "Porvenir",
      slug: "porvenir",
      descripcion: "Jardin de ninos Porvenir.",
      colorPrimario: "#F4C430",
      colorSecundario: "#C25B35",
      ciudad: "Segunda Ciudad",
    },
  });

  // ----- Encargadas (1 por jardin) -----
  const passLaPaz = await bcrypt.hash("23lapaz", 10);
  const passPorvenir = await bcrypt.hash("23porvenir", 10);

  await prisma.usuario.create({
    data: {
      jardinId: laPaz.id,
      username: "admin_lapaz",
      passwordHash: passLaPaz,
      rol: Rol.ADMIN,
    },
  });

  await prisma.usuario.create({
    data: {
      jardinId: porvenir.id,
      username: "admin_porvenir",
      passwordHash: passPorvenir,
      rol: Rol.ADMIN,
    },
  });

  console.log("Seed completado: 2 jardines y 2 encargadas creados.");
}

main()
  .catch((e) => {
    console.error("Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
