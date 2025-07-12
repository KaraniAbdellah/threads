import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading";

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
  if (loading) {
    return <Loading></Loading>;
  }

  return <div>
    {notifications.map((not) => {
        return <div>
            <p>{not.from.user_name} {not.type} {not.to.user_name}</p>            
        </div>;
    })}    
  </div>;
};

export default Notifications;
