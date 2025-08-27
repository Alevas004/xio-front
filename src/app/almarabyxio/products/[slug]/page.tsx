"use client";
import { useGet } from "@/hooks/useGet";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import {
  FiShoppingCart,
  FiShare2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiMinus,
  FiPlus,
  FiZoomIn,
} from "react-icons/fi";

export interface Product {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  stock: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isSold: boolean;
  slug: string;
  caracteristics: string[] | null;
  includes: string[] | null;
  createdAt: string;
  updatedAt: string;
}

const ProductById = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");

  const {
    data: product,
    loading,
    error,
  } = useGet<Product>(`/byxio/products/${slug}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-oscuro"></div>
          <p className="text-verde-oscuro font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600">
            Lo sentimos, no pudimos cargar este producto.
          </p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const allImages = [product.image, ...product.images];
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <span className="text-gray-500">Inicio</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500 capitalize">{product.category}</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-verde-oscuro font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
              <Image
                src={allImages[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                <FiZoomIn className="w-5 h-5 text-gray-700" />
              </button>
              {product.isFeatured && (
                <div className="absolute top-4 left-4 bg-verde-oscuro text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destacado
                </div>
              )}
              {product.stock <= 30 && product.stock > 0 && (
                <div className=" absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ¡Solo quedan {product.stock}!
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-verde-oscuro shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                {/* <span className="text-sm text-gray-600">(4.8) • 124 reseñas</span> */}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.short_description}
              </p>
            </div>

            {/* Precio */}
            <div className="bg-gradient-to-r from-verde-claro/20 to-piel-claro/20 rounded-xl p-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-verde-oscuro">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.price * 1.2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  -17%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Precio incluye IVA • Envío gratis por compras superiores a
                $150.000
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-piel-claro/50 text-verde-oscuro rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Cantidad y acciones */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">Cantidad:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stock} disponibles)
                </span>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-verde-oscuro text-white py-3 px-6 rounded-xl font-medium hover:bg-verde-claro hover:text-verde-oscuro transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Agregar al carrito</span>
                </button>

                <button className="p-3 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-verde-oscuro hover:text-verde-oscuro transition-all duration-300">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiTruck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-start text-gray-900">
                    Envío gratis
                  </p>
                  <p className="text-sm text-gray-600">
                    En compras superiores a $150.000
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiShield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium  text-start text-gray-900">
                    Garantía de calidad
                  </p>
                  <p className="text-sm text-gray-600">
                    30 días para devoluciones
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiRefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium  text-start text-gray-900">
                    Cambios fáciles
                  </p>
                  <p className="text-sm text-gray-600">Sin complicaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de información detallada */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: "description", label: "Descripción" },
                { key: "specs", label: "Especificaciones" },
                // { key: 'reviews', label: 'Reseñas (124)' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? "border-verde-oscuro text-verde-oscuro"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.long_description}
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Características principales
                    </h3>
                    {product.caracteristics ? (
                      product.caracteristics.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-verde-oscuro rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <p>No hay características disponibles.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      ¿Qué incluye?
                    </h3>
                    {product.includes ? (
                      product.includes.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-verde-oscuro rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <p>No hay información disponible.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Especificaciones técnicas
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Categoría:</dt>
                      <dd className="font-medium capitalize">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Stock disponible:</dt>
                      <dd className="font-medium">{product.stock} unidades</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Estado:</dt>
                      <dd className="font-medium">
                        {product.isActive ? "Activo" : "Inactivo"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Fecha de creación:</dt>
                      <dd className="font-medium">
                        {new Date(product.createdAt).toLocaleDateString(
                          "es-CO"
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {/* {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Próximamente reseñas!</h3>
                  <p className="text-gray-600">Estamos trabajando en esta funcionalidad.</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
