import { getUser } from "@redux/user.slice";
import Footer from "@ui/Footer";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";
import Rotas from "./Router/Rotas";

const AppStyle = styled.div`
  min-height: 100%;
  overflow: auto;
`;

function App() {
  const dispatch = useDispatch();
  dispatch(getUser());

  return (
    <>
      <AppStyle>
        <Rotas />
      </AppStyle>
      <Footer className="footer">Copyright 2020 Luby Software</Footer>
      <ToastContainer
        
        position="top-right"
        autoClose={1000}
        pauseOnFocusLoss={false}
        limit={3}
      />
    </>
  );
}

export default App;
