"use client";
import { Product } from "@/app/almarabyxio/products/[slug]/page";
import Image from "next/image";
import React from "react";
import { FiZoomIn } from "react-icons/fi";

const ImagesSlug = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const allImages = [product.image, ...product.images];

  return (
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

        {product.isSold && (
          <div className="absolute w-full h-full top-0 left-0 bg-black/70 text-white px-3 py-1 text-sm font-medium">
            <h3 className="text-4xl font-semibold text-white absolute top-1/2 translate-y-[-50%] translate-x-[-50%] left-1/2">AGOTADO</h3>
          </div>
        )}

       
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-verde-oscuro text-white px-3 py-1 rounded-full text-sm font-medium">
            Destacado
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Nuevo
          </div>
        )}
        {product.hasDiscount && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
            -{product.discountValue}%
          </div>
        )}
        {product.stock <= 20 && product.stock > 0 && (
          <div className=" absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ¡Solo quedan {product.stock}!
          </div>
        )}
        {product.stock == 0 && (
          <div className=" absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ¡Agotado! Pronto más stock
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
  );
};

export default ImagesSlug;
