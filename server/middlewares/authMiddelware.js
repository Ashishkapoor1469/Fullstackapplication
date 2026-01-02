import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Accept both "Bearer token" or "bearer token"
  const jwtToken = token.replace(/Bearer\s+/i, "").trim();

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    req.userId = user._id; 
    req.token = jwtToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired token" });
  }
};

export default authmiddleware;   
