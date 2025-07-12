import React, { useContext, useState, useEffect } from "react";
import profileContext from "../../context/ProfileContext";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import SelectUserProfileContext from "../../context/SelectUserProfileContext";
import Loading from "../../pages/Loading";


const Followers = () => {
  const [profile, setProfile] = useContext(profileContext);
  const [, setSelect_user_profile_state] = useContext(SelectUserProfileContext);

  const SelectUserProfile = (selected_user) => {
    setSelect_user_profile_state(() => selected_user);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="pt-4" data-aos="fade-up">
      <h3 className="text-2xl font-bold text-yellow-500 mb-2">Followers</h3>
      <p className="text-white mb-4">
        {profile.user.followers.length} people you're followers
      </p>
      <div className="space-y-4">
        {profile.user.followers.map((f) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;