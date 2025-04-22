import express from "express";
import {auth} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.get("/signup", auth);



export default authRouter;
