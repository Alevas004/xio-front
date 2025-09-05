import React from "react";
import { Service } from "../page";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  Heart,
  ArrowLeft,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  Target,
  MapPin,
  Award,
  Zap,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { formatDateInYears } from "@/utils/formatDateInYears";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Configuración de caché dinámico según el entorno
const isDevelopment = process.env.NODE_ENV === "development";
const cacheConfig = isDevelopment
  ? { cache: "no-store" as const }
  : { cache: "force-cache" as const, next: { revalidate: 300 } }; // 5 minutos en producción

interface ServiceDetailsProps {
  params: {
    slug: string;
  };
}

// Generar metadata dinámico para SEO INCREÍBLE
export async function generateMetadata({
  params,
}: ServiceDetailsProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${BASE_URL}/xiomarasanchezterapeuta/servicesxs/${slug}`,
      cacheConfig
    );

    if (!res.ok) {
      return {
        title: "Servicio no encontrado - Xiomara Sánchez Terapeuta",
      };
    }

    const service: Service = await res.json();

    if (!service) {
      return {
        title: "Servicio no encontrado - Xiomara Sánchez Terapeuta",
        description: "El servicio que buscas no está disponible.",
      };
    }

    const benefits = (service.benefits ?? []).map((b) => b.trim()).join(", ");

    return {
      title: `${service.title} - ${service.sub_title} | Xiomara Sánchez Terapeuta Profesional`,
      description: `${service.description_short} ${
        service.detailed_description
      } Beneficios: ${benefits}. Duración: ${
        service.duration
      } minutos. Precio: $${service.price.toLocaleString()}. Reserva tu cita de ${service.category.toLowerCase()} en Bogotá.`,
      keywords: [
        service.title.toLowerCase(),
        service.sub_title.toLowerCase(),
        service.category.toLowerCase(),
        "masaje",
        "terapia",
        "relajación",
        "bienestar",
        "Xiomara Sánchez",
        "terapeuta profesional",
        "Bogotá",
        "Colombia",
        "masaje terapéutico",
        "reflexología",
        "aromaterapia",
        "masaje relajante",
        "terapia alternativa",
        "medicina holística",
        ...(service.benefits || []).map((b) => b.toLowerCase()),
      ],
      authors: [{ name: "Xiomara Sánchez - Terapeuta Profesional" }],
      creator: "Xiomara Sánchez",
      publisher: "Xiomara Sánchez Terapeuta",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      openGraph: {
        title: `${service.title} - Terapia Profesional con Xiomara Sánchez`,
        description: `${
          service.description_short
        } Experimenta los beneficios de ${service.title.toLowerCase()} con una terapeuta certificada. ${
          service.duration
        } minutos de pura relajación y bienestar.`,
        url: `https://tudominio.com/xiomarasanchezterapeuta/services-xs/${slug}`,
        siteName: "Xiomara Sánchez Terapeuta",
        images: [
          {
            url: service.image,
            width: 1200,
            height: 630,
            alt: `${service.title} - ${service.sub_title} por Xiomara Sánchez`,
          },
        ],
        locale: "es_CO",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} - Xiomara Sánchez Terapeuta`,
        description: `${
          service.description_short
        } Reserva tu sesión de ${service.title.toLowerCase()} ahora.`,
        images: [service.image],
        creator: "@XiomaraSanchezTerapeuta",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `https://tudominio.com/xiomarasanchezterapeuta/services-xs/${slug}`,
      },
    };
  } catch {
    return {
      title: "Servicio no encontrado - Xiomara Sánchez Terapeuta",
      description: "El servicio que buscas no está disponible.",
    };
  }
}

