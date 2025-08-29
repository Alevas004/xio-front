'use client'
import { Product } from '@/app/almarabyxio/products/[slug]/page';
import React, { useState } from 'react'

const InfoTabsSlug = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");






  return (
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
  )
}

export default InfoTabsSlug