-- CreateEnum
CREATE TYPE "rol" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "tipo_publicacion" AS ENUM ('NOTICIA', 'EVENTO', 'AVISO');

-- CreateEnum
CREATE TYPE "tipo_medio" AS ENUM ('IMAGEN', 'VIDEO');

-- CreateTable
CREATE TABLE "jardines" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "color_primario" VARCHAR(7) NOT NULL DEFAULT '#000000',
    "color_secundario" VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    "logo_url" VARCHAR(255),
    "direccion" VARCHAR(200),
    "ciudad" VARCHAR(100),
    "telefono" VARCHAR(30),
    "email_contacto" VARCHAR(120),
    "facebook_url" VARCHAR(255),
    "instagram_url" VARCHAR(255),
    "whatsapp" VARCHAR(30),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jardines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "jardin_id" INTEGER NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "rol" "rol" NOT NULL DEFAULT 'ADMIN',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicaciones" (
    "id" SERIAL NOT NULL,
    "jardin_id" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "titulo" VARCHAR(200) NOT NULL,
    "contenido" TEXT NOT NULL,
    "tipo" "tipo_publicacion" NOT NULL DEFAULT 'NOTICIA',
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3),

    CONSTRAINT "publicaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medios" (
    "id" SERIAL NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "tipo" "tipo_medio" NOT NULL DEFAULT 'IMAGEN',
    "orden" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "medios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes_contacto" (
    "id" SERIAL NOT NULL,
    "jardin_id" INTEGER NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "telefono" VARCHAR(30),
    "asunto" VARCHAR(120),
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensajes_contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jardines_slug_key" ON "jardines"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE INDEX "usuarios_jardin_id_idx" ON "usuarios"("jardin_id");

-- CreateIndex
CREATE INDEX "publicaciones_jardin_id_idx" ON "publicaciones"("jardin_id");

-- CreateIndex
CREATE INDEX "publicaciones_creado_en_idx" ON "publicaciones"("creado_en" DESC);

-- CreateIndex
CREATE INDEX "medios_publicacion_id_idx" ON "medios"("publicacion_id");

-- CreateIndex
CREATE INDEX "mensajes_contacto_jardin_id_idx" ON "mensajes_contacto"("jardin_id");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_jardin_id_fkey" FOREIGN KEY ("jardin_id") REFERENCES "jardines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_jardin_id_fkey" FOREIGN KEY ("jardin_id") REFERENCES "jardines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medios" ADD CONSTRAINT "medios_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_contacto" ADD CONSTRAINT "mensajes_contacto_jardin_id_fkey" FOREIGN KEY ("jardin_id") REFERENCES "jardines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
