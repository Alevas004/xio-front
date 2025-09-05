"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Service } from "@/app/xiomarasanchezterapeuta/services-xs/page";
import { ServiceUpdate } from "./ModalUpdateServiceXS";

interface ServiceCardProps {
  service: Service;
  onEdit: (body: ServiceUpdate) => void;
  onDelete: (id: string) => void;
  onView: (service: Service) => void;
}

export default function GetServices({
  service,
  onEdit,
  onDelete,
  onView,
}: ServiceCardProps) {
  const handleOnDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar el servicio "${service.title}"?`)) {
      return;
    }
    onDelete(service.id);
  };

  return (
    <div className="group flex flex-col justify-center items-center">
      <Card className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white via-gray-50 to-white border-0 ring-1 ring-gray-200/50 hover:ring-blue-300/50 h-full flex flex-col">
        {/* Header con imagen y overlay */}
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200">
            <video
              src={service.image}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Overlay con gradiente elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de estado flotante */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  service.is_active
                    ? "bg-emerald-500/90 text-white ring-2 ring-emerald-300/50"
                    : "bg-red-500/90 text-white ring-2 ring-red-300/50"
                }`}
              >
                {service.is_active ? "🟢 Activo" : "🔴 Inactivo"}
              </span>
            </div>

            {/* Badge de categoría flotante */}
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm capitalize">
                🧘 {service.category.replace("-", " ")}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-2 flex-1">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {service.description_short}
            </p>
          </div>

          {/* Info compacta - Precio y Duración */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Precio</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${service.price.toLocaleString()}
                </span>
                <span className="text-xs text-purple-600 font-medium">COP</span>
              </div>
            </div>

            <div className="w-px h-8 bg-purple-200" />

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Duración</span>
              <div className="flex items-center space-x-1">
                <span className="text-purple-600 text-sm">⏱️</span>
                <span className="text-sm font-semibold text-gray-900">
                  {service.duration} min
                </span>
              </div>
            </div>
          </div>

          {/* Beneficios principales - Altura fija */}
          <div className="space-y-2 min-h-[60px]">
            <h4 className="text-sm font-semibold text-gray-700">
              Beneficios principales:
            </h4>
            <div className="flex flex-wrap gap-1">
              {(service.benefits || []).slice(0, 3).map((benefit, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                >
                  {benefit}
                </span>
              ))}
              {(service.benefits || []).length === 0 && (
                <span className="text-xs text-gray-400 italic">
                  Sin beneficios registrados
                </span>
              )}
            </div>
          </div>

          {/* Botones de acción - Al final */}
          <div className="flex flex-col gap-2 pt-2 mt-auto">
            {/* Primera fila: Ver y Eliminar */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 text-blue-700 hover:text-blue-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={() => onView(service)}
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
              onClick={() => onEdit(service as ServiceUpdate)}
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
}
