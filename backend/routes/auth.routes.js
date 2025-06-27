import express from "express";
import {signup, logout, login, get_me, signup_with_google, check_email, change_password} from "../controllers/auth.controllers.js";
import protect_middlware from "../middlwares/protect_middlware.js";


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/logout", protect_middlware, logout);
authRouter.post("/login", login);
authRouter.post("/signup_with_google", signup_with_google);
authRouter.get("/me", protect_middlware, get_me);
authRouter.post("/check_email", check_email);
authRouter.post("/change_password", change_password);


export default authRouter;
