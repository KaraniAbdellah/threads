import React, { useContext, useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaRegUserCircle,
  FaRegComments,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineSlideshow } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import spaceContext from "../../context/SpaceContext";
import userContext from "../../context/UserContext";
import SelectUserProfileContext from "../../context/SelectUserProfileContext";
import axios from "axios";
import toast from "react-hot-toast";
import showSlideContext from "../../context/showSlideContext";

const Menu = () => {
  const [main_state, setMain_State] = useContext(spaceContext);
  const user = useContext(userContext);
  const [select_user_profile_state, setSelect_user_profile_state] = useContext(
    SelectUserProfileContext
  );
  const navigate = useNavigate();
  const [show_slide, setShowSlide] = useContext(showSlideContext);

  const handleLogout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success("Log out Successfully", {
        duration: 2000,
        position: "bottom-right",
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong, Try Again!", {
        duration: 2000,
        position: "bottom-right",
      });
    }
    // navigate("/");
  };

  const setMain_State_Fun = (state) => {
    setSelect_user_profile_state(null);
    setMain_State(state);
  };

  const goToProfile = () => {
    navigate("/user_profile");
  };

  const formEmail = (email) => {
    // abdellahkarani@gmail.com ---> abde***@***.***
    const email_as_array = email.split("");
    let new_email = "";
    for (let index = 0; index < 3; index++) {
      new_email += email_as_array[index];
    }
    return new_email + "***@***.***";
  };

  const ShowMenu = () => {
    setShowSlide(!show_slide);
  };

  
  return (
    <div
      className={`${
        show_slide ? "w-[20%]" : "w-[10%]"
      } bg-zinc-800 bg-green-500 text-white min-h-screen p-5 
     fixed top-0 left-0`}
    >
      <div className="flex justify-between items-start">
        {show_slide ? (
          <h2 className="text-2xl font-bold mb-8 hidden lg:block">Threads</h2>
        ) : (
          ""
        )}
        <button
          className="text-2xl font-bold mb-8 hover:bg-zinc-900 p-2 transition-all rounded-md"
          onClick={ShowMenu}
        >
          <MdOutlineSlideshow />
        </button>
      </div>
      <nav className="space-y-2">
        <button
          onClick={() => setMain_State_Fun("Home")}
          className={`${
            main_state === "Home"
              ? "bg-yellow-600 flex items-center justify-start space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaHome size={20} />
          {show_slide ? <span>Home</span> : ""}
        </button>

        <button
          onClick={() => setMain_State_Fun("Followers")}
          className={`${
            main_state === "Followers"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaUserFriends />
          {show_slide ? <span>Followers</span> : ""}
        </button>

        <button
          onClick={() => setMain_State_Fun("Following")}
          className={`${
            main_state === "Following"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaUserFriends />
          {show_slide ? <span>Following</span> : ""}
        </button>

        <button
          onClick={() => setMain_State_Fun("Profile")}
          className={`${
            main_state === "Profile"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaRegUserCircle />
          {show_slide ? <span>Profile</span> : ""}
        </button>

        <button
          onClick={() => setMain_State_Fun("Posts")}
          className={`${
            main_state === "Posts"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaRegComments />
          {show_slide ? <span>Posts</span> : ""}
        </button>

        <button
          onClick={() => setMain_State_Fun("Notifications")}
          className={`${
            main_state === "Notifications"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaBell />
          {show_slide ? <span>Notifications</span> : ""}
        </button>
      </nav>

      <div className="pt-2 mt-1 border-t border-zinc-700">
        <Link to="/update_profile">
          <button
            onClick={goToProfile}
            className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-yellow-600 transition-all duration-200"
          >
            <img
              src={user.profile_image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            {show_slide ? (
              <div className="text-left">
                <p className="font-semibold">@{user.user_name}</p>
                <p className="text-sm opacity-80">{formEmail(user.email)}</p>
              </div>
            ) : (
              ""
            )}
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full mt-4 p-3 text-zinc-800 bg-white rounded-md hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          {show_slide ? <span>Logout</span> : ""}
        </button>
      </div>
    </div>
  );
};

export default Menu;
