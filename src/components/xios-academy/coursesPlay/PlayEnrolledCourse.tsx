"use client";

import React, { useState, useMemo } from "react";
import {
  FiPlay,
  FiDownload,
  FiClock,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiHeadphones,
  FiAward,
} from "react-icons/fi";
import { Course } from "../CourseBySlug";
import VideoModalCustom from "./VideoModalCustom";

interface Academy {
  id: string;
  title: string;
  // Agregar más propiedades según sea necesario
}

interface UserEnrollment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  orderacademies: Array<{
    id: string;
    createdAt: string;
    course?: Course | null;
    academy?: Academy | null;
  }>;
}

interface PlayEnrolledCourseProps {
  courseData?: Course; // Hacer opcional para manejar estados de carga
  userEnrollments?: UserEnrollment; // Opcional por si no se usa ahora
}



const PlayEnrolledCourse = ({ courseData }: PlayEnrolledCourseProps) => {
  const [selectedLesson, setSelectedLesson] = useState<
    Course["lessons"][0] | null
  >(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set([1])
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 🔥 Función para obtener el título del módulo
  const getModuleTitle = (type: string): string => {
    const typeMap: Record<string, string> = {
      intro: "🎯 Introducción",
      chapter: "📚 Contenido Principal",
      "chapter 1": "📖 Capítulo 1",
      "chapter 2": "📖 Capítulo 2",
      "chapter 3": "📖 Capítulo 3",
      bonus: "🎁 Contenido Bonus",
      exercise: "💪 Ejercicios Prácticos",
      quiz: "❓ Evaluaciones",
    };
    return (
      typeMap[type.toLowerCase()] ||
      `📝 ${type.charAt(0).toUpperCase() + type.slice(1)}`
    );
  };

  // 🎯 Procesar y organizar las lecciones por módulos
  const processedModules = useMemo(() => {
    if (!courseData || !courseData.lessons || courseData.lessons.length === 0) {
      return [];
    }

    // Ordenar lecciones por order
    const sortedLessons = [...courseData.lessons].sort(
      (a, b) => a.order - b.order
    );

    // Agrupar por tipo
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

      return {
        id: index + 1,
        title: getModuleTitle(type),
        type: type,
        lessons: lessons,
        totalDuration: `${Math.floor(totalDuration)}min`,
        lessonsCount: lessons.length,
      };
    });
  }, [courseData]);

  // 📊 Calcular estadísticas del progreso
  const courseStats = useMemo(() => {
    const totalLessons = courseData?.lessons?.length || 0;
    const completed = completedLessons.size;
    const progressPercentage =
      totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

    const totalDuration =
      courseData?.lessons?.reduce(
        (sum, lesson) => sum + parseFloat(lesson.duration.toString()),
        0
      ) || 0;

    return {
      totalLessons,
      completed,
      progressPercentage,
      totalHours: Math.floor(totalDuration / 60),
      totalMinutes: Math.floor(totalDuration % 60),
    };
  }, [courseData, completedLessons]);

  // � Manejar reproducción de video
  const handlePlayLesson = (lesson: Course["lessons"][0]) => {
    setSelectedLesson(lesson);
    setIsVideoModalOpen(true);
  };

  // ✅ Marcar lección como completada
  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  // 🗂️ Toggle módulo expandido
  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const translateLevel = (level: string) => {
    switch (level) {
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

  // ⚡ Manejar estado de carga
  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-oscuro mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* 🎯 HEADER ÉPICO */}
        <div className="bg-gradient-2 text-white">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Info del curso */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {translateLevel(courseData.level).toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    ✅ MATRICULADO
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-start text-white">
                  {courseData.title}
                </h1>
                <p className="text-lg text-piel-blanco/90 mb-4 text-start text-white">
                  {courseData.subtitle}
                </p>

                {/* Stats rápidos */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="w-4 h-4" />
                    <span>{courseStats.totalLessons} lecciones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>
                      {courseStats.totalHours}h {courseStats.totalMinutes}min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiAward className="w-4 h-4" />
                    <span>Certificado incluido</span>
                  </div>
                </div>
              </div>

              {/* Progreso circular */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-white/20"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${
                        2 *
                        Math.PI *
                        50 *
                        (1 - courseStats.progressPercentage / 100)
                      }`}
                      className="text-green-400"
                      style={{
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {courseStats.progressPercentage}%
                    </span>
                    <span className="text-xs">Completado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📚 CONTENIDO PRINCIPAL */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* 🗂️ SIDEBAR - Lista de módulos */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Contenido del Curso
                </h2>

                {processedModules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden"
                  >
                    {/* Header del módulo */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {module.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {module.lessonsCount} lecciones •{" "}
                            {module.totalDuration}
                          </p>
                        </div>
                        {expandedModules.has(module.id) ? (
                          <FiChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <FiChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Lista de lecciones */}
                    {expandedModules.has(module.id) && (
                      <div className="border-t">
                        {module.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => handlePlayLesson(lesson)}
                            className="w-full p-3 text-left hover:bg-verde-claro/5 transition-colors border-b last:border-b-0 group"
                          >
                            <div className="flex items-center gap-3">
                              {completedLessons.has(lesson.id) ? (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <FiCheck className="w-3 h-3 text-white" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-verde-oscuro rounded-full flex items-center justify-center group-hover:bg-verde-claro transition-colors">
                                  <FiPlay className="w-3 h-3 text-white ml-0.5" />
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <FiClock className="w-3 h-3" />
                                  <span>
                                    {Math.floor(
                                      parseFloat(lesson.duration.toString())
                                    )}
                                    min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 🎬 ÁREA PRINCIPAL */}
            <div className="lg:col-span-3">
              {selectedLesson ? (
                /* Detalles de la lección seleccionada */
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedLesson.title}
                        </h2>
                        <p className="text-gray-600">
                          {selectedLesson.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePlayLesson(selectedLesson)}
                        className="bg-gradient-to-r from-verde-oscuro to-piel-oscuro text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold"
                      >
                        <FiPlay className="w-5 h-5" />
                        Ver Lección
                      </button>
                    </div>

                    {/* Metadata de la lección */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        <span>
                          {Math.floor(
                            parseFloat(selectedLesson.duration.toString())
                          )}{" "}
                          minutos
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiBookOpen className="w-4 h-4" />
                        <span>{selectedLesson.type}</span>
                      </div>
                    </div>

                    {/* Recursos y archivos adjuntos */}
                    {((selectedLesson.resources &&
                      selectedLesson.resources.length > 0) ||
                      (selectedLesson.attached &&
                        selectedLesson.attached.length > 0)) && (
                      <div className="border-t pt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Recursos de la Lección
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Recursos */}
                          {selectedLesson.resources &&
                            selectedLesson.resources.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  📚 Recursos
                                </h4>
                                <div className="space-y-2">
                                  {selectedLesson.resources.map(
                                    (resource: string, index: number) => (
                                      <a
                                        key={index}
                                        href={resource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                                      >
                                        <FiFileText className="w-4 h-4 text-verde-oscuro" />
                                        <span className="flex-1 truncate">
                                          Recurso {index + 1}
                                        </span>
                                        <FiDownload className="w-4 h-4 text-gray-400" />
                                      </a>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {selectedLesson.attached &&
                            selectedLesson.attached.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  📎 Adjuntos
                                </h4>
                                <div className="space-y-2">
                                  {selectedLesson.attached.map(
                                    (attachment: string, index: number) => (
                                      <a
                                        key={index}
                                        href={attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                                      >
                                        <FiHeadphones className="w-4 h-4 text-verde-oscuro" />
                                        <span className="flex-1 truncate">
                                          Adjunto {index + 1}
                                        </span>
                                        <FiDownload className="w-4 h-4 text-gray-400" />
                                      </a>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    {/* Marcar como completada */}
                    {!completedLessons.has(selectedLesson.id) && (
                      <div className="border-t pt-6">
                        <button
                          onClick={() => markLessonComplete(selectedLesson.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          <FiCheck className="w-4 h-4" />
                          Marcar como Completada
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Vista inicial - resumen del curso */
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      ¡Bienvenido a tu curso!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {courseData.description_long}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-verde-oscuro">
                          {courseStats.totalLessons}
                        </div>
                        <div className="text-sm text-gray-600">Lecciones</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-verde-oscuro">
                          {courseStats.totalHours}h {courseStats.totalMinutes}m
                        </div>
                        <div className="text-sm text-gray-600">Duración</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-verde-oscuro">
                          {courseStats.completed}
                        </div>
                        <div className="text-sm text-gray-600">Completadas</div>
                      </div>
                    </div>

                    <p className="text-center text-gray-500">
                      👈 Selecciona una lección del menú lateral para comenzar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🎥 Modal del reproductor con controles personalizados */}
      <VideoModalCustom
        isOpen={isVideoModalOpen}
        videoUrl={selectedLesson?.video_url || ""}
        lessonTitle={selectedLesson?.title || ""}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
};

export default PlayEnrolledCourse;
