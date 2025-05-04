import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 h-[70px]">
      <div className="flex items-center">
        <div className="text-3xl font-bold text-white">SpaceY</div>
      </div>
      <div className="flex space-x-4">
        <button className="z-10 px-4 py-2 border border-sky-600 rounded hover:bg-sky-800">
          Sign in
        </button>
        <button className="z-10 px-4 py-2 bg-sky-800 border border-sky-600 rounded hover:bg-sky-600">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
