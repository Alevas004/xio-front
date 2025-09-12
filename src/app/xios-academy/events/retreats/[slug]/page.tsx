import axios from "axios";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiTag,
  FiCheck,
  FiDollarSign,
  FiAward,
  FiUser,
} from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { Check } from "lucide-react";
import NotFound from "@/components/xios-academy/not-found";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Retreat {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description_long: string;
  description_short: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  duration?: number;
  requirements?: string[];
  instructor?: string;
  location?: string;
  capacity?: number;
  enrolled?: number;
  price?: number;
  rating?: number;
  level?: string;
  category?: string;
  image?: string;
  images?: string[];
  tags?: string[];
  includes?: string[];
  certificate?: boolean;
  materials_included?: boolean;
  materials_description?: string[];
  speaker?: string;
  speakers?: string[];
  courses?: Course[];
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url?: string;
  images?: string[];
  category: string;
  tags?: string[];
  price: number;
  is_free: boolean;
  level: string;
  duration: number;
  certificate: boolean;
  instructor: string;
  includes?: string[];
  slug: string;
  belongsToAWorkshop: boolean;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await axios.get(`${BASE_URL}/xios-academy/events/${slug}`);
    const retreat: Retreat = res.data;

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const currentUrl = `${baseUrl}/xios-academy/events/retreats/${slug}`;
    const coursesCount = retreat.courses?.length || 0;

    return {
      title: `${retreat.title} | Retiro Transformacional XIOS Academy - ${retreat.subtitle}`,
      description: `🧘‍♀️ ${retreat.title} en XIOS Academy. ${
        retreat.description_short
      } ⭐ Incluye ${coursesCount} cursos especializados ⭐ Certificado de transformación ⭐ Facilitador: ${
        retreat.speakers?.[0] || retreat.speaker
      } ⭐ Duración: ${retreat.duration}h`,

      keywords: [
        retreat.title.toLowerCase(),
        retreat.subtitle?.toLowerCase(),
        `retiro ${retreat.title.toLowerCase()}`,
        `retiro transformacional`,
        retreat.level || "principiante",
        retreat.location?.toLowerCase(),
        "retiro certificado",
        "xios academy",
        "transformacion personal",
        "bienestar integral",
        ...(retreat.tags || []),
      ]
        .filter(Boolean)
        .join(", "),

      authors: [
        { name: retreat.speakers?.[0] || retreat.speaker || "XIOS Academy" },
      ],
      creator: "XIOS Academy",
      publisher: "XIOS Academy",

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

      openGraph: {
        type: "article",
        locale: "es_ES",
        url: currentUrl,
        siteName: "XIOS Academy",
        title: `${retreat.title} | Retiro Transformacional con ${coursesCount} Cursos Incluidos`,
        description: `${retreat.description_short} Certificado de transformación con ${retreat.duration}h de experiencia inmersiva.`,
        images: [
          ...(retreat.image
            ? [
                {
                  url: retreat.image,
                  width: 1200,
                  height: 630,
                  alt: `${retreat.title} - Retiro XIOS Academy`,
                  type: "image/jpeg",
                },
              ]
            : []),
          ...(retreat.images
            ? retreat.images.slice(0, 2).map((img) => ({
                url: img,
                width: 800,
                height: 600,
                alt: `${retreat.title} - Galería`,
                type: "image/jpeg",
              }))
            : []),
        ],
        publishedTime: retreat.start_date,
        modifiedTime: retreat.start_date,
        section: "Educación",
        tags: retreat.tags,
      },

      twitter: {
        card: "summary_large_image",
        title: `${retreat.title} | Retiro Transformacional XIOS Academy`,
        description: `${coursesCount} cursos incluidos | ${retreat.duration}h | Certificado de transformación`,
        images: retreat.image ? [retreat.image] : [],
        creator: "@xiosacademy",
        site: "@xiosacademy",
      },

      alternates: {
        canonical: currentUrl,
        languages: {
          "es-ES": currentUrl,
          es: currentUrl,
        },
      },

      other: {
        "theme-color": "#10B981",
        "color-scheme": "light",
        "twitter:label1": "Duración",
        "twitter:data1": `${retreat.duration} horas`,
        "twitter:label2": "Cursos Incluidos",
        "twitter:data2": coursesCount.toString(),
        "article:author":
          retreat.speakers?.[0] || retreat.speaker || "XIOS Academy",
        "article:section": "Retiros",
        "article:published_time": retreat.start_date,
        "og:region": "CO",
        "og:country-name": "Colombia",
        "geo.region": "CO",
        "geo.placename": retreat.location || "Colombia",
      },
    };
  } catch {
    return {
      title: "Retiro no encontrado | XIOS Academy",
      description: "El retiro que buscas no está disponible en XIOS Academy",
    };
  }
}

const RetreatDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  let retreat: Retreat | null = null;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/events/${slug}`);
    retreat = res.data;
  } catch (error) {
    console.error("Error loading retreat:", error);
    return <NotFound />;
  }

  if (!retreat) {
    return <NotFound />;
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelText = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return level;
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "EducationEvent",
              name: retreat.title,
              description: retreat.description_long,
              startDate: `${retreat.start_date}T${
                retreat.start_time || "09:00:00"
              }`,
              endDate: `${retreat.end_date}T${retreat.end_time || "18:00:00"}`,
              location: {
                "@type": "Place",
                name: retreat.location || "XIOS Academy",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "CO",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "XIOS Academy",
                url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/xios-academy`,
              },
              instructor: {
                "@type": "Person",
                name:
                  retreat.speakers?.[0] || retreat.speaker || "XIOS Academy",
              },
              offers: {
                "@type": "Offer",
                price: retreat.price || "0",
                priceCurrency: "COP",
                availability: "https://schema.org/InStock",
              },
              image: retreat.image,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
            },
            null,
            2
          ),
        }}
      />
      <div className="min-h-screen bg-gradient-1">
        {/* Enhanced Hero Section */}
        <div className="relative">
          <div className="h-[70vh] bg-gradient-1 relative overflow-hidden">
            {retreat.image && (
              <>
                <Image
                  src={retreat.image}
                  alt={retreat.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black-40"></div>
              </>
            )}

            <div className="relative px-4 h-full flex justify-center items-center">
              <div className="text-white max-w-4xl text-center">
                <Link
                  href="/xios-academy/events/retreats"
                  className="inline-flex items-center text-white hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Volver a retiros
                </Link>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    <FiTag className="w-4 h-4 mr-2" />
                    Retiro Transformacional
                  </span>

                  {retreat.level && (
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(
                        retreat.level
                      )}`}
                    >
                      Nivel: {getLevelText(retreat.level)}
                    </span>
                  )}

                  {retreat.courses && retreat.courses.length > 0 && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 backdrop-blur-sm text-white border border-purple-400/30">
                      <FiAward className="w-4 h-4 mr-2" />
                      {retreat.courses.length} Cursos Incluidos
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
                    {retreat.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-3xl ">
                    {retreat.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-5 h-5" />
                    <span className="text-lg">
                      {formatDate(retreat.start_date)} -{" "}
                      {formatDate(retreat.end_date)}
                    </span>
                  </div>

                  {retreat.duration && (
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-5 h-5" />
                      <span className="text-lg">{retreat.duration} horas</span>
                    </div>
                  )}

                  {retreat.location && (
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-5 h-5" />
                      <span className="text-lg">{retreat.location}</span>
                    </div>
                  )}

                  {retreat.capacity && retreat.enrolled !== undefined && (
                    <div className="flex items-center space-x-2">
                      <FiUsers className="w-5 h-5" />
                      <span className="text-lg">
                        {retreat.enrolled}/{retreat.capacity} participantes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Acerca del Retiro
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {retreat.description_long}
                </p>
              </div>

              {/* What's Included */}
              {retreat.includes && retreat.includes.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Check className="w-6 h-6 text-green-600 mr-3" />
                    Lo que incluye este retiro
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {retreat.includes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                      >
                        <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {retreat.requirements && retreat.requirements.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Requisitos para Participar
                  </h3>
                  <ul className="space-y-3">
                    {retreat.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials */}
              {retreat.materials_description &&
                retreat.materials_description.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Material de Apoyo
                    </h3>
                    <div className="space-y-3">
                      {retreat.materials_description.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg"
                        >
                          <FiCheck className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Courses Included */}
              {retreat.courses && retreat.courses.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiAward className="w-6 h-6 text-yellow-500 mr-3" />
                    Cursos Incluidos ({retreat.courses.length})
                  </h3>
                  <div className="grid gap-6">
                    {retreat.courses.map((course) => (
                      <div
                        key={course.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                              {course.title}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {course.subtitle}
                            </p>
                            <p className="text-sm text-gray-500">
                              {course.description_short}
                            </p>
                          </div>
                          <div className="ml-4 text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {course.duration}h
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FiUser className="w-4 h-4 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <FiTag className="w-4 h-4 mr-1" />
                              {course.level}
                            </span>
                          </div>
                          {course.certificate && (
                            <span className="flex items-center text-sm text-yellow-600">
                              <FiAward className="w-4 h-4 mr-1" />
                              Certificado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Event Details Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Detalles del Retiro
                </h3>

                <div className="space-y-6">
                  {/* Price */}
                  {retreat.price && (
                    <div className="text-center py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                      <div className="flex items-center justify-center space-x-2">
                        <FiDollarSign className="w-8 h-8 text-purple-600" />
                        <span className="text-2xl font-black text-gray-900">
                          {formatPrice(retreat.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">Por participante</p>
                    </div>
                  )}

                  {/* Event Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FiCalendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fechas</p>
                        <p className="font-semibold text-gray-900 text-start">
                          Del {formatDate(retreat.start_date)}
                        </p>
                        <p className="font-semibold text-gray-900 text-start">
                          al {formatDate(retreat.end_date)}
                        </p>
                      </div>
                    </div>

                    {retreat.duration && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <FiClock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Duración Total
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {retreat.duration} horas de transformación
                          </p>
                        </div>
                      </div>
                    )}

                    {retreat.location && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <FiMapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">Ubicación</p>
                          <p className="font-semibold text-gray-900 text-start">
                            {retreat.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {(retreat.speakers || retreat.speaker) && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">Facilitador</p>
                          <p className="font-semibold text-gray-900 text-start">
                            {retreat.speakers?.[0] || retreat.speaker}
                          </p>
                        </div>
                      </div>
                    )}

                    {retreat.capacity && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                          <FiUsers className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Disponibilidad
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {retreat.enrolled || 0} / {retreat.capacity}{" "}
                            participantes
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate Badge */}
                  {retreat.certificate && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <FiAward className="w-6 h-6 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-yellow-800">
                            Certificado de transformación
                          </p>
                          <p className="text-sm text-yellow-700">
                            Recibe tu certificado al completar el retiro
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-6">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Reservar Retiro
                    </button>
                   <Link
                      href={`https://wa.me/573135058584?text=¡Hola!%20Quiero%20más%20información%20sobre%20el%20retiro%20${retreat.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        Más Información
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {retreat.tags && retreat.tags.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Temas de Transformación
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {retreat.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetreatDetailPage;
