import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import notificationRouter from "./routes/notification.routes.js";

import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COULD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SCRET_KEY,
  // secure: true
});

const server = express();
// Allows cookies and credentials and Allow request from any origin
server.use(
  cors({
    origin: ["http://localhost:5173", "https://threads-gb5s.vercel.app"],
    credentials: true,
  })
);
server.use(express.json({ limit: "10mb" }));
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/post", postRouter);
server.use("/api/notification", notificationRouter);



connectDb();
export default server;


// server.listen(process.env.PORT, (err) => {
//     err
//         ? 
//         : 
//     connectDb();
// });
