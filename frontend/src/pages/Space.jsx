import React, { useState } from "react";
import Menu from "../components/space_components/Menu";
import Main from "../components/space_components/Main";
import Suggestion from "../components/space_components/Suggestion";
import spaceContext from "../context/SpaceContext";


const Space = () => {
  const [main_state, setMain_Sate] = useState("Home");  
  return (
    <div className="flex justify-between items-start bg-zinc-800 w-full min-h-screen">
      <spaceContext.Provider value={[main_state, setMain_Sate]}>
        <Menu></Menu>
        <Main></Main>
        <Suggestion></Suggestion>
      </spaceContext.Provider>
    </div>
  );
};

export default Space;
