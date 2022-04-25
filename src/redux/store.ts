import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addBetSlice } from "./addBet.slice";
import { cartSlice } from "./cart.slice";
import { gamesSlice } from "./games.slice";
import { recentBetSlice } from "./recentBets.slice";

const store = configureStore({
  reducer: {
    games: gamesSlice.reducer,
    numbersToBet: addBetSlice.reducer,
    cart: cartSlice.reducer,
    recentBet: recentBetSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectGames = (state: RootState) => state.games;
export const selectNumbersToBet = (state: RootState) => state.numbersToBet;
export const selectCart = (state: RootState) => state.cart;
export const selectRecentBet = (state: RootState) => state.recentBet;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
