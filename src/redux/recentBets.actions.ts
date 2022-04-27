import betsServices from "@shared/services/bets";
import { getFilteredBet, getRecentBet } from "./recentBets.slice";
import { AppThunk } from "./store";

import { toast } from "react-toastify";

const { listBet, filterBets } = betsServices();

export const fetchRecentBetData = (token: string): AppThunk => {
  return async (dispatch) => {
    const fetchGames = async () => {
      const responseGames: any = await listBet(token);
      return responseGames.data;
    };
    const recentGamesData = await fetchGames();

    toast.promise(
      fetchGames,
      {
        pending: "Carregando",
        success: "Jogos recentes carregados",
        error: "Erro ao carregar jogos",
      },
      { autoClose: 500, toastId: "customId" }
    );

    dispatch(getRecentBet(recentGamesData));
  };
};

export const fetchFilteredBetsData = (id: string, token: string): AppThunk => {
  return async (dispatch) => {
    const fetchGames = async () => {
      const responseFilteredGames: any = await filterBets(id, token);
      return responseFilteredGames.data;
    };

    const filtredGamesData = await fetchGames();

    toast.promise(
      fetchGames,
      {
        pending: "Carregando",
        success: "Jogos filtrados com sucesso",
        error: "Erro ao carregar jogos",
      },
      { autoClose: 500, toastId: "customId" }
    );

    dispatch(getFilteredBet(filtredGamesData));
  };
};
