import { IBodyNewBet, IResponseListBet, IResponseNewBet } from "@shared/interfaces";
import instance from "../axios.config";
import { IUser } from "./interfaces";

const betsServices = (): IUser => {

  async function listBet(token: string): Promise<IResponseListBet> {
    return instance.get("/bet/all-bets", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  async function filterBets(id: string, token: string): Promise<IResponseListBet> {
    return instance.get("/bet/all-bets", {
      params: { "type[]": id },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  async function saveNewBet(body: IBodyNewBet, token: string): Promise<IResponseNewBet> {
    return instance.post("/bet/new-bet", body, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  return { listBet, saveNewBet, filterBets };
};

export default betsServices;
