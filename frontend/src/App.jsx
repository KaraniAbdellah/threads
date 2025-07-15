import Home from "./pages/Home";
import Space from "./pages/Space";
import Loading from "./pages/Loading";
import ForgetPassword from "./components/ForgetPassword";
import ProtectedRoutes from "./components/ProtectRoutes";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import userContext from "./context/UserContext";
import { useNavigate } from "react-router-dom";

// import Css Filies
import "./css/get_started_btn.css";
import "./css/starry_background.css";
import "./css/social_media.css";
import UpdateUserProfile from "./pages/UpdateUserProfile";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getUserInfo() {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(() => res.data);
        })
        .catch((err) => {})
        .finally(() => setIsLoading(() => true));
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
    <BrowserRouter>
      <>
        <userContext.Provider value={user}>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/space" /> : <Home />}
            ></Route>
            <Route
              path="/recovery"
              element={<ForgetPassword></ForgetPassword>}
            ></Route>
            {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/space" element={<Space></Space>}></Route>
            <Route path="/loading" element={<Loading></Loading>}></Route>
            <Route path="/update_profile" element={<UpdateUserProfile></UpdateUserProfile>}></Route>
            {/* </Route> */}
          </Routes>
        </userContext.Provider>
        <Toaster></Toaster>
      </>
    </BrowserRouter>
  );
}

export default App;