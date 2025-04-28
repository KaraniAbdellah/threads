import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
  get_user_profile,
  get_suggested_users,
  follow_unfollow,
  update_user_profile,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();
userRouter.get("/profile/:user_id", protect_middlware, get_user_profile);
userRouter.get("/suggested", protect_middlware, get_suggested_users);
userRouter.get("/follow/:id", protect_middlware, follow_unfollow);
userRouter.get("/profile/:user_id", protect_middlware, update_user_profile);

export default userRouter;
