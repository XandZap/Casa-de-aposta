import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderControl = styled.header`
  border: 1px solid #ebebeb;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 98vw;
  height: 15vh;

  & .start {
    display: flex;
  }

  .tgl {
    text-transform: uppercase;
    font-size: 2.75rem;
    font-style: italic;
    font-weight: bold;
    margin-right: 5.417vw;
    border: 6px solid #b5c401;
    border-radius: 6px;
    border-left: none;
    border-right: none;
    border-top: none;
  }

  & .start .home {
    font-size: 1.25rem;
    margin-top: 10px;
    font-style: italic;
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

  
`;

type props = { home?: boolean };
const Header: FC<props> = (props) => {
  return (
    <HeaderControl>
      <div className="start">
        <h1 className="tgl">
          <Link to='/welcome/login'>tgl</Link>
        </h1>
        {props.home && (
          <Link className="home" to="/">
            Home
          </Link>
        )}
      </div>
      <div className="end">
        <Link to="#" className="account">Conta</Link>
        <Link to='/welcome/login'>Sair</Link>
      </div>
    </HeaderControl>
  );
};

export default Header;
