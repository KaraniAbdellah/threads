import React from "react";
import Lottie from "lottie-react";
import space_y_logo from "../../public/icons/space_y_logo.json";

const HomeIntro = () => {
  return (
    <main className="flex -mt-24 flex-col h-[calc(100vh-70px)] items-center justify-center text-center">
      <div className="my-20 w-[400px] h-[400px]">
        <Lottie animationData={space_y_logo} loop={true} />
      </div>
      <div className="max-w-2xl -m-14 mb-6 font-semibold">
        Share moments, chat with friends, and explore cool space vibes. Join the
        SpaceY community and connect in a fun, zero-gravity world!
      </div>
      <button class="get_started_btn">Get Started</button>
    </main>
  );
};

export default HomeIntro;
