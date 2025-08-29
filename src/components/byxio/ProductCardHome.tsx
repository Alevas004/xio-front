/* eslint-disable @next/next/no-img-element */

import { shuffle } from "@/utils/suffle";

import React from "react";
import { Product } from "./ProductCard";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";


const ProductCardHome = ({ products }: { products: Product[] }) => {
  const randomProducts = products ? shuffle(products).slice(0, 3) : [];

  const discounts = products.map(
    (product) => product.price - product.price * (product.discountValue / 100)
  );

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
                {product.hasDiscount
                  ? formatPrice(discounts[products.indexOf(product)])
                  : formatPrice(product.price)}
              </p>
              {product.hasDiscount && (
                <span className="text-sm text-gray-600 line-through">
                  ${formatPrice(product.price)}
                </span>
              )}

              {/* Botón */}
              <Link href={`/almarabyxio/products/${product.slug}`} className="mt-4 w-full bg-gradient-2 text-white py-2 rounded-lg hover:bg-verde-claro hover:text-white transition-colors duration-300">
                Ver Producto
              </Link>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProductCardHome;
