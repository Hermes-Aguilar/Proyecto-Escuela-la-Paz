// ============================================================
// components/public/TarjetaPublicacion.tsx
// Tarjeta de una publicación para el muro y el inicio del jardín.
// SERVER COMPONENT (solo lectura).
//
// Muestra portada (primer BloqueImagen) o un placeholder con ícono,
// badge del tipo, fecha en español, título y extracto del primer
// BloqueTexto. Enlaza al detalle /publicaciones/<tipo>/<id>.
// El acento usa var(--jardin-primario) inyectada por el layout.
// ============================================================
import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

import type { PublicacionDTO } from "@/lib/dal/publicaciones";
import {
  TIPOS,
  formatearFecha,
  primerTexto,
  recortar,
  portadaUrl,
} from "@/lib/publicaciones-ui";

export default function TarjetaPublicacion({
  pub,
  slugJardin,
}: {
  pub: PublicacionDTO;
  slugJardin: string;
}) {
  const info = TIPOS[pub.tipo];
  const portada = portadaUrl(pub);
  const extracto = recortar(primerTexto(pub.contenido), 120);
  const href = `/pastoral-educativa/${slugJardin}/publicaciones/${info.slug}/${pub.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-arena bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Portada */}
      <div className="relative aspect-video overflow-hidden bg-arena/30">
        {portada ? (
          <Image
            src={portada}
            alt=""
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="object-cover transition group-hover:brightness-95"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon
              size={40}
              className="opacity-40"
              style={{ color: "var(--jardin-primario)" }}
            />
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.badge}`}
        >
          {info.etiqueta}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-marron-suave">
          {formatearFecha(pub.creadoEn)}
        </p>
        <h3 className="font-titulo mt-1.5 text-lg font-bold leading-snug text-marron">
          {pub.titulo}
        </h3>
        {extracto && (
          <p className="mt-2 text-sm leading-relaxed text-marron-suave">
            {extracto}
          </p>
        )}
        <span
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "var(--jardin-primario)" }}
        >
          Leer más
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
