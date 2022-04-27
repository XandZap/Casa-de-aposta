import styled from "styled-components";

type props = {
  selected: boolean;
  color: string;
};

const GameButton = styled.button<props>`
  width: 3vw;
  height: 6vh;
  margin: 5px;
  color: white;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.selected ? props.color : "#ADC0C4")};

  @media (max-width: 800px) {
    width: 30px;
    height: 5vh;
    font-size: 0.8rem;
  }
`;

export default GameButton;
