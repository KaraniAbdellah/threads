import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export default async function protect_middlware(req, res, next) {
  try {
    // const token = req.headers.cookie;
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).send({ message: "No Token Provided" });
    }
    console.log("We Have A Token");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    const user = await UserModel.findById(decoded.user_id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "Can Not Find This User" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
