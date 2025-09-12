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
  FiTarget,
  FiBriefcase,
} from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { Check } from "lucide-react";
import NotFound from "@/components/xios-academy/not-found";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Training {
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
  objectives?: string[];
  target_audience?: string[];
  company_benefits?: string[];
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
    const training: Training = res.data;

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const currentUrl = `${baseUrl}/xios-academy/events/corporate-training/${slug}`;
    const coursesCount = training.courses?.length || 0;

    return {
      title: `${training.title} | Capacitación Empresarial XIOS Academy - ${training.subtitle}`,
      description: `💼 ${training.title} para empresas en XIOS Academy. ${
        training.description_short
      } ⭐ Incluye ${coursesCount} módulos especializados ⭐ Certificación corporativa ⭐ Consultor: ${
        training.speakers?.[0] || training.speaker
      } ⭐ Duración: ${training.duration}h`,

      keywords: [
        training.title.toLowerCase(),
        training.subtitle?.toLowerCase(),
        `capacitacion empresarial ${training.title.toLowerCase()}`,
        `training corporativo`,
        training.level || "ejecutivo",
        training.location?.toLowerCase(),
        "capacitacion certificada",
        "xios academy",
        "desarrollo organizacional",
        "formacion empresarial",
        "bienestar corporativo",
        ...(training.tags || []),
      ]
        .filter(Boolean)
        .join(", "),

      authors: [
        { name: training.speakers?.[0] || training.speaker || "XIOS Academy" },
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
        title: `${training.title} | Capacitación Empresarial con ${coursesCount} Módulos Incluidos`,
        description: `${training.description_short} Certificación corporativa con ${training.duration}h de formación especializada para empresas.`,
        images: [
          ...(training.image
            ? [
                {
                  url: training.image,
                  width: 1200,
                  height: 630,
                  alt: `${training.title} - Capacitación Empresarial XIOS Academy`,
                  type: "image/jpeg",
                },
              ]
            : []),
          ...(training.images
            ? training.images.slice(0, 2).map((img) => ({
                url: img,
                width: 800,
                height: 600,
                alt: `${training.title} - Galería`,
                type: "image/jpeg",
              }))
            : []),
        ],
        publishedTime: training.start_date,
        modifiedTime: training.start_date,
        section: "Educación",
        tags: training.tags,
      },

      twitter: {
        card: "summary_large_image",
        title: `${training.title} | Capacitación Empresarial XIOS Academy`,
        description: `${coursesCount} módulos incluidos | ${training.duration}h | Certificación corporativa`,
        images: training.image ? [training.image] : [],
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
        "theme-color": "#0EA5E9",
        "color-scheme": "light",
        "twitter:label1": "Duración",
        "twitter:data1": `${training.duration} horas`,
        "twitter:label2": "Módulos Incluidos",
        "twitter:data2": coursesCount.toString(),
        "article:author":
          training.speakers?.[0] || training.speaker || "XIOS Academy",
        "article:section": "Capacitaciones",
        "article:published_time": training.start_date,
        "og:region": "CO",
        "og:country-name": "Colombia",
        "geo.region": "CO",
        "geo.placename": training.location || "Colombia",
      },
    };
  } catch {
    return {
      title: "Capacitación no encontrada | XIOS Academy",
      description:
        "La capacitación empresarial que buscas no está disponible en XIOS Academy",
    };
  }
}

const TrainingDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  let training: Training | null = null;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/events/${slug}`);
    training = res.data;
  } catch (error) {
    console.error("Error loading training:", error);
    return <NotFound />;
  }

  if (!training) {
    return <NotFound />;
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
      case "ejecutivo":
        return "bg-blue-100 text-blue-800";
      case "intermediate":
      case "gerencial":
        return "bg-indigo-100 text-indigo-800";
      case "advanced":
      case "directivo":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelText = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "Ejecutivo";
      case "intermediate":
        return "Gerencial";
      case "advanced":
        return "Directivo";
      case "ejecutivo":
        return "Ejecutivo";
      case "gerencial":
        return "Gerencial";
      case "directivo":
        return "Directivo";
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
              name: training.title,
              description: training.description_long,
              startDate: `${training.start_date}T${
                training.start_time || "09:00:00"
              }`,
              endDate: `${training.end_date}T${
                training.end_time || "18:00:00"
              }`,
              location: {
                "@type": "Place",
                name: training.location || "XIOS Academy",
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
                  training.speakers?.[0] || training.speaker || "XIOS Academy",
              },
              offers: {
                "@type": "Offer",
                price: training.price || "0",
                priceCurrency: "COP",
                availability: "https://schema.org/InStock",
              },
              image: training.image,
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
            {training.image && (
              <>
                <Image
                  src={training.image}
                  alt={training.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
              </>
            )}

            <div className="relative px-4 h-full flex justify-center items-center">
              <div className="text-white max-w-4xl text-center">
                <Link
                  href="/xios-academy/events/corporate-training"
                  className="inline-flex items-center text-white hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Volver a capacitaciones
                </Link>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    <FiBriefcase className="w-4 h-4 mr-2" />
                    Capacitación Empresarial
                  </span>

                  {training.level && (
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(
                        training.level
                      )}`}
                    >
                      Nivel: {getLevelText(training.level)}
                    </span>
                  )}

                  {training.courses && training.courses.length > 0 && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 backdrop-blur-sm text-white border border-blue-400/30">
                      <FiAward className="w-4 h-4 mr-2" />
                      {training.courses.length} Módulos Incluidos
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
                    {training.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-3xl mx-auto">
                    {training.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-5 h-5" />
                    <span className="text-lg">
                      {formatDate(training.start_date)}
                    </span>
                  </div>

                  {training.duration && (
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-5 h-5" />
                      <span className="text-lg">{training.duration} horas</span>
                    </div>
                  )}

                  {training.location && (
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-5 h-5" />
                      <span className="text-lg">{training.location}</span>
                    </div>
                  )}

                  {training.capacity && training.enrolled !== undefined && (
                    <div className="flex items-center space-x-2">
                      <FiUsers className="w-5 h-5" />
                      <span className="text-lg">
                        {training.enrolled}/{training.capacity} empleados
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
                  Acerca de la Capacitación
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {training.description_long}
                </p>
              </div>

              {/* Company Benefits */}
              {training.company_benefits &&
                training.company_benefits.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiTarget className="w-6 h-6 text-blue-600 mr-3" />
                      Beneficios para su empresa
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {training.company_benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                        >
                          <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* What's Included */}
              {training.includes && training.includes.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Check className="w-6 h-6 text-green-600 mr-3" />
                    Lo que incluye esta capacitación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {training.includes.map((item, index) => (
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

              {/* Objectives */}
              {training.objectives && training.objectives.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Objetivos de Aprendizaje
                  </h3>
                  <ul className="space-y-3">
                    {training.objectives.map((obj, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Target Audience */}
              {training.target_audience &&
                training.target_audience.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Dirigido a
                    </h3>
                    <ul className="space-y-3">
                      {training.target_audience.map((audience, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-3 text-gray-700"
                        >
                          <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></div>
                          <span>{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Materials */}
              {training.materials_description &&
                training.materials_description.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Material Corporativo
                    </h3>
                    <div className="space-y-3">
                      {training.materials_description.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                        >
                          <FiCheck className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Modules Included */}
              {training.courses && training.courses.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiAward className="w-6 h-6 text-yellow-500 mr-3" />
                    Módulos Incluidos ({training.courses.length})
                  </h3>
                  <div className="grid gap-6">
                    {training.courses.map((course) => (
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
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                  Detalles de la Capacitación
                </h3>

                <div className="space-y-6">
                  {/* Price */}
                  {training.price && (
                    <div className="text-center py-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <div className="flex items-center justify-center space-x-2">
                        <FiDollarSign className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl font-black text-gray-900">
                          {formatPrice(training.price)}
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        Descuentos por volumen disponibles
                      </p>
                    </div>
                  )}

                  {/* Event Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FiCalendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 text-start">
                          Fecha
                        </p>
                        <p className="font-semibold text-gray-900 text-start">
                          {formatDate(training.start_date)}
                        </p>
                      </div>
                    </div>

                    {training.duration && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                          <FiClock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Duración
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {training.duration} horas de capacitación
                          </p>
                        </div>
                      </div>
                    )}

                    {training.location && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <FiMapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Modalidad
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {training.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {(training.speakers || training.speaker) && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Consultor
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {training.speakers?.[0] || training.speaker}
                          </p>
                        </div>
                      </div>
                    )}

                    {training.capacity && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <FiUsers className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-start">
                            Capacidad
                          </p>
                          <p className="font-semibold text-gray-900 text-start">
                            {training.enrolled || 0} / {training.capacity}{" "}
                            empleados
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate Badge */}
                  {training.certificate && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <FiAward className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">
                            Certificación corporativa
                          </p>
                          <p className="text-sm text-blue-700">
                            Certificados para todos los participantes
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-6">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Solicitar Cotización
                    </button>
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                      Agendar Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {training.tags && training.tags.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Competencias Desarrolladas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {training.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
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

export default TrainingDetailPage;
