import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import { get_user_profile, get_suggested_users, follow_unfollow, update_user_profile } from "../controllers/user.controllers.js";


const userRouter = express.Router();
userRouter.get("/profile/:username", get_user_profile);
userRouter.get("/suggested", get_suggested_users);
userRouter.get("/follow/:id", follow_unfollow);
userRouter.get("/profile/:username", update_user_profile);





export default userRouter;
