import Image from "next/image";

const AboutMe = () => {
  return (
    <section className="bg-piel-claro py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Foto */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/xiomara.webp" // Cambiar por la ruta real
            alt="Xiomara Sánchez - Terapeuta Integral"
            fill
            className="object-cover"
          />
        </div>

        {/* Texto */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-verde-oscuro leading-tight">
            Xiomara Sánchez
          </h1>
          <p className="text-lg text-verde-oscuro/80 leading-relaxed text-start">
            Mujer medicina contemporánea y terapeuta integral que combina{" "}
            <strong>lo ancestral con lo sensorial</strong>,{" "}
            <strong>lo emocional con lo corporal</strong>, y{" "}
            <strong>lo profesional con lo sagrado</strong>.
          </p>
          <p className="text-lg text-verde-oscuro/80 leading-relaxed text-start">
            Guía, formadora y canal: a través de sus manos enseña a sanar, y a
            través de su voz enseña a emprender desde el alma.
          </p>
          <p className="text-lg text-verde-oscuro/80 leading-relaxed text-start">
            Su enfoque es <strong>transformacional</strong>: acompaña a mujeres
            a descubrir una profesión que cuida al otro sin descuidarse a sí
            mismas.
          </p>

          {/* Lista de roles */}
          <div className="p-3">
            <ul className="space-y-2 border-l-4 border-verde-oscuro pl-4 text-start">
              <li>💆‍♀ Mentora de nuevas masajistas conscientes.</li>
              <li>
                🌿 Facilitadora del bienestar natural, estético y emocional.
              </li>
              <li>✨ Emprendedora que honra su ritmo y su verdad.</li>
              <li>
                🌸 Mujer en proceso que convierte su búsqueda en un camino para otras.
              </li>
            </ul>
          </div>

          <p className="text-lg text-verde-oscuro/80 leading-relaxed">
            Hoy construye equipos y conexiones para{" "}
            <strong>mejorar la calidad de vida de todos</strong>.
          </p>

          {/* CTA */}
          <div className="pt-4">
            <a
              href="/contacto"
              className="bg-verde-oscuro text-piel-blanco px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-verde-claro transition-all"
            >
              Conoce más y conecta conmigo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
