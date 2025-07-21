import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";
import generateCookie from "../lib/utils/generateCookie.js";
import { sendMail } from "../lib/utils/sendMail.js";

const signup = async (req, res) => {
  
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

    if (new_user) {
      const token = generateCookie(new_user._id, res);
      await UserModel.create(new_user);
      res.status(201).send({ token: token });
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
    const refreshTokenOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "None",
    };
    res.clearCookie("token", refreshTokenOptions);
    return res.status(200).send({ message: "Log Out Succeffully" });
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
      return res.status(400).send({ message: "Can Not Hash The Password" });
    }
    

    // Create new user
    const new_user = new UserModel({
      user_name: user_name,
      email: email,
      password: hashed_password,
    });

    if (new_user) {
      let token;
      if (!exiting_user) {
        token = await generateCookie(new_user._id, res);
        await UserModel.create(new_user);
      } else {
        token = generateCookie(exiting_user._id, res);
      }
      
      return res.status(200).send({ token: token });
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
  
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const is_password_correct = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !is_password_correct) {
      res.status(400).send({ message: "Wrong Credential" });
      return;
    }
    const token = generateCookie(user._id, res);
    res.status(200).send({ token: token });
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const get_me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user)
      return res.status(404).send({ message: "User Not Found At Database" });

    if (user.profile_image === "null" && user.cover_image === "null") {
      user.profile_image = `https://robohash.org/${req.user.user_name}.png?size=150x150`;
      user.cover_image = `https://robohash.org/${req.user.user_name}.png?size=150x150`;
    }
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const check_email = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) return res.status(200).send(user);
    else return res.status(404).send({ message: "User Not Found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const change_password = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.new_password, salt);
      if (!hashed_password) {
        return res.status(400).send({ message: "Can Not Hash The Password" });
      }

      user.password = hashed_password;
      const token = generateCookie(user._id, res);
      await user.save();
      return res.status(200).send({ token: token });
    } else return res.status(404).send({ message: "User Not Found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const forget_password = async (req, res) => {
  try {
    
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(500).send({ message: "Please Fill All Inputs" });
    }

    sendMail(email, subject, message)
      .then((result) => {
        return res.send({ message: result.message });
      })
      .catch((err) => {
        
        return res.status(500).send({ message: err.message });
      });
  } catch (error) { 
    return res.status(500).send({ message: error.message });
  }
};

export {
  signup,
  logout,
  login,
  get_me,
  signup_with_google,
  check_email,
  change_password,
  forget_password,
};
