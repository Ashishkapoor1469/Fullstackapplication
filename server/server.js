import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import rateLimit from "express-rate-limit";
// import redisClient from "./config/redis.js";
// import RedisStore from "rate-limit-redis";
import userRouter from "./routes/userroute.js";
import db from "./utils/mongodb.js";
const app = express();

// const apiLimiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.sendCommand(args),
//   }),
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

const Port = 4000;
const corsOptions = {
  origin: ["http://localhost:5173"],
  method: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use("/api/", apiLimiter);
app.get("/", async (req, res) => {
  res.json({ active: true, message: "Server is running" });
});
app.use("/api/auth", userRouter);

db().then(() => {
  app.listen(Port, "0.0.0.0", () => {
    console.log(`Server is listen at ${Port}`);
  });
});
