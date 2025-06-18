import React from "react";
import Lottie from "lottie-react";
import space_y_logo from "../../public/icons/space_y_logo.json";
import SocialMedia from './Social_media';


const HomeIntro = () => {
  return (
    <main className="flex relative -mt-24 flex-col h-[calc(100vh-70px)] items-center justify-center text-center">
      <div className="my-20 w-[370px] h-[370px]">
        <Lottie animationData={space_y_logo} loop={true} />
      </div>

      <div className="lg:max-w-2xl lg:py-5 lg:px-0 p-2 -mt-16 mb-2 md:px-10 md:-mt-14 sm:p-10 sm:-mt-14 font-semibold">
        Share moments, chat with friends, and explore cool space vibes. Join the
        Threads community and connect in a fun, zero-gravity world!
      </div>

      <button className="get_started_btn">Get Started</button>

      <div className="social_media_card absolute -bottom-12 left-10">
        <SocialMedia></SocialMedia>
      </div>

    </main>
  );
};

export default HomeIntro;
