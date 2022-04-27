import IndexTitle from "@components/UI/titulo/IndexTitle";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const PageControl = styled.div`
  height: 89.5vh;
  display: flex;
  justify-content: space-evenly;
  
  @media(max-width: 1040px){
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const IndexPage = () => {
  return (
    <>
      <PageControl>
        <IndexTitle />
        <Outlet />
      </PageControl>
    </>
  );
};

export default IndexPage;
