export interface IBodyNewBet {
  games: Game[];
}

interface Game {
  game_id: number;
  numbers: number[];
}

export interface IResponseNewBet {
  bet: Bet[];
}

interface Bet {
  choosen_numbers: string;
  user_id: number;
  game_id: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  id: number;
}

export interface IResponseListBet {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: Date;
  type: TypeClass;
}

interface TypeClass {
  id: number;
  type: TypeEnum;
}

enum TypeEnum {
  Lotofácil = "Lotofácil",
  MegaSena = "Mega-Sena",
  Quina = "Quina",
}
