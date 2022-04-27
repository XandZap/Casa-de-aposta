import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { removeUser } from "@redux/user.slice";

const HeaderControl = styled.header`
  border: 1px solid #ebebeb;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: space-between;
  height: 8.9vh;
  padding: 15px;

  .start {
    display: flex;
    margin-left: 50px;
  }

  .tgl a {
    text-transform: uppercase;
    font: italic normal bold 2.75rem/1px Helvetica;
    margin-right: 5.417vw;
    border-bottom: 7px solid #b5c401;
    border-radius: 6px;
  }

  .start .home {
    font-size: 1.25rem;
    margin: 15px 0;
    font-style: italic;
    padding: 10px;
  }

  .end {
    display: flex;
    margin: 15px;
    font-size: 1.25rem;
    font-style: italic;
    padding: 20px;
  }

  .account {
    margin-right: 2.928vw;
  }

  button {
    background: none;
    border: none;
    font-size: 1.25rem;
    font-style: italic;
    color: #707070;
    margin-right: 50px;
  }

  @media (max-width: 634px) {
    justify-content: flex-start;
    button{
      margin-right: 5px;
    }
  }
  @media (max-width: 455px) {
    height: 10vh;
  }

  @media (max-height: 780px) {
    padding: 5px;
    .end {
      margin: 5px 10px;
      padding: 20px;
    }
  }
  @media (max-height: 450px) {
    height: 14vh;
  }
`;

type props = { home?: boolean };
const Header: FC<props> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate("/welcome/login");
  };

  return (
    <HeaderControl>
      <div className="start">
        <h1 className="tgl">
          <Link to="/">tgl</Link>
        </h1>
        {props.home && (
          <Link className="home" to="/">
            Home
          </Link>
        )}
      </div>

      <div className="end">
        <Link to="#" className="account">
          Conta
        </Link>
        <button onClick={handleLogOut}>
          Sair
          <FontAwesomeIcon icon={faArrowRight} style={{ color: "#707070", marginLeft: 10 }} />
        </button>
      </div>
    </HeaderControl>
  );
};

export default Header;
