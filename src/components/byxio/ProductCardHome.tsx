/* eslint-disable @next/next/no-img-element */
"use client";
import { useGet } from "@/hooks/useGet";
import { shuffle } from "@/utils/suffle";

import React from "react";

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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

const ProductCardHome = () => {
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useGet<Product[]>("/byxio/products", { withAuth: false });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar productos</p>;

  const randomProducts = products ? shuffle(products).slice(0, 3) : [];

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8 mx-auto ">
      {randomProducts &&
        randomProducts.map((product) => (
          <div
            key={product.id}
            className=" max-w-[350px] bg-[#fdf4ee] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group mx-auto"
          >
            {/* Imagen */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Imagen hover */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
              />
              {product.isFeatured && (
                <span className="absolute top-3 left-3 bg-verde-oscuro text-piel-blanco text-xs px-3 py-1 rounded-full shadow-md">
                  Destacado
                </span>
              )}
            </div>

            {/* Contenido */}
            <div className="p-5 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-verde-oscuro group-hover:text-verde-claro transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.short_description}
              </p>
              <p className="mt-3 text-xl font-bold text-verde-oscuro">
                $
                {product.price.toLocaleString("es-ES", {
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}{" "}
                <span className="text-sm text-gray-600">COP</span>
              </p>

              {/* Botón */}
              <button className="mt-4 w-full bg-verde-oscuro text-piel-blanco py-2 rounded-lg hover:bg-verde-claro hover:text-verde-oscuro transition-colors duration-300">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProductCardHome;
