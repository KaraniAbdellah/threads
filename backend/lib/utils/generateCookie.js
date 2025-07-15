import jwt from "jsonwebtoken";

export default async function generateCookie(user_id, res) {
  const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY, {
    expiresIn: "15d"
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",     // Allows cross-site cookies
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return token;
}

