import { FC, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectNumbersToBet, selectUser } from "@redux/store";
import { addBet, addGameType, clearNumbersToBet, removeNumberToBet } from "@redux/addBet.slice";
import { addToCart } from "@redux/cart.slice";
import { GameType } from "@redux/interfaces";

import GameButton from "@components/UI/games/GameButton";
import { AlertMessage } from "@components/UI/games/AlertMessage";
import { Buttons } from "@components/UI/games/Buttons";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type props = {
  currentGame: GameType;
  minValue: number;
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 723px) {
    flex-direction: column;
  }
`;

const NewBet: FC<props> = (props) => {
  const getNumbersToBets = useSelector(selectNumbersToBet);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const newArr = Array(props.currentGame.range);
  const newArrButton = Array(props.currentGame.range);
  const [gamesButtons, setGamesButtons] = useState<any[]>([]);
  newArr.fill(false);
  const [isSelectedArray, setIsSelectedArray] = useState(newArr);

  const [maxNumberMessage, setmaxNumberMessage] = useState(false);

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
          {(i + 1).toString().padStart(2, "0")}
        </GameButton>
      );
      setGamesButtons(newButtons);
    }
  };

  useEffect(() => {
    setButtons();
  }, [isSelectedArray, getNumbersToBets]);

  const handleButton = async (i: number) => {
    if (getNumbersToBets.quantidadeTotal < props.currentGame.max_number || isSelectedArray[i - 1]) {
      isSelectedArray[i - 1] = !isSelectedArray[i - 1];
      isSelectedArray[i - 1] ? dispatch(addBet(i)) : dispatch(removeNumberToBet(i));
    } else {
      toast.warning("Quantidade máxima selecionada: " + getNumbersToBets.quantidadeTotal + " números permitidos", {
        autoClose: 1000,
        toastId: 'customId',
      });
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
    if (getNumbersToBets.quantidadeTotal === props.currentGame.max_number) {
      let date = new Date();
      dispatch(
        addToCart({
          id: cart.jogos.length,
          user_id: user.user.id,
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
    } else {
      setmaxNumberMessage(true);
      setTimeout(() => {
        setmaxNumberMessage(false);
      }, 2000);
    }
  };

  const clearGame = () => {
    dispatch(clearNumbersToBet());
    setIsSelectedArray(newArr);
  };

  const messageMaxNumber = (
    <AlertMessage className="message">
      Você precisa adicionar mais {props.currentGame.max_number - getNumbersToBets.quantidadeTotal} números para
      adicionar ao carrinho
      <p>Adicione mais números</p>
    </AlertMessage>
  );

  return (
    <>
      <p>{props.currentGame.description}</p>
      {gamesButtons.map((el: any) => el)}
      {maxNumberMessage && messageMaxNumber}
      <StyledDiv>
        <div>
          <Buttons onClick={completeGame}>Completar o jogo</Buttons>
          <Buttons onClick={clearGame}>Limpar jogo</Buttons>
        </div>
        <div>
          <Buttons isAdd={true} onClick={addCart}>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "#F7f7f7" }} />
            Adicionar ao carrinho
          </Buttons>
        </div>
      </StyledDiv>
    </>
  );
};

export default NewBet;
