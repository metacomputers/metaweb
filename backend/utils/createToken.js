import jwt from "jsonwebtoken";

//creating the token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //set JWT as an HTTP- Only
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Only use secure in production
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict", // Use 'lax' in development
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
