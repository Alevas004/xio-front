import React from "react";
import Image from "next/image";
import {
  X,
  Clock,
  DollarSign,
  CheckCircle,
  Calendar,
  User,
  Award,
  BookOpen,
  Tag,
  Link,
  Globe,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { Course } from "./ModalUpdateCourse";

interface ModalViewCourseProps {
  course: Course;
  onClose: () => void;
}

const ModalViewCourse = ({ course, onClose }: ModalViewCourseProps) => {
  // Función para obtener el ícono de la categoría
  const getCategoryIcon = (category: string) => {
    const icons = {
      entrepreneurship: "💼",
      wellness: "🌿",
      therapy: "💆‍♀️",
      business: "�",
      "personal-development": "🌟",
      health: "�",
      spirituality: "🧘‍♀️",
    };
    return icons[category as keyof typeof icons] || "✨";
  };

  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      entrepreneurship: "from-blue-500 to-indigo-600",
      wellness: "from-green-500 to-emerald-600",
      therapy: "from-purple-500 to-violet-600",
      business: "from-orange-500 to-amber-600",
      "personal-development": "from-pink-500 to-rose-600",
      health: "from-red-500 to-pink-600",
      spirituality: "from-indigo-500 to-purple-600",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  // Función para obtener el nombre legible de la categoría
  const getCategoryName = (category: string) => {
    const names = {
      entrepreneurship: "Emprendimiento",
      wellness: "Bienestar",
      therapy: "Terapia",
      business: "Negocios",
      "personal-development": "Desarrollo Personal",
      health: "Salud",
      spirituality: "Espiritualidad",
    };
    return names[category as keyof typeof names] || category;
  };

  // Función para obtener el nombre legible del nivel
  const getLevelName = (level: string) => {
    const levels = {
      beginner: "🌱 Principiante",
      intermediate: "🚀 Intermedio",
      advanced: "🏆 Avanzado",
    };
    return levels[level as keyof typeof levels] || level;
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
          {/* Header con gradiente específico para la categoría */}
          <div
            className={`relative bg-gradient-to-br ${getCategoryColor(
              course.category
            )} p-8 text-white`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                  <span className="text-4xl">
                    {getCategoryIcon(course.category)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white text-start leading-tight">
                      {course.title}
                    </h2>
                    {course.belongsToAWorkshop && course.academy && (
                      <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30">
                        🎯 Workshop: {course.academy.title}
                      </span>
                    )}
                  </div>
                  <p className="text-white/95 text-xl font-medium">
                    {course.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30">
                      {getCategoryName(course.category)}
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium border border-white/30">
                      {getLevelName(course.level)}
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

            {/* Badge de estado y precio */}
            <div className="absolute top-8 right-20 flex items-center gap-3">
              {course.is_free ? (
                <span className="px-4 py-2 bg-green-500/20 text-green-100 rounded-full text-sm font-semibold border border-green-400/30">
                  🎁 GRATIS
                </span>
              ) : (
                <span className="px-4 py-2 bg-amber-500/20 text-amber-100 rounded-full text-sm font-semibold border border-amber-400/30">
                  💰 {formatPrice(course.price)}
                </span>
              )}
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  course.is_active
                    ? "bg-green-500/20 text-green-100 border border-green-400/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                {course.is_active ? "✅ Activo" : "❌ Inactivo"}
              </span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-8 max-h-[calc(95vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Información básica */}
              <div className="lg:col-span-1 space-y-6">
                {/* Cards de información básica */}
                <div className="grid gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200/50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-blue-800 font-semibold text-sm">
                          Duración
                        </p>
                        <p className="text-blue-700 text-lg font-bold">
                          {course.duration} horas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200/50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold text-sm">
                          Precio
                        </p>
                        <p className="text-green-700 text-lg font-bold">
                          {course.is_free
                            ? "GRATIS"
                            : formatPrice(course.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-200/50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-purple-800 font-semibold text-sm">
                          Instructor
                        </p>
                        <p className="text-purple-700 text-lg font-bold">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {course.certificate && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200/50 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                          <Award className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-800 font-semibold text-sm">
                            Certificación
                          </p>
                          <p className="text-amber-700 text-sm font-medium">
                            ✅ Incluye certificado
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* URL del curso */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-200/50 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Link className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-bold text-teal-800">
                      Enlace del Curso
                    </h3>
                  </div>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 break-all text-sm hover:underline transition-colors duration-200"
                  >
                    {course.url}
                  </a>
                </div>
              </div>

              {/* Columna central y derecha - Contenido detallado */}
              <div className="lg:col-span-2 space-y-6">
                {/* Descripción corta */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200/50 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-800">
                      Descripción Corta
                    </h3>
                  </div>
                  <p className="text-indigo-700 leading-relaxed text-lg">
                    {course.description_short}
                  </p>
                </div>

                {/* Descripción detallada */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">
                      Descripción Detallada
                    </h3>
                  </div>
                  <div className="text-purple-700 leading-relaxed">
                    {course.description_long
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Lo que incluye el curso */}
                {course.includes && course.includes.length > 0 && (
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200/50 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-emerald-800">
                        ¿Qué Incluye?
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.includes.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="text-emerald-600 mt-1 font-bold">
                            ✓
                          </div>
                          <p className="text-emerald-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags del curso */}
                {course.tags && course.tags.length > 0 && (
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-200/50 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-rose-500/20 rounded-lg">
                        <Tag className="h-5 w-5 text-rose-600" />
                      </div>
                      <h3 className="text-xl font-bold text-rose-800">Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-200/50 text-rose-700 rounded-full text-sm font-medium border border-rose-300/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Imágenes del curso */}
                {course.images && course.images.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200/50 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-slate-500/20 rounded-lg">
                        <Globe className="h-5 w-5 text-slate-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Recursos Visuales
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {course.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={imageUrl}
                            alt={`Recurso ${index + 1} del curso`}
                            width={200}
                            height={128}
                            className="w-full h-32 object-cover rounded-xl border border-slate-300/50 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Información de fechas y metadata */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-5 rounded-2xl border border-gray-200/50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-500/20 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold text-sm">
                          Creado el
                        </p>
                        <p className="text-gray-700 text-sm">
                          {formatDate(course.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-5 rounded-2xl border border-gray-200/50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-500/20 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold text-sm">
                          Última actualización
                        </p>
                        <p className="text-gray-700 text-sm">
                          {formatDate(course.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con acciones */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Globe className="h-4 w-4" />
                  <span>ID: {course.id}</span>
                  <span>•</span>
                  <span>Slug: {course.slug}</span>
                </div>
                <button
                  onClick={onClose}
                  className={`px-8 py-3 bg-gradient-to-r ${getCategoryColor(
                    course.category
                  )} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 shadow-md`}
                >
                  ✨ Cerrar Vista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewCourse;
