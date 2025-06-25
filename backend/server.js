import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";


import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import notificationRouter from './routes/notification.routes.js';

import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";



cloudinary.config({
    could_name: process.env.CLOUDINARY_COULD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SCRET_KEY,
    // secure: true
});

const server = express();
// Allows cookies and credentials and Allow request from any origin
server.use(cors({credentials: true, origin: true}))
server.use(express.json());
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/post", postRouter);
server.use("/api/notification", notificationRouter);





server.listen(process.env.PORT, (err) => {
    err
        ? console.log(`Error While Starting The Server ${err}`)
        : console.log(`Server Running In Port ${process.env.PORT}`);
    connectDb();
});
