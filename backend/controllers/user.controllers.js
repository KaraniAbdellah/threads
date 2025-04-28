import express from "express";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";


import bcrypt, { hash } from "bcrypt";
import UserModel from "../models/User.js";
import NotificationModel from "../models/Notification.js";


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
        const userId = req.user._id;
        const following_users = await UserModel.findById(userId).select("following");

        const users = await UserModel.aggregate([
            {$match: {_id: {$ne: userId}}},
            {$sample: {size: 10}}
        ]);
        const filtred_users = users.filter((user) => !following_users.following.includes(user._id));
        const suggested_users = filtred_users.slice(0, 4);
        suggested_users.forEach((user) => user.password = null);
        res.status(200).send(suggested_users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: error.message});
    }
}

const follow_unfollow = async (req, res) => {
    try {
        const id = req.params.id;
        const user_to_modify = await UserModel.findById(id);
        const current_user = await UserModel.findById(req.user._id);
        if (id == req.user._id.toString()) return res.status(400).send({error: "You Can Follow or Unfollow Yourself"});
        
        if (!current_user || !user_to_modify) res.status(400).send({error: "Can Not Find Users"});

        const is_following = current_user.following.includes(id);
        if (is_following) {
            // Unfollow User
            await UserModel.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await UserModel.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            // We Should Be Remove Notification
            // const to_delete_notification = await NotificationModel.findOne({
            //     from: req.user._id,
            //     to: user_to_modify._id,
            //     type: 'follow',
            // })
            // console.log(to_delete_notification);
            // await NotificationModel.findByIdAndDelete(to_delete_notification._id);

            return res.status(200).send({user_id: user_to_modify._id, message: "Unfollow User"});
        } else {
            // Follow User
            await UserModel.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await UserModel.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            // Send Notification To User
            const new_notification = new NotificationModel({
                from: req.user._id,
                to: user_to_modify._id,
                type: "follow"
            });
            await new_notification.save();
            return res.status(200).send({user_id: user_to_modify._id, message: "Follow User"});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({error: error.message});
    }
}

const update_user_profile = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.user_id,req.body);
        if (!user) return res.status(400).send({message: "User Not Found"});

        const {user_name, email, new_password, current_password, bio, link} = req.body;
        let {profile_image, cover_image} = req.body;

        if (!new_password || !current_password || !user_name || !email || !new_password.length < 6) {
            return res.status(400).send({message: "All Filieds Required"});
        }
        
        const is_match = await bcrypt.compare(current_password, user.password);
        if (!is_match) return res.status(400).send({message: "The Current Password does Not Correct"});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(new_password, salt);

        if (profile_image) {
            if (user.profile_image) {
                await cloudinary.uploader.destroy(user.profile_image.split("/").pop().split(".")[0]);
            }
            const uploaded_res_profile = await cloudinary.uploader.upload(profile_image);
            user.profile_image = uploaded_res_profile.secure_url;
        }

        if (cover_image) {
            if (user.cover_image) {
                await cloudinary.uploader.destroy(user.cover_image.split("/").pop().split(".")[0]);
            }
            const uploaded_res_cover = await cloudinary.uploader.upload(cover_image);
            user.cover_image = uploaded_res_cover.secure_url;
        }

        user.user_name = user_name || user.user_name;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;

        user = await user.save();
        user.password = null;
        return res.status(200).send(user);
 
    } catch (error) {
        
    }
}


export { get_user_profile, get_suggested_users, follow_unfollow, update_user_profile };
