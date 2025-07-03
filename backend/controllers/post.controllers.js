import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import NotificationModel from "../models/Notification.js";
import { v2 as cloudinary } from "cloudinary";

const create_post = async (req, res) => {
  try {
    const text = req.body.post_text;
    let img = req.body.post_img;
    const post_date = req.body.post_date;
    const user_id = req.user._id.toString();

    const user = await UserModel.findById(user_id);
    if (!user) return res.status(400).send({ message: "User Not Found" });

    if (!text || !img) {
      return res.status(400).send({ message: "Post Have No Text or Image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
    }

    const new_post = new PostModel({
      user: user_id,
      post_text: text,
      post_image: img,
      post_date: post_date
    });
    console.log(new_post);

    await new_post.save();
    res.status(200).send(new_post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const like_unlike_post = async (req, res) => {
  try {
    const user_id = req.user._id;
    const post_id = req.params.post_id;
    const post = await PostModel.findById(post_id);
    if (!post) {
      return res.status(400).send({ message: "Can Not Find This Post" });
    }

    const is_user_like_post = post.likes.includes(user_id);
    if (is_user_like_post) {
      await PostModel.updateOne(
        { _id: post._id },
        {
          $pull: { likes: user_id },
        }
      );
      await UserModel.updateOne(
        { _id: user_id },
        {
          $pull: { liked_posts: post_id },
        }
      );
      res.status(200).send({ message: "Post UnLiked Succefully" });
    } else {
      post.likes.push(user_id);
      await UserModel.updateOne(
        { _id: user_id },
        {
          $push: { liked_posts: post_id },
        }
      );
      await post.save();
      const new_notification = new NotificationModel({
        from: user_id,
        to: post.user,
        type: "like",
      });
      await new_notification.save();
      res.status(200).send({ message: "Post Liked Succeffully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const comment_post = async (req, res) => {
  try {
    const { text, post_id } = req.body;
    const { user_id } = req.user._id;

    if (!text)
      return res.status(400).send({ message: "Text Filied Is Required" });
    const post = await PostModel.findById(req.params.post_id);

    if (!post) {
      return res.status(400).send({ message: "Can Not Find This Post" });
    }

    const comment = {
      text: text,
      user: user_id,
    };
    post.post_comments.push(comment);

    await PostModel.findByIdAndUpdate(post_id, {
      post_comments: post.post_comments,
    });
    return res.status(200).send(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const delete_post = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.post_id);
    if (!post) {
      return res.status(400).send({ message: "Can Not Find This Post" });
    }

    if (post.img) {
      const img_id = post.img.split("/").split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }

    await PostModel.findByIdAndDelete(req.params.post_id);
    return res.status(200).send(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const get_all_posts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "post_comments.user",
        select: "-password",
      });

    if (posts.length === 0) return res.status(200).send([]);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const get_liked_posts = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await UserModel.findById(user_id);
    if (!user) return res.status(200).send({ message: "Can Not Found User" });
    const liked_posts = await PostModel.find({ _id: { $in: user.liked_posts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.status(200).send(liked_posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const get_following_posts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await UserModel.findById(user_id);
    if (!user) return res.status(200).send({ message: "Can Not Found User" });
    const following = user.following;
    const feed_posts = await PostModel.find({ user: { $in: following } })
      .sort({ createAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).send(feed_posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const get_user_post = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await UserModel.findById(user_id);
    if (!user) return res.status(200).send({ message: "Can Not Found User" });
    const following = user.following;
    const feed_posts = await PostModel.find({ user: user_id })
      .sort({ createAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).send(feed_posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export {
  create_post,
  like_unlike_post,
  comment_post,
  delete_post,
  get_all_posts,
  get_liked_posts,
  get_following_posts,
  get_user_post,
};
