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
  const [suggestion_number, setSuggestionNumber] = useState(4);

  const getSuggestionUsers = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/suggested`, {
          withCredentials: true,
        })
        .then((res) => {
          setSuggested_users(() => res.data);
        })
        .catch(() => {
          toast.error("Can get suggestion users please try again", {
            duration: 2000,
            position: "bottom-right",
          });
        })
        .finally(() => setIsLoading(() => true));
    } catch (error) {
      toast.error("Something went error please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  async function getProfileInfo() {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setProfile(() => res.data);
        })
        .catch((err) => {
          toast.error("Something went error please try again", {
            duration: 2000,
            position: "bottom-right",
          });
        })
        .finally(() => setIsLoading(() => true));
    } catch (error) {
      toast.error("Something went error please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  }

  const FollowUnFollow = async (e, select_user) => {
    setSuggestionNumber(() => suggestion_number - 1);
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
    } catch (error) {
      toast.error("Something went error please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    getSuggestionUsers();
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-[25%] fixed top-0 right-0 hidden lg:block bg-zinc-800 rounded-sm border-l border-zinc-700 min-h-screen bg-gradient-to-br lg:px-4 pt-4 pb-4">
      <p className="text-white font-semibold mb-3 text-lg">Who to follow</p>
      {isLoading
        ? suggested_users.slice(0, suggestion_number).map((s_user) => {
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
      {suggested_users.length >= 4 &&
      suggestion_number != suggested_users.length ? (
        <p
          onClick={() => setSuggestionNumber(() => suggestion_number + 2)}
          className="text-yellow-700 font-semibold text-center cursor-pointer"
        >
          Load more...
        </p>
      ) : (
        ""
      )}

      {suggested_users.length === 0 ? (
        <p className="text-yellow-600 font-semibold">No User Found</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Suggestion;
