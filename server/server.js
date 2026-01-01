import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import redisClient from "./config/redis.js";
import userRouter from "./routes/userroute.js";
import RedisStore from "rate-limit-redis";
import db from "./utils/mongodb.js";
const app = express();


const apiLimiter = rateLimit({
  store: new RedisStore({ client: redisClient }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP in 15 min
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const Port = 4000;
const corsOptions = {
  origin: ["http://localhost:5173"],
  method: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(auth)

app.use("/api/", apiLimiter);
app.get("/", async (req, res) => {
  res.send("Work");
});
app.use("/api/auth", userRouter);

db().then(() => {
  app.listen(Port, "0.0.0.0", () => {
    console.log(`Server is listen at ${Port}`);
  });
});
