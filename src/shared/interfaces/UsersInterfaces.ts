export interface IUpdateAuth {
  email: string;
  name: string;
}

export interface IUpdateResponse {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: null;
  token_created_at: null;
  created_at: Date;
  updated_at: Date;
}

interface Token {
  type: string;
  token: string;
  expires_at: Date;
}

export interface IBodyRegister {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  user: UserRegister;
  token: Token;
}

interface UserRegister {
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  id: number;
}

export interface IGetUserResponse {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: null;
  token_created_at: null;
  created_at: Date;
  updated_at: Date;
  bets: any[];
  picture: null;
}
