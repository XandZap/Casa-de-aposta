export interface IBodyAuth {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: Data;
  status: number;
  statusText: string;
  request: Request;
}

interface Data {
  user: User;
  token: Token;
}

interface Token {
  type: string;
  token: string;
  expires_at: Date;
}

interface User {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: null;
  token_created_at: null;
  created_at: Date;
  updated_at: Date;
  picture: null;
}

export interface IBodyReset {
  email: string;
}

export interface IResetResponse {
  data: DataReset;
  status: number;
  statusText: string;
  headers: WelcomeHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: ConfigHeaders;
  baseURL: string;
  method: string;
  url: string;
  data: string;
}

export interface ConfigHeaders {
  Accept: string;
  "Content-Type": string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface DataReset {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: string;
  token_created_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface WelcomeHeaders {
  "content-length": string;
  "content-type": string;
}

export interface Request {}

export interface IBodyChangePassword {
  password: string;
}

export interface IChangePasswordResponse {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
