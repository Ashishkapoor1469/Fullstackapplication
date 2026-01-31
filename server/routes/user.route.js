import express from "express";
import {
  user,
  login,
  userUpdate,
  userData,
  UserforgetPass,
  verifyUser,
  resetPass,
  LoginHistory,
} from "../controllers/user.controller.js";
import deviceCheck from "../middlewares/device.middelware.js";
import authmiddleware from "../middlewares/authMiddelware.js";
import {
  getSubscription,
  subscribe,
} from "../controllers/subscription.controller.js";
import { toggleNotifications } from "../controllers/nortify.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/register", user);
router.post("/login", deviceCheck, login);
router.post("/verify-code", verifyUser);
router.get("/user", authmiddleware, userData);
router.post("/user/forget", UserforgetPass);
router.get("/user/login-history", authmiddleware, LoginHistory);
router.post("/user/reset", authmiddleware, resetPass);
router.post("/user/update", authmiddleware,upload.single("avatar"), userUpdate);
router.post("/subscribe", authmiddleware, subscribe);
router.get("/subscribe", authmiddleware, getSubscription);
router.post("/toggle-notifications", authmiddleware, toggleNotifications);

export default router;
