import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";
import generateCookie from "../lib/utils/generateCookie.js";
import { OAuth2Client } from "google-auth-library";

const signup = async (req, res) => {
  console.log("Request Come From Postman");
  try {
    const { email, password, user_name } = req.body;

    // Please enter a valid email address (e.g. example@domain.com)
    if (!user_name || !password || password.length < 8) {
      res.status(400).send({
        message:
          "All Filieds Required and Password Should Be Al Least 6 Character",
      });
      return;
    }

    const exiting_user = await UserModel.findOne({ email: email });
    if (exiting_user) {
      res.status(400).send({ message: "User Already Exit" });
      return;
    }

    // hash password
    const slatNumber = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, slatNumber);
    if (!hashed_password) {
      res.status(400).send({ message: "Can Not Hash The Password" });
    }

    // Create new user
    const new_user = new UserModel({
      user_name: user_name,
      email: email,
      password: hashed_password,
    });
    console.log(new_user);

    if (new_user) {
      generateCookie(new_user._id, res);
      await UserModel.create(new_user);
      res.status(201).send({
        user_name: new_user.user_name,
        email: new_user.email,
        profile_image: new_user.profile_image,
        cover_image: new_user.cover_image,
        followers: new_user.followers,
        following: new_user.following,
      });
      return;
    } else {
      res.status(400).send({ message: "Can Not Create User" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ message: "Log Out Succeffully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const signup_with_google = async (req, res) => {
  try {
    const { email, password, user_name } = req.body;

    // Please enter a valid email address (e.g. example@domain.com)
    if (!user_name || !password || password.length < 8) {
      res.status(400).send({
        message:
          "All Filieds Required and Password Should Be Al Least 6 Character",
      });
      return;
    }

    const exiting_user = await UserModel.findOne({ email: email });
    // hash password
    const slatNumber = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, slatNumber);
    if (!hashed_password) {
      res.status(400).send({ message: "Can Not Hash The Password" });
    }

    // Create new user
    const new_user = new UserModel({
      user_name: user_name,
      email: email,
      password: hashed_password,
    });

    if (new_user) {
      generateCookie(new_user._id, res);
      if (!exiting_user) await UserModel.create(new_user);
      console.log({
        user_name: new_user.user_name,
        email: new_user.email,
        profile_image: new_user.profile_image,
        cover_image: new_user.cover_image,
        followers: new_user.followers,
        following: new_user.following,
      });
      res.status(201).send({
        user_name: new_user.user_name,
        email: new_user.email,
        profile_image: new_user.profile_image,
        cover_image: new_user.cover_image,
        followers: new_user.followers,
        following: new_user.following,
      });
      return;
    } else {
      res.status(400).send({ message: "Can Not Create User" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log("request come to login");
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email: email });
    const is_password_correct = await bcrypt.compare(
      password,
      user?.password || ""
    );
    console.log(user);

    if (!user || !is_password_correct) {
      res.status(400).send({ message: "Wrong Credential" });
      return;
    }
    generateCookie(user._id, res);
    res.status(200).send(user);
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};


const get_me = async (req, res) => {
  try {
    return res.status(200).send(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export { signup, logout, login, get_me, signup_with_google };
