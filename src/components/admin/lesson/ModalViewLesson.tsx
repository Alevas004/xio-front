import React from "react";
import {
  X,
  Clock,
  Play,
  Eye,
  FileText,
  Link,
  Award,
  BookOpen,
  Tag,
  Calendar,
  User,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Lesson } from "./ModalUpdateLesson";

interface ModalViewLessonProps {
  lesson: Lesson;
  onClose: () => void;

}

const ModalViewLesson = ({ lesson, onClose }: ModalViewLessonProps) => {
  // Función para obtener el ícono del tipo de lección
  const getTypeIcon = (type: string) => {
    const icons = {
      intro: "🎯",
      "chapter 1": "📖",
      "chapter 2": "📖",
      "chapter 3": "📖",
      "chapter 4": "📖",
      "chapter 5": "📖",
      "chapter 6": "📖",
      bonus: "🎁",
      exercise: "💪",
    };
    return icons[type as keyof typeof icons] || "📚";
  };

  // Función para obtener el color del tipo de lección
  const getTypeColor = (type: string) => {
    const colors = {
      intro: "from-blue-500 to-indigo-600",
      "chapter 1": "from-purple-500 to-violet-600",
      "chapter 2": "from-green-500 to-emerald-600",
      "chapter 3": "from-orange-500 to-amber-600",
      "chapter 4": "from-pink-500 to-rose-600",
      "chapter 5": "from-cyan-500 to-blue-600",
      "chapter 6": "from-red-500 to-pink-600",
      bonus: "from-yellow-500 to-orange-600",
      exercise: "from-teal-500 to-green-600",
    };
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  // Función para obtener el nombre legible del tipo
  const getTypeName = (type: string) => {
    const names = {
      intro: "Introducción",
      "chapter 1": "Capítulo 1",
      "chapter 2": "Capítulo 2", 
      "chapter 3": "Capítulo 3",
      "chapter 4": "Capítulo 4",
      "chapter 5": "Capítulo 5",
      "chapter 6": "Capítulo 6",
      bonus: "Contenido Bonus",
      exercise: "Ejercicio Práctico",
    };
    return names[type as keyof typeof names] || type;
  };

  // Función para formatear duración
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  // Función para obtener el ícono de categoría del curso
  const getCourseIcon = (category: string) => {
    const icons = {
      entrepreneurship: "💼",
      wellness: "🌿",
      therapy: "💆‍♀️",
      business: "📈",
      "personal-development": "🌟",
      health: "🏥",
      spirituality: "🧘‍♀️",
    };
    return icons[category as keyof typeof icons] || "📚";
  };

 

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con gradiente específico para el tipo */}
          <div
            className={`relative bg-gradient-to-br ${getTypeColor(
              lesson.type
            )} p-8 text-white`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                  <span className="text-4xl">
                    {getTypeIcon(lesson.type)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white text-start leading-tight">
                      {lesson.title}
                    </h2>
                    {lesson.is_preview && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-100 rounded-full text-sm font-medium border border-green-400/30">
                        👁️ Preview Gratuito
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium mb-3 text-start">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30">
                      {getTypeName(lesson.type)}
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(lesson.duration)}
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30 flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Orden: {lesson.order}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón cerrar elegante */}
              <button
                onClick={onClose}
                className="p-3 bg-white/20 hover:bg-white/30 cursor-pointer rounded-full transition-all duration-200 hover:scale-110 group"
              >
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Contenido principal con scroll */}
          <div className="max-h-[calc(95vh-200px)] overflow-y-auto">
            <div className="p-8 space-y-8">
              
              {/* Información del curso padre */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-indigo-600" />
                  📚 Curso al que pertenece
                </h3>
                <div className="bg-white rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100">
                      <span className="text-2xl">
                        {getCourseIcon(lesson.course.category)}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h4 className="font-bold text-lg text-gray-800">
                        {lesson.course.title}
                      </h4>
                      <p className="text-gray-600">
                        {lesson.course.subtitle}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                          👨‍🏫 {lesson.course.instructor}
                        </span>
                        <span className="text-sm text-gray-500">
                          {lesson.course.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video y contenido principal */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Video */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Play className="w-6 h-6 text-purple-600" />
                    🎥 Contenido de Video
                  </h3>
                  <div className="bg-white rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Link className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-700">URL del Video:</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border">
                      <a
                        href={lesson.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-medium break-all flex items-center gap-2 hover:underline"
                      >
                        {lesson.video_url}
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Detalles técnicos */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    ⚙️ Detalles Técnicos
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-green-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500 block">Duración</span>
                          <span className="font-bold text-lg text-gray-800 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-green-600" />
                            {formatDuration(lesson.duration)}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block">Orden en curso</span>
                          <span className="font-bold text-lg text-gray-800 flex items-center gap-1">
                            <Tag className="w-4 h-4 text-green-600" />
                            #{lesson.order}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block">Acceso</span>
                          <span className={`font-bold text-lg flex items-center gap-1 ${
                            lesson.is_preview ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {lesson.is_preview ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Preview
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Privado
                              </>
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block">ID</span>
                          <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {lesson.id.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recursos y archivos adjuntos */}
              {(lesson.resources && lesson.resources.length > 0) || (lesson.attached && lesson.attached.length > 0) ? (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-amber-600" />
                    📎 Recursos y Archivos
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Recursos */}
                    {lesson.resources && lesson.resources.length > 0 && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200">
                        <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-600" />
                          📄 Recursos de Estudio
                        </h4>
                        <div className="space-y-3">
                          {lesson.resources.map((resource, index) => (
                            <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                              <a
                                href={resource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-700 hover:text-amber-900 font-medium break-all flex items-center gap-2 hover:underline"
                              >
                                <Download className="w-4 h-4 flex-shrink-0" />
                                {resource}
                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Archivos adjuntos */}
                    {lesson.attached && lesson.attached.length > 0 && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200">
                        <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                          <Link className="w-5 h-5 text-amber-600" />
                          📎 Archivos Adjuntos
                        </h4>
                        <div className="space-y-3">
                          {lesson.attached.map((attachment, index) => (
                            <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                              <a
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-700 hover:text-amber-900 font-medium break-all flex items-center gap-2 hover:underline"
                              >
                                <Download className="w-4 h-4 flex-shrink-0" />
                                {attachment}
                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    📝 Esta lección no tiene recursos adicionales adjuntos
                  </p>
                </div>
              )}

              {/* Metadatos */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-gray-600" />
                  📅 Información de Creación
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Fecha de Creación</span>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      {formatDate(lesson.createdAt)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Última Actualización</span>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      {formatDate(lesson.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer con botones de acción */}
          <div className="border-t bg-gray-50 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                Vista detallada de la lección
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                ✨ Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewLesson;
