import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectGames, selectRecentBet, selectUser } from "@redux/store";
import { fetchFilteredBetsData, fetchRecentBetData } from "@redux/recentBets.actions";

import { Filter } from "@components/UI/games/Filter";
import GameFilter from "@components/UI/games/GameFilter";
import RecentGamesButton from "@components/UI/games/RecentGamesButton";
import styled from "styled-components";

const ContainerStyle = styled.div`
  list-style-type: none;
  max-height: 50vh;
  width: 600px;
  overflow-y: auto;
`;

const RecentGames = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected] = useState([false]);
  const [idJogoAtual, setIdJogoAtual] = useState(0);

  const getGames = useSelector(selectGames);
  const user = useSelector(selectUser);
  const getRecentGames = useSelector(selectRecentBet);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (getGames.types.length > 0) {
      setIsLoading(false);
    }
  }, [getRecentGames, getGames]);

  const handleClick = (id: number, type: string) => {
    setIdJogoAtual(id - 1);
    selected.fill(false);
    selected[id - 1] = !selected[id - 1];
    dispatch(fetchFilteredBetsData(type, user.token.token));
  };

  const clearFilter = () => {
    selected.fill(false);
    dispatch(fetchRecentBetData(user.token.token));
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Filter onClick={clearFilter} className="filters">
        Filtros
      </Filter>
      {getGames.types.map((element, index) => (
        <GameFilter
          key={index + 100}
          color={element.color}
          selected={selected[index]}
          onClick={() => handleClick(element.id, element.type)}
        >
          {element.type}
        </GameFilter>
      ))}

      <ContainerStyle>
        {getRecentGames
          .map((element, index) => {
            let date = new Date(element.created_at);
            let newDate =
              date.getDate().toString().padStart(2, "0") +
              "/" +
              (date.getMonth() + 1).toString().padStart(2, "0") +
              "/" +
              date.getFullYear();
            let color = "#ffff";

            getGames.types.forEach((value) => {
              if (value.type === element.type.type) color = value.color;
            });

            return (
              <RecentGamesButton key={index + 200} color={color}>
                <div className="linha"></div>
                <div className="container">
                  <span className="numbers">{element.choosen_numbers}</span>
                  <span className="data-valor">
                    {newDate} ({element.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })})
                  </span>
                  <span className="type">{element.type.type}</span>
                </div>
              </RecentGamesButton>
            );
          })
          .reverse()}
      </ContainerStyle>
    </>
  );
};

export default RecentGames;
