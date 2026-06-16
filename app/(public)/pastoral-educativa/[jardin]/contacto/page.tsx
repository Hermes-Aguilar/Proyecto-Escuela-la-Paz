// ============================================================
// .../[jardin]/contacto/page.tsx
// CU-04 · Contacto del jardín. SERVER COMPONENT que carga los datos
// del jardín (dirección, teléfono, correo, redes) y renderiza el
// panel de contacto + el formulario (FormularioContacto, client).
//
// El formulario es interactivo (client); el resto es estático y se
// resuelve en el servidor para no inflar el bundle del cliente.
// ============================================================
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import { getJardinBySlug } from "@/lib/dal/jardines";
import FormularioContacto from "@/components/public/FormularioContacto";

// Normaliza el campo whatsapp (puede ser número o URL) a un enlace wa.me.
function whatsappHref(valor: string): string {
  if (/^https?:\/\//i.test(valor)) return valor;
  return `https://wa.me/${valor.replace(/\D/g, "")}`;
}

export default async function ContactoJardin({
  params,
}: {
  params: Promise<{ jardin: string }>;
}) {
  const { jardin: slug } = await params;
  const jardin = await getJardinBySlug(slug);
  if (!jardin) notFound();

  const redes = [
    jardin.facebookUrl && {
      label: "Facebook",
      href: jardin.facebookUrl,
      icon: FaFacebookF,
    },
    jardin.instagramUrl && {
      label: "Instagram",
      href: jardin.instagramUrl,
      icon: FaInstagram,
    },
    jardin.whatsapp && {
      label: "WhatsApp",
      href: whatsappHref(jardin.whatsapp),
      icon: FaWhatsapp,
    },
  ].filter(Boolean) as { label: string; href: string; icon: typeof FaFacebookF }[];

  const datos = [
    jardin.direccion && { icon: MapPin, valor: jardin.direccion, href: null },
    jardin.telefono && {
      icon: Phone,
      valor: jardin.telefono,
      href: `tel:${jardin.telefono.replace(/\s/g, "")}`,
    },
    jardin.emailContacto && {
      icon: Mail,
      valor: jardin.emailContacto,
      href: `mailto:${jardin.emailContacto}`,
    },
  ].filter(Boolean) as {
    icon: typeof MapPin;
    valor: string;
    href: string | null;
  }[];

  return (
    <div className="font-texto mx-auto max-w-5xl px-6 py-12 md:py-16">
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--jardin-primario)" }}
      >
        Contacto
      </p>
      <h1 className="font-titulo mt-2 text-3xl font-extrabold text-marron md:text-4xl">
        Escríbenos
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-marron-suave">
        ¿Tienes preguntas sobre inscripciones, niveles o nuestras actividades?
        Con gusto te atendemos en {jardin.nombre}.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Datos de contacto */}
        <div>
          <h2 className="font-titulo text-xl font-bold text-marron">
            Datos de contacto
          </h2>

          {datos.length > 0 ? (
            <ul className="mt-5 space-y-4">
              {datos.map(({ icon: Icono, valor, href }) => (
                <li key={valor} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--jardin-primario) 12%, white)",
                      color: "var(--jardin-primario)",
                    }}
                  >
                    <Icono size={18} />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="pt-2 text-marron-suave transition-colors hover:text-marron"
                    >
                      {valor}
                    </a>
                  ) : (
                    <span className="pt-2 text-marron-suave">{valor}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-marron-suave">
              Pronto publicaremos nuestros datos de contacto.
            </p>
          )}

          {/* Redes sociales (CU-04 · se abren en pestaña nueva) */}
          {redes.length > 0 && (
            <div className="mt-8">
              <h3 className="font-titulo text-sm font-bold uppercase tracking-widest text-marron-suave">
                Síguenos
              </h3>
              <div className="mt-3 flex gap-3">
                {redes.map(({ label, href, icon: Icono }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow transition hover:brightness-95"
                    style={{ backgroundColor: "var(--jardin-primario)" }}
                  >
                    <Icono size={18} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm md:p-8">
          <FormularioContacto slug={jardin.slug} />
        </div>
      </div>
    </div>
  );
}
