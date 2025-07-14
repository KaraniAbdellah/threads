import React, { useContext } from "react";
import {
  FaHome,
  FaUserFriends,
  FaRegUserCircle,
  FaRegComments,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import spaceContext from "../../context/SpaceContext";
import userContext from "../../context/UserContext";
import SelectUserProfileContext from "../../context/SelectUserProfileContext";

const Menu = () => {
  const [main_state, setMain_State] = useContext(spaceContext);
  const user = useContext(userContext);
  const [select_user_profile_state, setSelect_user_profile_state] = useContext(
    SelectUserProfileContext
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const setMain_State_Fun = (state) => {
    setSelect_user_profile_state(null);
    setMain_State(state);
  };

  const goToProfile = () => {
    navigate("/user_profile");
  };

  return (
    <div className="bg-zinc-800 w-[25%] text-white min-h-screen p-5 ">
      <h2 className="text-2xl font-bold mb-8">Threads</h2>
      <nav className="space-y-2">
        <button
          onClick={() => setMain_State_Fun("Home")}
          className={`${
            main_state === "Home"
              ? "bg-yellow-600 flex items-center space-x-3 w-full p-3 rounded-md"
              : "flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          }`}
        >
          <FaHome size={20} />
          <span>Home</span>
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
          <span>Followers</span>
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
          <span>Following</span>
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
          <span>Profile</span>
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
          <span>Posts</span>
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
          <span>Notifications</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-700">
        <Link to="/update_profile">
          <button
            onClick={goToProfile}
            className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
          >
            <img
              src={user.profile_image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left">
              <p className="font-semibold">@{user.user_name}</p>
              <p className="text-sm opacity-80">{user.email}</p>
            </div>
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full mt-4 p-3 text-zinc-800 bg-white rounded-md hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
