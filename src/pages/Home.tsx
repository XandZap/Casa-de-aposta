import RecentGames from "@components/RecentGames/RecentGames";
import { fetchGamesData } from "@redux/games-actions";
import { fetchRecentBetData } from "@redux/recentBets.actions";
import Header from "@ui/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchGamesData());
    dispatch(fetchRecentBetData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div>
        <p>Recent Games</p>
        <Link to="#">filters</Link>
        <RecentGames />
      </div>
      <div>
        <Link to="/newbet">Nova Aposta</Link>
      </div>
    </>
  );
};

export default Home;
