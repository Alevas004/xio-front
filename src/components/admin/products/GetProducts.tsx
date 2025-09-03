"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Product } from "@/components/byxio/ProductCard";
import { ProductUpdate } from "./ModalUpdateNew";

interface ProductCardProps {
  product: Product;
  onEdit: (body: ProductUpdate) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

export default function GetProducts({
  product,
  onEdit,
  onDelete,
  onView,
}: ProductCardProps) {
  const handleOnDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
      return;
    }
    onDelete(product.id);
  };

  return (
    <div className="group flex flex-col justify-center items-center">
      <Card className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white via-gray-50 to-white border-0 ring-1 ring-gray-200/50 hover:ring-blue-300/50">
        {/* Header con imagen y overlay */}
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />

            {/* Overlay con gradiente elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de estado flotante */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  product.isActive
                    ? "bg-emerald-500/90 text-white ring-2 ring-emerald-300/50"
                    : "bg-red-500/90 text-white ring-2 ring-red-300/50"
                }`}
              >
                {product.isActive ? "🟢 Activo" : "🔴 Inactivo"}
              </span>
            </div>

            {/* Badges especiales flotantes */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  ⭐ Destacado
                </span>
              )}
              {product.isNew && (
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  🆕 Nuevo
                </span>
              )}
              {product.hasDiscount && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  🏷️ -{product.discountValue}%
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>
          </div>

          {/* Precio destacado */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
              {product.hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  $
                  {Math.round(
                    product.price / (1 - product.discountValue / 100)
                  ).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Información adicional con iconos */}
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">📦</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Stock</p>
                <p className="text-sm font-semibold text-gray-900">
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-bold">🏷️</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Categoría</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {product.category}
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción con estilos premium */}
          <div className="flex flex-col gap-2 pt-2">
            {/* Primera fila: Ver y Editar */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-9 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 text-blue-700 hover:text-blue-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={() => onView(product)}
              >
                <Eye
                  size={14}
                  className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Ver
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-9 bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:from-red-100 hover:to-rose-100 hover:border-red-300 text-red-700 hover:text-red-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
                onClick={handleOnDelete}
              >
                <Trash2
                  size={14}
                  className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-200"
                />
                Eliminar
              </Button>
            </div>

            {/* Segunda fila: Eliminar centrado */}
            <Button
              variant="outline"
              size="sm"
              className="w-full h-9 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800 text-xs font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/btn"
              onClick={() => onEdit(product as ProductUpdate)}
            >
              <Pencil
                size={14}
                className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-200"
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
