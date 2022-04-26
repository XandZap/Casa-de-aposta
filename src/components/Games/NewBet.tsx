import { FC, useEffect, useState } from "react";

import { GameType } from "@redux/interfaces";
import GameButton from "@components/UI/games/GameButton";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectNumbersToBet } from "@redux/store";
import { addBet, addGameType, clearNumbersToBet, removeNumberToBet } from "@redux/addBet.slice";
import { addToCart } from "@redux/cart.slice";

type props = {
  currentGame: GameType;
};

const NewBet: FC<props> = (props) => {
  const getNumbersToBets = useSelector(selectNumbersToBet);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const newArr = Array(props.currentGame.range);
  const newArrButton = Array(props.currentGame.range);
  const [gamesButtons, setGamesButtons] = useState<any[]>([]);
  newArr.fill(false);
  const [isSelectedArray, setIsSelectedArray] = useState(newArr);

  useEffect(() => {
    setButtons();
  }, [isSelectedArray, getNumbersToBets]);

  useEffect(() => {
    clearGame();
    setButtons();
    dispatch(
      addGameType({
        gameType: props.currentGame.type,
        price: props.currentGame.price,
        color: props.currentGame.color,
        id: props.currentGame.id,
      })
    );
  }, [props]);

  const setButtons = () => {
    const newButtons = newArrButton;
    for (let i = 0; i < props.currentGame.range; i++) {
      newButtons.push(
        <GameButton
          onClick={(e) => handleButton(i + 1)}
          selected={isSelectedArray[i]}
          color={props.currentGame.color}
          key={i}
        >
          {i + 1}
        </GameButton>
      );
      setGamesButtons(newButtons);
    }
  };

  const handleButton = async (i: number) => {
    if (getNumbersToBets.quantidadeTotal < props.currentGame.max_number || isSelectedArray[i - 1]) {
      isSelectedArray[i - 1] = !isSelectedArray[i - 1];
      isSelectedArray[i - 1] ? dispatch(addBet(i)) : dispatch(removeNumberToBet(i));
    } else {
      console.log("Quantidade máxima selecionada: ", getNumbersToBets.quantidadeTotal);
    }
  };

  const completeGame = () => {
    let arrRandom: number[] = getNumbersToBets.numeros.slice();
    if (getNumbersToBets.quantidadeTotal === props.currentGame.max_number) clearGame();
    while (arrRandom.length < props.currentGame.max_number) {
      let random = Math.floor(Math.random() * props.currentGame.range) + 1;
      if (!arrRandom.includes(random)) arrRandom.push(random);
      arrRandom = arrRandom.filter((e, i) => arrRandom.indexOf(e) === i);
    }
    arrRandom.forEach((value, index) => {
      if (getNumbersToBets.numeros[index] === value) return;
      handleButton(value);
    });
  };

  const addCart = () => {
    let date = new Date();
    dispatch(
      addToCart({
        id: cart.jogos.length,
        user_id: Number(localStorage.getItem("user_id")),
        game_id: getNumbersToBets.game.id,
        choosen_numbers: getNumbersToBets.numeros.join(", "),
        price: getNumbersToBets.game.price,
        created_at: date.toString(),
        type: {
          id: getNumbersToBets.game.id,
          type: getNumbersToBets.game.gameType,
          color: getNumbersToBets.game.color,
        },
      })
    );
    clearGame();
  };

  const clearGame = () => {
    dispatch(clearNumbersToBet());
    setIsSelectedArray(newArr);
  };

  return (
    <>
      <p>{props.currentGame.description}</p>
      <ul>{gamesButtons.map((el: any) => el)}</ul>
      <div>
        <div>
          <button onClick={completeGame}>Completar o jogo</button>
          <button onClick={clearGame}>Limpar jogo</button>
        </div>
        <div>
          <button onClick={addCart}>Adicionar ao carrinho</button>
        </div>
      </div>
    </>
  );
};

export default NewBet;
