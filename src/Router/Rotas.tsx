import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LoginForm from "@auth/LoginForm";
import RegisterForm from "@auth/RegisterForm";
import ResetPasswordForm from "@auth/ResetPasswordForm";
import ChangePasswordForm from "@auth/ChangePasswordForm";

import Home from "@pages/Home";
import IndexPage from "@pages/IndexPage";
import NewBetPage from "@pages/NewBetPage";

import styled from "styled-components";

const RoutesStyle = styled.div`
  height: 89vh;
`;

const Rotas = () => {
  return (
    <RoutesStyle>
      <Routes>
        <Route path="/welcome" element={<Navigate to="/welcome/login" />} />
        <Route path="/welcome/*" element={<Navigate to="/welcome/login" />} />
        <Route path="/welcome" element={<IndexPage />}>
          <Route
            path="login"
            element={
              <PrivateRoute auth={true}>
                <LoginForm />
              </PrivateRoute>
            }
          />
          <Route
            path="resetpassword"
            element={
              <PrivateRoute auth={true}>
                <ResetPasswordForm />
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <PrivateRoute auth={true}>
                <RegisterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="change"
            element={
              <PrivateRoute auth={true} changePass={true}>
                <ChangePasswordForm />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/newbet"
          element={
            <PrivateRoute>
              <NewBetPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/welcome/login" />} />
      </Routes>
    </RoutesStyle>
  );
};

export default Rotas;
