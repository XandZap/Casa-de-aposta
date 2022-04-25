import styled from "styled-components";

type props ={
  selected: boolean
}

const GameButton = styled.button<props>`
  width: 3vw;
  height: 6vh;
  margin: 5px;
  color: white;
  border-radius: 50%;
  border: none;
  background: ${(props)=>props.selected ? "black" : "#ADC0C4"};

`

export default GameButton