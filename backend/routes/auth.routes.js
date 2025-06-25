import express from "express";
import {signup, logout, login, get_me, signup_with_google} from "../controllers/auth.controllers.js";
import protect_middlware from "../middlwares/protect_middlware.js";


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/logout", protect_middlware, logout);
authRouter.post("/login", login);
authRouter.post("/signup_with_google", signup_with_google);
authRouter.get("/me", protect_middlware, get_me);


export default authRouter;
