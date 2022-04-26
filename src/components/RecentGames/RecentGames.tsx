import GameFilter from "@components/UI/games/GameFilter";
import RecentGamesButton from "@components/UI/games/RecentGamesButton";
import { fetchFilteredBetsData, fetchRecentBetData } from "@redux/recentBets.actions";
import { selectGames, selectRecentBet } from "@redux/store";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const UlStyle = styled.ul`
  list-style-type: none;
  max-height: 50vh;
  width: 600px;
  overflow-y: auto;
  li button {
    text-align: left;
    font: italic normal bold 20px/70px Helvetica;
    letter-spacing: 0px;
    color: #868686;
    opacity: 1;
  }
  .data-valor {
    text-align: left;
    font: normal normal normal 17px/70px Helvetica Neue;
    letter-spacing: 0px;
    color: #868686;
    opacity: 1;
  }
`;

const RecentGames = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState([false]);
  const [idJogoAtual, setIdJogoAtual] = useState(0);

  const getGames = useSelector(selectGames);
  const getRecentGames = useSelector(selectRecentBet);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (getRecentGames.length > 0 && getGames.types.length > 0) {
      setIsLoading(false);
    }
  }, [getRecentGames, getGames]);

  const handleClick = (id: number, type: string) => {
    setIdJogoAtual(id - 1);
    selected.fill(false);
    selected[id - 1] = !selected[id - 1];
    dispatch(fetchFilteredBetsData(type));
  };

  const clearFilter = () => {
    dispatch(fetchRecentBetData());
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
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
      <button onClick={clearFilter}>limpar filtros</button>
      <UlStyle>
        {getRecentGames.map((element, index) => {
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
              <button>{element.choosen_numbers}</button>
              <p className="data-valor">
                {newDate} ({element.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })})
              </p>
              <p>{element.type.type}</p>
            </RecentGamesButton>
          );
        })}
      </UlStyle>
    </>
  );
};

export default RecentGames;
