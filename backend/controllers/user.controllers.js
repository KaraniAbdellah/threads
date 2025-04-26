import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";


const test = (req, res) => {
    res.json("Hello Test");
}


export { get_user_profile, get_suggested_users, follow_unfollow, update_user_profile };
