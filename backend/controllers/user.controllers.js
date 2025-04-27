import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";


const get_user_profile = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await UserModel.findById(user_id).select("-password");
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
    try {
        const id = req.params.id;
        const user_to_modify = await UserModel.findById(id);
        const current_user = await UserModel.findById(req.user._id);
        if (id == req.user._id) return res.status(400).send({error: "You Can Follow or Unfollow Yourself"});
        
        if (!current_user || !user_to_modify) res.status(400).send({error: "Can Not Find Users"});

        const is_following = current_user.following.includes(id);
        if (is_following) {
            // Unfollow User
            await UserModel.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await UserModel.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            res.status(200).send({message: "Unfollow Succefully"});
        } else {
            // Follow User
            await UserModel.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await UserModel.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            // Send Notification To User
            res.status(200).send({message: "follow Succefully"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: error.message});
    }
}
const update_user_profile = async (req, res) => {
    try {
        // const 
    } catch (error) {
        
    }
}


export { get_user_profile, get_suggested_users, follow_unfollow, update_user_profile };
