import Home from "./pages/Home";
import Space from "./pages/Space";
import Loading from "./pages/Loading";

// import Css Filies
import "./css/get_started_btn.css";
import "./css/starry_background.css";
import "./css/social_media.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/space" element={<Space></Space>}></Route>
          <Route path="/loading" element={<Loading></Loading>}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </>
  );
}

export default App;
