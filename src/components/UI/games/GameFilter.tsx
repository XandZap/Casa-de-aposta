import styled from "styled-components";

type props = {
  color: string;
  selected: boolean;
};

const GameFilter = styled.button<props>`
  width: 113px;
  height: 34px;
  margin: 10px;

  font: italic normal bold 0.875rem Helvetica;

  background: ${(p) => (p.selected ? p.color : "#FFFF")};
  color: ${(p) => (p.selected ? "#FFFF" : p.color)};
  border: 2px solid ${(p) => p.color};
  border-radius: 15px;

  @media (max-width: 550px) {
    width: 20.545vw;
    height: 6vh;
    font-size: small;
  }
`;

export default GameFilter;
