import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import profileContext from "../context/ProfileContext";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUserProfile = () => {
  const [newDate, setNewData] = useState([]);
  const user = useContext(userContext);

  const update_user_info = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update_user_info`,
        newDate,
        { withCredentials: true }
      );
      toast.success("Update Information Successfully", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="w-full h-screen bg-zinc-800">
      <p>Welcome {user.user_name} Here Your Can Update Your Profile</p>
    </div>
  );
};

export default UpdateUserProfile;
