import { IBodyNewBet, IResponseListBet, IResponseNewBet } from "@shared/interfaces";

export interface IUser {
  listBet: (token: string) => Promise<IResponseListBet>;
  saveNewBet: (games: IBodyNewBet, token: string) => Promise<IResponseNewBet>;
  filterBets: (id: string, token: string) => Promise<IResponseListBet>;
}
