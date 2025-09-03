import { Product } from "@/components/byxio/ProductCard";
import React from "react";
import {
  X,
  Package,
  DollarSign,
  Tag,
  Calendar,
  Info,
  Star,
  CheckCircle,
  Gift,
  Hash,
  Zap,
  Crown,
  Eye,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

interface ModalViewProductProps {
  product: Product;
  onClose: () => void;
}

const ModalViewProduct = ({ product, onClose }: ModalViewProductProps) => {

 
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
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con gradiente espectacular */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white text-start">Vista Detallada</h2>
                  <p className="text-white text-sm text-start">
                    Información completa del producto
                  </p>
                </div>
              </div>

              {/* Botón cerrar elegante */}
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 cursor-pointer rounded-full transition-all duration-200 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna izquierda - Imagen */}
              <div className="space-y-6">
                <div className="relative group">
                  {product.image ? (
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={320}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement?.nextElementSibling?.classList.remove(
                            "hidden"
                          );
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : null}

                  {/* Placeholder si no hay imagen */}
                  <div
                    className={`${
                      product.image ? "hidden" : ""
                    } flex items-center justify-center h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300`}
                  >
                    <div className="text-center text-gray-500">
                      <Package className="h-16 w-16 mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-medium">
                        Sin imagen disponible
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badge de estado */}
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      product.stock && product.stock > 0
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        product.stock && product.stock > 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    {product.stock && product.stock > 0
                      ? "En Stock"
                      : "Agotado"}
                  </span>
                </div>
              </div>

              {/* Columna derecha - Información */}
              <div className="space-y-6">
                {/* Título y precio destacado */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h3>
                    {product.category && (
                      <div className="flex items-center mt-2">
                        <Tag className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Precio espectacular */}
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-center md:justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-sm text-green-600 font-medium">
                              Precio
                            </p>
                            <p className="text-3xl font-bold text-green-800">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                        <Star className="h-8 w-8 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                {(product.short_description || product.long_description) && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Descripción
                        </h4>
                        {product.long_description ? (
                          <p className="text-gray-700 leading-relaxed">
                            {product.long_description}
                          </p>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {product.short_description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Segunda sección: Información detallada en full width */}
            <div className="space-y-6 mt-5">
              {/* Tags del producto */}
              {product.tags && product.tags.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                  <div className="flex items-center justify-center  space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Hash className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-3">
                        Etiquetas
                      </h4>
                      <div className="flex flex-wrap justify-center items-center gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full border border-purple-200 hover:bg-purple-200 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid para características e incluye */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Características del producto */}
                {product.caracteristics &&
                  product.caracteristics.length > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Características
                          </h4>
                          <ul className="space-y-2">
                            {product.caracteristics.map(
                              (characteristic, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm leading-relaxed">
                                    {characteristic}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Qué incluye */}
                {product.includes && product.includes.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Gift className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Incluye en el kit
                        </h4>
                        <ul className="space-y-2">
                          {product.includes.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Gift className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Estados y badges del producto */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Shield className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 ">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Estado del Producto
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {/* Activo */}
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-lg ${
                            product.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {product.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </div>

                        {/* Destacado */}
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-lg ${
                            product.isFeatured
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Crown className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {product.isFeatured ? "Destacado" : "No Destacado"}
                          </span>
                        </div>

                        {/* Nuevo */}
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-lg ${
                            product.isNew
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Zap className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {product.isNew ? "Nuevo" : "Estándar"}
                          </span>
                        </div>

                        {/* Descuento */}
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-lg ${
                            product.hasDiscount
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <DollarSign className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {product.hasDiscount
                              ? `${product.discountValue}% OFF`
                              : "Sin descuento"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información técnica adicional */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Slug */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Hash className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold text-start">
                          Slug URL
                        </p>
                        <p className="text-sm font-mono text-gray-900 break-all text-start">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vendido */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          product.isSold ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        <Package
                          className={`h-4 w-4 ${
                            product.isSold ? "text-red-600" : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold text-start">
                           ¿Aun hay existencias?
                        </p>
                        <p
                          className={`text-sm font-bold text-start ${
                            product.isSold ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {product.isSold ? "Agotado" : "Disponible"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Valor descuento (si tiene) */}
                  {product.hasDiscount && product.discountValue > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <DollarSign className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-bold text-start">
                            Descuento
                          </p>
                          <p className="text-lg font-bold text-red-600 text-start">
                            {product.discountValue}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Información técnica */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ID */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold text-start">
                          ID del Producto
                        </p>
                        <p className="text-xs font-mono text-gray-900 break-all text-start">
                          {product.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stock */}
                  {product.stock !== undefined && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            product.stock > 0 ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <Package
                            className={`h-4 w-4 ${
                              product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Stock Disponible
                          </p>
                          <p
                            className={`text-lg font-bold ${
                              product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.stock} unidades
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fechas */}
                <div className="space-y-3">
                  {product.createdAt && (
                    <div className="flex items-center justify-center gap-3 py-3 px-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900 text-start">
                          Fecha de Creación:
                        </span>
                      </div>
                      <span className="text-blue-700 font-medium">
                        {formatDate(product.createdAt)}
                      </span>
                    </div>
                  )}

                  {product.updatedAt &&
                    product.updatedAt !== product.createdAt && (
                      <div className="flex items-center justify-center gap-3 py-3 px-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-amber-600" />
                          <span className="font-medium text-amber-900 text-start">
                            Última Actualización: 
                          </span>
                        </div>
                        <span className="text-amber-700 font-medium">
                          {formatDate(product.updatedAt)}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer con acción */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Cerrar Vista
              </button>
              <div className="text-sm text-gray-500">
                Presiona{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd>{" "}
                para cerrar
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewProduct;
