import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialCartValue = {
  valorTotal: number;
  jogos: initialCartArray[];
  min_cart_value: number;
};

export interface initialCartArray {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: string;
  type: TypeClass;
}

interface TypeClass {
  id: number;
  type: string;
  color: string;
}

interface removeCart {
  betId: number;
  price: number;
}

const initialState: initialCartValue = {
  min_cart_value: 0,
  valorTotal: 0,
  jogos: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMinCartValue: (state, action: PayloadAction<{ min_cart_value: number }>) => {
      state.min_cart_value = action.payload.min_cart_value;
    },
    addToCart: (state, action: PayloadAction<initialCartArray>) => {
      state.jogos.push(action.payload);
      state.valorTotal += action.payload.price;
    },
    clearCart: (state) => {
      state.jogos.splice(0, state.jogos.length);
      state.valorTotal = 0;
    },

    removeFromCart: (state, action: PayloadAction<removeCart>) => {
      let index = state.jogos.findIndex((i) => i.id === action.payload.betId);
      state.jogos.splice(index, 1);
      state.valorTotal -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, addMinCartValue, clearCart } = cartSlice.actions;
