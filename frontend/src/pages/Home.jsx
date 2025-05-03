import React from "react";
import { FcGoogle } from "react-icons/fc";

import home from "../../public/home.webp";

const Home = () => {
  return (
    <div className="h-screen">
      <div>
        <img src={home} alt="" />
      </div>
      <header className="flex h-[70px] bg-sky-400 justify-between items-center">
        <div className="logo">Threads</div>
        <div className="btns">
          <button>Login</button>
          <button className="bg-red-300">Sign Up</button>
        </div>
      </header>
      <div className="content h-[calc(100%-70px)] flex justify-center items-center">
        <div className="info text-center">
          <p>Join us to the thread and make your threads online</p>
          <button className="bg-sky-500">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
