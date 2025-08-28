/* eslint-disable @next/next/no-img-element */
"use client";

import { addItem } from "@/redux/slices/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

const ProductCard = ({ products }: { products: Product[] }) => {
  const dispatch = useDispatch();
  const handleProductById = (id: string) => {
    // Redirigir a la página del producto
    window.location.href = `/almarabyxio/products/${id}`;
  };

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8 mx-auto ">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className=" max-w-[350px] bg-piel-blanco rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group mx-auto"
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
              <button
                className="mt-3 w-full bg-piel-oscuro text-white py-2 rounded"
                onClick={() =>
                  dispatch(
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      stock: product.stock, // opcional
                      quantity: 1,
                    })
                  )
                }
              >
                Añadir al carrito
              </button>
              <button
                onClick={() => handleProductById(product.slug)}
                className="mt-2 w-full bg-verde-claro text-verde-oscuro py-2 rounded-lg hover:bg-verde-oscuro hover:text-piel-blanco transition-colors duration-300"
              >
                Ver más detalles
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProductCard;
