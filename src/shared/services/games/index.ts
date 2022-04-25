import { IBodyCreateGame, IListGamesResponse, IResponseUpdateGame } from "@shared/interfaces";
import instance from "../axios.config";
import { IListGames } from "./interfaces";

const getGamesServices = (): IListGames => {
  async function getGames(): Promise<IListGamesResponse> {
    return instance.get("/cart_games");
  }

  async function createGame(body: IBodyCreateGame): Promise<IBodyCreateGame> {
    return instance.post("/admin/create-game");
  }

  async function updateGame(body: IBodyCreateGame, id: number): Promise<IResponseUpdateGame> {
    return instance.post("/admin/update-game/" + id);
  }

  async function deleteGame(id: number): Promise<string> {
    return instance.post("/admin/delete-game/" + id);
  }

  return { getGames, createGame, updateGame, deleteGame };
};

export default getGamesServices;
