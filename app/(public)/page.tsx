// RUTA: app/(public)/page.tsx
import Link from "next/link";
import { Lora } from "next/font/google";
import {
  FaCross,
  FaLeaf,
  FaBook,
  FaGlobeAmericas,
  FaUsers,
  FaStar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChurch,
  FaDove,
  FaHandHoldingHeart,
  FaGraduationCap,
} from "react-icons/fa";

// Tipografía serif elegante para los títulos
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

// Imagen religiosa del hero (Basílica de San Francisco de Asís — Unsplash, licencia libre).
// Puedes dejar esta URL o descargar la foto y guardarla como /public/hero-asis.jpg
// y cambiar HERO_IMG por "/hero-asis.jpg".
const HERO_IMG =
  "https://images.unsplash.com/photo-1551418557-567e915fe7aa?fm=jpg&q=80&w=1200&auto=format&fit=crop";

const areas = [
  {
    icon: <FaDove size={28} />,
    title: "Pastoral Vocacional",
    desc: "Acompañamos a quienes sienten el llamado a la vida franciscana, discerniendo juntos el camino hacia la consagración.",
    href: "/pastoral-vocacional",
    color: "bg-[#C25B35]",
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "Pastoral Educativa",
    desc: "Formamos personas íntegras en nuestros jardines y programas educativos, sembrando valores evangélicos desde la infancia.",
    href: "/pastoral-educativa",
    color: "bg-[#8E9A3C]",
  },
  {
    icon: <FaGlobeAmericas size={28} />,
    title: "Pastoral Misionera",
    desc: "Llevamos el mensaje de paz y bien a las comunidades más alejadas, con espíritu misionero y servicio generoso.",
    href: "/pastoral-misionera",
    color: "bg-[#C25B35]",
  },
  {
    icon: <FaHandHoldingHeart size={28} />,
    title: "Pastoral Juvenil",
    desc: "Caminamos con los jóvenes en su búsqueda de sentido, fe y compromiso, animando su protagonismo en la Iglesia.",
    href: "/pastoral-juvenil",
    color: "bg-[#8E9A3C]",
  },
];

const sedes = [
  { ciudad: "Ciudad de México", nombre: "Casa Central San Francisco", tipo: "Casa central" },
  { ciudad: "Guadalajara", nombre: "Fraternidad La Paz", tipo: "Sede regional" },
  { ciudad: "Monterrey", nombre: "Fraternidad Porvenir", tipo: "Sede regional" },
  { ciudad: "Puebla", nombre: "Fraternidad San Buenaventura", tipo: "Comunidad" },
  { ciudad: "Oaxaca", nombre: "Fraternidad Santa Clara", tipo: "Comunidad" },
  { ciudad: "Mérida", nombre: "Fraternidad de la Misericordia", tipo: "Misión" },
];

const librerias = [
  { nombre: "Librería San Francisco", ciudad: "CDMX Centro", horario: "Lun–Sáb 9–18h" },
  { nombre: "Librería La Porciúncula", ciudad: "Guadalajara", horario: "Lun–Vie 9–17h" },
  { nombre: "Librería Paz y Bien", ciudad: "Monterrey", horario: "Lun–Sáb 10–18h" },
];

