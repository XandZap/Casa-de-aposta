import { IBodyCreateGame, IListGamesResponse, IResponseUpdateGame } from "@shared/interfaces";

export interface IListGames {
  getGames: () => Promise<IListGamesResponse>;
  createGame: ({
    type,
    description,
    range,
    price,
    max_number,
    color,
  }: IBodyCreateGame) => Promise<IBodyCreateGame>;
  updateGame: (
    { type, description, range, price, max_number, color }: IBodyCreateGame,
    id: number
  ) => Promise<IResponseUpdateGame>;
  deleteGame: (id: number) => Promise<string>;
}
