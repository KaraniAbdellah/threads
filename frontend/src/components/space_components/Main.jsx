import React, { useContext } from "react";
import spaceContext from "../../context/SpaceContext";

// Import your components here
import Home from "../main_components/Home";
import Followers from "../main_components/Followers";
import Following from "../main_components/Following";
import Profile from "../main_components/Profile";
import Posts from "../main_components/Posts";
import Notifications from "../main_components/Notifications";
import showSlideContext from "../../context/showSlideContext";


const Main = () => {
  const [main_space] = useContext(spaceContext);
  const [show_slide, setShowSlide] = useContext(showSlideContext);
  return (
    <div
      className={`${
        show_slide ? "ml-[20%] lg:mr-[25%]" : "ml-[10%] lg:mr-[25%]"
      }  min-h-screen bg-gradient-to-br p-2 lg:px-4 lg:pt-4 border-r border-l border-zinc-700 pb-4 bg-red-500`}
    >
      {main_space === "Home" && <Home />}
      {main_space === "Followers" && <Followers />}
      {main_space === "Following" && <Following />}
      {main_space === "Profile" && <Profile />}
      {main_space === "Posts" && <Posts />}
      {main_space === "Notifications" && <Notifications />}
    </div>
  );
};

export default Main;
