import express from "express";
import protect_middlware from "../middlwares/protect_middlware.js";
import {
    get_notification,
    delete_notification
} from "../controllers/notification.controllers.js";


const notificationRouter = express.Router();
notificationRouter.get("/get_notification", protect_middlware, get_notification)
notificationRouter.get("/", protect_middlware, delete_notification)



export default notificationRouter;
