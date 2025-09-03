"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiPlay,
  FiClock,
  FiUsers,
  FiStar,
  FiAward,
  FiCheck,
  FiBookOpen,
  FiGlobe,
  FiShare2,
  FiHeart,
  FiChevronDown,
  FiChevronUp,
  FiPlayCircle,
  FiLock,
  FiUnlock,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { formatPrice } from "@/utils/formatPrice";

// 🎯 Interfaz actualizada basada en la API
interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string[];
  tags: string[];
  price: number;
  is_free: boolean;
  level: string;
  duration: number;
  certificate: boolean;
  instructor: string;
  includes: string[];
  is_active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  academyId: string | null;
}

interface CourseBySlugProps {
  course: Course[];
}

const CourseBySlug = ({ course }: CourseBySlugProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // 🎯 Obtener el curso (debería ser un objeto, no array)
  const courseData = Array.isArray(course) ? course[0] : course;

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Curso no encontrado
          </h1>
          <p className="text-gray-600">
            No pudimos cargar la información del curso.
          </p>
        </div>
      </div>
    );
  }

  // 🎨 Datos simulados para demo (en producción vendrían de la API)
  const mockModules = [
    {
      id: 1,
      title: "Fundamentos del Emprendimiento Consciente",
      duration: "2h 30min",
      lessons: [
        {
          id: 1,
          title: "¿Qué es el emprendimiento consciente?",
          duration: "15min",
          isPreview: true,
        },
        {
          id: 2,
          title: "Conectando con tu propósito",
          duration: "25min",
          isPreview: false,
        },
        {
          id: 3,
          title: "Valores y principios empresariales",
          duration: "20min",
          isPreview: false,
        },
      ],
    },
    {
      id: 2,
      title: "Estrategias de Marketing Auténtico",
      duration: "3h 15min",
      lessons: [
        {
          id: 4,
          title: "Marketing desde el corazón",
          duration: "30min",
          isPreview: true,
        },
        {
          id: 5,
          title: "Storytelling para terapeutas",
          duration: "25min",
          isPreview: false,
        },
        {
          id: 6,
          title: "Redes sociales conscientes",
          duration: "40min",
          isPreview: false,
        },
      ],
    },
    {
      id: 3,
      title: "Gestión de Clientes y Servicios",
      duration: "2h 45min",
      lessons: [
        {
          id: 7,
          title: "Creación de experiencias transformadoras",
          duration: "35min",
          isPreview: false,
        },
        {
          id: 8,
          title: "Sistemas de reservas y seguimiento",
          duration: "30min",
          isPreview: false,
        },
        {
          id: 9,
          title: "Precios justos y sostenibles",
          duration: "40min",
          isPreview: false,
        },
      ],
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco via-white to-piel-claro">
      {/* 🎬 HERO SECTION ÉPICO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-verde-oscuro via-piel-oscuro to-verde-claro">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 📝 Contenido del Curso */}
            <div className="text-white space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-piel-blanco/80">
                <span>Academia</span>
                <span>/</span>
                <span>Cursos</span>
                <span>/</span>
                <span className="text-piel-blanco">{courseData.title}</span>
              </nav>

              {/* Categorías */}
              <div className="flex flex-wrap gap-2">
                {courseData.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {courseData.title}
              </h1>

              <p className="text-xl text-piel-blanco/90">
                {courseData.subtitle}
              </p>

              <p className="text-lg text-piel-blanco/80 leading-relaxed">
                {courseData.description_short}
              </p>

              {/* Stats del curso */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <FiStar className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-piel-blanco/80">(127 reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-5 h-5 text-piel-blanco" />
                  <span>1,245 estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-piel-blanco" />
                  <span>{courseData.duration}h de contenido</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiGlobe className="w-5 h-5 text-piel-blanco" />
                  <span>Acceso de por vida</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 bg-piel-blanco rounded-full flex items-center justify-center">
                  <span className="text-verde-oscuro font-bold text-lg">
                    {courseData.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-piel-blanco/80">Instructor</p>
                  <p className="font-semibold text-lg">
                    {courseData.instructor}
                  </p>
                </div>
              </div>
            </div>

            {/* 🎥 Video Preview y Compra */}
            <div className="lg:justify-self-end">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-900">
                  <Image
                    src={courseData.url}
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <FiPlay className="w-8 h-8 text-verde-oscuro ml-1" />
                    </button>
                  </div>
                </div>

                {/* Precio y Compra */}
                <div className="p-6 space-y-4">
                  <div className="text-center">
                    {courseData.is_free ? (
                      <div className="text-3xl font-bold text-green-600">
                        GRATIS
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-verde-oscuro">
                          ${formatPrice(courseData.price)}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${formatPrice(courseData.price * 1.5)}
                        </div>
                        <div className="text-sm text-green-600 font-semibold">
                          ¡33% de descuento!
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón principal */}
                  <button
                    onClick={() => setIsEnrolled(!isEnrolled)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isEnrolled
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gradient-to-r from-verde-oscuro to-piel-oscuro hover:from-piel-oscuro hover:to-verde-oscuro text-white hover:scale-105"
                    }`}
                  >
                    {isEnrolled ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiCheck className="w-5 h-5" />
                        Inscrito - Ver Contenido
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FiPlayCircle className="w-5 h-5" />
                        {courseData.is_free
                          ? "Inscribirse Gratis"
                          : "Comprar Curso"}
                      </span>
                    )}
                  </button>

                  {/* Garantía */}
                  <div className="text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FiAward className="w-4 h-4 text-green-600" />
                      <span>Garantía de 30 días</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Si no estás satisfecho, te devolvemos tu dinero
                    </div>
                  </div>

                  {/* Nivel del curso */}
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(
                        courseData.level
                      )}`}
                    >
                      {getLevelText(courseData.level)}
                    </span>
                  </div>

                  {/* Acciones adicionales */}
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg hover:border-verde-oscuro transition-colors flex items-center justify-center gap-2">
                      <FiHeart className="w-4 h-4" />
                      <span className="text-sm">Favorito</span>
                    </button>
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg hover:border-verde-oscuro transition-colors flex items-center justify-center gap-2">
                      <FiShare2 className="w-4 h-4" />
                      <span className="text-sm">Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📑 TABS SECTION */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: "overview", label: "Descripción", icon: FiBookOpen },
                { id: "curriculum", label: "Temario", icon: FiPlayCircle },
                { id: "instructor", label: "Instructor", icon: FiUsers },
                { id: "reviews", label: "Reseñas", icon: FiStar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as
                        | "overview"
                        | "curriculum"
                        | "instructor"
                        | "reviews"
                    )
                  }
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-b-2 border-verde-oscuro text-verde-oscuro bg-verde-oscuro/5"
                      : "text-gray-600 hover:text-verde-oscuro hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Descripción detallada */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ¿Qué aprenderás en este curso?
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {courseData.description_long}
                  </p>
                </div>

                {/* Lo que incluye */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiTarget className="w-5 h-5 text-verde-oscuro" />
                      Lo que incluye
                    </h4>
                    <ul className="space-y-3">
                      {courseData.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiTrendingUp className="w-5 h-5 text-verde-oscuro" />
                      Habilidades que desarrollarás
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-piel-claro text-verde-oscuro rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certificado */}
                {courseData.certificate && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <FiAward className="w-6 h-6 text-yellow-800" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Certificado de Finalización
                        </h4>
                        <p className="text-gray-600">
                          Obtén un certificado oficial al completar el curso que
                          puedes compartir en LinkedIn y tu CV.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Contenido del Curso
                  </h3>
                  <div className="text-sm text-gray-600">
                    {mockModules.length} módulos • {courseData.duration}h de
                    contenido
                  </div>
                </div>

                <div className="space-y-4">
                  {mockModules.map((module, moduleIndex) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedModule(
                            expandedModule === moduleIndex ? null : moduleIndex
                          )
                        }
                        className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-verde-oscuro text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {moduleIndex + 1}
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-gray-900">
                              {module.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {module.lessons.length} lecciones •{" "}
                              {module.duration}
                            </p>
                          </div>
                        </div>
                        {expandedModule === moduleIndex ? (
                          <FiChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>

                      {expandedModule === moduleIndex && (
                        <div className="border-t border-gray-200">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {lesson.isPreview ? (
                                    <FiUnlock className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <FiLock className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-gray-900">
                                    {lesson.title}
                                  </span>
                                  {lesson.isPreview && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                      Vista previa
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-600">
                                    {lesson.duration}
                                  </span>
                                  {lesson.isPreview && (
                                    <button className="text-verde-oscuro hover:text-verde-claro transition-colors">
                                      <FiPlay className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-verde-oscuro to-piel-oscuro rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {courseData.instructor.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {courseData.instructor}
                    </h3>
                    <p className="text-verde-oscuro font-medium mb-4">
                      Terapeuta y Emprendedora Consciente
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Con más de 10 años de experiencia en el mundo del
                      bienestar y la terapia holística,
                      {courseData.instructor} ha ayudado a cientos de terapeutas
                      a construir negocios sostenibles y auténticos. Su enfoque
                      combina técnicas ancestrales con estrategias modernas de
                      emprendimiento consciente.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      1,200+
                    </div>
                    <div className="text-gray-600">Estudiantes</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      4.9
                    </div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      15
                    </div>
                    <div className="text-gray-600">Cursos</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Reseñas de Estudiantes
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold text-gray-900">4.8</span>
                    <span className="text-gray-600">(127 reseñas)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "María González",
                      rating: 5,
                      date: "Hace 2 semanas",
                      comment:
                        "Este curso cambió completamente mi perspectiva sobre el emprendimiento. Ahora tengo un negocio próspero que realmente conecta con mi propósito. ¡Altamente recomendado!",
                    },
                    {
                      name: "Carlos Mendoza",
                      rating: 5,
                      date: "Hace 1 mes",
                      comment:
                        "Las estrategias de marketing auténtico son oro puro. Mis clientes ahora me encuentran naturalmente porque mi mensaje es claro y genuino.",
                    },
                    {
                      name: "Ana Rodríguez",
                      rating: 4,
                      date: "Hace 2 meses",
                      comment:
                        "Excelente contenido y muy bien estructurado. Me hubiera gustado más ejemplos prácticos, pero en general muy satisfecha con mi inversión.",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-verde-oscuro text-white rounded-full flex items-center justify-center font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {review.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🚀 CTA FINAL */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-verde-oscuro to-piel-oscuro rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para transformar tu negocio?
          </h3>
          <p className="text-xl text-piel-blanco/90 mb-8 max-w-2xl mx-auto">
            Únete a más de 1,200 terapeutas que ya han construido negocios
            prósperos y auténticos.
          </p>
          <button
            onClick={() => setIsEnrolled(!isEnrolled)}
            className="bg-white text-verde-oscuro px-8 py-4 rounded-xl font-bold text-lg hover:bg-piel-blanco transition-all duration-300 hover:scale-105"
          >
            {courseData.is_free
              ? "Inscribirse Gratis"
              : `Comprar por $${formatPrice(courseData.price)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBySlug;
