/*
  Warnings:

  - Changed the type of `contenido` on the `publicaciones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "publicaciones" DROP COLUMN "contenido",
ADD COLUMN     "contenido" JSONB NOT NULL;
