import Link from "next/link";

export default function HomePage() {
  return (
    // Fondo general del sitio usando tu Beige clarito/Marfil (#F4EFE3) 
    <div className="bg-[#F4EFE3] min-h-screen selection:bg-[#C25B35]/20">
      
      {/* 1. HERO - imagen religiosa exacta de fondo */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrusNt5FlYerlOr1JLKJepTv7HRqm_eAf5g&s')" 
          }} 
        />
        {/* Capa de iluminación muy suave para que la imagen luzca hermosa de fondo y el texto mantenga perfecta lectura */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px]" />
        
        <div className="relative max-w-4xl mx-auto z-10 py-20 text-[#C25B35]">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide drop-shadow-sm">
            Bienvenidos a Nuestra Congregación
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl font-light italic text-[#8E9A3C] drop-shadow-sm">
            "Servir con amor, vivir en comunidad, compartir la fe"
          </p>
          
          <div className="w-16 h-[1px] bg-[#C25B35]/30 mx-auto mt-6 mb-6" />
          
          <p className="text-sm md:text-base text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
            Un espacio de encuentro, formación y servicio al pueblo de Dios
          </p>
        </div>
      </section>

      {/* CONTENEDOR CENTRAL */}
      <div className="relative">
        
        {/* 2. NUESTRO CARISMA */}
        <section className="py-24 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[#C25B35] tracking-widest uppercase">
            Nuestro Carisma
          </h2>
          
          <div className="w-12 h-[2px] bg-[#8E9A3C] mx-auto mt-4 mb-8" />

          <p className="text-[#8E9A3C] text-sm md:text-base leading-8 font-normal max-w-2xl mx-auto">
            Nuestra congregación se fundamenta en el amor misericordioso de Dios y el servicio a los más 
            necesitados. Buscamos ser presencia evangelizadora en el mundo contemporáneo, promoviendo 
            la justicia, la paz y la dignidad humana a través de nuestras obras pastorales y educativas.
          </p>
        </section>

        {/* 3. NUESTROS FUNDADORES */}
        <section className="py-20 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[#C25B35] tracking-widest uppercase">
            Nuestros Fundadores
          </h2>
          
          <div className="w-12 h-[1px] bg-[#C25B35] mx-auto mt-4 mb-16" />

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
            
            {/* P. Juan María Fundador */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E4D7BC] hover:shadow-md transition duration-300">
              <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 overflow-hidden border border-[#E4D7BC]/50">
                <img 
                  src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800" 
                  alt="P. Juan María Fundador"
                  className="w-full h-full object-cover grayscale opacity-95 sepia-[20%]"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#C25B35]">P. Juan María Fundador</h3>
              <p className="text-xs text-[#8E9A3C] font-semibold tracking-wider mt-0.5 mb-4">1820 - 1895</p>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                Sacerdote visionario que dedicó su vida al servicio de los pobres y la formación de comunidades religiosas. Fundó nuestra congregación en 1850 con el objetivo de llevar el amor de Cristo a los más necesitados.
              </p>
            </div>

            {/* M. María de la Esperanza */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E4D7BC] hover:shadow-md transition duration-300">
              <div className="aspect-[4/3] bg-stone-50 rounded-xl mb-6 overflow-hidden border border-[#E4D7BC]/50">
                <img 
                  src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=800" 
                  alt="M. María de la Esperanza"
                  className="w-full h-full object-cover grayscale opacity-95 sepia-[20%]"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#C25B35]">M. María de la Esperanza</h3>
              <p className="text-xs text-[#8E9A3C] font-semibold tracking-wider mt-0.5 mb-4">1825 - 1902</p>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                Mujer de profunda fe y caridad, co-fundadora de nuestra congregación. Destacó por su labor en la educación de niñas y jóvenes, y en el cuidado de enfermos. Su testimonio de vida sigue inspirando nuestra misión.
              </p>
            </div>

          </div>
        </section>

        {/* 4. NUESTRAS ÁREAS PASTORALES */}
        <section className="py-24 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[#C25B35] tracking-widest uppercase">
            Nuestras Áreas Pastorales
          </h2>
          
          <div className="w-12 h-[1px] bg-[#8E9A3C] mx-auto mt-4 mb-16" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            {[
              { t: "Pastoral Vocacional", d: "Acompañamiento y discernimiento de llamados religiosos.", i: "†", l: "/pastoral-vocacional" },
              { t: "Pastoral Educativa", d: "Formación integral en valores cristianos.", i: "📖", l: "/pastoral-educativa" },
              { t: "Pastoral Misionera", d: "Evangelización y servicio en comunidades.", i: "⛪", l: "/pastoral-misionera" },
              { t: "Pastoral Juvenil", d: "Acompañamiento y formación de jóvenes en la fe.", i: "👥", l: "/pastoral-juvenil" }
            ].map((item) => (
              <div key={item.t} className="bg-white border border-[#E4D7BC]/30 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#C25B35]/30 transition duration-300">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#E4D7BC]/20 flex items-center justify-center text-[#C25B35] text-sm mb-4 font-semibold">
                    {item.i}
                  </div>
                  <h3 className="text-base font-medium text-[#C25B35] mb-2">{item.t}</h3>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-light">
                    {item.d}
                  </p>
                </div>
                <Link href={item.l} className="text-xs font-semibold text-[#C25B35] hover:text-[#8E9A3C] mt-6 inline-flex items-center transition">
                  Ver más —
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CONOCE NUESTRAS SEDES */}
        <section className="py-24 text-center border-t border-[#E4D7BC]/30 bg-white/40">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-[#C25B35] tracking-widest uppercase">
              Conoce Nuestras Sedes
            </h2>
            
            <p className="text-[#8E9A3C] text-xs md:text-sm font-medium mt-2 mb-8">
              Visita nuestro directorio de librerías y centros de formación en diferentes ciudades
            </p>

            <Link
              href="/librerias"
              className="inline-block border border-[#C25B35] text-[#C25B35] hover:bg-[#C25B35] hover:text-white font-medium px-8 py-2.5 rounded-md text-xs tracking-wider uppercase transition duration-300 bg-white/80 backdrop-blur-sm"
            >
              Ver Directorio de Librerías
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}