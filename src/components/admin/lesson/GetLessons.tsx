"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Eye,
  Play,
  Clock,
  FileText,
  Download,
  BookOpen,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { Lesson, LessonUpdate } from "./ModalUpdateLesson";

interface LessonCardProps {
  lesson: Lesson;
  onEdit: (body: LessonUpdate) => void;
  onDelete: (id: string) => void;
  onView: (lesson: Lesson) => void;
}

// Función para obtener el icono según el tipo de lección
const getTypeIcon = (type: string) => {
  switch (type) {
    case "intro":
      return "🎯";
    case "video":
      return "🎥";
    case "exercise":
      return "💪";
    case "theory":
      return "📚";
    case "practice":
      return "🎯";
    case "quiz":
      return "❓";
    default:
      return "📝";
  }
};

// Función para traducir el tipo de lección
const translateType = (type: string) => {
  switch (type) {
    case "intro":
      return "Introducción";
    case "video":
      return "Video";
    case "exercise":
      return "Ejercicio";
    case "theory":
      return "Teoría";
    case "practice":
      return "Práctica";
    case "quiz":
      return "Quiz";
    default:
      return type;
  }
};

// Función para obtener el color según el tipo
const getTypeColor = (type: string) => {
  switch (type) {
    case "intro":
      return "from-blue-500 to-indigo-500";
    case "video":
      return "from-red-500 to-pink-500";
    case "exercise":
      return "from-green-500 to-emerald-500";
    case "theory":
      return "from-purple-500 to-violet-500";
    case "practice":
      return "from-orange-500 to-amber-500";
    case "quiz":
      return "from-teal-500 to-cyan-500";
    default:
      return "from-gray-500 to-slate-500";
  }
};

// Función para obtener el icono según la categoría del curso
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

// Función para traducir la categoría del curso
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

export default function GetLessons({
  lesson,
  onEdit,
  onDelete,
  onView,
}: LessonCardProps) {
  const handleOnDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar la lección "${lesson.title}"?`)) {
      return;
    }
    onDelete(lesson.id);
  };

  return (
    <div className="group flex flex-col justify-center items-center">
      <Card className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white via-indigo-50/20 to-white border-0 ring-1 ring-indigo-200/30 hover:ring-indigo-400/50 h-full flex flex-col">
        {/* Header con imagen y overlay */}
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-200">
            {lesson.course?.url ? (
              <Image
                src={lesson.course.url}
                alt={lesson.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-blue-300 flex items-center justify-center">
                <Play className="w-16 h-16 text-indigo-600/50" />
              </div>
            )}

            {/* Overlay con gradiente elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de orden flotante */}
            <div className="absolute top-3 right-3">
              <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                📋 Lección #{lesson.order}
              </span>
            </div>

            {/* Badge del curso al que pertenece */}
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                📚 {lesson.course?.title}
              </span>
            </div>

            {/* Badge de tipo de lección */}
            <div className="absolute bottom-3 right-3">
              <span
                className={`bg-gradient-to-r ${getTypeColor(
                  lesson.type
                )} text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm`}
              >
                {getTypeIcon(lesson.type)} {translateType(lesson.type)}
              </span>
            </div>

            {/* Badge de preview */}
            {lesson.is_preview && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  👁️ Preview
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-3 flex-1">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
              {lesson.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Información del curso padre */}
          <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Pertenece al curso
            </div>
            <div className="text-sm font-semibold text-purple-700 flex items-center gap-2">
              <span className="text-xs">
                {getCategoryIcon(lesson.course?.category || "")}
              </span>
              <div className="flex-1 line-clamp-1">{lesson.course?.title}</div>
            </div>
            <div className="text-xs text-purple-600 mt-1">
              📖 {translateCategory(lesson.course?.category || "")} • 👨‍🏫{" "}
              {lesson.course?.instructor}
            </div>
          </div>

          {/* Info compacta - Duración y Orden */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Duración</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {lesson.duration} min
                </span>
              </div>
            </div>

            <div className="w-px h-8 bg-indigo-200" />

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Orden</span>
              <div className="flex items-center space-x-1">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-900">
                  #{lesson.order}
                </span>
              </div>
            </div>
          </div>

          {/* Video URL */}
          {lesson.video_url && (
            <div className="p-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Play className="w-3 h-3" />
                Video de la lección
              </div>
              <div className="text-sm font-medium text-red-700 flex items-center gap-2">
                🎥 Video disponible
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                  {lesson.is_preview ? "Preview" : "Completo"}
                </span>
              </div>
            </div>
          )}

          {/* Recursos */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Recursos ({lesson.resources.length}):
              </h4>
              <div className="flex flex-wrap gap-1">
                {lesson.resources.slice(0, 2).map((resource, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                  >
                    📄 Recurso {index + 1}
                  </span>
                ))}
                {lesson.resources.length > 2 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{lesson.resources.length - 2} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Archivos adjuntos */}
          {lesson.attached && lesson.attached.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Download className="w-4 h-4 text-indigo-500" />
                Adjuntos ({lesson.attached.length}):
              </h4>
              <div className="flex flex-wrap gap-1">
                {lesson.attached.slice(0, 2).map((attached, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                  >
                    📎 Adjunto {index + 1}
                  </span>
                ))}
                {lesson.attached.length > 2 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{lesson.attached.length - 2} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Botones de acción - Al final */}
          <div className="flex flex-col gap-2 pt-2 mt-auto">
            {/* Primera fila: Ver y Eliminar */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 text-indigo-700 hover:text-indigo-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={() => onView(lesson)}
              >
                <Eye
                  size={12}
                  className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Ver Lección
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:from-red-100 hover:to-rose-100 hover:border-red-300 text-red-700 hover:text-red-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={handleOnDelete}
              >
                <Trash2
                  size={12}
                  className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Eliminar
              </Button>
            </div>

            {/* Segunda fila: Editar centrado */}
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
              onClick={() => onEdit(lesson as LessonUpdate)}
            >
              <Pencil
                size={12}
                className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
              />
              Editar Lección
            </Button>
          </div>
        </CardContent>

        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
}
