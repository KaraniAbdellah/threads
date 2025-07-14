import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import profileContext from "../context/ProfileContext";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateUserInfoSchema from "../YupSchema/UpdateUserInfoSchema";

const UpdateUserProfile = () => {
  const [newDate, setNewData] = useState({
    new_email: "",
    new_password: "",
    new_user_name: "",
  });
  const user = useContext(userContext);

  const update_user_info = async () => {
    if (!newDate.new_email || !newDate.new_email || !newDate.new_password) {
      toast.error("Please Fill All Inputs", {
        duration: 2000,
        position: "bottom-right",
      });
      return;
    }
    try {
      await UpdateUserInfoSchema.validate(newDate);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update_user_info/${user._id}`,
        newDate,
        { withCredentials: true }
      );
      toast.success("Update Information Successfully", {
        duration: 2000,
        position: "bottom-right",
      });
      setNewData(() => ({
        new_email: "",
        new_password: "",
        new_user_name: "",
      }));
    } catch (error) {
      toast.error(
        "Can not update user information, please check you login information",
        {
          duration: 2000,
          position: "bottom-right",
        }
      );
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 flex flex-col items-center justify-center space-y-4">
      <p className="text-yellow-400 text-xl font-bold">
        Welcome {user.user_name}, you can update your profile
      </p>

      <input
        type="text"
        placeholder="New Username"
        value={newDate.new_user_name}
        onChange={(e) =>
          setNewData({ ...newDate, new_user_name: e.target.value })
        }
        className="bg-zinc-700 text-yellow-400 border border-yellow-400 px-4 py-2 rounded-md w-80 placeholder-yellow-400"
      />

      <input
        type="email"
        placeholder="New Email"
        value={newDate.new_email}
        onChange={(e) => setNewData({ ...newDate, new_email: e.target.value })}
        className="bg-zinc-700 text-yellow-400 border border-yellow-400 px-4 py-2 rounded-md w-80 placeholder-yellow-400"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newDate.new_password}
        onChange={(e) =>
          setNewData({ ...newDate, new_password: e.target.value })
        }
        className="bg-zinc-700 text-yellow-400 border border-yellow-400 px-4 py-2 rounded-md w-80 placeholder-yellow-400"
      />

      <button
        onClick={update_user_info}
        className="bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-400"
      >
        Update Info
      </button>
    </div>
  );
};

export default UpdateUserProfile;
