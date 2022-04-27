import styled from "styled-components";
type props = {
  color: string;
};
const RecentGamesButton = styled.li<props>`
  display: flex;
  height: 94px;
  margin-bottom: 30px;

  .linha {
    width: 5px;
    background: ${(p) => p.color} 0% 0% no-repeat padding-box;
    border-radius: 100px;
  }

  .container {
    width: 417px;
    display: flex;
    flex-direction: column;
  }

  .numbers {
    margin: 7px;
    height: 24px;
    border: none;
    background: #f7f7f7;
    font: italic normal bold 20px Helvetica;
    color: #868686;
  }

  .data-valor {
    margin: 5px;
    margin-left: 7px;
    font: normal normal normal 17px Helvetica;
    color: #868686;
  }

  .type {
    margin: 5px;
    margin-left: 7px;
    font: italic normal bold 20px Helvetica;
    color: ${(p) => p.color};
  }
`;

export default RecentGamesButton;
