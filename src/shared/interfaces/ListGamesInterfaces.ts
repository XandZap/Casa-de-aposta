export interface IListGamesResponse {
  min_cart_value: number;
  types: GamesType[];
}

type GamesType = {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
};

export interface IBodyCreateGame {
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
}

export interface IResponseUpdateGame {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
  created_at: Date;
  updated_at: Date;
}
