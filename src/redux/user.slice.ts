import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type initialUserValue = {
  user: User;
  token: Token;
};

interface Token {
  type: string;
  token: string;
  expires_at: string | Date;
}

interface User {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: string | null;
  token_created_at: Date | null;
  created_at: string | Date;
  updated_at: string | Date;
  picture?: null;
}

const initialState: initialUserValue = {
  user: {
    id: 0,
    email: "",
    is_admin: 0,
    name: "",
    token: null,
    token_created_at: null,
    created_at: "",
    updated_at: "",
    picture: null,
  },
  token: {
    type: "",
    token: "",
    expires_at: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    addUser: (state, action: PayloadAction<initialUserValue>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    removeUser: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      localStorage.clear();
    },

    addResetPassUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    getUser: (state) => {
      const newUser = JSON.parse(localStorage.getItem("user") || "{}");
      const newToken = JSON.parse(localStorage.getItem("token") || "{}");
      state.user = newUser;
      state.token = newToken;
    },
  },
});

export const { addUser, removeUser, addResetPassUser, getUser } = userSlice.actions;
