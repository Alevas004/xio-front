"use client";
import { useGet } from "@/hooks/useGet";
import { shuffle } from "@/utils/suffle";
import Link from "next/link";

type Service = {
  id: string;
  title: string;
  sub_title?: string;
  description_short: string;
  detailed_description?: string;
  image?: string;
  benefits?: string;
  for_who?: string;
  price?: number;
  duration?: number;
  phrase_hook?: string;
  category?: string;
  is_active?: boolean;
  userId?: string;
};

const ServiceCard = () => {
  const {
    data: service,
    error,
    loading,
  } = useGet<Service[]>("/xiomarasanchezterapeuta/servicesxs", {
    withAuth: false,
  });
  console.log("service", service);

  const randomService = shuffle(service ?? []).slice(0, 3);

  console.log("Random service:", randomService);
  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar el servicio</p>}
      {randomService &&
        randomService.map((service) => (
          <article
            key={service.id}
            className="w-full bg-piel-blanco rounded-2xl shadow-xl border border-piel-claro overflow-hidden h-full flex flex-col"
          >
            <div className="relative h-56 md:h-48 lg:h-56">
              {service.image?.endsWith(".mp4") ? (
                <video
                  className="w-full h-full object-cover"
                  src={service.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="w-full h-full object-cover"
                  src={service.image ?? "/img/placeholder.jpg"}
                  alt={service.title}
                />
              )}
              <div className="absolute inset-0 flex items-end p-6 bg-black/40">
                <div>
                  <p className="text-piel-blanco font-bold italic text-lg">
                    {service.phrase_hook}
                  </p>
                </div>
              </div>
            </div>
             
            <div className="flex flex-col flex-grow justify-between">
              <div className="p-2 space-y-4 ">
                <h2 className="text-piel-oscuro italic text-2xl ">
                  {service.title}
                </h2>
                <p className="text-verde-oscuro leading-relaxed">
                  {service.description_short}
                </p>

                <div>
                  <h4 className="text-piel-oscuro font-semibold ">
                    Beneficios
                  </h4>
                  <ul className="list-inside space-y-1 text-verde-oscuro">
                    {(service.benefits ?? "").split(",").map((b, i) => {
                      const t = b?.trim();
                      if (!t) return null;
                      const cap = t[0]?.toUpperCase() + t.slice(1);
                      return <li key={i}>• {cap}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2 justify-between items-center md:flex-row">
                <Link
                  className="inline-block px-5 py-2 rounded-full bg-verde-oscuro text-piel-blanco font-semibold hover:bg-piel-blanco hover:text-verde-oscuro hover:border-2 hover:border-verde-oscuro"
                  href="#contacto"
                >
                  Reservar
                </Link>
                <button className="text-sm text-verde-oscuro border-2 border-verde-oscuro rounded-full px-4 py-2 hover:bg-verde-oscuro hover:text-piel-blanco">
                  Más detalles
                </button>
              </div>
            </div>
          </article>
        ))}
    </>
  );
};

export default ServiceCard;
