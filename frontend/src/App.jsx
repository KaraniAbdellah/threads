import Home from "./pages/Home";
import Login from "./models/Login";
import SignUp from "./models/SignUp";

// import Css Filies
import "./css/get_started_btn.css";
import "./css/starry_background.css";
import "./css/social_media.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div box="square">
        <Home></Home>
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default App;
