"use client";
import { useGet } from "@/hooks/useGet";
import React from "react";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  sub_title: string;
  description_short: string;
  benefits: string;
  for_who: string;
  price: number;
  duration: number;
  image: string;
  phrase_hook: string;
}

const ServiceXS = () => {
  const {
    data: service,
    loading,
    error,
  } = useGet<Service>("/xiomarasanchezterapeuta/servicesxs", {
    withAuth: false,
  });
  console.log("Data fetched:", service);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 ">
      {service &&
        service.map((service) => (
          <section
            key={service.id}
            className="max-w-[500px] w-full mx-auto bg-piel-blanco rounded-3xl overflow-hidden shadow-xl border border-piel-claro"
          >
            {/* Video o Imagen con overlay y hook */}
            <div className="relative h-56 md:h-48 lg:h-56">
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
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-black/40 flex items-end p-6 ">
                <p className="text-piel-blanco text-2xl md:text-3xl font-bold drop-shadow-lg  italic max-w-3xl">
                  {service.phrase_hook}
                </p>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
              {/* Título */}
              <h2 className="text-3xl font-bold italic">
                {service.title}
              </h2>
              <p className="text-xl text-piel-oscuro italic">
                {service.sub_title}
              </p>

              {/* Descripción corta */}
              <p className="mt-4 leading-relaxed">
                {service.detailed_description}
              </p>

              {/* Beneficios */}
              <div className="flex flex-col mt-6 bg-piel-claro/30 rounded-2xl gap-2">
                <div className=" flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-2">
                    ¿Es para ti?
                  </h2>
                  <p>{service.for_who}</p>
                </div>
                <div className=" flex flex-col items-center">
                  <h3 className="text-lg font-semibold  mb-3">
                    Beneficios
                  </h3>
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

              {/* Para quién es */}
              <div className="mt-6">
                <h3 className="mt-4 text-lg leading-relaxed">
                  {service.description_short}
                </h3>
              </div>

              {/* Precio y CTA */}
              <div className="mt-4 flex flex-col  items-center justify-center bg-gradient-2 p-6 rounded-2xl">
                <div className="text-center ">
                  <p className="text-3xl font-black text-piel-blanco">
                    {service.price.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}{" "}
                    <span className="text-sm">COP</span>
                  </p>
                  <p className="text-lg text-piel-blanco">
                    {service.duration} min
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-piel-oscuro hover:bg-piel-claro text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
                  Reservar ahora
                </button>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
};

export default ServiceXS;
