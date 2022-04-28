import { selectUser } from "@redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
  changePass?: boolean;
  auth?: boolean;
  login?: boolean;
};

const PrivateRoute: FC<props> = (props) => {
  const user = useSelector(selectUser);

  if (!user.isLogged && props.changePass && user.user.email !== "") return <>{props.children}</>;

  if (!user.isLogged && props.changePass && user.user.email === "")
    return <Navigate to="/welcome/resetpassword" replace />;

  if (!user.isLogged && !props.auth) {
    return <Navigate to="/welcome/login" replace />;
  }

  if (user.isLogged && props.auth) return <Navigate to="/" replace />;

  return <>{props.children}</>;
};

export default PrivateRoute;
