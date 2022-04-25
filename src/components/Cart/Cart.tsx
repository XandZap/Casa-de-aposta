import BetButton from "@components/UI/Cart/BetButton";
import CartContent from "@components/UI/Cart/CartContent";
import { CartTitle } from "@components/UI/Cart/CartTitle";
import CartTotal from "@components/UI/Cart/CartTotal";
import SaveCart from "@components/UI/Cart/SaveCart";
import { removeFromCart } from "@redux/cart.slice";
import { selectCart } from "@redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CartCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 24vw;
  .message {
    margin-top: 30px;
    font-size: 3em;
  }
`;

type remove = {
  id: number;
  price: number;
};

const Cart = () => {
  const dispatch = useDispatch();
  const getCart = useSelector(selectCart);

  const removeCartItem = (remove: remove) => {
    dispatch(
      removeFromCart({
        betId: remove.id,
        price: remove.price,
      })
    );
  };

  const message = <h2 className="message">Adicione Jogos ao Carrinho</h2>;

  return (
    <CartCard>
      <CartTitle>Carrinho</CartTitle>
      <CartContent>
        <ul>
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
        </ul>
      </CartContent>
      <CartTotal valor={getCart.valorTotal} />
      <SaveCart>Salvar</SaveCart>
    </CartCard>
  );
};

export default Cart;
