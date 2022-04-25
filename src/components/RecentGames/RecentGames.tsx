import { selectGames, selectRecentBet } from "@redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecentGames = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getGames = useSelector(selectGames);
  const getRecentGames = useSelector(selectRecentBet);

  useEffect(() => {
    if (getRecentGames.length > 0 && getGames.types.length > 0) {
      setIsLoading(false);
    }
  }, [getRecentGames, getGames]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      {getGames.types.map((element) => (
        <li key={element.id}>
          <button>{element.type}</button>
        </li>
      ))}
      {getRecentGames.map((element) => (
        <li key={element.game_id}>
          <button>{element.choosen_numbers}</button>
          <div>{element.created_at + element.price + element.type.type + element.user_id}</div>
        </li>
      ))}
    </>
  );
};

export default RecentGames;
