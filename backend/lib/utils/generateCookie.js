import jwt from "jsonwebtoken";

export default function generateCookie(user_id, res) {
  const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY, {
    expiresIn: "15d"
  });
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // expires in 24hr
  });
}

