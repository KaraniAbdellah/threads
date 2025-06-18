import React from "react";

const Header = () => {
  function ShowLogin() {
    
  }

  function ShowSignUp() {

  }

  return (
    <header className="flex justify-between items-center p-4 h-[70px]">
      <div className="flex items-center">
        <div className="text-5xl font-bold text-white">Threads</div>
      </div>
      <div className="flex space-x-4">
        <button onClick={() => ShowLogin()} className="z-10 px-4 py-2 border border-yellow-600 rounded hover:bg-yellow-800">
          Login
        </button>
        <button onClick={() => ShowSignUp()} className="z-10 px-4 py-2 bg-yellow-800 border border-yellow-600 rounded hover:bg-yellow-600">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
