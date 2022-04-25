import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialGames } from "./interfaces";

const initialState: InitialGames = {
  min_cart_value: 0,
  types: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    replaceGames: (state, action: PayloadAction<InitialGames>) => {
      state.min_cart_value = action.payload.min_cart_value;
      state.types = action.payload.types;
    },
  },
});

export const { replaceGames } = gamesSlice.actions;
