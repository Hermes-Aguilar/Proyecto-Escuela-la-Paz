// RUTA: src/components/public/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-marron text-arena">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Identidad */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-azul-institucional pl-3 leading-snug">
            Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe
          </h3>
          <p className="text-sm leading-relaxed text-arena/80">
            Miembros activos en la construcción del Reino de Dios, dando a conocer las
            riquezas de Jesucristo Rey y Señor de los Corazones y el amor maternal de
            Santa María de Guadalupe.
          </p>
          <p className="mt-4 font-titulo text-sm italic text-dorado">
            «Alegrémonos de sufrir por Cristo en favor de su Iglesia»
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="hover:text-dorado transition-colors"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-dorado transition-colors"><FaInstagram size={20} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-dorado transition-colors"><FaYoutube size={20} /></a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-dorado pl-3">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Inicio" },
              { href: "/pastoral-vocacional", label: "Pastoral Vocacional" },
              { href: "/pastoral-educativa", label: "Pastoral Educativa" },
              { href: "/pastoral-misionera", label: "Pastoral Misionera" },
              { href: "/pastoral-juvenil", label: "Comunidades" },
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
          <h3 className="text-white text-lg font-bold mb-3 border-l-4 border-azul-institucional pl-3">
            Contáctanos
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-dorado shrink-0" />
              <span className="text-arena/80">Calle Matamoros Núm. 13, Col. Centro, Huajuapan de León, Oaxaca</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-dorado shrink-0" />
              <a href="tel:9535320711" className="text-arena/80 hover:text-white transition-colors">953 53 2 07 11</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-dorado shrink-0" />
              <a href="mailto:mcgmayo12@hotmail.com" className="text-arena/80 hover:text-white transition-colors">mcgmayo12@hotmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe. Todos los derechos reservados.
      </div>
    </footer>
  );
}