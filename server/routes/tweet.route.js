import express from "express";
import authmiddleware from "../middlewares/authMiddelware.js";
import { createTweet } from "../controllers/audiotweet.controller.js";
import { audioUpload } from "../middlewares/audioupload.js";
import { UserPost } from "../controllers/user.controller.js";
import { checkTweetLimit } from "../controllers/tweet.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post(
  "/create",
  authmiddleware,
  audioUpload.single("audio"),
  createTweet,
);
router.post(
  "/post",
  authmiddleware,
  checkTweetLimit,
  upload.single("image"),
  UserPost,
);

export default router;
