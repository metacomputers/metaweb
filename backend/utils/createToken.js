import jwt from "jsonwebtoken";

//creating the token
const generateToken = (res,  userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });


    //set JWT as an HTTP- Only
    res.cookie('jwt' , token, {
        httpOnly: true,
        secure : process.env.NODE_ENV != 'development',
        sameSite : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};

const decodeToken = (req) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      throw new Error("No token found");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // { userId: '...', iat: ..., exp: ... }
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  };
  
export default {generateToken, decodeToken};