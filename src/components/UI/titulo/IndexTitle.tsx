import styled from "styled-components";

const TitleControl = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  text-align: center;
  font: italic normal bold 4.063rem Helvetica;
  color: #707070;
  width: 25vw;

  .for {
    width: 100px;
    margin: 0 auto;
    text-align: center;
    text-transform: lowercase;
    font: italic normal bold 1.375rem Helvetica;
    letter-spacing: 0px;
    color: #ffffff;
    background: #b5c401 0% 0% no-repeat padding-box;
    border-radius: 100px;
  }

  .lottery {
    text-transform: uppercase;
    font: italic normal bold 5.188rem Helvetica;
  }
`;

const IndexTitle = () => {
  return (
    <TitleControl>
      <div className="greatest">The Greatest App</div>
      <div className="for">for</div>
      <div className="lottery">Lottery</div>
    </TitleControl>
  );
};

export default IndexTitle;
