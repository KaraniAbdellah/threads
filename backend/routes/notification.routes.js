import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
  create_post,
} from "../controllers/notification.controllers.js";


const notificationRouter = express.Router();




export default notificationRouter;
