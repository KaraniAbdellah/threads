import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import {v2 as cloudinary} from "cloudinary";

const create_post = async (req, res) => {
  try {
    const text = req.body.post_text;
    const img = req.body.post_img;
    const user_id = req.user._id.toString();

    const user = await UserModel.findById(user_id);
    if (!user) return res.status(400).send({ message: "User Not Found" });

    if (!text || !img) {
      return res.status(400).send({ message: "Post Have No Text or Image" });
    }

    if (img) {
      const uploaded = await cloudinary.uploader.upload(img);
      img = uploaded.secure_url;
    }

    const new_post = new PostModel({
      user: user_id,
      post_text: text,
      post_image: img,
    });

    await PostModel.create();
    res.status(200).send(new_post);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({message: error.message});
  }
};

const like_unlike_post = (req, res) => {
  try {

  } catch (error) {

  }
};

const comment_post = (req, res) => {
  try {
  } catch (error) {}
};

const delete_post = (req, res) => {
  try {
  } catch (error) {}
};

export { create_post, like_unlike_post, comment_post, delete_post };
