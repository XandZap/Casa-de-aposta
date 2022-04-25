import { FC } from "react";
import styled from "styled-components";

const Button = styled.button<propsStyle>`
  display: flex;
  text-align: left;
  min-width: 10.981vw;
  max-width: 17.13vw;
  min-height: 60px;
  border-style: none;
  border-radius: 5px;
  color: #868686;
  background-color: #ffffff;
  margin-bottom: 5px;

  .lixeira {
    color: ${(props) => props.color};
  }

  .type {
    color: ${(props) => props.color};
    font: italic normal bold 16px/70px Helvetica;
  }
  .type span {
    font: normal normal normal 16px/70px Helvetica;
    color: #868686;
  }

  .numbers {
    font: italic normal bold 15px/20px Helvetica;
  }
`;

type propsStyle = {
  color: string;
};

type props = {
  children?: React.ReactNode;
  numbers: string;
  type: string;
  price: number;
  color: string;
  onClick: (e: any) => void;
  id: number;
};

const BetButton: FC<props> = (props) => {
  const handleTrash = () => {
    props.onClick({ id: props.id, price: props.price });
  };

  return (
    <>
      <Button color={props.color}>
        <span className="lixeira" onClick={handleTrash}>
          lixo
        </span>
        <div>
          <p className="numbers">{props.numbers}</p>
          <p className="type">
            {props.type} <span>{props.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
          </p>
        </div>
      </Button>
    </>
  );
};

export default BetButton;
