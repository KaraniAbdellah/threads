import React, { useContext, useEffect, useState } from "react";
import Menu from "../components/space_components/Menu";
import Main from "../components/space_components/Main";
import Suggestion from "../components/space_components/Suggestion";
import spaceContext from "../context/SpaceContext";
import userContext from "../context/UserContext";
import axios from "axios";
import profileContext from "../context/ProfileContext";
import Loading from "../pages/Loading";
import UserProfile from "../components/main_components/UserProfile";


const Space = () => {
  const [main_state, setMain_Sate] = useState("Home");
  const user = useContext(userContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getProfileInfo() {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setProfile(() => res.data);
        })
        .catch((err) => {})
        .finally(() => setIsLoading(() => true));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex justify-between items-start bg-zinc-800 w-full min-h-screen">
      <spaceContext.Provider value={[main_state, setMain_Sate]}>
        <Menu></Menu>
        <profileContext.Provider value={profile}>
          
          {/* <Main></Main> */}
          <UserProfile></UserProfile>
        </profileContext.Provider>
        <Suggestion></Suggestion>
      </spaceContext.Provider>
    </div>
  );
};

export default Space;
