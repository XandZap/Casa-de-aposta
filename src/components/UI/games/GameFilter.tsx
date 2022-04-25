import styled from "styled-components";

type props = {
  color: string;
  selected: boolean;
};

const GameFilter = styled.button<props>`
  width: 113px;
  height: 34px;
  margin: 10px;

  font: italic normal bold 14px Helvetica;

  background: ${(p) => (p.selected ? p.color : "#FFFF")};
  color: ${(p) => (p.selected ? "#FFFF" : p.color)};
  border: 1px solid ${(p) => p.color};
  border-radius: 15px;
`;

export default GameFilter;
