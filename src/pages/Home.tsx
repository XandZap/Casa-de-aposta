import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchGamesData } from "@redux/games-actions";
import { fetchRecentBetData } from "@redux/recentBets.actions";

import RecentGames from "@components/RecentGames/RecentGames";
import Header from "@ui/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { selectUser } from "@redux/store";

const RecentGamePage = styled.div`
  display: flex;
  justify-content: space-around;

  .title {
    font: italic normal bold 24px Helvetica;
  }
  .newBet {
    margin-top: 10vh;
  }
  .newBet a {
    text-align: center;
    font: italic normal bold 24px Helvetica;
    letter-spacing: 0px;
    color: #b5c401;
  }

  .recentGames {
    margin-top: 10vh;
  }

  .recentGames span {
    margin-right: 3vw;
  }

  @media (max-width: 815px) {
    flex-direction: column-reverse;
  }
`;

const Home = () => {
  const dispatch: any = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchGamesData());
    dispatch(fetchRecentBetData(user.token.token));
  }, [dispatch]);

  return (
    <>
      <Header />
      <RecentGamePage>
        <div className="recentGames">
          <span className="title">Recent Games</span>
          <RecentGames />
        </div>

        <div className="newBet">
          <Link to="/newbet">
            Nova Aposta
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "#B5C401", marginLeft: 10 }} />
          </Link>
        </div>
      </RecentGamePage>
    </>
  );
};

export default Home;
