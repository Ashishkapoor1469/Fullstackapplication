import express from "express";
import {
  user,
  userUpdate,
  userData,
  UserPost,
  UserforgetPass,
  verifyUser,
  resetPass,
} from "../controllers/userControl.js";
import authmiddleware from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/register", user);
router.post("/login", user);
router.post("/verify-code", verifyUser);
router.get("/user", authmiddleware, userData);
router.get("/user/forget", UserforgetPass);
router.get("/user/reset", resetPass);
router.put("/user/update", authmiddleware, userUpdate);
router.get("/user/post", authmiddleware, UserPost);

export default router;
