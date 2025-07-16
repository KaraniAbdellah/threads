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
import SelectUserProfileContext from "../context/SelectUserProfileContext";

const Space = () => {
  const [main_state, setMain_State] = useState("Home");
  const [select_user_profile_state, setSelect_user_profile_state] =
    useState(null); // this take id of user profile selected

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useContext(userContext);
  const select_user_profile = useContext(SelectUserProfileContext);

  async function getProfileInfo() {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user._id}`, {
          withCredentials: true,
        })
        .then((res) => {
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
  useEffect(() => {
    getProfileInfo();
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex justify-center items-start bg-zinc-800 w-full min-h-screen">
      <spaceContext.Provider value={[main_state, setMain_State]}>
        <SelectUserProfileContext.Provider
          value={[select_user_profile_state, setSelect_user_profile_state]}
        >
          <Menu></Menu>
          <profileContext.Provider value={[profile, setProfile]}>
            {!select_user_profile_state ? (
              <Main></Main>
            ) : (
              <UserProfile></UserProfile>
            )}
            <Suggestion></Suggestion>
          </profileContext.Provider>
        </SelectUserProfileContext.Provider>
      </spaceContext.Provider>
    </div>
  );
};

export default Space;
