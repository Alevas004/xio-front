"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function CartAlmara() {
  const [open, setOpen] = useState(false);
  const count = useSelector((state: RootState) => selectCartCount(state));
  const items = useSelector((state: RootState) => selectCartItems(state));
  const subtotal = useSelector((state: RootState) => selectCartSubtotal(state));
  const dispatch = useDispatch();

  return (
    <div>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-5 md:top-25 lg:top-20 z-50 rounded-full shadow-xl px-5 py-3 bg-gradient-2 text-white flex items-center gap-3"
        aria-label="Abrir carrito"
      >
        <span>🛒</span>
        <span className="font-semibold">Carrito</span>
        {count > 0 && (
          <span className="ml-1 inline-flex items-center justify-center text-xs bg-white text-piel-oscuro rounded-full w-6 h-6">
            {count}
          </span>
        )}
      </button>

      {/* Overlay + Drawer */}
      {open && (
        <div className="fixed inset-0 z-100">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto divide-y">
              {items.length === 0 ? (
                <p className="p-4 text-gray-500">Tu carrito está vacío.</p>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="flex gap-3 p-3 items-center">
                    {it.image && (
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm text-gray-500">
                        ${it.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="px-2 border"
                          onClick={() => dispatch(decreaseQty(it.id))}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{it.quantity}</span>
                        <button
                          className="px-2 border"
                          onClick={() => dispatch(increaseQty(it.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(it.price * it.quantity).toLocaleString()}
                      </p>
                      <button
                        className="text-xs text-red-600 underline mt-1"
                        onClick={() => dispatch(removeItem(it.id))}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 border px-4 py-2 rounded"
                  onClick={() => dispatch(clearCart())}
                >
                  Vaciar
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 text-center bg-piel-oscuro text-white px-4 py-2 rounded"
                  onClick={() => setOpen(false)}
                >
                  Ir a pagar
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
