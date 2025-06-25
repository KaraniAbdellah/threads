import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-zinc-800">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;

