import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";


const get_user_profile = async (req, res) => {
    try {
        const {username} = req.params.username;
        const user = await UserModel.findOne({user_name: username}).select("-password");
        if (!user) return res.status(404).send({message: "User Not Found"});
        res.status(200).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: error.message});
    }
}
const get_suggested_users = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
const follow_unfollow = async (req, res) => {
    
}
const update_user_profile = async (req, res) => {
    
}


export { get_user_profile, get_suggested_users, follow_unfollow, update_user_profile };
