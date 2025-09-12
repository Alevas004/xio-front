import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import ServiceCard from "@/components/xiomarasanchezterapeuta/ServiceCard";
import FilterServices from "@/components/xiomarasanchezterapeuta/FilterServices";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// SEO Metadata Premium
export const metadata: Metadata = {
  title: "Servicios de Terapia y Bienestar | Xiomara Sánchez Terapeuta",
  description:
    "Descubre nuestros servicios especializados: masaje prenatal, terapéutico, drenaje linfático y más. Bienestar, equilibrio y renovación en el Eje Cafetero.",
  keywords:
    "masaje prenatal, masaje terapéutico, drenaje linfático, reflexología, aromaterapia, terapia, bienestar, Xiomara Sánchez, Eje Cafetero, Colombia",
  authors: [{ name: "Xiomara Sánchez", url: "https://xiomarasanchez.com" }],
  creator: "Xiomara Sánchez Terapeuta",
  publisher: "XIOS",
  robots: "index, follow",
  openGraph: {
    title: "Servicios de Terapia y Bienestar | Xiomara Sánchez",
    description:
      "Servicios especializados de terapia: masaje prenatal, terapéutico, drenaje linfático. Bienestar y renovación profesional.",
    url: "https://xiomarasanchez.com/services",
    siteName: "Xiomara Sánchez Terapeuta",
    images: [
      {
        url: "/xiomara.webp",
        width: 1200,
        height: 630,
        alt: "Servicios de Terapia Xiomara Sánchez",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Terapia y Bienestar | Xiomara Sánchez",
    description:
      "Servicios especializados de terapia y bienestar en el Eje Cafetero",
    images: ["/xiomara.webp"],
  },
  alternates: {
    canonical: "https://xiomarasanchez.com/services",
  },
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vat: string;
  gender: "male" | "female" | "other";
  profile_picture: string;
  country: string;
  city: string;
  address: string;
  date_of_birth: string; // si quieres más fuerte -> Date
  role: string;
  email_verified: boolean;
  isActive: boolean;
  isProfessional: boolean;
  certifications: string[];
  clients_count: number;
  specialties: string[];
  years_experience: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  sub_title: string;
  description_short: string;
  detailed_description: string;
  image: string;
  images: string[] | null;
  benefits?: string[] | null;
  for_who: string;
  price: number;
  duration: number;
  phrase_hook: string;
  category: string;
  is_active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

const ServiceXS = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedSearchParams = await searchParams;
  let data: Service[] = [];

  // Construir query params dinámicamente
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    // Filtro por categoría
    if (resolvedSearchParams.category) {
      const categories = Array.isArray(resolvedSearchParams.category) 
        ? resolvedSearchParams.category 
        : [resolvedSearchParams.category];
      categories.forEach(cat => params.append('category', cat));
    }
    
    return params.toString();
  };

  const queryString = buildQueryParams();
  const apiUrl = `${BASE_URL}/xiomarasanchezterapeuta/servicesxs${queryString ? `?${queryString}` : ''}`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
    console.log(data, "data fetched servicesxs");
  } catch (error) {
    console.log("error getting services XS", error);
  }

  return (
    <div className="">
      {/* Hero Section  */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        {/* Fondo con video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/masaje_terapeutico_hover.webm"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        {/* Contenido del Hero - Más compacto */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 mb-4">
            <span className="text-white font-medium text-sm">
              ✨ Servicios Profesionales
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-2xl text-white">
            Bienestar, Equilibrio y{" "}
            <span className="text-purple-200 italic">Renovación</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 text-purple-100 max-w-2xl mx-auto">
            Descubre nuestros servicios especializados diseñados para tu
            bienestar integral.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+m%C3%A1s+informaci%C3%B3n+sobre+tus+servicios"
              target="_blank"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
            >
              💚 Reserva tu Cita
            </Link>
            <Link
              href="/xios-academy/student-portal"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold px-8 py-3 rounded-full border border-white/30 shadow-xl transition-all duration-300 hover:scale-105"
            >
              ⭐ ¡Quiero ser Terapeuta!
            </Link>
          </div>
        </div>
      </section>

      {/* Header Simple */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600">{data.length} servicios disponibles</p>
          </div>
        </div>
      </div>
      
      {/* Componente de Filtros */}
      <FilterServices services={data} />

      {/* Nota informativa mejorada */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-xl shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <span className="text-purple-600">ℹ️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-800 mb-2">
                Información Importante
              </h3>
              <p className="text-purple-700 leading-relaxed">
                El{" "}
                <span className="font-semibold bg-purple-200/50 px-2 py-1 rounded">
                  precio del servicio puede variar según la ubicación
                </span>{" "}
                dentro del Eje Cafetero. También realizamos sesiones en otras
                ciudades de Colombia, pero únicamente en
                <span className="font-semibold bg-purple-200/50 px-2 py-1 rounded ml-1">
                  fechas especiales de gira
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de servicios */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((service: Service) => (
              <div
                key={service.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-400 text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No hay servicios disponibles
            </h3>
            <p className="text-gray-500">Los servicios se cargarán pronto</p>
          </div>
        )}
      </div>

      {/* CTA Final compacto */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 py-12 mx-6 rounded-2xl mb-8">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Quieres que vayamos a tu ciudad?
          </h2>
          <p className="text-lg mb-6 text-purple-100 leading-relaxed">
            Organizamos giras especiales en diferentes ciudades de Colombia.
          </p>
          <Link
            href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola!+Quiero+que+visiten+mi+ciudad"
            target="_blank"
            className="inline-flex items-center space-x-3 bg-white hover:bg-purple-50 text-purple-600 font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>💚</span>
            <span>Escríbenos Ahora</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceXS;
