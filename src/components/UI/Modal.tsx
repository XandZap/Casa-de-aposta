import { FC } from "react";
import styled from "styled-components";

type p = {
  color: string;
};

const ModalStyle = styled.div<p>`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 7px 5px 5px rgba(148, 146, 146, 0.074);
    background-color: #f7f7f7;
    width: 30vw;
    height: 40vh;
    text-align: center;
    font-size: 1rem;
  }
  .type {
    color: ${(p) => p.color};
  }
  .pergunta {
    font: italic normal bold 24px Helvetica;
    text-transform: uppercase;
  }
  .numbers {
    font-weight: bold;
  }
  .numbers span {
    font-weight: normal;
  }
  .button {
    border: none;
    font: normal 1rem Helvetica;
    margin: 10px;
    border-radius: 15px;
    color: white;
    width: 90px;
    height: 30px;
  }
  .excluir {
    background-color: #f14668;
  }
  .cancelar {
    background-color: ${(p) => p.color};
  }
  @media (max-width: 1200px) {
    .card {
      width: 50vw;
      height: 50vh;
    }
  }
  @media (max-width: 500px) {
    .card {
      width: 90vw;
      height: 60vh;
    }
  }
`;

type props = {
  children?: React.ReactNode;
  onClick: () => void;
  handleTrash: () => void;
  game: {
    numbers: string;
    type: string;
    price: number;
    color: string;
  };
};

const Modal: FC<props> = (props) => {
  return (
    <ModalStyle onClick={props.onClick} color={props.game.color}>
      <div className="card">
        <p className="pergunta">Você deseja excluir o jogo?</p>
        <div>
          <p className="numbers">
            Aposta: <span>{props.game.numbers}</span>
          </p>
          <p className="type">{props.game.type}</p>
          <p className="numbers">
            Valor: <span>{props.game.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
          </p>
        </div>
        <div className="buttons">
          <button className="button excluir" onClick={props.handleTrash}>
            Excluir
          </button>
          <button className="button cancelar" onClick={props.onClick}>
            Cancelar
          </button>
        </div>
      </div>
    </ModalStyle>
  );
};
export default Modal;
