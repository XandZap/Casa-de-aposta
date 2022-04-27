import { types } from "@babel/core";
import { selectUser } from "@redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { TypeOf } from "yup";

type props = {
  children: React.ReactNode;
  changePass?: boolean;
  auth?: boolean;
  login?: boolean;
};

const PrivateRoute: FC<props> = (props) => {
  const user = useSelector(selectUser);

  function isEmpty(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object || obj.id === 0 && obj.token === null;
  }

  const emptyUserToken = isEmpty(user.user) && isEmpty(user.token);

  if (emptyUserToken && props.changePass) return <Navigate to="/welcome/resetpassword" replace />;

  if (emptyUserToken && !props.login) {
    return <Navigate to="/welcome/login" replace />;
  }

  if (!emptyUserToken && props.auth) return <Navigate to="/" replace />;

  return <>{props.children}</>;
};

export default PrivateRoute;
