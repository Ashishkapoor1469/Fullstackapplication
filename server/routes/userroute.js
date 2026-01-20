import express from "express";
import {
  user,
  login,
  userUpdate,
  userData,
  UserPost,
  UserforgetPass,
  verifyUser,
  resetPass,
  LoginHistory,
} from "../controllers/userControl.js";
import deviceCheck from "../middlewares/device.middelware.js";
import authmiddleware from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/register", user);
router.post("/login", deviceCheck, login);
router.post("/verify-code", verifyUser);
router.get("/user", authmiddleware, userData);
router.post("/user/forget", UserforgetPass);
router.get("/user/login-history", LoginHistory);
router.post("/user/reset", resetPass);
router.put("/user/update", userUpdate);
router.post("/user/post", UserPost);

export default router;
