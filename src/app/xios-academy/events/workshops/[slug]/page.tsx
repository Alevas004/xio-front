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
  FiPlay,
  FiUser,
  FiStar,
} from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { Check } from "lucide-react";
import NotFound from "@/components/xios-academy/not-found";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Workshop {
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
    const workshop: Workshop = res.data;

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const currentUrl = `${baseUrl}/xios-academy/events/workshops/${slug}`;
    const coursesCount = workshop.courses?.length || 0;

    return {
      title: `${workshop.title} | Taller Certificado XIOS Academy - ${workshop.subtitle}`,
      description: `🎯 ${workshop.title} en XIOS Academy. ${
        workshop.description_short
      } ⭐ Incluye ${coursesCount} cursos especializados ⭐ Certificado profesional ⭐ Instructor: ${
        workshop.speakers?.[0] || workshop.speaker
      } ⭐ Duración: ${workshop.duration}h`,

      keywords: [
        workshop.title.toLowerCase(),
        workshop.subtitle?.toLowerCase(),
        `taller ${workshop.title.toLowerCase()}`,
        `curso ${workshop.title.toLowerCase()}`,
        workshop.level || "principiante",
        workshop.location?.toLowerCase(),
        "taller certificado",
        "xios academy",
        "formacion profesional",
        ...(workshop.tags || []),
      ]
        .filter(Boolean)
        .join(", "),

      authors: [
        { name: workshop.speakers?.[0] || workshop.speaker || "XIOS Academy" },
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
        title: `${workshop.title} | Taller Certificado con ${coursesCount} Cursos Incluidos`,
        description: `${workshop.description_short} Certificado profesional con ${workshop.duration}h de formación práctica.`,
        images: [
          ...(workshop.image
            ? [
                {
                  url: workshop.image,
                  width: 1200,
                  height: 630,
                  alt: `${workshop.title} - Taller XIOS Academy`,
                  type: "image/jpeg",
                },
              ]
            : []),
          ...(workshop.images
            ? workshop.images.slice(0, 2).map((img) => ({
                url: img,
                width: 800,
                height: 600,
                alt: `${workshop.title} - Galería`,
                type: "image/jpeg",
              }))
            : []),
        ],
        publishedTime: workshop.start_date,
        modifiedTime: workshop.start_date,
        section: "Educación",
        tags: workshop.tags,
      },

      twitter: {
        card: "summary_large_image",
        title: `${workshop.title} | Taller Certificado XIOS Academy`,
        description: `${coursesCount} cursos incluidos | ${workshop.duration}h | Certificado profesional`,
        images: workshop.image ? [workshop.image] : [],
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
        "twitter:data1": `${workshop.duration} horas`,
        "twitter:label2": "Cursos Incluidos",
        "twitter:data2": coursesCount.toString(),
        "article:author":
          workshop.speakers?.[0] || workshop.speaker || "XIOS Academy",
        "article:section": "Talleres",
        "article:published_time": workshop.start_date,
        "og:region": "CO",
        "og:country-name": "Colombia",
        "geo.region": "CO",
        "geo.placename": workshop.location || "Colombia",
      },
    };
  } catch {
    return {
      title: "Taller no encontrado | XIOS Academy",
      description: "El taller que buscas no está disponible en XIOS Academy",
    };
  }
}

const WorkshopDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  let workshop: Workshop | null = null;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/events/${slug}`);
    workshop = res.data;
  } catch (error) {
    console.error("Error loading workshop:", error);
    return <NotFound />;
  }
  console.log(workshop);

  if (!workshop) {
    return <NotFound />;
  }

  // Función para obtener el icono según la categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "entrepreneurship":
        return "💼";
      case "wellness":
        return "🌿";
      case "therapy":
        return "💆‍♀️";
      case "business":
        return "📈";
      case "personal-development":
        return "🌟";
      case "health":
        return "🏥";
      case "spirituality":
        return "🧘‍♀️";
      default:
        return "📚";
    }
  };

  // Función para traducir la categoría
  const translateCategory = (category: string) => {
    switch (category) {
      case "entrepreneurship":
        return "Emprendimiento";
      case "wellness":
        return "Bienestar";
      case "therapy":
        return "Terapia";
      case "business":
        return "Negocios";
      case "personal-development":
        return "Desarrollo Personal";
      case "health":
        return "Salud";
      case "spirituality":
        return "Espiritualidad";
      default:
        return category;
    }
  };

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
              name: workshop.title,
              description: workshop.description_long,
              startDate: `${workshop.start_date}T${
                workshop.start_time || "09:00:00"
              }`,
              endDate: `${workshop.end_date}T${
                workshop.end_time || "18:00:00"
              }`,
              location: {
                "@type": "Place",
                name: workshop.location || "XIOS Academy",
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
                  workshop.speakers?.[0] || workshop.speaker || "XIOS Academy",
              },
              offers: {
                "@type": "Offer",
                price: workshop.price || "0",
                priceCurrency: "COP",
                availability: "https://schema.org/InStock",
              },
              image: workshop.image,
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
            {workshop.image && (
              <>
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
              </>
            )}

            <div className="relative px-4 h-full flex justify-center items-center">
              <div className="text-white max-w-4xl text-center">
                <Link
                  href="/xios-academy/events/workshops"
                  className="inline-flex items-center text-white hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Volver a talleres
                </Link>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    <FiTag className="w-4 h-4 mr-2" />
                    Taller Certificado
                  </span>

                  {workshop.level && (
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(
                        workshop.level
                      )}`}
                    >
                      Nivel: {getLevelText(workshop.level)}
                    </span>
                  )}

                  {workshop.courses && workshop.courses.length > 0 && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 backdrop-blur-sm text-white border border-green-400/30">
                      <FiAward className="w-4 h-4 mr-2" />
                      {workshop.courses.length} Cursos Incluidos
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-7xl italic font-black mb-6 leading-tight text-white bg-black/70 rounded-3xl animate-pulse transition-all duration-5000">
                  {workshop.title}
                </h1>

                <p className="text-xl md:text-2xl text-piel-blanco leading-relaxed mb-8 max-w-3xl mx-auto text-white">
                  {workshop.subtitle}
                </p>

                <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto text-white">
                  {workshop.description_short}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <FiClock className="w-6 h-6 text-white mb-2 mx-auto" />
                    <div className="text-white font-bold">
                      {workshop.duration}h
                    </div>
                    <div className="text-white/80 text-sm">Duración</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <FiUsers className="w-6 h-6 text-white mb-2 mx-auto" />
                    <div className="text-white font-bold">
                      {workshop.enrolled || 0}/{workshop.capacity || "∞"}
                    </div>
                    <div className="text-white/80 text-sm">Inscritos</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <FiAward className="w-6 h-6 text-white mb-2 mx-auto" />
                    <div className="text-white font-bold">
                      {workshop.certificate ? "Sí" : "No"}
                    </div>
                    <div className="text-white/80 text-sm">Certificado</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <FiMapPin className="w-6 h-6 text-white mb-2 mx-auto" />
                    <div className="text-white font-bold text-sm">
                      {workshop.location?.split(",")[0] || "Online"}
                    </div>
                    <div className="text-white/80 text-sm">Ubicación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center px-4 py-12">
          {/* Cursos Incluidos Section - Full Width */}

          {workshop.courses && workshop.courses.length > 0 && (
            <div className="w-full mb-5">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="relative flex flex-col md:flex-row items-center justify-center  mb-8">
                  <h3 className="text-3xl font-bold text-gray-900">
                    Cursos Incluidos en este Taller
                  </h3>
                  <span className="md:absolute md:top-0 md:right-0 bg-gradient-2 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {workshop.courses.length}{" "}
                    {workshop.courses.length === 1 ? "Curso" : "Cursos"}
                  </span>
                </div>

                {/* Indicador de scroll */}
                {workshop.courses.length > 1 && (
                  <div className="flex items-center justify-center mb-4">
                    <p className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full flex items-center">
                      <FiArrowLeft className="w-4 h-4 mr-2" />
                      Desliza horizontalmente para ver más cursos
                      <FiArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </p>
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-start gap-6 overflow-x-auto pb-4 scroll-smooth custom-scrollbar">
                    {workshop.courses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px] max-w-[320px]"
                      >
                        <div className="relative h-48">
                          <Image
                            src={
                              course.images?.[0]
                                ? course.images[0]
                                : "/placeholder.png"
                            }
                            alt={course.title}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                          <div className="bg-black/50 absolute w-full h-full top-0"></div>
                          <Link
                            href={`/xios-academy/student-portal/courses/${course.slug}`}
                            className="absolute inset-0 flex items-center justify-center "
                          >
                            <FiPlay className="w-16 h-16 text-white" />
                          </Link>
                          <div className="absolute top-4 left-1">
                            <h4 className="text-sm font-semibold text-center text-white">
                              Categoria:
                            </h4>
                            <ul className="bg-piel-blanco text-white px-3 py-1 rounded-2xl text-start">
                              {course.category && (
                                <li className="text-verde-oscuro text-start text-sm">
                                  {getCategoryIcon(course.category)}{" "}
                                  {translateCategory(course.category)
                                    .charAt(0)
                                    .toUpperCase() +
                                    translateCategory(course.category).slice(1)}
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="absolute top-4 right-4">
                            <h4 className="text-sm font-semibold text-center text-white">
                              Nivel:
                            </h4>
                            <span className="bg-gradient-2 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {course.level}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="mb-3">
                            <h3 className="text-xl font-bold italic">
                              {course.title}
                            </h3>
                            <p className="text-sm">
                              {course.description_short}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <FiUser className="w-4 h-4 text-verde-oscuro" />
                              <span className="text-sm text-verde-oscuro">
                                {course.instructor}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold"></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <FiClock className="w-4 h-4" />
                                <span>{course.duration} horas</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiUsers className="w-4 h-4" />
                                <span>+100 alumnos</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Array.isArray(course.includes) &&
                              course.includes.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 text-xs text-verde-oscuro"
                                >
                                  <div className="w-1.5 h-1.5 bg-verde-oscuro rounded-full"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-verde-oscuro">
                              {course.price.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                              })}{" "}
                              <span className="text-xs">COP</span>
                            </div>
                            <Link
                              href={`/xios-academy/student-portal/courses/${course.slug}`}
                              className="bg-gradient-2 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                            >
                              Ver curso
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    🎉 ¡Todos estos cursos están incluidos en tu inscripción al
                    taller!
                  </p>
                  <div className="bg-gradient-to-r from-verde-claro/20 to-piel-claro/20 rounded-xl p-4">
                    <p className="text-verde-oscuro font-semibold">
                      💰 Valor individual de los cursos incluidos
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      ¡Ahorro significativo al inscribirte al taller completo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full justify-center">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8 ">
              {/* Workshop Details */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Detalles del Taller
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-2 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-start">
                        Inicia a las {workshop.start_time}
                      </p>
                      <p className="font-semibold text-gray-900">
                        El {formatDate(workshop.start_date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-2 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-start">
                        Termina a las {workshop.end_time}
                      </p>
                      <p className="font-semibold text-gray-900">
                        El {formatDate(workshop.end_date)}
                      </p>
                    </div>
                  </div>

                  {workshop.duration && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-3 rounded-lg flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 text-start">
                          Duración
                        </p>
                        <p className="font-semibold text-gray-900">
                          {workshop.duration} Horas
                        </p>
                      </div>
                    </div>
                  )}

                  {workshop.location && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-1 rounded-lg flex items-center justify-center">
                        <FiMapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-start">Ubicación</p>
                        <p className="font-semibold text-gray-900">
                          {workshop.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {workshop.speakers && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-verde-oscuro rounded-lg flex items-center justify-center">
                        <FiUsers className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-start">Instructor</p>
                        <p className="font-semibold text-gray-900">
                          {workshop.speakers.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {(workshop.capacity || workshop.enrolled) && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <FiUsers className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Participantes</p>
                        <p className="font-semibold text-gray-900">
                          {workshop.enrolled || 0} /{" "}
                          {workshop.capacity || "Sin límite"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Objectives */}
              {workshop.description_long && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Objetivos del Taller
                  </h3>
                  <p className="text-gray-700">{workshop.description_long}</p>
                </div>
              )}

              {/* Prerequisites */}
              {workshop.requirements && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Requisitos Previos
                  </h3>
                  <ul className="flex items-center justify-center flex-wrap gap-3 list-none">
                    {workshop.requirements.map((prereq, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="bg-green-100 px-2 rounded-3xl">
                          {prereq}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials */}

              {workshop.materials_description && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Materiales Incluidos
                  </h3>
                  <ul className="flex items-center justify-center flex-wrap gap-3 list-none ">
                    {workshop.materials_description.map((material, index) => (
                      <li key={index} className="flex items-center ">
                        <FiCheck className="w-4 h-4 text-green-600" />
                        <span className="bg-green-100 px-2 rounded-3xl ">
                          {material}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.includes && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Beneficios Incluidos
                  </h3>
                  <ul className="flex items-center justify-center flex-wrap gap-3 list-none ">
                    {workshop.includes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FiCheck className="w-4 h-4 text-green-600" />
                        <span className="bg-green-100 px-2 rounded-3xl ">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-3">
              {/* Enrollment Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-8">
                {workshop.price && (
                  <div className="text-center mb-2">
                    <div className="flex items-center justify-center mb-2">
                      <FiDollarSign className="w-6 h-6 text-black" />
                      <span className="text-4xl md:text-3xl font-bold text-gray-900">
                        {formatPrice(workshop.price)}
                      </span>
                    </div>
                    <p className="text-gray-500">Por participante</p>
                  </div>
                )}

                {workshop.certificate && (
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="flex items-center">
                      <FiAward className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {workshop.certificate ? "Incluye certificado" : ""}
                      </span>
                    </div>
                  </div>
                )}

                <Link
                  href="/xiomarasanchezterapeuta/contact"
                  className="w-full bg-gradient-2 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center block mb-4"
                >
                  Inscribirse al Taller
                </Link>

                <Link
                  href="/xiomarasanchezterapeuta/contact"
                  className="w-full border-2 border-verde-oscuro text-verde-oscuro py-3 px-6 rounded-xl font-semibold hover:bg-verde-oscuro hover:text-white transition-all duration-300 text-center block"
                >
                  Más Información
                </Link>
              </div>

              {/* Tags */}
              {workshop.tags && workshop.tags.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Temas Relacionados
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-piel-claro text-piel-oscuro"
                      >
                        {tag}
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

export default WorkshopDetailPage;
