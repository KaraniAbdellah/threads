import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
  create_post,
  like_unlike_post,
  comment_post,
  delete_post,
  get_all_posts
} from "../controllers/post.controllers.js";


const postRouter = express.Router();
postRouter.post("/create", protect_middlware, create_post);
postRouter.get("/like/:post_id", protect_middlware, like_unlike_post);
postRouter.get("/comment/:post_id", protect_middlware, comment_post);
postRouter.get("/delete/:post_id", protect_middlware, delete_post);
postRouter.get("/all_posts", protect_middlware, get_all_posts);


export default postRouter;
