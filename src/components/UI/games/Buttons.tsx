import styled from "styled-components";

type props = {
  isAdd?: boolean;
};

export const Buttons = styled.button<props>`
  width: 135px;
  height: 52px;
  border: 1px solid #27c383;
  font-size: 0.9rem;
  border-radius: 10px;
  color: ${(p) => (p.isAdd ? "#f7f7f7" : "#27c383")};
  background: ${(p) => (p.isAdd ? "#27c383" : "#f7f7f7")};
  margin: 15px;
`;
