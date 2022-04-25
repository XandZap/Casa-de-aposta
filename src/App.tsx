import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "@auth/LoginForm";
import RegisterForm from "@auth/RegisterForm";
import ResetPasswordForm from "@auth/ResetPasswordForm";
import Home from "@pages/Home";
import IndexPage from "@pages/IndexPage";
import NewBetPage from "@pages/NewBetPage";
import Footer from "@ui/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ChangePasswordForm from "@components/Auth/ChangePasswordForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Navigate to="/welcome/login" />} />
        <Route path="/welcome/*" element={<Navigate to="/welcome/login" />} />
        <Route path="/welcome" element={<IndexPage />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="resetpassword" element={<ResetPasswordForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="change" element={<ChangePasswordForm />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/newbet" element={<NewBetPage />} />
        <Route path="*" element={<Navigate to="/welcome/login" />} />
      </Routes>
      <Footer>Copyright 2020 Luby Software</Footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
