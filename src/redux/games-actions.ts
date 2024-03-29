import getGamesServices from "@shared/services/games";
import { replaceGames } from "./games.slice";
import { AppThunk } from "./store";

import { toast } from "react-toastify";
import { addMinCartValue } from "./cart.slice";

const { getGames } = getGamesServices();

export const fetchGamesData = (): AppThunk => {
  return async (dispatch) => {
    const fetchGames = async () => {
      const responseGames: any = await getGames();
      return responseGames.data;
    };

    const gamesData = await fetchGames();
    toast.promise(
      fetchGames,
      {
        pending: "Carregando jogos",
        success: "Jogos carregados com sucesso",
        error: "Erro ao carregar jogos",
      },
      { pauseOnFocusLoss: false, autoClose: 500, toastId: "customId" }
    );

    dispatch(addMinCartValue({ min_cart_value: gamesData.min_cart_value }));

    dispatch(
      replaceGames({
        min_cart_value: gamesData.min_cart_value,
        types: gamesData.types,
      })
    );
  };
};
