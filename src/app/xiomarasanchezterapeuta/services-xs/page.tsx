import React from "react";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Service {
  id: number;
  title: string;
  sub_title: string;
  description_short: string;
  detailed_description: string;
  benefits: string;
  for_who: string;
  price: number;
  duration: number;
  image: string;
  phrase_hook: string;
}

const ServiceXS = async () => {
  let data: Service[] = [];

  try {
    const res = await fetch(`${BASE_URL}/xiomarasanchezterapeuta/servicesxs`, {
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
  } catch (error) {
    console.log("error getting services XS", error);
  }

  return (
    <div className="">
      <section className="relative h-[70vh] w-full flex items-center justify-center">
        {/* Fondo con video o imagen */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/masaje_terapeutico_hover.webm" // o una imagen /images/hero.jpg
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg text-piel-blanco italic">
            Bienestar, Equilibrio y Renovación
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-piel-claro">
            Escoge el servicio que mejor se adapte a tus necesidades.
          </p>
          <div className="flex justify-center gap-4 mt-5">
            <Link
              href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+m%C3%A1s+informaci%C3%B3n+sobre+tus+servicios"
              target="_blank"
              className="bg-verde-oscuro hover:bg-verde-claro text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Reserva ahora
            </Link>
            <Link
              href="/xios-academy/student-portal"
              className="bg-white text-verde-oscuro font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              ¡Quiero ser terapeuta!
            </Link>
          </div>
        </div>
      </section>
      {/* Nota informativa */}
      <div className="backdrop-blur-lg bg-white/40 border-l-4 border-verde-oscuro p-6 mx-4 md:mx-12 my-10 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-verde-oscuro italic mb-2">
          Nota importante
        </h2>
        <p className="text-piel-oscuro leading-relaxed">
          El{" "}
          <span className="font-semibold">
            precio del servicio puede variar según la ubicación dentro del Eje
            Cafetero
          </span>
          . También realizamos sesiones en otras ciudades de Colombia, pero
          únicamente en
          <span className="font-semibold"> fechas especiales de gira</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4">
        {Array.isArray(data) &&
          data.map((service) => (
            <section
              key={service.id}
              className="max-w-[500px] w-full mx-auto rounded-3xl overflow-hidden shadow-xl border border-piel-claro flex flex-col h-full"
            >
              {/* Video o Imagen con overlay y hook */}
              <div className="relative h-56 md:h-48 lg:h-56 ">
                {service.image.endsWith(".mp4") ? (
                  <video
                    className="w-full h-full object-cover"
                    src={service.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <p className="text-piel-blanco text-2xl md:text-3xl font-bold drop-shadow-lg italic max-w-3xl">
                    {service.phrase_hook}
                  </p>
                </div>
              </div>

              {/* Contenido */}
              <div className="pr-6 pl-6 pt-6 space-y-4 flex-1 pb-3">
                <h2 className="text-3xl font-bold italic">{service.title}</h2>
                <p className="text-xl text-piel-oscuro italic">
                  {service.sub_title}
                </p>

                <p className="mt-4 leading-relaxed">
                  {service.detailed_description}
                </p>

                <div className="flex flex-col mt-6 bg-piel-claro/30 rounded-2xl gap-2">
                  <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">¿Es para ti?</h2>
                    <p>{service.for_who}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-3">Beneficios</h3>
                    <ul className="flex flex-col items-start">
                      {service.benefits.split(",").map((benefit, i) => (
                        <li key={i} className="text-verde-oscuro">
                          <span className="text-verde-oscuro font-bold mr-2">
                            •
                          </span>
                          {benefit.trim().charAt(0).toUpperCase() +
                            benefit.trim().slice(1).toLowerCase()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mt-4 text-lg leading-relaxed">
                    {service.description_short}
                  </h3>
                </div>

                <p className="text-lg text-piel-oscuro ">
                  {service.duration} min aprox.
                </p>
              </div>

              {/* Footer con botón */}
              <div className="mb-5">
                <Link
                  href={`https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${service.title}`}
                  target="_blank"
                  className="w-full bg-piel-oscuro hover:bg-piel-claro text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Reservar ahora
                </Link>
              </div>
            </section>
          ))}
      </div>
      {/* Sección final CTA */}
      <section className="mt-20 bg-gradient-2 py-16 px-6 rounded-3xl mx-4 md:mx-12 flex flex-col items-center justify-center mb-5">
        <h2 className="text-3xl md:text-4xl font-bold text-white italic mb-4">
          ¿Quieres que vayamos a tu ciudad?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-piel-blanco">
          Escríbenos y cuéntanos dónde te encuentras. Organizamos giras en
          diferentes ciudades de Colombia para que disfrutes de nuestros
          servicios.
        </p>
        <Link
          href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola!+Quiero+que+visiten+mi+ciudad"
          target="_blank"
          className="inline-block bg-white text-verde-oscuro font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-piel-blanco mt-6"
        >
          Escríbenos ahora
        </Link>
      </section>
    </div>
  );
};

export default ServiceXS;
