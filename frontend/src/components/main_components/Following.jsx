import React, { useContext, useState, useEffect } from "react";
import profileContext from "../../context/ProfileContext";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import SelectUserProfileContext from "../../context/SelectUserProfileContext";
import Loading from "../../pages/Loading";
import userContext from "../../context/UserContext";

const Following = () => {
  const [profile, setProfile] = useContext(profileContext);
  const [, setSelect_user_profile_state] = useContext(SelectUserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(userContext);

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
      
    }
  }

  const FollowUnFollow = async (e, select_user) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/follow_unfollow/${select_user}`,
        {
          withCredentials: true,
        }
      );
      getProfileInfo();
    } catch (error) {
      
    }
  };

  const SelectUserProfile = (selected_user) => {
    setSelect_user_profile_state(() => selected_user);
  };

  useEffect(() => {
    getProfileInfo();
    AOS.init();
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-4" data-aos="fade-up">
      <h3 className="text-2xl font-bold text-yellow-500 mb-2">Following</h3>
      <p className="text-white mb-4">
        {profile.user.following.length} people you're following
      </p>
      <div className="space-y-4">
        {profile.user.following.map((f) => (
          <div
            key={f._id}
            className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                onClick={() => SelectUserProfile(f._id)}
                src={f.profile_image}
                alt={f.user_name}
                className="w-12 h-12 rounded-full border-2 border-yellow-400 cursor-pointer"
              />
              <p className="font-semibold text-yellow-600">{f.user_name}</p>
            </div>
            <button
              onClick={(e) => FollowUnFollow(e, f._id)}
              className="px-4 py-1 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
            >
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
