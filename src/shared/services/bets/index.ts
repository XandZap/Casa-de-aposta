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

  async function newBet(body: IBodyNewBet): Promise<IResponseNewBet> {
    return instance.post("/bet/new-bet", body);
  }

  return { listBet, newBet };
};

export default betsServices;
