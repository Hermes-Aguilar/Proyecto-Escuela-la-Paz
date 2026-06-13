// RUTA: src/app/(public)/contacto/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaCheck,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

const sedes = [
  {
    nombre: "Casa Central San Francisco",
    tipo: "Casa central · Ciudad de México",
    direccion: "Av. San Francisco 120, Col. Centro, CDMX, CP 06000",
    telefono: "+52 55 1234 5678",
    email: "contacto@franciscanas.org",
    horario: "Lun–Vie: 8:00 – 17:00 h",
    principal: true,
  },
  {
    nombre: "Sede Guadalajara",
    tipo: "Sede regional · Jalisco",
    direccion: "Calle Hidalgo 340, Col. Centro, Guadalajara, JAL",
    telefono: "+52 33 9876 5432",
    email: "gdl@franciscanas.org",
    horario: "Lun–Vie: 9:00 – 16:00 h",
    principal: false,
  },
  {
    nombre: "Sede Monterrey",
    tipo: "Sede regional · Nuevo León",
    direccion: "Morelos 88, Col. Centro, Monterrey, NL",
    telefono: "+52 81 5555 1212",
    email: "mty@franciscanas.org",
    horario: "Lun–Vie: 9:00 – 16:00 h",
    principal: false,
  },
];


export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setEnviado(true);
  };

  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO */}
      <section className="bg-[#3B2314] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#C8B99A] text-sm hover:text-white mb-6 inline-flex items-center gap-1 transition-colors">
            ← Inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#C25B35]/30 p-3 rounded-xl">
              <FaEnvelope size={24} className="text-[#C25B35]" />
            </div>
            <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Contacto</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Hablemos
          </h1>
          <p className="text-[#C8B99A] text-lg max-w-2xl">
            Estamos aquí para escucharte. Ya sea que tengas una pregunta, quieras conocernos
            o necesites información sobre alguna de nuestras obras, con gusto te respondemos.
          </p>
        </div>
      </section>

      {/* FORMULARIO + INFO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        {/* Formulario */}
        <div>
          <h2 className="text-2xl font-bold text-[#3B2314] mb-6">Envíanos un mensaje</h2>

          {enviado ? (
            <div className="bg-[#8E9A3C]/10 border border-[#8E9A3C]/30 rounded-2xl p-10 text-center">
              <div className="bg-[#8E9A3C] text-white rounded-full p-4 inline-flex mb-4">
                <FaCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#3B2314] mb-2">¡Mensaje enviado!</h3>
              <p className="text-[#5A4232]">
                Gracias por contactarnos. Te responderemos a la brevedad posible.
              </p>
              <button
                onClick={() => { setEnviado(false); setForm({ nombre: "", email: "", mensaje: "" }); }}
                className="mt-6 text-sm text-[#C25B35] hover:underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#3B2314] mb-1">
                    Nombre <span className="text-[#C25B35]">*</span>
                  </label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="w-full border border-[#E4D7BC] rounded-xl px-4 py-3 text-sm text-[#3B2314] placeholder:text-[#C8B99A] focus:outline-none focus:border-[#C25B35] focus:ring-2 focus:ring-[#C25B35]/20 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3B2314] mb-1">
                    Correo electrónico <span className="text-[#C25B35]">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="w-full border border-[#E4D7BC] rounded-xl px-4 py-3 text-sm text-[#3B2314] placeholder:text-[#C8B99A] focus:outline-none focus:border-[#C25B35] focus:ring-2 focus:ring-[#C25B35]/20 transition-colors bg-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#3B2314] mb-1">
                  Mensaje <span className="text-[#C25B35]">*</span>
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className="w-full border border-[#E4D7BC] rounded-xl px-4 py-3 text-sm text-[#3B2314] placeholder:text-[#C8B99A] focus:outline-none focus:border-[#C25B35] focus:ring-2 focus:ring-[#C25B35]/20 transition-colors bg-white resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !form.nombre || !form.email || !form.mensaje}
                className="w-full bg-[#C25B35] hover:bg-[#a84928] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <><FaPaperPlane size={14} /> Enviar mensaje</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info de contacto */}
        <div>
          <h2 className="text-2xl font-bold text-[#3B2314] mb-6">Información de contacto</h2>

          {/* Redes sociales */}
          <div className="bg-[#3B2314] rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold mb-4">Síguenos</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaFacebook />, label: "Facebook", handle: "/franciscanasmx" },
                { icon: <FaInstagram />, label: "Instagram", handle: "@franciscanasmx" },
                { icon: <FaYoutube />, label: "YouTube", handle: "Canal oficial" },
                { icon: <FaWhatsapp />, label: "WhatsApp", handle: "+52 55 0000 0000" },
              ].map((r) => (
                <a
                  key={r.label}
                  href="#"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors"
                >
                  <span className="text-[#C25B35]">{r.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{r.label}</p>
                    <p className="text-[#C8B99A] text-xs">{r.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Horario general */}
          <div className="bg-[#F0EAE0] rounded-2xl p-5 flex items-start gap-3">
            <FaClock className="text-[#C25B35] mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-[#3B2314] text-sm mb-1">Horario de atención general</h4>
              <p className="text-[#5A4232] text-sm">Lunes a Viernes: 8:00 – 17:00 h</p>
              <p className="text-[#7A6352] text-xs mt-1">Sábados y domingos: solo urgencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEDES */}
      <section className="bg-[#F0EAE0] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#C25B35] text-sm font-semibold tracking-widest uppercase">Encuéntranos</span>
            <h2 className="text-3xl font-bold text-[#3B2314] mt-2">Nuestras sedes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sedes.map((sede) => (
              <div
                key={sede.nombre}
                className={`bg-white rounded-2xl p-6 shadow-sm border ${sede.principal ? "border-[#C25B35]" : "border-[#E4D7BC]"}`}
              >
                {sede.principal && (
                  <span className="inline-block text-xs text-[#C25B35] font-bold tracking-widest uppercase mb-3 border border-[#C25B35]/30 px-2 py-0.5 rounded-full">
                    Casa central
                  </span>
                )}
                <h3 className="font-bold text-[#3B2314] text-lg mb-1">{sede.nombre}</h3>
                <p className="text-xs text-[#C25B35] font-semibold mb-4">{sede.tipo}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-[#5A4232]">
                    <FaMapMarkerAlt className="text-[#C25B35] mt-0.5 shrink-0" size={12} />
                    <span>{sede.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5A4232]">
                    <FaPhoneAlt className="text-[#8E9A3C] shrink-0" size={12} />
                    <a href={`tel:${sede.telefono}`} className="hover:text-[#3B2314] transition-colors">{sede.telefono}</a>
                  </div>
                  <div className="flex items-center gap-2 text-[#5A4232]">
                    <FaEnvelope className="text-[#8E9A3C] shrink-0" size={12} />
                    <a href={`mailto:${sede.email}`} className="hover:text-[#3B2314] transition-colors">{sede.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-[#7A6352]">
                    <FaClock className="text-[#C25B35] shrink-0" size={12} />
                    <span>{sede.horario}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA placeholder */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#E4D7BC] rounded-3xl h-64 flex items-center justify-center">
          <div className="text-center text-[#7A6352]">
            <FaMapMarkerAlt size={36} className="mx-auto mb-3 text-[#C25B35]" />
            <p className="font-semibold text-[#3B2314]">Casa Central — Ciudad de México</p>
            <p className="text-sm mt-1">Av. San Francisco 120, Col. Centro, CDMX</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-[#C25B35] font-semibold hover:underline"
            >
              Ver en Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}