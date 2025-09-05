"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Eye,
  Calendar,
  Users,
  Award,
  Book,
} from "lucide-react";
import Image from "next/image";
import { Academy } from "./AcademyManager";
import { AcademyUpdate } from "./ModalUpdateAcademy";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";

interface AcademyCardProps {
  academy: Academy;
  onEdit: (body: AcademyUpdate) => void;
  onDelete: (id: string) => void;
  onView: (academy: Academy) => void;
}

// Función para obtener el icono según el tipo
const getTypeIcon = (type: string) => {
  switch (type) {
    case "workshop":
      return "🛠️";
    case "seminar":
      return "📚";
    case "retreat":
      return "🏞️";
    case "training":
      return "💼";
    default:
      return "🎓";
  }
};

// Función para traducir el tipo
const translateType = (type: string) => {
  switch (type) {
    case "workshop":
      return "Taller";
    case "seminar":
      return "Seminario";
    case "retreat":
      return "Retiro";
    case "training":
      return "Capacitación";
    default:
      return type;
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

export default function GetAcademies({
  academy,
  onEdit,
  onDelete,
  onView,
}: AcademyCardProps) {
  const handleOnDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar la academia "${academy.title}"?`)) {
      return;
    }
    onDelete(academy.id);
  };

  return (
    <div className="group flex flex-col justify-center items-center">
      <Card className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white via-blue-50/20 to-white border-0 ring-1 ring-blue-200/30 hover:ring-blue-400/50 h-full flex flex-col">
        {/* Header con imagen y overlay */}
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
            {academy.image ? (
              <Image
                src={academy.image}
                alt={academy.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                <Book className="w-16 h-16 text-blue-600/50" />
              </div>
            )}

            {/* Overlay con gradiente elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de estado flotante */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  academy.is_active
                    ? "bg-emerald-500/90 text-white ring-2 ring-emerald-300/50"
                    : "bg-red-500/90 text-white ring-2 ring-red-300/50"
                }`}
              >
                {academy.is_active ? "🟢 Activo" : "🔴 Inactivo"}
              </span>
            </div>

            {/* Badge de tipo flotante */}
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm capitalize">
                {getTypeIcon(academy.type)} {translateType(academy.type)}
              </span>
            </div>

            {/* Badge de tipo flotante */}
            <div className="absolute bottom-3 right-3">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-300 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm capitalize">
                {getLevelIcon(academy.level)} {translateLevel(academy.level)}
              </span>
            </div>

            {/* Badge de certificado */}
            {academy.certificate && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  🏆 Certificado
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-3 flex-1">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
              {academy.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {academy.description_short}
            </p>
          </div>

          {/* Info compacta - Precio y Capacidad */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Precio</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${academy.price.toLocaleString()}
                </span>
                <span className="text-xs text-blue-600 font-medium">COP</span>
              </div>
            </div>

            <div className="w-px h-8 bg-blue-200" />

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Capacidad</span>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {academy.enrolled}/{academy.capacity}
                </span>
              </div>
            </div>
          </div>

          {/* Fechas y duración */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <div>
                <p>
                  {formatDate(academy.start_date)}{" "}
                  <span>{formatTime(academy.start_time)}</span>
                </p>
                {academy.end_date && (
                  <p>
                    {formatDate(academy.end_date)}{" "}
                    <span>{formatTime(academy.end_time)}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-500">⏱️</span>
              <span>
                {academy.duration} horas • {academy.location}
              </span>
            </div>
          </div>

          {/* Incluye - Altura fija */}
          <div className="space-y-2 min-h-[60px]">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Award className="w-4 h-4 text-blue-500" />
              Incluye:
            </h4>
            <div className="flex flex-wrap gap-1">
              {(academy.includes || []).slice(0, 3).map((include, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {include}
                </span>
              ))}
              {(academy.includes || []).length === 0 && (
                <span className="text-xs text-gray-400 italic">
                  Sin incluidos registrados
                </span>
              )}
            </div>
          </div>

          {/* Speaker */}
          {academy.speaker && (
            <div className="p-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
              <div className="text-xs text-gray-500 mb-1">Instructor</div>
              <div className="text-sm font-semibold text-indigo-700">
                {academy.speaker}
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
                className="flex-1 h-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 text-blue-700 hover:text-blue-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={() => onView(academy)}
              >
                <Eye
                  size={12}
                  className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Ver
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
              onClick={() => onEdit(academy as AcademyUpdate)}
            >
              <Pencil
                size={12}
                className="mr-1 group-hover/btn:scale-110 transition-transform duration-200"
              />
              Editar
            </Button>
          </div>
        </CardContent>

        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
}
