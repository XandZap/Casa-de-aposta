import { useState } from "react";

import styled from "styled-components";
import BetButton from "@components/UI/Cart/BetButton";
import CartContent from "@components/UI/Cart/CartContent";
import { CartTitle } from "@components/UI/Cart/CartTitle";
import CartTotal from "@components/UI/Cart/CartTotal";
import SaveCart from "@components/UI/Cart/SaveCart";

import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "@redux/cart.slice";
import { selectCart, selectUser } from "@redux/store";

import betsServices from "@shared/services/bets";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CartCard = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  width: 24vw;
  .message {
    margin-top: 30px;
    font-size: 3em;
  }

  @media (max-width: 1075px) {
    h1 {
      font-size: 1rem;
    }
    .message {
      font-size: 2em;
    }
  }

  @media (max-width: 723px) {
    width: 70vw;
  }

  @media (max-width: 376px) {
    width: 90vw;
  }
`;

type remove = {
  id: number;
  price: number;
};

const Cart = () => {
  const dispatch = useDispatch();
  const getCart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const { saveNewBet } = betsServices();

  const [minCartValueMessage, setMinCartValueMessage] = useState(false);

  const removeCartItem = (remove: remove) => {
    dispatch(
      removeFromCart({
        betId: remove.id,
        price: remove.price,
      })
    );
  };

  const saveCart = async () => {
    if (getCart.valorTotal >= getCart.min_cart_value) {
      setMinCartValueMessage(false);
      const arrayToSave = getCart.jogos.map((element) => {
        return { numbers: element.choosen_numbers.split(", ").map(Number), game_id: element.game_id };
      });
      try {
        await saveNewBet({ games: arrayToSave }, user.token.token);
        toast.success("Apostas salvas com sucesso", {
          position: "top-right",
          autoClose: 1000,
          toastId: "customId",
        });
        dispatch(clearCart());
      } catch (error: any) {
        console.log("Erro ao salvar jogos: ", error.data);
        toast.error(`Erro ao salvar apostas: ${error.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          toastId: "customId",
        });
      }
    } else {
      setMinCartValueMessage(true);
      setTimeout(() => {
        setMinCartValueMessage(false);
      }, 2000);
    }
  };

  const minCartMessage = (
    <span>
      Valor mínimo para salvar é{" "}
      {getCart.min_cart_value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      <p>Adicione mais jogos</p>
    </span>
  );

  const message = <h2 className="message">Adicione Jogos ao Carrinho</h2>;

  return (
    <CartCard>
      <CartTitle>Carrinho</CartTitle>
      <CartContent>
        {getCart.jogos.length === 0 && message}
        {getCart.jogos.map((value, index) => {
          return (
            <BetButton
              id={value.id}
              key={index}
              color={value.type.color}
              numbers={value.choosen_numbers}
              type={value.type.type}
              price={value.price}
              onClick={removeCartItem}
            />
          );
        })}
      </CartContent>
      <CartTotal valor={getCart.valorTotal} />
      <SaveCart onClick={saveCart}>
        Salvar
        <FontAwesomeIcon icon={faArrowRight} style={{ color: "#27C383", marginLeft: 10 }} />
      </SaveCart>
      {minCartValueMessage && minCartMessage}
    </CartCard>
  );
};

export default Cart;
