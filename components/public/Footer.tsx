// RUTA: src/components/public/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3B2314] text-[#E4D7BC]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Identidad */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-[#C25B35] pl-3">
            Fraternidad Franciscana
          </h3>
          <p className="text-sm leading-relaxed text-[#C8B99A]">
            Siguiendo el carisma de San Francisco de Asís, anunciamos el Evangelio con
            alegría, sencillez y fraternidad en cada rincón de nuestra comunidad.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="hover:text-[#C25B35] transition-colors"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-[#C25B35] transition-colors"><FaInstagram size={20} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-[#C25B35] transition-colors"><FaYoutube size={20} /></a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-[#8E9A3C] pl-3">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Inicio" },
              { href: "/pastoral-vocacional", label: "Pastoral Vocacional" },
              { href: "/pastoral-educativa", label: "Pastoral Educativa" },
              { href: "/pastoral-misionera", label: "Pastoral Misionera" },
              { href: "/pastoral-juvenil", label: "Pastoral Juvenil" },
              { href: "/librerias", label: "Librerías" },
              { href: "/contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white hover:underline transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-[#C25B35] pl-3">
            Contáctanos
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-[#C25B35] shrink-0" />
              <span className="text-[#C8B99A]">Casa Central Franciscana, Ciudad de México</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#C25B35] shrink-0" />
              <span className="text-[#C8B99A]">+52 55 0000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#C25B35] shrink-0" />
              <span className="text-[#C8B99A]">contacto@franciscanos.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Fraternidad Franciscana. Todos los derechos reservados.
      </div>
    </footer>
  );
}