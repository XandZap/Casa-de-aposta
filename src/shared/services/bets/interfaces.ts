import { IBodyNewBet, IResponseListBet, IResponseNewBet } from "@shared/interfaces";

export interface IUser {
  listBet: () => Promise<IResponseListBet>;
  saveNewBet: (games: IBodyNewBet) => Promise<IResponseNewBet>;
  filterBets: (id: string) => Promise<IResponseListBet>;
}
