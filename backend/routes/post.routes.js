import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
  create_post,
  like_unlike_post,
  comment_post,
  delete_post,
  get_all_posts,
  get_liked_posts,
  get_following_posts,
  get_user_post,
  update_post
} from "../controllers/post.controllers.js";


const postRouter = express.Router();
postRouter.post("/create", protect_middlware, create_post);
postRouter.post("/like/:post_id", protect_middlware, like_unlike_post);
postRouter.post("/comment/:post_id", protect_middlware, comment_post);
postRouter.delete("/delete/:post_id", protect_middlware, delete_post);
postRouter.put("/update/:post_id", protect_middlware, update_post);

postRouter.get("/all_posts", protect_middlware, get_all_posts);
postRouter.get("/following", protect_middlware, get_following_posts);
postRouter.get("/likes/:user_id", protect_middlware, get_liked_posts);
postRouter.get("/user_post/:user_id", protect_middlware, get_user_post);



export default postRouter;
