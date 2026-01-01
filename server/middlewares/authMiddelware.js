const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const jwtToken = token.replace("bearer ","").trim()
  try {

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userData = await User.findOne({email:isVerified.email}).select({password:0});
    req.user = userData;
    req.token = token;
    req.UserId = userData._id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authmiddleware
};
