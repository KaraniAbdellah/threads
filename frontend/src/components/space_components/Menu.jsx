import React from 'react';
import {
  FaHome,
  FaUserFriends,
  FaRegUserCircle,
  FaRegComments,
  FaBell,
  FaSignOutAlt,
} from 'react-icons/fa';

const Menu = () => {
  return (
    <div className="bg-zinc-800 w-[25%] text-white min-h-screen p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Threads</h2>

      <nav className="space-y-2">
        <button className="flex items-center space-x-3 w-full p-3 rounded-md bg-yellow-600">
          <FaHome size={20} />
          <span>Home</span>
        </button>

        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <FaUserFriends />
          <span>Followers</span>
        </button>

        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <FaUserFriends />
          <span>Following</span>
        </button>

        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <FaRegUserCircle />
          <span>Profile</span>
        </button>

        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <FaRegComments />
          <span>Posts</span>
        </button>

        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <FaBell />
          <span>Notifications</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-800">
        <button className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-yellow-600 transition-all duration-200">
          <img
            src="https://i.pravatar.cc/40 "
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold">abdellah karani</p>
            <p className="text-sm opacity-80">abdellahkarani@gmail.com</p>
          </div>
        </button>

        <button className="flex items-center space-x-3 w-full mt-4 p-3 text-zinc-800 bg-white rounded-md hover:bg-red-600 transition-all duration-200">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
