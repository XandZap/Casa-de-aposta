import { FC, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    margin-top: 30px;
    margin-right: 15px;
  }

  .type {
    color: ${(props) => props.color};
    font: italic normal bold 16px Helvetica;
  }
  .type span {
    font: normal normal normal 16px Helvetica;
    color: #868686;
  }

  .numbers {
    font: italic normal bold 15px Helvetica;
  }

  .containerNumbers {
    border-left: 4px solid ${(p) => p.color};
    border-radius: 6px;
    min-height: 80px;
    padding-left: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 723px) {
    max-width: 70vw;
  }
  @media (max-width: 376px) {
    max-width: 90vw;
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
  const [isModal, setIsModal] = useState(false);

  const handleTrash = () => {
    props.onClick({ id: props.id, price: props.price });
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <Modal
          onClick={handleModal}
          handleTrash={handleTrash}
          game={{ numbers: props.numbers, type: props.type, price: props.price, color: props.color }}
        ></Modal>
      )}
      <Button color={props.color}>
        <span className="lixeira" onClick={handleModal}>
          <FontAwesomeIcon icon={faTrash} style={{ color: props.color }} />
        </span>
        <div className="containerNumbers">
          <p className="numbers">{(props.numbers)}</p>
          <p className="type">
            {props.type} <span>{props.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
          </p>
        </div>
      </Button>
    </>
  );
};

export default BetButton;
