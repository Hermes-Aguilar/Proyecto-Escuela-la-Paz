// RUTA: src/app/(public)/pastoral-juvenil/page.tsx
import CarruselHero, { type SlideHero } from "@/components/public/CarruselHero";
import { ComunidadModal } from "@/components/public/ComunidadModal";

// Comunidad misionera de la MSCG (tarjeta + ventana con su información).
const comunidadEspirituSanto = {
  nombre: "Comunidad Espíritu Santo",
  ubicacion: "Malabo, Guinea Ecuatorial · África",
  foto: "/images/pastoral-misionera7.jpeg",
  intro:
    "Es una comunidad misionera, pero también una comunidad local. Acompañamos la pastoral de la zona y atendemos a los grupos que realizan su retiro o ejercicios espirituales en el Centro de Espiritualidad.",
  areas: [
    {
      titulo: "En la pastoral",
      items: [
        "Formación de catequistas",
        "Formación de monaguillos",
        "Formación a las asociaciones",
        "Formación de jóvenes y adolescentes",
        "Formación sacramental de adultos",
        "Celebración de la Palabra",
        "Visitas a las familias y formación en valores",
        "Formación de lectores",
        "Atención a la liturgia",
      ],
    },
    {
      titulo: "En el Centro de Espiritualidad",
      items: [
        "Atención a obispos y sacerdotes",
        "Diferentes grupos parroquiales",
        "Retiros y ejercicios espirituales de religiosas(os) consagrados y seminaristas",
        "Retiros a familias",
      ],
    },
  ],
};

// TODO: reemplazar las repeticiones por las comunidades reales. Por ahora se
// repite la misma comunidad para rellenar la sección.
const comunidadesMisioneras = [
  comunidadEspirituSanto,
  comunidadEspirituSanto,
  comunidadEspirituSanto,
];

const slidesHero: SlideHero[] = [
  {
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600",
    categoria: "COMUNIDADES",
    titulo: "Jóvenes con fe, con fuego, en misión",
    descripcion:
      "La juventud no es solo una etapa: es una fuerza que puede cambiar el mundo",
  },
  {
    imagen: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600",
    categoria: "FRATERNIDAD",
    titulo: "Crecer juntos en el camino",
    descripcion:
      "Grupos de jóvenes que se acompañan mutuamente en la fe y el servicio",
  },
  {
    imagen: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600",
    categoria: "COMPROMISO",
    titulo: "La fe que mueve montañas",
    descripcion:
      "Caminamos juntos en la búsqueda de sentido, fe y compromiso con los demás",
  },
];

export default function PastoralJuvenil() {
  return (
    <div>
      {/* HERO — carrusel con efecto reveal: la imagen queda fija y el
          contenido sube por encima al hacer scroll (como el inicio). */}
      <CarruselHero slides={slidesHero} fondoFijo altura="h-[60vh]" />

      {/* CONTENIDO — capa opaca que se desplaza sobre la imagen fija. */}
      <div className="relative z-10 bg-crema">

      {/* COMUNIDADES MISIONERAS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-azul-institucional text-sm font-semibold tracking-widest uppercase">Dónde estamos</span>
          <h2 className="text-3xl font-bold text-azul-institucional mt-2">Nuestras comunidades misioneras</h2>
          <p className="text-marron-suave mt-3 max-w-xl mx-auto">
            Conoce las comunidades de la MSCG. Haz clic en una tarjeta para ver toda su información.
          </p>
        </div>
        <div className="max-w-5xl mx-auto space-y-8">
          {comunidadesMisioneras.map((c, i) => (
            <ComunidadModal key={i} comunidad={c} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}