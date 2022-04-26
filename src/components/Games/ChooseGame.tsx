import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectGames } from "@redux/store";
import NewBet from "./NewBet";
import styled from "styled-components";
import GameFilter from "@components/UI/games/GameFilter";

const ChooseGameCard = styled.div`
  padding: 20px;
  margin: 20px;
  width: 50vw;
`;

const ChooseGame = () => {
  const getGames = useSelector(selectGames);
  const gamesType = getGames.types;

  const [isLoading, setIsLoading] = useState(true);
  const [idJogoAtual, setIdJogoAtual] = useState(0);
  const [selected, setSelected] = useState([true]);

  const handleGame = (id: number) => {
    setIdJogoAtual(id - 1);
    selected.fill(false);
    selected[id - 1] = !selected[id - 1];
  };

  useEffect(() => {
    if (gamesType.length > 0) {
      setIsLoading(false);
      setIdJogoAtual(0);
    }
  }, [gamesType]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ChooseGameCard>
      <h2>Nova aposta para {gamesType[idJogoAtual].type}</h2>
      <p>Escolha um jogo</p>
      <ul>
        {gamesType.map((element, index) => (
          <GameFilter
            color={element.color}
            selected={selected[index]}
            key={element.id}
            onClick={() => handleGame(element.id)}
          >
            {element.type}
          </GameFilter>
        ))}
      </ul>
      <p>Preencha sua aposta</p>
      <NewBet currentGame={gamesType[idJogoAtual]} />
    </ChooseGameCard>
  );
};

export default ChooseGame;
