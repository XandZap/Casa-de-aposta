import Header from "@ui/Header";
import { fetchGamesData } from "@redux/games-actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ChooseGame from "@components/Games/ChooseGame";
import Cart from "@components/Cart/Cart";
import styled from "styled-components";

const NovaAposta = styled.div`
  display: flex;
  height: 100%;
  min-height: 68vh;
`

const NewBetPage = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchGamesData());
  }, [dispatch]);

  return (
    <>
      <Header home={true} />
      <NovaAposta>
        <ChooseGame />
        <Cart />
      </NovaAposta>
    </>
  );
};

export default NewBetPage;
