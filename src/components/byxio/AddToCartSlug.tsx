"use client";
import { Product } from "@/app/almarabyxio/products/[slug]/page";
import { addItem } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { FiMinus, FiPlus, FiShare2, FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";

const AddToCartSlug = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity,
      })
    );
    setTimeout(() => {
      // Reset quantity after adding to cart
      setQuantity(1);
    }, 500);
  };

  return (
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
        <button
          className="flex-1 bg-verde-oscuro text-white py-3 px-6 rounded-xl font-medium hover:bg-verde-claro hover:text-verde-oscuro transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          onClick={handleAddToCart}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>Agregar al carrito</span>
        </button>

        <button className="p-3 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-verde-oscuro hover:text-verde-oscuro transition-all duration-300">
          <FiShare2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AddToCartSlug;
