import express from "express";
import { googleLogin } from "../controllers/google.controller.js";
import deviceCheck from "../middlewares/device.middelware.js";
const router = express.Router();

router.post("/google-login",deviceCheck, googleLogin);

export default router;
