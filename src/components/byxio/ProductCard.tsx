/* eslint-disable @next/next/no-img-element */
"use client";

import { addItem } from "@/redux/slices/cartSlice";
import { formatPrice } from "@/utils/formatPrice";
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
  discountValue: number;
  isNew: boolean;
  hasDiscount: boolean;
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

const ProductCard = ({ products }: { products: Product[] }) => {
  const dispatch = useDispatch();
  const handleProductById = (slug: string) => {
    // Redirigir a la página del producto
    window.location.href = `/almarabyxio/products/${slug}`;
  };

  const discounts = products.map((product) =>
    product.price - (product.price * (product.discountValue / 100))
  );

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8 mx-auto ">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className=" max-w-[350px] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group mx-auto"
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
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Destacado
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Nuevo
                </span>
              )}
              {product.hasDiscount && (
                <span className="absolute bottom-3 right-3 bg-red-500 text-white  font-bold text-sm px-3 py-1 rounded-full shadow-md">
                  -{product.discountValue}%
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
                {product.hasDiscount ? (
                  formatPrice(discounts[products.indexOf(product)])
                ) : (
                  formatPrice(product.price)
                )}
               
              </p>
               {product.hasDiscount && (
                  <span className="text-sm text-gray-600 line-through">
                    ${formatPrice(product.price)}
                  </span>
                )}

              {/* Botón */}
              {product.isSold ? (
                <button
                  className="mt-3 w-full bg-black text-white font-bold py-2 rounded cursor-not-allowed"
                  disabled
                >
                  Agotado
                </button>
              ) : (
                <button
                  className="mt-3 w-full bg-verde-oscuro text-white font-bold py-2 rounded cursor-pointer"
                  onClick={() =>
                    dispatch(
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.hasDiscount ? discounts[products.indexOf(product)] : product.price,
                        image: product.image,
                        stock: product.stock, // opcional
                        quantity: 1,
                      })
                    )
                  }
                >
                  Añadir al carrito
                </button>
              )}

              <button
                onClick={() => handleProductById(product.slug)}
                className="mt-2 w-full border-1 border-verde-oscuro cursor-pointer text-verde-oscuro py-2 rounded-lg hover:bg-verde-oscuro hover:text-white transition-colors duration-300"
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
