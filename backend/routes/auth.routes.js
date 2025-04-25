import express from "express";
import {signup, logout, login, get_me} from "../controllers/auth.controllers.js";
import protect_middlware from "../middlwares/protect_middlware.js";


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/logout", protect_middlware, logout);
authRouter.get("/login", login);
authRouter.get("/me", protect_middlware, get_me);



export default authRouter;
