import express from "express";
import {signup, logout, login} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/logout", logout);
authRouter.post("/login", login);



export default authRouter;
