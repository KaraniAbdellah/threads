import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export default async function protect_middlware(req, res, next) {
  try {
    // const token = req.headers.cookie;
    console.log("Hello To Procted Middlware");
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(400).send({ message: "No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if (!decoded) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    const user = await UserModel.findById(decoded.user_id).select("-password");
    console.log(user);
    
    if (!user) {
      return res.status(200).send({ message: "Can Not Find This User" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
}
