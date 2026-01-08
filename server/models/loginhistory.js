import mongoose from "mongoose";

const LoginHistory = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  browser: String,
  os: String,
  devicetype: String,
  isAddress: String,
  loginAt: {
    type: Date,
    default: Date.now(),
  },
});

const LoginHs = mongoose.model("Loginhistory", LoginHistory);
export default LoginHs;
