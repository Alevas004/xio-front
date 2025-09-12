import React from "react";
import {
  X,
  Sparkles,
  Clock,
  Heart,
  Star,
  CheckCircle,
  Calendar,
  User,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { Academy } from "./AcademyManager";

interface ModalViewAcademyProps {
  academy: Academy;
  onClose: () => void;
}

const ModalViewAcademy = ({ academy, onClose }: ModalViewAcademyProps) => {
  // Función para obtener el ícono de la categoría
  const getCategoryIcon = (category: string) => {
    const icons = {
      "masaje-prenatal": "🤰",
      "masaje-terapeutico": "🧘‍♀️",
      "drenaje-linfatico": "💧",
      reflexologia: "👣",
      aromaterapia: "🌸",
      relajacion: "🕯️",
    };
    return icons[category as keyof typeof icons] || "✨";
  };

  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      "masaje-prenatal": "from-pink-500 to-rose-600",
      "masaje-terapeutico": "from-purple-500 to-indigo-600",
      "drenaje-linfatico": "from-blue-500 to-cyan-600",
      reflexologia: "from-green-500 to-emerald-600",
      aromaterapia: "from-violet-500 to-purple-600",
      relajacion: "from-amber-500 to-orange-600",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
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
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con gradiente específico para la categoría */}
          <div
            className={`relative bg-gradient-to-br ${getCategoryColor(
              academy.type
            )} p-6 text-white`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <span className="text-3xl">
                    {getCategoryIcon(academy.type)}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white text-start leading-tight">
                    {academy.title}
                  </h2>
                  <p className="text-white/90 text-lg text-start capitalize font-medium mt-1">
                    {academy.type.replace("-", " ")}
                  </p>
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

            {/* Badge de estado */}
            <div className="absolute top-6 right-20">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  academy.is_active
                    ? "bg-green-500/20 text-green-100 border border-green-400/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                {academy.is_active ? "✅ Activo" : "❌ Inactivo"}
              </span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-8 max-h-[calc(90vh-140px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna izquierda - Imagen y detalles principales */}
              <div className="space-y-6">
                {/* Imagen del servicio */}
                <div className="relative group">
                  {academy.image ? (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">

                        {academy.image.endsWith(".mp4") ? (
                          <video
                            className="w-full h-80 object-cover"
                            src={academy.image}
                            autoPlay
                            muted
                            loop
                          />
                        ) : (
                          <Image
                            src={academy.image}
                            alt={academy.title}
                            width={500}
                            height={350}
                            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                 
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-semibold text-lg drop-shadow-lg">
                          {academy.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl border-2 border-dashed border-purple-300">
                      <Sparkles className="h-16 w-16 text-purple-400 mb-4" />
                      <p className="text-purple-600 font-semibold text-lg">
                        Imagen del Servicio
                      </p>
                      <p className="text-purple-500 text-sm">No disponible</p>
                    </div>
                  )}
                </div>

                {/* Información básica en cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold text-sm">
                          Duración
                        </p>
                        <p className="text-green-700 text-lg font-bold">
                          {academy.duration} min
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-2xl border border-blue-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Heart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-blue-800 font-semibold text-sm">
                          Precio
                        </p>
                        <p className="text-blue-700 text-lg font-bold">
                          {formatPrice(academy.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Información detallada */}
              <div className="space-y-6">
                {/* Descripción */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">
                      Descripción del Servicio
                    </h3>
                  </div>
                  <p className="text-purple-700 leading-relaxed">
                    {academy.description_long}
                  </p>
                </div>

                {/* Beneficios */}
                {academy.includes && academy.includes.length > 0 && (
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-200/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-rose-500/20 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-rose-600" />
                      </div>
                      <h3 className="text-xl font-bold text-rose-800">
                        Beneficios
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {academy.includes.map((include, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="text-rose-600 mt-1">✓</div>
                          <p className="text-rose-700 leading-relaxed">
                            {include}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Información adicional */}
                {academy.requirements && academy.requirements.length > 0 && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-amber-500/20 rounded-lg">
                        <Star className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold text-amber-800">
                        Requisitos
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {academy.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="text-amber-600 mt-1">•</div>
                          <p className="text-amber-700 leading-relaxed">
                            {requirement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Información del instructor */}
                {academy.speaker && (
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-200/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-teal-500/20 rounded-lg">
                        <User className="h-5 w-5 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-bold text-teal-800">
                        Instructor
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-teal-700 font-semibold">
                        {academy.speaker}
                      </p>
                    </div>
                  </div>
                )}

                {/* Información de fechas */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-2xl border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-500/20 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-semibold text-sm">
                          Creado el
                        </p>
                        <p className="text-gray-700 text-sm">
                          {formatDate(academy.createdAt)}
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
                  <MapPin className="h-4 w-4" />
                  <span>ID: {academy.id}</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Cerrar Vista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewAcademy;
