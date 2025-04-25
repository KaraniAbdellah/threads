import jwt from "jsonwebtoken";

export default function generateCookie(user_id, res) {
  const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY, {
    expiresIn: "15d"
  });
  res.cookie("jwt", token, {
    maxAge: 1296000,
    httpOnly: true, // prevent XSS (cross site scripting) attack,
    sameSite: "strict", // CSRF attack cross-site request forgery
    secure: process.env.NODE_ENV !== "development"
  });
}

