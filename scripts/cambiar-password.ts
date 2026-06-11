// ============================================================
// scripts/cambiar-password.ts
// Cambia la contraseña de UNA encargada sin tocar el resto de la
// base (a diferencia del seed, que borra y recrea todo).
//
// Uso:
//   npx tsx scripts/cambiar-password.ts <username> <nueva_password>
//
// Ejemplo:
//   npx tsx scripts/cambiar-password.ts admin_lapaz "MiClaveSegura_2026"
//
// Tip: pon la contraseña entre comillas si tiene espacios o
// caracteres especiales del shell ($, !, etc.).
// ============================================================
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const [username, nuevaPassword] = process.argv.slice(2);

  // 1. Validar argumentos.
  if (!username || !nuevaPassword) {
    console.error(
      'Uso: npx tsx scripts/cambiar-password.ts <username> "<nueva_password>"',
    );
    process.exit(1);
  }

  if (nuevaPassword.length < 8) {
    console.error("La contraseña debe tener al menos 8 caracteres.");
    process.exit(1);
  }

  // 2. Verificar que la encargada exista (mensaje claro si no).
  const usuario = await db.usuario.findUnique({ where: { username } });
  if (!usuario) {
    console.error(`No existe ninguna encargada con username "${username}".`);
    process.exit(1);
  }

  // 3. Hashear con bcrypt (mismo cost factor que el seed) y actualizar
  //    solo la columna password_hash de ese registro.
  const passwordHash = await bcrypt.hash(nuevaPassword, 10);
  await db.usuario.update({
    where: { username },
    data: { passwordHash },
  });

  console.log(`Contraseña actualizada correctamente para "${username}".`);
}

main()
  .catch((e) => {
    console.error("Error al cambiar la contraseña:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
