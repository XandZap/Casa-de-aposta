export interface getData {
  data: Data;
  status: number;
  statusText: string;
  headers: WelcomeHeaders;
  config: Config;
  request: Request;
}

interface Config {
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
}

interface ConfigHeaders {
  Accept: string;
}

interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface Data {
  min_cart_value: number;
  types: Type[];
}

interface Type {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
}

interface WelcomeHeaders {
  "content-length": string;
  "content-type": string;
}

interface Request {}

export interface InitialGames  {
  min_cart_value: number;
  types: GameType[];
};

export interface GameType {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
};