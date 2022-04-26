import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

export interface initialRecentBetsValue {
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
}

const initialState: initialRecentBetsValue[] = [];

export const recentBetSlice = createSlice({
  name: "recentBet",
  initialState,
  reducers: {
    addRecentBet: (state, action: PayloadAction<initialRecentBetsValue>) => {
      state.push({
        id: action.payload.id,
        user_id: action.payload.user_id,
        game_id: action.payload.game_id,
        choosen_numbers: action.payload.choosen_numbers,
        price: action.payload.price,
        created_at: action.payload.created_at,
        type: { id: action.payload.type.id, type: action.payload.type.type },
      });
    },

    getRecentBet: (state, action: PayloadAction<initialRecentBetsValue[]>) => {
      state.splice(0, state.length);
      action.payload.forEach((element, index) => {
        state.splice(index, 0, element);
      });

      // action.payload.forEach((element) => {
      //   state.push({
      //     id: element.id,
      //     user_id: element.user_id,
      //     game_id: element.game_id,
      //     choosen_numbers: element.choosen_numbers,
      //     price: element.price,
      //     created_at: element.created_at,
      //     type: { id: element.type.id, type: element.type.type },
      //   });
      // });
    },

    getFilteredBet: (state, action: PayloadAction<initialRecentBetsValue[]>) => {
      state.splice(0, state.length);
      action.payload.forEach((element, index) => {
        state.splice(0, 0, element);
      });
    },
  },
});

export const { addRecentBet, getRecentBet, getFilteredBet } = recentBetSlice.actions;
