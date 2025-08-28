"use client";

import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

// Importamos el tipo RootState
import type { RootState } from "../store";

export type CartItem = {
  id: string;
  name: string;
  price: number; // en centavos o número, según manejes
  image?: string;
  stock?: number; // opcional: para limitar qty
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const findIndex = (items: CartItem[], id: string) =>
  items.findIndex((x) => x.id === id);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) => {
      const { id, name, price, image, stock, quantity = 1 } = action.payload;
      const i = findIndex(state.items, id);
      if (i >= 0) {
        const nextQty = state.items[i].quantity + quantity;
        // si tienes stock, respétalo
        state.items[i].quantity =
          typeof stock === "number" ? Math.min(nextQty, stock) : nextQty;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          stock,
          quantity:
            typeof stock === "number" ? Math.min(quantity, stock) : quantity,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const i = findIndex(state.items, action.payload);
      if (i >= 0) {
        const item = state.items[i];
        const nextQty = item.quantity + 1;
        item.quantity =
          typeof item.stock === "number"
            ? Math.min(nextQty, item.stock)
            : nextQty;
      }
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const i = findIndex(state.items, action.payload);
      if (i >= 0) {
        state.items[i].quantity = Math.max(1, state.items[i].quantity - 1);
      }
    },
    setQty: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const i = findIndex(state.items, id);
      if (i >= 0) {
        state.items[i].quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  setQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// ---- Selectores
// Usar RootState para tipado correcto
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart?.items || [];

export const selectCartCount = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    (items || []).reduce((acc: number, it: CartItem) => acc + it.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    (items || []).reduce(
      (acc: number, it: CartItem) => acc + it.price * it.quantity,
      0
    )
);
