import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";


cloudinary.config({
    could_name: process.env.COULDNIARY_COULD,
    api_key: process.env.COULDINARY_API_KEY,
    api_secret: process.env.COULDINARY_API_SCRET_KEY,
});

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/post", );





server.listen(process.env.PORT, (err) => {
    err
        ? console.log(`Error While Starting The Server ${err}`)
        : console.log(`Server Running In Port ${process.env.PORT}`);
    connectDb();
});
