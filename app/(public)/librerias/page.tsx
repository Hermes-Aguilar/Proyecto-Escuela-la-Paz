// RUTA: src/app/(public)/librerias/page.tsx
import Link from "next/link";
import {
  FaBook,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const librerias = [
  {
    nombre: "Librería San Francisco",
    ciudad: "CDMX — Centro Histórico",
    direccion: "Av. Madero 15, Col. Centro, CDMX",
    horario: { semana: "Lun–Vie: 9:00 – 18:00 h", sabado: "Sáb: 9:00 – 15:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 55 1234 5678",
    email: "sanfrancisco@libreriasfran.org",
    principal: true,
    descripcion: "Nuestra librería insignia, ubicada en el corazón del Centro Histórico. La más completa colección de material franciscano y espiritualidad cristiana.",
  },
  {
    nombre: "Librería La Porciúncula",
    ciudad: "Guadalajara, Jalisco",
    direccion: "Av. Hidalgo 340, Col. Guadalajara Centro",
    horario: { semana: "Lun–Vie: 9:00 – 17:00 h", sabado: "Sáb: 9:00 – 14:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 33 9876 5432",
    email: "porciuncula@libreriasfran.org",
    principal: false,
    descripcion: "Espacio de encuentro y evangelización en Guadalajara. Especializada en material para grupos juveniles y catequesis.",
  },
  {
    nombre: "Librería Paz y Bien",
    ciudad: "Monterrey, Nuevo León",
    direccion: "Calle Morelos 88, Col. Centro, Monterrey",
    horario: { semana: "Lun–Vie: 10:00 – 18:00 h", sabado: "Sáb: 10:00 – 16:00 h", domingo: "Dom: Cerrado" },
    telefono: "+52 81 5555 1212",
    email: "pazbien@libreriasfran.org",
    principal: false,
    descripcion: "La librería más nueva de nuestra red, con especial enfoque en espiritualidad franciscana contemporánea y recursos digitales.",
  },
];

export default function Librerias() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO */}
      <section className="bg-[#3B2314] py-24 px-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5">
          <div className="h-full flex items-center justify-end pr-10">
            <FaBook size={300} className="text-white" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="text-[#C8B99A] text-sm hover:text-white mb-6 inline-flex items-center gap-1 transition-colors">
            ← Inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#8E9A3C]/30 p-3 rounded-xl">
              <FaBook size={28} className="text-[#8E9A3C]" />
            </div>
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Librerías Franciscanas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Fe, cultura<br />
            <span className="text-[#8E9A3C]">y encuentro</span>
          </h1>
          <p className="text-[#C8B99A] text-lg leading-relaxed max-w-2xl">
            Nuestras librerías son espacios de evangelización donde encontrarás libros,
            artículos religiosos y recursos para nutrir tu vida espiritual y la de tu comunidad.
          </p>
        </div>
      </section>

      {/* DIRECTORIO DE LIBRERÍAS */}
      <section className="bg-[#F0EAE0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#8E9A3C] text-sm font-semibold tracking-widest uppercase">Directorio</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Nuestras librerías</h2>
          </div>

          <div className="space-y-8">
            {librerias.map((lib) => (
              <div key={lib.nombre} className={`bg-white rounded-3xl overflow-hidden shadow-sm border ${lib.principal ? "border-[#C25B35]" : "border-[#E4D7BC]"}`}>
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  {/* Info principal */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-[#3B2314] mb-1">{lib.nombre}</h3>
                    <p className="text-[#C25B35] font-semibold text-sm mb-3">{lib.ciudad}</p>
                    <p className="text-[#5A4232] text-sm leading-relaxed mb-5">{lib.descripcion}</p>
                    <div className="flex items-start gap-2 text-sm text-[#7A6352] mb-2">
                      <FaMapMarkerAlt className="mt-0.5 text-[#C25B35] shrink-0" />
                      <span>{lib.direccion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7A6352] mb-2">
                      <FaPhoneAlt className="text-[#8E9A3C] shrink-0" />
                      <a href={`tel:${lib.telefono}`} className="hover:text-[#3B2314] transition-colors">{lib.telefono}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7A6352]">
                      <FaEnvelope className="text-[#8E9A3C] shrink-0" />
                      <a href={`mailto:${lib.email}`} className="hover:text-[#3B2314] transition-colors">{lib.email}</a>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="bg-[#FAF7F2] rounded-2xl p-5">
                    <h4 className="font-bold text-[#3B2314] flex items-center gap-2 mb-4">
                      <FaClock className="text-[#C25B35]" size={14} /> Horarios de atención
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#7A6352]">Lunes – Viernes</span>
                        <span className="font-medium text-[#3B2314]">{lib.horario.semana.split(": ")[1]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6352]">Sábado</span>
                        <span className="font-medium text-[#3B2314]">{lib.horario.sabado.split(": ")[1]}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E4D7BC] pt-2 mt-2">
                        <span className="text-[#7A6352]">Domingo</span>
                        <span className="text-[#9A8B7A]">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#8E9A3C] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">¿Tienes alguna consulta o pedido especial?</h2>
            <p className="text-white/80">
              Contáctanos y con gusto te ayudamos a encontrar lo que necesitas para tu comunidad.
            </p>
          </div>
          <Link
            href="/contacto"
            className="shrink-0 bg-white text-[#8E9A3C] hover:bg-[#F0EAE0] px-7 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
          >
            Ir a contacto <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}