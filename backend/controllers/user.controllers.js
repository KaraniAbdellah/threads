import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import bcrypt, { hash } from "bcrypt";
import UserModel from "../models/User.js";
import NotificationModel from "../models/Notification.js";
import PostModel from "../models/Post.js";

const get_user_profile = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await UserModel.findById(user_id)
      .select("-password")
      .populate("followers")
      .populate("following");

    const posts = await PostModel.find({ user: user_id })
      .populate({
        path: "post_comments.user",
        select: "user_name profile_image email verfied",
      })
      .sort({ createdAt: -1 });

    const user_with_post = {
      user,
      posts: posts,
    };

    if (!user_with_post)
      return res.status(404).send({ message: "User Not Found" });
    res.status(200).send(user_with_post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

const get_suggested_users = async (req, res) => {
  console.log("Hell World");
  try {
    const userId = req.user._id;
    const following_users = await UserModel.findById(userId).select(
      "following"
    );

    const users = await UserModel.aggregate([
      { $match: { _id: { $ne: userId } } },
      { $sample: { size: 10 } },
    ]);
    const filtred_users = users.filter(
      (user) => !following_users.following.includes(user._id)
    );
    console.log("filtred_users: ", filtred_users);
    const suggested_users = filtred_users.slice(0, 4);
    console.log("suggested_users", suggested_users);
    suggested_users.forEach((user) => (user.password = null));
    res.status(200).send(suggested_users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

const follow_unfollow = async (req, res) => {
  try {
    const id = req.params.id;
    const user_to_modify = await UserModel.findById(id);
    const current_user = await UserModel.findById(req.user._id);
    if (id == req.user._id.toString())
      return res
        .status(400)
        .send({ error: "You Can Not Follow or Unfollow Yourself" });

    if (!current_user || !user_to_modify)
      res.status(400).send({ error: "Can Not Find Users" });

    const is_following = current_user.following.includes(id);
    if (is_following) {
      // Unfollow User
      await UserModel.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });

      // We Should Be Remove Notification
      // const to_delete_notification = await NotificationModel.findOne({
      //     from: req.user._id,
      //     to: user_to_modify._id,
      //     type: 'follow',
      // })
      // console.log(to_delete_notification);
      // await NotificationModel.findByIdAndDelete(to_delete_notification._id);

      return res
        .status(200)
        .send({ user_id: user_to_modify._id, message: "Unfollow User" });
    } else {
      // Follow User
      await UserModel.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      // Send Notification To User
      const new_notification = new NotificationModel({
        from: req.user._id,
        to: user_to_modify._id,
        type: "follow",
      });
      await new_notification.save();
      return res
        .status(200)
        .send({ user_id: user_to_modify._id, message: "Follow User" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const update_user_info = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.user_id);
    if (!user) return res.status(400).send({ message: "User Not Found" });

    const { new_user_name, new_email, new_password } = req.body;

    if (!new_password || !new_email || !new_user_name) {
      return res.status(400).send({ message: "All Filieds Required" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);

    user.user_name = new_user_name || user.user_name;
    user.email = new_email || user.email;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const update_user_profile = async (req, res) => {
  const { bio, cover_image, profile_image, user_name } = req.body;
  console.log(req.body);
  const user_id = req.params.user_id;
  try {
    const user = await UserModel.findById(user_id);
    // Upload Profile Image and Cover Image
    if (profile_image) {
      const profile_image_id = await cloudinary.uploader.upload(profile_image);
      user.profile_image = profile_image_id.secure_url;
    }
    if (cover_image) {
      const profile_image_id = await cloudinary.uploader.upload(cover_image);
      user.cover_image = profile_image_id.secure_url;
    }
    user.bio = bio;
    user.user_name = user_name;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const user_like_post = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user = await UserModel.findById(req.user._id);
    const post = await PostModel.findById(post_id).populate("user");
    if (!user) return res.status(404).send({ message: "User Not Found" });
    user.liked_posts.push(post_id);
    post.post_likes.push(req.user._id);
    await user.save();
    await post.save();
    const new_notification = new NotificationModel({
      from: req.user._id,
      to: post.user._id,
      type: "like",
    });
    await new_notification.save();
    return res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const user_unlike_post = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user = await UserModel.findById(req.user._id);
    const post = await PostModel.findById(post_id);
    if (!user) return res.status(404).send({ message: "User Not Found" });
    user.liked_posts.pop(post_id);
    post.post_likes.pop(req.user._id);
    await user.save();
    await post.save();
    return res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const user_posts = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    let posts = await PostModel.find({ user: user_id });

    posts = await Promise.all(
      posts.map(async (post) => {
        post.post_comments = await Promise.all(
          post.post_comments.map(async (comment) => {
            comment.user = await UserModel.findById(comment.user);
            return comment;
          })
        );
        return post;
      })
    );

    return res.status(200).send(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const comment_post = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const commentText = req.body.commentText;
    const post = await PostModel.findById(post_id).populate("user");
    post.post_comments.push({ text: commentText, user: req.user._id });
    await post.save();
    const new_notification = new NotificationModel({
      from: req.user._id,
      to: post.user._id,
      type: "comment",
    });
    await new_notification.save();
    return res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

export {
  get_user_profile,
  get_suggested_users,
  follow_unfollow,
  update_user_info,
  update_user_profile,
  user_like_post,
  user_unlike_post,
  comment_post,
  user_posts,
};
