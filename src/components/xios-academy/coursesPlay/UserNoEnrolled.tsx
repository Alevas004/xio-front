import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import {
  FiAward,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiGlobe,
  FiHeart,
  FiLock,
  FiPlay,
  FiPlayCircle,
  FiShare2,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUnlock,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import { Course } from "../CourseBySlug";
import VideoModalCustom from "./VideoModalCustom";
import Link from "next/link";

interface NoUserProps {
  courseData: Course;
  isEnrolled: boolean;
  setIsEnrolled: (enrolled: boolean) => void;
}

const UserNoEnrolled = ({ courseData, isEnrolled, setIsEnrolled }: NoUserProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");

  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // Estado para el modal de vista previa
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    lessonData: null as any,
  });

  // Función para manejar click en lección de preview
  const handlePreviewClick = (lesson: any) => {
    setPreviewModal({
      isOpen: true,
      lessonData: lesson,
    });
  };

  // Función para cerrar modal de preview
  const handleClosePreview = () => {
    setPreviewModal({
      isOpen: false,
      lessonData: null,
    });
  };

  // Función para obtener título amigable del módulo
  const getModuleTitle = (type: string): string => {
    const typeMap: Record<string, string> = {
      intro: "Introducción al Curso",
      chapter: "Contenido Principal",
      "chapter 1": "Capítulo 1",
      "chapter 2": "Capítulo 2",
      "chapter 3": "Capítulo 3",
      "chapter 4": "Capítulo 4",
      "chapter 5": "Capítulo 5",
      "chapter 6": "Capítulo 6",
      bonus: "Contenido Bonus",
      exercise: "Ejercicios Prácticos",
    };
    return typeMap[type] || `Módulo: ${type}`;
  };

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

  // Función para calcular años de experiencia
  const calculateYearsExperience = (startDate: string | undefined): number => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const now = new Date();
    return now.getFullYear() - start.getFullYear();
  };

  // 🔥 Procesar lessons reales del backend y organizarlas por tipo
  const processedLessons = useMemo(() => {
    if (!courseData.lessons || courseData.lessons.length === 0) {
      return [];
    }

    // Ordenar lessons por order
    const sortedLessons = [...courseData.lessons].sort(
      (a, b) => a.order - b.order
    );

    // Agrupar por tipo de lesson
    const groupedLessons = sortedLessons.reduce((acc, lesson) => {
      const type = lesson.type.toLowerCase();
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(lesson);
      return acc;
    }, {} as Record<string, typeof courseData.lessons>);

    // Convertir a estructura de módulos
    return Object.entries(groupedLessons).map(([type, lessons], index) => {
      const totalDuration = lessons.reduce(
        (sum, lesson) => sum + parseFloat(lesson.duration.toString()),
        0
      );
      const previewCount = lessons.filter((lesson) => lesson.is_preview).length;

      return {
        id: index + 1,
        title: getModuleTitle(type),
        type: type,
        duration: `${totalDuration}min`,
        totalDuration: totalDuration,
        lessons: lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          duration: `${parseFloat(lesson.duration.toString())}min`,
          isPreview: lesson.is_preview,
          type: lesson.type,
          video_url: lesson.video_url,
          resources: lesson.resources,
          attached: lesson.attached,
        })),
        lessonCount: lessons.length,
        previewCount: previewCount,
      };
    });
  }, [courseData]);

  // Calcular estadísticas del curso
  const courseStats = useMemo(() => {
    const totalLessons = courseData.lessons?.length || 0;
    const totalDuration =
      courseData.lessons?.reduce(
        (sum, lesson) => sum + parseFloat(lesson.duration.toString()),
        0
      ) || 0;
    const previewLessons =
      courseData.lessons?.filter((lesson) => lesson.is_preview).length || 0;
    const totalHours = Math.floor(totalDuration / 60);
    const totalMinutes = Math.floor(totalDuration % 60);

    return {
      totalLessons,
      totalDuration: totalDuration,
      formattedDuration:
        totalHours > 0
          ? `${totalHours}h ${totalMinutes}min`
          : `${totalMinutes}min`,
      previewLessons,
      moduleCount: processedLessons.length,
    };
  }, [courseData.lessons, processedLessons]);

  console.log(courseData, "<<====");

  // Función para obtener la primera lección de preview
  const getFirstPreviewLesson = () => {
    for (const moduleItem of processedLessons) {
      const previewLesson = moduleItem.lessons.find(
        (lesson) => lesson.isPreview
      );
      if (previewLesson) {
        return previewLesson;
      }
    }
    return null;
  };

  const firstPreviewLesson = getFirstPreviewLesson();

  // Función para obtener el acceso basado en el includes
  const getAccessType = () => {
    if (!courseData.includes) return "Acceso limitado";

    const hasLifetimeAccess = courseData.includes.some(
      (item) =>
        item.toLowerCase().includes("vida") ||
        item.toLowerCase().includes("lifetime")
    );

    if (hasLifetimeAccess) return "Acceso de por vida";

    const monthsMatch = courseData.includes.find((item) =>
      item.toLowerCase().includes("mes")
    );

    return monthsMatch || "Acceso incluido";
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
    <>
      {/* 🎬 HERO SECTION ÉPICO */}
      <div className="relative overflow-hidden bg-gradient-2">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 📝 Contenido del Curso */}
            <div className="text-white space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-piel-blanco/80">
                <span>Inicio</span>
                <span>/</span>
                <span>Cursos</span>
                <span>/</span>
                <span className="text-piel-blanco">{courseData.title}</span>
              </nav>

              {/* Categorías */}
              <div className="flex flex-wrap gap-2">
                {courseData.category && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {getCategoryIcon(courseData.category)} {translateCategory(courseData.category)}
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white text-start">
                {courseData.title}
              </h1>

              <p className="text-xl text-white text-start">
                {courseData.subtitle}
              </p>

              <p className="text-lg text-white text-start leading-relaxed">
                {courseData.description_short}
              </p>

              {/* Stats del curso */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <FiStar className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-5 h-5 text-piel-blanco" />
                  <span>+500 estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-piel-blanco" />
                  <span>{courseStats.formattedDuration} de contenido</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiGlobe className="w-5 h-5 text-piel-blanco" />
                  <span>{getAccessType()}</span>
                </div>
                {courseStats.previewLessons > 0 && (
                  <div className="flex items-center gap-2">
                    <FiUnlock className="w-5 h-5 text-green-400" />
                    <span>
                      {courseStats.previewLessons} lecciones gratuitas
                    </span>
                  </div>
                )}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 pt-4">
                <Image
                  src={
                    courseData.instructorUser?.profile_picture ||
                    "https://via.placeholder.com/48"
                  }
                  alt={`${courseData.instructorUser?.first_name} ${courseData.instructorUser?.last_name}`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-piel-blanco/30"
                />
                <div>
                  <p className="text-sm text-white text-start">Instructor(a)</p>
                  <p className="font-semibold text-lg text-white text-start">
                    {courseData.instructorUser?.first_name}{" "}
                    {courseData.instructorUser?.last_name}
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
                    {firstPreviewLesson ? (
                      <button
                        onClick={() => handlePreviewClick(firstPreviewLesson)}
                        className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        <FiPlay className="w-8 h-8 text-verde-oscuro ml-1" />
                      </button>
                    ) : (
                      <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center">
                        <FiPlay className="w-8 h-8 text-gray-400 ml-1" />
                      </div>
                    )}
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
                        <div className="text-sm text-verde-oscuro">
                          Gratis si tomas el taller <Link href={`/xios-academy/events/workshops/${courseData.academy?.slug}`} className="text-piel-oscuro font-semibold">{courseData.academy?.title}</Link>
                        </div>
                        {/* <div className="text-sm text-green-600 font-semibold">
                          ¡33% de descuento!
                        </div> */}
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
                      <span>Garantía comprobada</span>
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
                {
                  id: "overview",
                  label: "Descripción",
                  icon: FiBookOpen,
                },
                {
                  id: "curriculum",
                  label: "Temario",
                  icon: FiPlayCircle,
                },
                {
                  id: "instructor",
                  label: "Instructor",
                  icon: FiUsers,
                },
                // { id: "reviews", label: "Reseñas", icon: FiStar },
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
                      ¿Qué incluye?
                    </h4>
                    <ul className="space-y-3">
                      {courseData.includes &&
                        courseData.includes.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiTrendingUp className="w-5 h-5 text-verde-oscuro" />
                      Palabras clave del curso
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags &&
                        courseData.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-piel-blanco text-black rounded-full text-sm font-medium"
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

                {/* Información del Workshop/Academy si existe */}
                {courseData.academy && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <FiUsers className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          Parte del Workshop: {courseData.academy.title}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {courseData.academy.description_short}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
                          <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4 text-blue-600" />
                            <span>
                              Duración: {courseData.academy.duration}h
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiUsers className="w-4 h-4 text-blue-600" />
                            <span>
                              Capacidad: {courseData.academy.capacity} personas
                            </span>
                          </div>
                          {courseData.academy.location && (
                            <div className="flex items-center gap-2">
                              <FiGlobe className="w-4 h-4 text-blue-600" />
                              <span>{courseData.academy.location}</span>
                            </div>
                          )}
                          {courseData.academy.start_date && (
                            <div className="flex items-center gap-2">
                              <FiCalendar className="w-4 h-4 text-blue-600" />
                              <span>
                                Inicia:{" "}
                                {new Date(
                                  courseData.academy.start_date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
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
                    {courseStats.moduleCount} módulos •{" "}
                    {courseStats.totalLessons} lecciones •{" "}
                    {courseStats.formattedDuration}
                  </div>
                </div>

                {/* Estadísticas del temario */}
                {courseStats.previewLessons > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <FiUnlock className="w-5 h-5" />
                      <span className="font-medium">
                        {courseStats.previewLessons}{" "}
                        {courseStats.previewLessons > 1
                          ? "lecciones"
                          : "lección"}{" "}
                        disponibles para vista previa gratuita
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {processedLessons.length > 0 ? (
                    processedLessons.map((module, moduleIndex) => (
                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedModule(
                              expandedModule === moduleIndex
                                ? null
                                : moduleIndex
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
                                {module.lessonCount} lecciones •{" "}
                                {module.duration}
                                {module.previewCount > 0 && (
                                  <span className="text-green-600 ml-2">
                                    • {module.previewCount} vista previa
                                  </span>
                                )}
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
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-gray-900 font-medium">
                                          {lesson.title}
                                        </span>
                                        {lesson.isPreview && (
                                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            Vista previa
                                          </span>
                                        )}
                                      </div>
                                      {lesson.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {lesson.description}
                                        </p>
                                      )}
                                      {/* Recursos adicionales */}
                                      {((lesson.resources &&
                                        lesson.resources.length > 0) ||
                                        (lesson.attached &&
                                          lesson.attached.length > 0)) && (
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                          {lesson.resources &&
                                            lesson.resources.length > 0 && (
                                              <span>
                                                📎 {lesson.resources.length}{" "}
                                                recursos
                                              </span>
                                            )}
                                          {lesson.attached &&
                                            lesson.attached.length > 0 && (
                                              <span>
                                                📁 {lesson.attached.length}{" "}
                                                archivos
                                              </span>
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">
                                      {lesson.duration}
                                    </span>
                                    {lesson.isPreview && (
                                      <button
                                        onClick={() =>
                                          handlePreviewClick(lesson)
                                        }
                                        className="flex items-center gap-1 px-3 py-1 bg-verde-oscuro text-white rounded-lg hover:bg-verde-claro transition-colors text-sm font-medium"
                                      >
                                        <FiPlay className="w-4 h-4" />
                                        Ver Preview
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FiBookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>El contenido del curso se está preparando...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <Image
                    src={
                      courseData.instructorUser?.profile_picture ||
                      "https://via.placeholder.com/96"
                    }
                    alt={`${courseData.instructorUser?.first_name} ${courseData.instructorUser?.last_name}`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-verde-oscuro/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {courseData.instructorUser?.first_name}{" "}
                      {courseData.instructorUser?.last_name}
                    </h3>
                    <p className="text-verde-oscuro font-medium mb-4">
                      Terapeuta Corporal Certificada
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {courseData.instructorUser?.bio ||
                        "Información del instructor no disponible"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      {courseData.instructorUser?.clients_count?.toLocaleString() ||
                        "0"}
                      +
                    </div>
                    <div className="text-gray-600">Clientes</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      4.9
                    </div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-verde-oscuro mb-2">
                      {calculateYearsExperience(
                        courseData.instructorUser?.years_experience
                      )}
                    </div>
                    <div className="text-gray-600">Años experiencia</div>
                  </div>
                </div>

                {/* Especialidades */}
                {courseData.instructorUser?.specialties &&
                  courseData.instructorUser.specialties.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Especialidades
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {courseData.instructorUser.specialties.map(
                          (specialty, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <FiCheck className="w-5 h-5 text-verde-oscuro" />
                              <span className="text-gray-700">{specialty}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Certificaciones */}
                {courseData.instructorUser?.certifications &&
                  courseData.instructorUser.certifications.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Certificaciones
                      </h4>
                      <div className="space-y-3">
                        {courseData.instructorUser.certifications.map(
                          (certification, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                            >
                              <FiAward className="w-5 h-5 text-verde-oscuro mt-0.5" />
                              <span className="text-gray-700">
                                {certification}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* {activeTab === "reviews" && (
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
            )} */}
          </div>
        </div>
      </div>

      {/* 🚀 CTA FINAL */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-2 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            {courseData.academy
              ? `¿Listo para unirte al ${courseData.academy.title}?`
              : "¿Listo para transformar tu negocio?"}
          </h3>
          <p className="text-xl text-piel-blanco/90 mb-8 max-w-2xl mx-auto text-white">
            {courseData.academy
              ? `Únete a +500 personas que ya están transformando sus vidas con este curso.`
              : "Únete a más de 1,200 terapeutas que ya han construido negocios prósperos y auténticos."}
          </p>

          {/* Stats rápidas */}
          <div className="flex flex-row flex-wrap justify-center gap-8 mb-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {courseStats.totalLessons}
              </div>
              <div className="text-sm">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {courseStats.formattedDuration}
              </div>
              <div className="text-sm">De contenido</div>
            </div>
            {courseStats.previewLessons > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {courseStats.previewLessons}
                </div>
                <div className="text-sm">Gratis</div>
              </div>
            )}
            {courseData.certificate && (
              <div className="text-center">
                <div className="text-2xl font-bold">✓</div>
                <div className="text-sm">Certificado</div>
              </div>
            )}
          </div>

          <button className="bg-white text-verde-oscuro px-8 py-4 rounded-xl font-bold text-lg hover:bg-verde-oscuro hover:text-white transition-all duration-300 hover:scale-105">
            {courseData.is_free
              ? "Inscribirse Gratis"
              : `Comprar por $${formatPrice(courseData.price)}`}
          </button>
        </div>
      </div>

      {/* 🎥 Modal de Vista Previa */}
      {previewModal.isOpen && previewModal.lessonData && (
        <VideoModalCustom
          isOpen={previewModal.isOpen}
          videoUrl={previewModal.lessonData.video_url || ""}
          lessonTitle={`Vista Previa: ${previewModal.lessonData.title}`}
          onClose={handleClosePreview}
          isPreview={true}
          courseTitle={courseData.title}
          onEnrollClick={() => {
            handleClosePreview();
            setIsEnrolled(true);
          }}
        />
      )}
    </>
  );
};

export default UserNoEnrolled;
