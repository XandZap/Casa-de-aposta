import { IBodyNewBet, IResponseListBet, IResponseNewBet } from "@shared/interfaces";
import instance from "../axios.config";
import { IUser } from "./interfaces";

const betsServices = (): IUser => {
  async function listBet(): Promise<IResponseListBet> {
    return instance.get("/bet/all-bets", {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async function filterBets(id: string): Promise<IResponseListBet> {
    return instance.get("/bet/all-bets", {
      params: { "type[]": id },
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async function saveNewBet(body: IBodyNewBet): Promise<IResponseNewBet> {
    return instance.post("/bet/new-bet", body, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  return { listBet, saveNewBet, filterBets };
};

export default betsServices;