const ServiceDetails = async ({ params }: ServiceDetailsProps) => {
  const { slug } = await params;

  let service: Service | null = null;

  try {
    const res = await fetch(
      `${BASE_URL}/xiomarasanchezterapeuta/servicesxs/${slug}`,
      cacheConfig
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data.title && data.slug) {
        service = data;
        console.log("Service loaded successfully:", service);
      }
    }
  } catch {
    console.error("Error fetching service details");
  }

  // Si no hay servicio, mostrar página de no encontrado
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Servicio no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El servicio que buscas no está disponible.
          </p>
          <Link
            href="/xiomarasanchezterapeuta/services-xs"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    );
  }

  const benefits = service.benefits || [
    "Relajación profunda",
    "Reducción del estrés",
    "Mejora del bienestar",
  ];
  const allImages = service.images
    ? [service.image, ...service.images]
    : [service.image];
  const validImages = allImages.filter(
    (img) =>
      img &&
      (img.startsWith("http://") ||
        img.startsWith("https://") ||
        img.startsWith("/"))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 md:pt-5">
      {/* JSON-LD Schema para SEO INCREÍBLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Service", "HealthAndBeautyBusiness"],
            name: service.title,
            description: service.detailed_description,
            serviceType: service.category,
            duration: `PT${service.duration}M`,
            provider: {
              "@type": "Person",
              name: `${service.user?.first_name || "Xiomara"} ${
                service.user?.last_name || "Sánchez"
              }`,
              jobTitle: "Terapeuta Profesional Certificada",
              url: "https://tudominio.com/xiomarasanchezterapeuta",
              telephone: service.user?.phone || "+573135058584",
              email: service.user?.email,
              image: service.user?.profile_picture,
              address: {
                "@type": "PostalAddress",
                addressLocality: service.user?.city || "Armenia",
                addressRegion: "Quindío",
                addressCountry: "CO",
              },
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "Certificación Profesional",
                  name: "Terapeuta en Masajes y Medicina Alternativa",
                },
              ],
            },
            offers: {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "COP",
              availability: "https://schema.org/InStock",
              validFrom: new Date().toISOString(),
              priceValidUntil: new Date(
                Date.now() + 365 * 24 * 60 * 60 * 1000
              ).toISOString(),
              itemCondition: "https://schema.org/NewCondition",
            },
            image: service.image,
            url: `https://tudominio.com/xiomarasanchezterapeuta/services-xs/${service.slug}`,
            areaServed: [
              {
                "@type": "City",
                name: "Armenia",
                containedInPlace: {
                  "@type": "State",
                  name: "Quindío",
                },
              },
              {
                "@type": "City",
                name: "Pereira",
                containedInPlace: {
                  "@type": "State",
                  name: "Risaralda",
                },
              },
              {
                "@type": "City",
                name: "Manizales",
                containedInPlace: {
                  "@type": "State",
                  name: "Caldas",
                },
              },
              {
                "@type": "City",
                name: "Medellín",
                containedInPlace: {
                  "@type": "State",
                  name: "Antioquia",
                },
              },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Servicios de Terapia y Bienestar",
              itemListElement: service.benefits?.map((benefit, index) => ({
                "@type": "Offer",
                name: benefit,
                position: index + 1,
              })),
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "50+",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                },
                author: {
                  "@type": "Person",
                  name: "Cliente Satisfecho",
                },
                reviewBody: `Excelente experiencia con ${service.title}. Recomiendo totalmente a Xiomara por su profesionalismo.`,
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://tudominio.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Xiomara Sánchez Terapeuta",
                item: "https://tudominio.com/xiomarasanchezterapeuta",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Servicios de Terapia",
                item: "https://tudominio.com/xiomarasanchezterapeuta/services-xs",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: service.title,
                item: `https://tudominio.com/xiomarasanchezterapeuta/services-xs/${service.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Header Navigation */}
      <div className="fixed bottom-25 right-5 z-10">
       
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={`https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${service.title}`}
                target="_blank"
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </Link>
            </div>
          </div>
        
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb SEO */}
          <nav className="mb-8">
            <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-purple-600">
                  Inicio
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link
                  href="/xiomarasanchezterapeuta"
                  className="hover:text-purple-600"
                >
                  Xiomara Sánchez
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link
                  href="/xiomarasanchezterapeuta/services-xs"
                  className="hover:text-purple-600"
                >
                  Servicios
                </Link>
              </li>
              <li>→</li>
              <li className="text-purple-600 font-medium">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Images */}
            <div className="space-y-6">
              {/* Main Image/Video */}
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                {service.image && service.image.endsWith(".mp4") ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={service.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={service.image}
                    alt={`${service.title} - ${service.sub_title} por Xiomara Sánchez Terapeuta`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                )}

                {/* Overlay con info rápida */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-lg font-semibold drop-shadow-lg">
                      {service.phrase_hook}
                    </p>
                  </div>
                </div>

                {/* Badges flotantes */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Profesional</span>
                  </div>
                  <div className="bg-green-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="bg-purple-500/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span>{service.category}</span>
                  </div>
                </div>
              </div>

              {/* Gallery adicional si hay más imágenes */}
              {validImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {validImages.slice(1, 4).map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                    >
                      {img.endsWith(".mp4") ? (
                        <video
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={img}
                          muted
                          loop
                        />
                      ) : (
                        <Image
                          src={img}
                          alt={`${service.title} - Vista ${index + 2}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {service.title}
                  </h1>
                  <h2 className="text-2xl text-purple-600 font-semibold">
                    {service.sub_title}
                  </h2>
                </div>

                {/* Hook phrase destacado */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 p-6 rounded-r-xl">
                  <p className="text-xl text-gray-800 font-medium italic">
                    &ldquo;{service.phrase_hook}&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Precio */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center group hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-green-100 rounded-full group-hover:scale-110 transition-transform">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 font-medium mb-1">
                    Inversión
                  </p>
                  <p className="text-lg font-bold text-green-800">
                    Según la ubicación y el servicio
                  </p>
                </div>

                {/* Duración */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center group hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:scale-110 transition-transform">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Duración
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {service.duration} min
                  </p>
                </div>
              </div>

              {/* Descripción principal */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  ¿Qué es este servicio?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description_short}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {service.detailed_description}
                </p>
              </div>

              {/* CTA Principal */}
              <div className="space-y-4">
                <Link
                  href={`https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${service.title}`}
                  target="_blank"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-3 group"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-lg">Reservar {service.title}</span>
                  <Zap className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Respuesta inmediata</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Agenda flexible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Target Audience */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    ¿Este servicio es para ti?
                  </h3>
                  <p className="text-purple-700 text-lg leading-relaxed mb-6">
                    {service.for_who}
                  </p>

                  {/* Ideal para lista */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-800">
                      Perfecto si sientes:
                    </h4>
                    <ul className="space-y-1">
                      {[
                        "Estrés acumulado",
                        "Tensión muscular",
                        "Necesidad de relajación",
                        "Buscar bienestar integral",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                          <span className="text-purple-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">
                    Beneficios comprobados
                  </h3>
                  <p className="text-green-700 mb-6">
                    Estos son los beneficios que experimentarás con{" "}
                    <span className="font-semibold">
                      {service?.title?.toLowerCase() || "este servicio"}
                    </span>
                    :
                  </p>

                  <ul className="space-y-1">
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 group"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          {benefit.charAt(0).toUpperCase() +
                            benefit.slice(1).toLowerCase()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona tu sesión?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tu experiencia de{" "}
              <span className="font-semibold">
                {service.title.toLowerCase()}
              </span>{" "}
              paso a paso con Xiomara Sánchez
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group border-1 border-purple-200 rounded-2xl p-5">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Calendar className="h-10 w-10 text-purple-600" />
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reserva tu cita
              </h3>
              <p className="text-gray-600">
                Contacta por WhatsApp y agenda tu sesión en el horario que mejor
                te convenga
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group border-1 border-blue-200 rounded-2xl p-5">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Target className="h-10 w-10 text-purple-600" />
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Evaluación personalizada
              </h3>
              <p className="text-gray-600">
                Xiomara evalúa tus necesidades específicas para personalizar tu
                tratamiento
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group border-1 border-green-200 rounded-2xl p-5">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Heart className="h-10 w-10 text-green-600" />
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Disfruta tu sesión
              </h3>
              <p className="text-gray-600">
                Relájate y disfruta {service.duration} minutos de puro bienestar
                y relajación
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Therapist Section */}
      {service.user.isProfessional && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Tu terapeuta profesional
                    </h2>
                  </div>

                  <h3 className="text-2xl font-semibold text-purple-600 italic">
                    {service.user?.first_name} {service.user?.last_name}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.user?.bio ||
                      "Terapeuta certificada con más de 5 años de experiencia en masajes y terapias alternativas, dedicada a mejorar tu bienestar integral."}
                    {/* TODO: Agregar campos al backend para: years_experience, certifications, specialties */}
                  </p>

                  {service.user?.city && service.user?.country && (
                    <div className="flex items-center justify-center space-x-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      <span>
                        {service.user.city}, {service.user.country}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {service.user?.clients_count || 500}+
                    </div>
                    <div className="text-sm text-purple-700">
                      Clientes satisfechos
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">5★</div>
                    <div className="text-sm text-green-700">
                      Calificación promedio
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3>Certificaciones y especializaciones</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-wrap gap-3">
                      {service.user?.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-gray-700 rounded-full text-sm font-medium text-start"
                        >
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {service.user?.specialties.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-gray-700 rounded-full text-sm font-medium text-start"
                        >
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5">
                <div className="relative">
                  {service.user?.profile_picture ? (
                    <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src={service.user.profile_picture}
                        alt={`${service.user.first_name} ${service.user.last_name} - Terapeuta Profesional`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay con info */}
                      <div className="absolute rounded-b-3xl inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <p className="font-semibold text-lg text-white">
                            {service.user.first_name} {service.user.last_name}
                          </p>
                          <p className="text-sm text-white">
                            Terapeuta Profesional
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl font-bold text-purple-600">
                            {service.user?.first_name?.charAt(0)}
                            {service.user?.last_name?.charAt(0)}
                          </span>
                        </div>
                        <p className="text-purple-600 font-semibold text-lg">
                          {service.user?.first_name} {service.user?.last_name}
                        </p>
                        <p className="text-purple-500 text-sm">
                          Terapeuta Profesional
                        </p>
                        <div className="mt-4 p-2 bg-purple-100 rounded-lg">
                          <Award className="h-8 w-8 text-purple-400 mx-auto" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-600 font-medium">
                        Email:
                      </span>
                      <p className="text-gray-700">{service.user?.email}</p>
                    </div>
                    {service.user?.isProfessional && (
                      <div>
                        <span className="text-purple-600 font-medium">
                          Profesional certificada:
                        </span>
                        <p className="text-gray-700">
                          {service.user?.isProfessional ? "✓ Sí" : "✗ No"}
                        </p>
                      </div>
                    )}
                    {service.user?.date_of_birth && (
                      <div>
                        <span className="text-purple-600 font-medium">
                          Experiencia desde:
                        </span>
                        <p className="text-gray-700">
                          {formatDate(service.user.years_experience)} <br />
                          <span className="text-purple-500 ">
                            {" "}
                            + {formatDateInYears(
                              service.user.years_experience
                            )}{" "}
                            de experiencia.
                          </span>
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-purple-600 font-medium">
                        Cuenta Verificada:
                      </span>
                      <p className="text-gray-700">
                        {service.user?.email_verified
                          ? "✓ Profesional verificada"
                          : "En proceso"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white space-y-8">
            <div className="space-y-4 flex flex-col items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                ¿Listo para experimentar {service.title}?
              </h2>
              <p className="text-xl max-w-3xl mx-auto text-white">
                Reserva tu sesión ahora y comienza tu viaje hacia el bienestar
                total. <br />
                {service.duration} minutos que cambiarán tu día.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link
                href={`https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${service.title}`}
                target="_blank"
                className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 group shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
                <span>Reservar por WhatsApp</span>
                <Zap className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-purple-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Agenda flexible</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Armenia, Medellin, Pereira, Manizalez</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-white">
                <div className="text-center">
                  <div className="text-lg font-bold">
                    Según la ubicación y el servicio
                  </div>
                  <div className="text-purple-200 text-sm">Inversión</div>
                </div>
                <div className="w-px h-12 bg-purple-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {service.duration} min
                  </div>
                  <div className="text-purple-200 text-sm">Duración</div>
                </div>
                <div className="w-px h-12 bg-purple-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">★ 5.0</div>
                  <div className="text-purple-200 text-sm">Calificación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        {/* FAQ Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `¿Qué incluye la sesión de ${service.title}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Tu sesión de ${service.title} incluye una evaluación inicial, ${service.duration} minutos de tratamiento personalizado y recomendaciones para continuar tu bienestar en casa.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Necesito experiencia previa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No necesitas ninguna experiencia previa. Xiomara te guiará durante toda la sesión y adaptará las técnicas a tu nivel de comodidad.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Qué debo tener para mi sesión?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Solo necesitas tener ropa cómoda. Todos los materiales y elementos necesarios están incluidos en el servicio.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo reservo mi cita?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Puedes reservar fácilmente por WhatsApp haciendo clic en el botón de arriba. Te responderemos inmediatamente para confirmar tu horario.",
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-600">
              Todo lo que necesitas saber sobre {service.title}
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: `¿Qué incluye la sesión de ${service.title}?`,
                a: `Tu sesión de ${service.title} incluye una evaluación inicial, ${service.duration} minutos de tratamiento personalizado y recomendaciones para continuar tu bienestar en casa.`,
              },
              {
                q: "¿Necesito experiencia previa?",
                a: "No necesitas ninguna experiencia previa. Xiomara te guiará durante toda la sesión y adaptará las técnicas a tu nivel de comodidad.",
              },
              {
                q: "¿Qué debo tener para mi sesión?",
                a: "Solo necesitas tener ropa cómoda. Todos los materiales y elementos necesarios están incluidos en el servicio.",
              },
              {
                q: "¿Cómo reservo mi cita?",
                a: "Puedes reservar fácilmente por WhatsApp haciendo clic en el botón de arriba. Te responderemos inmediatamente para confirmar tu horario.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
