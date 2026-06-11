import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E4D7BC]/20 border-t border-[#E4D7BC]/40">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        
        {/* Nombre Principal */}
        <h3 className="font-titulo text-2xl font-light text-[#C25B35] tracking-wide">
          Congregación Religiosa
        </h3>
        
        <p className="mt-2 text-xs md:text-sm italic text-[#8E9A3C] font-light">
          "Servir con amor, vivir en comunidad y compartir la fe."
        </p>

        {/* Enlaces espaciados en una sola fila fina horizontal */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
          <Link href="/" className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition">
            Inicio
          </Link>
          <Link href="/pastoral-vocacional" className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition">
            Vocacional
          </Link>
          <Link href="/pastoral-educativa" className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition">
            Educativa
          </Link>
          <Link href="/contacto" className="text-xs uppercase tracking-widest text-[#8E9A3C] hover:text-[#C25B35] transition">
            Contacto
          </Link>
        </div>

        {/* Línea divisoria interna ultraligera */}
        <div className="w-16 h-[1px] bg-[#E4D7BC] mx-auto my-6" />

        {/* Datos de contacto centrados y discretos */}
        <div className="text-xs text-[#8E9A3C]/70 font-light space-y-1">
          <p>contacto@correo.com</p>
          <p>+52 246 000 0000</p>
          <p className="uppercase tracking-widest text-[10px] mt-2">Tlaxcala, México</p>
        </div>

        <div className="mt-8 text-[10px] text-[#8E9A3C]/50 uppercase tracking-widest">
          © {new Date().getFullYear()} — Paz y Bien
        </div>

      </div>
    </footer>
  );
}