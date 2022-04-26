import styled from "styled-components";
type props = {
  color: string;
};
const RecentGamesButton = styled.li<props>`
  background: ${(p) => p.color};
`;

export default RecentGamesButton;
