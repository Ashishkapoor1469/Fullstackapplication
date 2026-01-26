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
import { checkTweetLimit } from "../controllers/tweet.controller.js";
import {
  getSubscription,
  subscribe,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/register", user);
router.post("/login", deviceCheck, login);
router.post("/verify-code", verifyUser);
router.get("/user", authmiddleware, userData);
router.post("/user/forget", UserforgetPass);
router.get("/user/login-history", authmiddleware, LoginHistory);
router.post("/user/reset", authmiddleware, resetPass);
router.put("/user/update", authmiddleware, userUpdate);
router.post("/user/post", authmiddleware, checkTweetLimit, UserPost);
router.post("/subscribe", authmiddleware, subscribe);
router.get("/subscribe", authmiddleware, getSubscription);
export default router;
