"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
} from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { formatPrice } from "@/utils/formatPrice";
import {
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiTruck,
  FiGift,
  FiCreditCard,
  FiShoppingBag,
} from "react-icons/fi";

export default function CartAlmara() {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const count = useSelector((state: RootState) => selectCartCount(state));
  const items = useSelector((state: RootState) => selectCartItems(state));
  const subtotal = useSelector((state: RootState) => selectCartSubtotal(state));
  const dispatch = useDispatch();

  const freeShipping = subtotal >= 150000;
  const shippingProgress = Math.min((subtotal / 150000) * 100, 100);

  const handleAddAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className={`
          fixed top-5 right-5 md:top-20 lg:top-18 z-50 
          group overflow-hidden
          bg-gradient-2
          hover:from-verde-oscuro hover:to-piel-oscuro
          text-white rounded-full shadow-2xl
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-3xl
          ${isAnimating ? "animate-bounce" : ""}
          px-6 py-4 flex items-center gap-3
        `}
        aria-label={`Abrir carrito con ${count} productos`}
        onMouseEnter={handleAddAnimation}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

        {/* Icono del carrito */}
        <div className="relative">
          <FiShoppingBag className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full min-w-[20px] h-5 px-1 animate-pulse">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </div>

        {/* Texto */}
        <div className="hidden sm:flex flex-col items-start">
          <span className="font-semibold text-sm">Carrito</span>
          {count > 0 && (
            <span className="text-xs opacity-90">${formatPrice(subtotal)}</span>
          )}
        </div>

        {/* Pulse effect cuando está vacío */}
        {count === 0 && (
          <div className="absolute inset-0 rounded-full bg-piel-claro/30 animate-ping" />
        )}
      </button>

      {/* 🎨 OVERLAY ÉPICO MEJORADO */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slideInRight">
            {/* 🎯 HEADER ÉPICO */}
            <div className="bg-gradient-to-r from-piel-claro to-piel-oscuro p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <FiShoppingBag className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Mi Carrito</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  aria-label="Cerrar carrito"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Progress bar para envío gratis */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <FiTruck className="w-4 h-4" />
                    {freeShipping
                      ? "¡Envío GRATIS!"
                      : "Envío gratis desde $150.000"}
                  </span>
                  <span className="font-semibold">
                    $
                    {formatPrice(
                      freeShipping ? 0 : Math.max(0, 150000 - subtotal)
                    )}
                  </span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      freeShipping ? "bg-green-400" : "bg-yellow-400"
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Contador de productos */}
              <div className="text-right">
                <span className="text-sm opacity-90">
                  {count} {count === 1 ? "producto" : "productos"}
                </span>
              </div>
            </div>

            {/* 🛍️ CONTENIDO DE PRODUCTOS */}
            <div className="flex-1 overflow-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-500 mb-4">
                    ¡Agrega algunos productos increíbles!
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-gradient-to-r from-piel-oscuro to-verde-oscuro text-white px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200"
                  >
                    Explorar productos
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex gap-4">
                        {item.image && (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate mb-1">
                            {item.name}
                          </h4>
                          <p className="text-piel-oscuro font-medium mb-2">
                            ${item.price.toLocaleString()}
                          </p>

                          {/* Controles de cantidad mejorados */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-50 rounded-lg border">
                              <button
                                className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors duration-200 disabled:opacity-50"
                                onClick={() => dispatch(decreaseQty(item.id))}
                                disabled={item.quantity <= 1}
                                aria-label="Disminuir cantidad"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-semibold text-center min-w-[50px]">
                                {item.quantity}
                              </span>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
                                onClick={() => dispatch(increaseQty(item.id))}
                                aria-label="Aumentar cantidad"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              onClick={() => dispatch(removeItem(item.id))}
                              aria-label="Eliminar producto"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 💰 FOOTER ÉPICO CON TOTALES */}
            {items.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-gray-600">
                      <FiTruck className="w-4 h-4" />
                      Envío
                    </span>
                    <span className="font-semibold">
                      {freeShipping ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <FiGift className="w-4 h-4" />
                          ¡GRATIS!
                        </span>
                      ) : (
                        `$${formatPrice(17000)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-xl text-piel-oscuro">
                      ${formatPrice(subtotal + (freeShipping ? 0 : 17000))}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => dispatch(clearCart())}
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Vaciar
                  </button>
                  <Link
                    href="/checkout"
                    className="flex-2 flex items-center justify-center gap-2 bg-gradient-to-r from-piel-oscuro to-verde-oscuro text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <FiCreditCard className="w-4 h-4" />
                    Proceder al Pago
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
