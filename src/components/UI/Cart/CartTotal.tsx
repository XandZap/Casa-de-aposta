import { FC } from "react";
import styled from "styled-components";

const TotalContainer = styled.div`
  margin: 0;
  padding: 15px;
  background-color: white;
  border: 1px solid #e2e2e2;
  border-top: none;
  border-bottom: none;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 300;
  font-style: italic;

  @media (max-width: 880px) {
    font-size: 1rem;
    .message{
      font-size: 2em;
    }
  }
`;

type props = {
  valor: number;
};

const CartTotal: FC<props> = (props) => {
  return (
    <TotalContainer>
      <p>
        Total no carrinho:
        {props.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
      </p>
    </TotalContainer>
  );
};

export default CartTotal;
