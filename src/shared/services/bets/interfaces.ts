import { IBodyNewBet, IResponseListBet, IResponseNewBet } from "@shared/interfaces";

export interface IUser {
  listBet: () => Promise<IResponseListBet>;
  newBet: (games: IBodyNewBet) => Promise<IResponseNewBet>;
}
