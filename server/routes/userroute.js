import express from "express";
import {
  user,
  userUpdate,
  JJ,
  UserPost,
  UserforgetPass,
} from "../controllers/userControl.js";
import authmiddleware from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/register", user);
router.post("/login", user);
router.get("/forget", UserforgetPass);
router.put("/user/update", authmiddleware, userUpdate);
router.get("/user", authmiddleware, JJ);
router.get("/user/post", authmiddleware, UserPost);

export default router;
