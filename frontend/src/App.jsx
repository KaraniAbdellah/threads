import Home from "./pages/Home";
import Space from "./pages/Space";
import Loading from "./pages/Loading";
import ForgetPassword from "./components/ForgetPassword";
import ProtectedRoutes from "./components/ProtectRoutes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import userContext from "./context/UserContext";

// import Css Filies
import "./css/get_started_btn.css";
import "./css/starry_background.css";
import "./css/social_media.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserInfo() {
    try {
      console.log("Start Getting The User");
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(() => res.data);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => setIsLoading(() => true));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={user}>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
              <Route path="/recovery"  element={<ForgetPassword></ForgetPassword>} ></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/space" element={<Space></Space>}></Route>
              <Route path="/loading" element={<Loading></Loading>}></Route>
            </Route>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
      <Toaster></Toaster>
    </>
  );
}

export default App;
