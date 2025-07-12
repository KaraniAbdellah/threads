import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const getAllUserNotification = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notification/get_notification`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setNotifications(() => res.data);
      setLoading(() => false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserNotification();
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div
      data-aos="fade-up"
      className="space-y-4 p-4 bg-zinc-900 rounded-md shadow-md"
    >
      <h3 className="text-2xl font-bold text-yellow-500 mb-2">
        Notitifcations
      </h3>
      <p className="text-white mb-4">
        you have {notifications.length} notifications
      </p>
      {notifications.map((not) => (
        <div
          key={not._id}
          className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
        >
          <img
            src={not.from.profile_image}
            alt="from user"
            className="w-10 h-10 rounded-full border-2 border-yellow-400"
          />
          <div className="text-sm text-zinc-100">
            <p>
              <span className="text-yellow-400 font-semibold">
                {not.from.user_name}
              </span>{" "}
              {not.type}{" "}
              <span className="text-yellow-400 font-semibold">
                {not.to.user_name}
              </span>
            </p>
            <p className="text-xs text-zinc-400">
              {new Date(not.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
