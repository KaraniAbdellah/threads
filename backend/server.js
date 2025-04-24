import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import { connectDb } from "./config/db.js";

const server = express();
server.use(express());
server.use("/api/auth", authRouter);





server.listen(process.env.PORT, (err) => {
    err
        ? console.log(`Error While Starting The Server ${err}`)
        : console.log(`Server Running In Port ${process.env.PORT}`);
    connectDb();
});
