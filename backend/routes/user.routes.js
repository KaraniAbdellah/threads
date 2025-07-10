import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
  get_user_profile,
  get_suggested_users,
  follow_unfollow,
  update_user_profile,
  update_user_info,
  user_like_post,
  user_unlike_post,
  comment_post,
  user_posts
} from "../controllers/user.controllers.js";


const userRouter = express.Router();
userRouter.get("/profile/:user_id", protect_middlware, get_user_profile);
userRouter.get("/user_posts/:user_id", protect_middlware, user_posts);
userRouter.get("/suggested", protect_middlware, get_suggested_users);
userRouter.get("/follow/:id", protect_middlware, follow_unfollow);
userRouter.put("/update_user_info/:user_id", protect_middlware, update_user_info);
userRouter.put("/update_user_profile/:user_id", protect_middlware, update_user_profile);


userRouter.get("/like_post/:post_id", protect_middlware, user_like_post);
userRouter.get("/unlike_post/:post_id", protect_middlware, user_unlike_post);
userRouter.post("/comment_post/:post_id", protect_middlware, comment_post);


export default userRouter;
