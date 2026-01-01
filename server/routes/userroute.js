import express from "express";
import { user, userUpdate, JJ } from "../controllers/userControl.js";
import  authmiddleware  from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/register", user);
router.put("/update-profile", authmiddleware, userUpdate);
router.get("/user", JJ);

export default router;
