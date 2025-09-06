"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Eye,
  Award,
  GraduationCap,
  Star,
  Clock,
  Link,
  User,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { Course, CourseUpdate } from "./ModalUpdateCourse";

interface CourseCardProps {
  course: Course;
  onEdit: (body: CourseUpdate) => void;
  onDelete: (id: string) => void;
  onView: (course: Course) => void;
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

// Función para obtener el icono según el nivel
const getLevelIcon = (level: string) => {
  switch (level) {
    case "beginner":
      return "🌱";
    case "intermediate":
      return "🚀";
    case "advanced":
      return "🏆";
    default:
      return "⚪";
  }
};

// Función para traducir el nivel
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

export default function GetCourses({
  course,
  onEdit,
  onDelete,
  onView,
}: CourseCardProps) {
  const handleOnDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar el curso "${course.title}"?`)) {
      return;
    }
    onDelete(course.id);
  };

  return (
    <div className="group flex flex-col justify-center items-center">
      <Card className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white via-purple-50/20 to-white border-0 ring-1 ring-purple-200/30 hover:ring-purple-400/50 h-full flex flex-col">
        {/* Header con imagen y overlay */}
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-200">
            {course.url ? (
              <Image
                src={course.url}
                alt={course.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-indigo-300 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-purple-600/50" />
              </div>
            )}

            {/* Overlay con gradiente elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de estado flotante */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  course.is_active
                    ? "bg-emerald-500/90 text-white ring-2 ring-emerald-300/50"
                    : "bg-red-500/90 text-white ring-2 ring-red-300/50"
                }`}
              >
                {course.is_active ? "🟢 Activo" : "🔴 Inactivo"}
              </span>
            </div>

            {/* Badge de tipo flotante - Workshop o Independiente */}
            <div className="absolute top-3 left-3">
              <span className={`text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm capitalize ${
                course.belongsToAWorkshop 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}>
                {course.belongsToAWorkshop 
                  ? `🛠️ Del Workshop: ${course.academy?.title}` 
                  : "🎓 Curso Independiente"
                }
              </span>
            </div>

            {/* Badge de nivel flotante */}
            <div className="absolute bottom-3 right-3">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-300 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm capitalize">
                {getLevelIcon(course.level)} {translateLevel(course.level)}
              </span>
            </div>

            {/* Badge de certificado */}
            {course.certificate && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  🏆 Certificado
                </span>
              </div>
            )}

            {/* Badge de gratuito/pago */}
            {course.is_free && (
              <div className="absolute top-12 right-3">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  🆓 GRATIS
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-3 flex-1">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
              {course.title}
            </h3>
            <p className="text-sm text-purple-600 font-medium">
              {course.subtitle}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {course.description_short}
            </p>
          </div>

          {/* Categoría */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
              {getCategoryIcon(course.category)} {translateCategory(course.category)}
            </span>
          </div>

          {/* Info compacta - Precio y Duración */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Precio</span>
              <div className="flex items-baseline space-x-1">
                {course.is_free ? (
                  <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    GRATIS
                  </span>
                ) : (
                  <>
                    <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${course.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-purple-600 font-medium">COP</span>
                  </>
                )}
              </div>
            </div>

            <div className="w-px h-8 bg-purple-200" />

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Duración</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {course.duration}h
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Star className="w-4 h-4 text-purple-500" />
                Tags:
              </h4>
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {course.tags.length > 4 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{course.tags.length - 4} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Incluye - Altura fija */}
          <div className="space-y-2 min-h-[60px]">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Award className="w-4 h-4 text-purple-500" />
              Incluye:
            </h4>
            <div className="flex flex-wrap gap-1">
              {(course.includes || []).slice(0, 3).map((include, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  ✨ {include}
                </span>
              ))}
              {(course.includes || []).length === 0 && (
                <span className="text-xs text-gray-400 italic">
                  Sin incluidos registrados
                </span>
              )}
            </div>
          </div>

          {/* Instructor */}
          {course.instructor && (
            <div className="p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <User className="w-3 h-3" />
                Instructor
              </div>
              <div className="text-sm font-semibold text-indigo-700">
                👨‍🏫 {course.instructor}
              </div>
            </div>
          )}

          {/* Información del Workshop si pertenece a uno */}
          {course.belongsToAWorkshop && course.academy && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Link className="w-3 h-3" />
                Parte del Workshop
              </div>
              <div className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                <div className="flex-1">
                  🛠️ {course.academy.title}
                </div>
                <div className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  {course.academy.type}
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                📅 {new Date(course.academy.start_date).toLocaleDateString('es-ES')} - {course.academy.location}
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
                className="flex-1 h-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 hover:from-purple-100 hover:to-indigo-100 hover:border-purple-300 text-purple-700 hover:text-purple-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={() => onView(course)}
              >
                <Eye
                  size={12}
                  className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Ver Curso
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
              onClick={() => onEdit(course as CourseUpdate)}
            >
              <Pencil
                size={12}
                className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
              />
              Editar Curso
            </Button>
          </div>
        </CardContent>

        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
}
