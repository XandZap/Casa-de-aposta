import betsServices from "@shared/services/bets";
import { getRecentBet } from "./recentBets.slice";
import { AppThunk } from "./store";

import { toast } from "react-toastify";

const { listBet } = betsServices();

export const fetchRecentBetData = (): AppThunk => {
  return async (dispatch) => {
    const fetchGames = async () => {
      const responseGames: any = await listBet();
      return responseGames.data;
    };
    const recentGamesData = await fetchGames();

    const gamesData = await fetchGames();
    
    toast.promise(fetchGames, {
      pending: "Carregando",
      success: "Jogos recentes carregados",
      error: "Erro ao carregar jogos",
    });

    dispatch(getRecentBet(recentGamesData));
  };
};