export default function Home() {
  return (
    <div className={`${lora.variable} bg-[#FAF7F2]`}>
      {/* Serif solo para los títulos */}
      <style>{`
        .font-display { font-family: var(--font-lora), Georgia, serif; }
      `}</style>

      {/* HERO — claro y suave */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F0EAE0] to-[#E4D7BC]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, rgba(194,91,53,0.10) 0%, transparent 55%), radial-gradient(circle at 12% 88%, rgba(142,154,60,0.10) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase mb-4">
              Fraternidad Franciscana
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#3B2314] leading-tight mb-6">
              Paz y bien
              <br />
              <span className="text-[#C25B35]">en cada camino</span>
            </h1>
            <p className="text-[#5A4232] text-lg leading-relaxed mb-8 max-w-lg">
              Siguiendo el carisma de San Francisco de Asís, anunciamos el Evangelio con alegría,
              sencillez y fraternidad. Somos una comunidad viva, abierta y misionera.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pastoral-vocacional"
                className="bg-[#C25B35] hover:bg-[#a84928] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                Conoce nuestra misión <FaArrowRight />
              </Link>
              <Link
                href="/contacto"
                className="border border-[#C9B79A] bg-white text-[#5A4232] hover:bg-[#F0EAE0] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Medallón con imagen religiosa */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full border-2 border-[#C25B35]/30" />
              <div className="absolute inset-3 rounded-full border border-[#8E9A3C]/40" />
              <div className="absolute inset-6 rounded-full overflow-hidden shadow-md">
                {/* Si prefieres usar next/image, descarga la foto a /public y configura
                    images.remotePatterns o usa el archivo local. Con <img> funciona directo. */}
                <img
                  src={HERO_IMG}
                  alt="Basílica de San Francisco de Asís"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIENVENIDA / CARISMA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3B2314] mt-2 mb-5 leading-tight">
              Un carisma vivo que
              <br />
              transforma comunidades
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-4">
              Somos una fraternidad de religiosas franciscanas comprometidas con el Evangelio, el
              servicio a los más pobres y la educación integral de las personas. Nuestro carisma
              franciscano nos impulsa a vivir en fraternidad, sencillez y amor a la creación.
            </p>
            <p className="text-[#5A4232] leading-relaxed mb-6">
              Desde nuestra fundación, hemos expandido nuestra presencia a través de obras
              educativas, pastorales y misioneras que dan testimonio del amor de Dios en el mundo.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaLeaf className="text-[#8E9A3C]" /> Amor a la creación
              </span>
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaCross className="text-[#C25B35]" /> Vida evangélica
              </span>
              <span className="bg-[#F0EAE0] text-[#3B2314] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaUsers className="text-[#8E9A3C]" /> Fraternidad
              </span>
            </div>
          </div>

          {/* Cards de carisma */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <FaDove />, title: "Paz", desc: "Vivimos y anunciamos la paz como don y tarea" },
              { icon: <FaLeaf />, title: "Sencillez", desc: "El estilo de vida franciscano en lo cotidiano" },
              { icon: <FaHandHoldingHeart />, title: "Servicio", desc: "Presencia cercana a quienes más necesitan" },
              { icon: <FaStar />, title: "Alegría", desc: "La alegría del Evangelio como testimonio vivo" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#E4D7BC] hover:shadow-md transition-shadow"
              >
                <div className="text-[#C25B35] mb-2 text-2xl">{c.icon}</div>
                <h4 className="font-display font-bold text-[#3B2314] mb-1 text-lg">{c.title}</h4>
                <p className="text-xs text-[#7A6352] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADORES */}
      <section className="bg-[#F0EAE0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Nuestras raíces</span>
            <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2">Fundadores e inspiradores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                nombre: "San Francisco de Asís",
                rol: "Fundador de la Orden",
                desc: "El Poverello de Asís, cuyo amor por Dios, los pobres y la creación sigue inspirando a millones en el mundo.",
                icon: <FaCross size={32} className="text-[#C25B35]" />,
              },
              {
                nombre: "Santa Clara de Asís",
                rol: "Co-fundadora",
                desc: "La primera mujer que siguió a Francisco, fundadora de las Hermanas Pobres y modelo de vida contemplativa.",
                icon: <FaDove size={32} className="text-[#8E9A3C]" />,
              },
              {
                nombre: "Nuestra Fundadora",
                rol: "Fundadora de la Fraternidad",
                desc: "Con espíritu misionero y pedagógico, fundó esta fraternidad para llevar el carisma franciscano a México.",
                icon: <FaStar size={32} className="text-[#C25B35]" />,
              },
            ].map((f) => (
              <div key={f.nombre} className="bg-white rounded-2xl p-7 shadow-sm border border-[#E4D7BC] text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-[74px] h-[74px] rounded-full bg-[#F0EAE0] flex items-center justify-center">
                    {f.icon}
                  </div>
                </div>
                <h3 className="font-display font-bold text-[#3B2314] text-lg mb-1">{f.nombre}</h3>
                <span className="text-xs text-[#C25B35] font-semibold uppercase tracking-wide">{f.rol}</span>
                <p className="text-[#5A4232] text-sm leading-relaxed mt-3">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS PASTORALES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Lo que hacemos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3B2314] mt-2">Áreas pastorales</h2>
          <p className="text-[#7A6352] mt-3 max-w-xl mx-auto">
            Nuestra misión se despliega en cuatro grandes áreas que abarcan todos los momentos de la vida.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-[#E4D7BC] hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`${area.color} text-white rounded-xl p-3 inline-flex mb-4 group-hover:scale-110 transition-transform`}
              >
                {area.icon}
              </div>
              <h3 className="font-display font-bold text-[#3B2314] mb-2 leading-snug">{area.title}</h3>
              <p className="text-sm text-[#7A6352] leading-relaxed mb-4">{area.desc}</p>
              <span className="text-[#C25B35] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Conocer más <FaArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEDES — claro */}
      <section className="bg-[#F0EAE0] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Presencia</span>
            <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2">Nuestras sedes</h2>
            <p className="text-[#7A6352] mt-2">Una fraternidad con presencia en todo México</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sedes.map((sede) => (
              <div
                key={sede.nombre}
                className="bg-white border border-[#E4D7BC] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#C25B35] mt-1 shrink-0" />
                  <div>
                    <p className="text-[#3B2314] font-semibold">{sede.nombre}</p>
                    <p className="text-[#7A6352] text-sm">{sede.ciudad}</p>
                    <span className="inline-block mt-1 text-xs bg-[#E4D7BC] text-[#C25B35] px-2 py-0.5 rounded-full">
                      {sede.tipo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRERÍAS preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Librerías</span>
            <h2 className="font-display text-3xl font-bold text-[#3B2314] mt-2 mb-4">
              Espacios de fe,
              <br />
              cultura y encuentro
            </h2>
            <p className="text-[#5A4232] leading-relaxed mb-6">
              Nuestras librerías franciscanas son mucho más que puntos de venta: son lugares de
              encuentro, formación y evangelización. Encontrarás libros, artículos religiosos,
              música y recursos para tu vida espiritual.
            </p>
            <Link
              href="/librerias"
              className="inline-flex items-center gap-2 bg-[#8E9A3C] hover:bg-[#6d7830] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver todas las librerías <FaArrowRight />
            </Link>
          </div>
          <div className="space-y-3">
            {librerias.map((lib) => (
              <div
                key={lib.nombre}
                className="bg-white border border-[#E4D7BC] rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-[#8E9A3C]/10 rounded-lg p-3 shrink-0">
                  <FaBook className="text-[#8E9A3C]" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-[#3B2314]">{lib.nombre}</p>
                  <p className="text-sm text-[#7A6352]">
                    {lib.ciudad} · {lib.horario}
                  </p>
                </div>
              </div>
            ))}
            <Link href="/librerias" className="block text-center text-sm text-[#C25B35] font-semibold hover:underline mt-2">
              Ver más librerías →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final — suave */}
      <section className="bg-[#E4D7BC] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FaChurch size={40} className="text-[#C25B35]/70 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-[#3B2314] mb-4">
            ¿Sientes el llamado a vivir el carisma franciscano?
          </h2>
          <p className="text-[#5A4232] text-lg mb-8">
            Acompáñanos en este camino de fe, fraternidad y servicio. Siempre hay un lugar para ti.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pastoral-vocacional"
              className="bg-[#C25B35] hover:bg-[#a84928] text-white px-7 py-3 rounded-lg font-bold transition-colors"
            >
              Descubrir la vocación
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314]/10 px-7 py-3 rounded-lg font-bold transition-colors"
            >
              Escríbenos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}