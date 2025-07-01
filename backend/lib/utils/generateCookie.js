import jwt from "jsonwebtoken";

export default function generateCookie(user_id, res) {
  const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY, {
    expiresIn: "15d"
  });
  console.log(token);
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 15 * 24 * 60 * 60 * 1000, // expires in 15d
  });
  return token;
}

