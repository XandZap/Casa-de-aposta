import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialAddBet = {
  quantidadeTotal: number;
  numeros: number[];
  game: gameType;
};

type gameType = {
  gameType: string;
  price: number;
  color: string;
  id: number;
};

const initialState: initialAddBet = {
  quantidadeTotal: 0,
  numeros: [],
  game: {
    gameType: "",
    price: 0,
    color: "",
    id: 0,
  },
};

export const addBetSlice = createSlice({
  name: "addBet",
  initialState,
  reducers: {
    addGameType: (state, action: PayloadAction<gameType>) => {
      state.game.id = action.payload.id;
      state.game.gameType = action.payload.gameType;
      state.game.price = action.payload.price;
      state.game.color = action.payload.color;
    },
    addBet: (state, action: PayloadAction<number>) => {
      state.numeros.push(action.payload);
      state.quantidadeTotal++;
      state.numeros.sort((a, b) => a - b);
    },
    removeNumberToBet: (state, action: PayloadAction<number>) => {
      state.numeros.splice(state.numeros.indexOf(action.payload), 1);
      state.quantidadeTotal--;
    },
    clearNumbersToBet: (state) => {
      state.numeros = [];
      state.quantidadeTotal = 0;
    },
  },
});

export const { addBet, removeNumberToBet, clearNumbersToBet, addGameType } = addBetSlice.actions;
