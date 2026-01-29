import express from "express";
import { getPosts } from "../controllers/post.controller.js";
import authmiddleware from "../middlewares/authMiddelware.js";
const router = express.Router();

router.get("/posts", authmiddleware, getPosts);

export default router;
