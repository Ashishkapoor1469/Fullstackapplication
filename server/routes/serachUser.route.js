import express from "express";
import authmiddleware from "../middlewares/authMiddelware.js";
import {
  getUserById,
  searchUsers,
} from "../controllers/usersearchId/usersearch.controller.js";
const router = express.Router();

router.post("/user/search", authmiddleware, searchUsers);
router.get("/user/:id", authmiddleware, getUserById);

export default router;
