import Home from "./pages/Home";
import Login from "./models/Login";
import Create_Account from "./models/Create_Account";

// import Css Filies
import "./css/get_started_btn.css";
import "./css/starry_background.css";
import "./css/social_media.css";

function App() {
  return (
    <>
      <div box="square">
          {/* <Home></Home> */}
          {/* <Login></Login> */}
          <Create_Account></Create_Account>
      </div>
    </>
  );
}

export default App;
