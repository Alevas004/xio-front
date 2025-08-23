import AnimatedSection from "./AnimatedSection";
import { RiTeamFill } from "react-icons/ri";
import { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "./components/ServiceCard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Xiomara Sánchez - Terapeuta | Bienestar y Certificación",
  description:
    "Terapias, talleres y alianzas. Reserva, forma parte o colabora con Xiomara Sánchez.",
};

export const openGraph = {
  title: "Xiomara Sánchez - Terapeuta",
  description:
    "Terapias, talleres y alianzas. Reserva, forma parte o colabora con Xiomara Sánchez.",
  url: "https://xiomarasanchez.com",
  images: [
    {
      url: "https://xiomarasanchez.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Xiomara Sánchez - Terapeuta",
    },
  ],
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xiomara Sánchez - Terapeuta",
  url: "https://xiomarasanchez.com",
  logo: "https://xiomarasanchez.com/logo.png",
};

export default function HomePage() {
  return (
    <div className=" space-y-5">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] md:h-[75vh]">
          <video
            src="/masaje_terapeutico_hover.webm"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-3xl px-6">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white italic ">
                Conecta con tu bienestar
              </h1>
              <p className="text-piel-blanco text-lg ">
                Terapias, talleres y alianzas que transforman vidas.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <Link
                  className="inline-block px-6 py-3 rounded-full bg-piel-blanco text-verde-oscuro font-semibold hover:bg-verde-oscuro hover:text-piel-blanco"
                  href="/xiomarasanchezterapeuta/services-xs"
                >
                  Terapias
                </Link>
                <Link
                  className="inline-block px-6 py-3 rounded-full border-2 border-piel-blanco text-piel-blanco hover:bg-verde-oscuro"
                  href="/xios-academy/events/workshops"
                >
                  Talleres
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center px-3 justify-center">
        <span className="text-9xl italic">¿</span>
        <h2 className="text-3xl font-bold text-verde-oscuro italic md:text-5xl">
          Quieres mejorar tu bienestar y calidad de vida
        </h2>
        <span className="text-9xl italic">?</span>
      </section>
      <div className="px-3">
        <p className="text-center text-verde-oscuro">
          Te asesoramos en tu camino hacia el bienestar, así sabrás cuál es el
          mejor masaje para ti.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6  space-y-20 font-inter">
        {/* TERAPIAS GRID */}
        <AnimatedSection>
          <section
            id="terapias"
            className="grid grid-cols-1 gap-3 px-10 md:p-0 md:grid-cols-3"
          >
            <ServiceCard />
          </section>
          <div className="mt-5 flex flex-col gap-2 justify-center items-center">
            <Link
              href="/xiomarasanchezterapeuta/services-xs"
              className="text-xl text-verde-oscuro border-2 border-verde-oscuro rounded-full px-4 py-2 hover:bg-verde-oscuro hover:text-piel-blanco"
            >
              Ver todos los servicios
            </Link>
          </div>
        </AnimatedSection>

        <section className=" rounded-2xl text-center border-2 border-piel-claro bg-white/20 bg-blend-color-burn">
          <section className="flex items-center px-3 justify-center">
            <span className="text-9xl italic text-verde-oscuro pl-5">¡</span>
            <h2 className="text-3xl font-bold text-verde-oscuro italic md:text-5xl">
              Invertir en tu bienestar es ganar en calidad de vida
            </h2>
            <span className="text-9xl italic text-verde-oscuro pr-5">!</span>
          </section>
          {/* CALLS - Equipo / Certificación / Empresas */}
          <AnimatedSection delay={0.2}>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 px-6 py-2 mx-auto ">
              <article className="p-6 rounded-2xl border border-piel-claro shadow flex flex-col items-center ">
                <RiTeamFill size={24} />
                <h3 className="text-xl font-playfair font-bold text-verde-oscuro">
                  Únete al equipo
                </h3>
                <p className="mt-2">
                  Comparte tu práctica y crece con nosotros.
                </p>
                <Link
                  className="mt-4 inline-block px-4 py-2 bg-verde-oscuro text-piel-blanco rounded-full"
                  href="/xiomarasanchezterapeuta/contact"
                >
                  Postúlate
                </Link>
              </article>

              <article className="p-6 rounded-2xl border border-piel-claro shadow flex flex-col items-center">
                <RiTeamFill size={24} />
                <h3 className="text-xl font-playfair font-bold text-verde-oscuro">
                  Formación y talleres
                </h3>
                <p className="mt-2">
                  Cursos prácticos y certificaciones profesionales.
                </p>
                <Link
                  className="mt-4 inline-block px-4 py-2 bg-verde-oscuro text-piel-blanco rounded-full"
                  href="/xios-academy"
                >
                  Ver talleres
                </Link>
              </article>

              <article className="p-6 rounded-2xl border border-piel-claro shadow flex flex-col items-center">
                <RiTeamFill size={24} />
                <h3 className="text-xl font-playfair font-bold text-verde-oscuro">
                  Alianzas turísticas
                </h3>
                <p className="mt-2">
                  Ofrece bienestar a tus huéspedes con experiencias a medida.
                </p>
                <Link
                  className="mt-4 inline-block px-4 py-2 bg-verde-oscuro text-piel-blanco rounded-full"
                  href="/xiomarasanchezterapeuta/contact"
                >
                  Contactar
                </Link>
              </article>
            </section>
          </AnimatedSection>
        </section>
        <section className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-10 bg-piel-claro rounded-2xl">
          <div>
            <h3 className="text-6xl text-white italic md:text-8xl">Únete</h3>
            <p>
              Suscríbete a nuestro grupo para recibir novedades y promociones.
            </p>
            <Link
              className="mt-4 inline-block px-4 py-2 bg-verde-oscuro text-piel-blanco rounded-full"
              href="https://wa.me/573135058584?text=¡Hola!%20Quiero%20ser%20parte%20del%20grupo"
              target="_blank"
            >
              Suscribirse
            </Link>
          </div>
          <div>
            <Image
              src="/newsletter.webp"
              alt="Newsletter xiomara sanchez terapeuta"
              className="w-full h-auto object-center"
              width={300}
              height={200}
            />
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="bg-verde-oscuro text-piel-blanco rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-playfair font-bold text-piel-blanco italic md:text-4xl">
            Conversemos
          </h2>
          <p className="mt-2 text-piel-blanco">
            Agenda, alianzas o formación — Escríbenos y te respondemos rápido.
          </p>
          <Link
            href="/xiomarasanchezterapeuta/contact"
            className="mt-4 inline-block px-6 py-3 bg-piel-blanco text-verde-oscuro rounded-full font-bold"
          >
            Escríbenos
          </Link>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </div>
    </div>
  );
}
