import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type initialCartValue = {
  valorTotal: number;
  jogos: initialCartArray[];
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
  valorTotal: 0,
  jogos: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<initialCartArray>) => {
      state.jogos.push(action.payload);
      state.valorTotal += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<removeCart>) => {
      let index = state.jogos.findIndex((i) => i.id === action.payload.betId);
      state.jogos.splice(index, 1);
      state.valorTotal -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
