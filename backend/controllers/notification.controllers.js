import UserModel from "../models/User.js";
import NotificationModel from "../models/Notification.js";

const get_notification = async (req, res) => {
  try {
    const user_id = req.user._id;
    const notifications = await NotificationModel.find({ to: user_id })
      .populate({
        path: "from",
        select: "user_name profile_image",
      })
      .populate({
        path: "to",
        select: "user_name profile_image",
      });
    await NotificationModel.updateMany({ to: user_id }, { read: true });
    res.status(200).send(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const delete_notification = async (req, res) => {
  try {
    const userId = req.user._id;
    await NotificationModel.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { get_notification, delete_notification };
