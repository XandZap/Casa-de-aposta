import { FC } from "react";
import styled from "styled-components";

const AuthControl = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font: italic normal bold 35px/70px Helvetica;
    text-align: center;
  }

  .card {
    width: 352px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #0001;
    border: 1px solid #dddddd;
    border-radius: 14px;
  }
`;

type props = {
  titulo: string;
  children: any;
};
const AuthCard: FC<props> = (props) => {
  return (
    <>
      <AuthControl>
        <p>{props.titulo}</p>
        <div className="card">{props.children}</div>
      </AuthControl>
    </>
  );
};

export default AuthCard;
