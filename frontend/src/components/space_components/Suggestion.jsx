import React, { useEffect, useState, useContext } from "react";
import Loading from "../../pages/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import profileContext from "../../context/ProfileContext";
import userContext from "../../context/UserContext";

const Suggestion = () => {
  const [profile, setProfile] = useContext(profileContext);
  const user = useContext(userContext);
  const [suggested_users, setSuggested_users] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestionUsers = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/suggested`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setSuggested_users(() => res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(() => true));
    } catch (error) {
      console.log(error.message);
    }
  };

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
      toast.success("User followed successfully", {
        duration: 2000,
        position: "bottom-right",
      });
      getProfileInfo();
      setSuggested_users(() =>
        suggested_users.filter((s_user) => s_user._id !== select_user)
      );
      console.log(suggested_users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuggestionUsers();
  }, []);
  if (!isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-zinc-800 w-[25%] rounded-sm border-x border-zinc-70 min-h-screen bg-gradient-to-br px-4 pt-4 border-r border-l border-zinc-900 pb-4">
      <p className="text-white font-semibold mb-3 text-lg">Who to follow</p>
      {isLoading
        ? suggested_users.map((s_user) => {
            return (
              <div
                key={s_user._id}
                className="flex items-center mb-2 justify-between bg-zinc-900 p-3 rounded-sm border-yellow-700 border space-x-3"
              >
                <img
                  src={s_user.profile_image}
                  alt="user image"
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                />
                <p className="flex-1 text-yellow-700 text-sm">
                  {s_user.user_name}
                </p>
                <button
                  onClick={(e) => FollowUnFollow(e, s_user._id)}
                  className="px-4 py-1 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
                >
                  Follow
                </button>
              </div>
            );
          })
        : ""}
      {suggested_users.length === 0 ? (
        <p className="text-yellow-600 font-semibold">No User Found</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Suggestion;
