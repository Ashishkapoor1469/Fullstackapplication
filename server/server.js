// require("dotenv").config()
const express = require("express");
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const userRouter = require("./routes/userroute")
const db = require("./utils/mongodb")
const auth = require("./middlewares/authMiddelware")
const app = express();
const limiter = rateLimit({
   windowMs:1*60*1000,
   max:50
})
const Port = 4000;
const corsOptions = {
   origin:["http://localhost:5173/"],
   method:"GET,POST,PATCH,DELETE,PUT,HEAD",
   credentials:true
}
app.use(express.json())
// app.use(auth)
app.use(cors(corsOptions));
app.use(limiter)
app.get("/",async(req,res)=>{
   res.send("Work")
})
app.use("/api/auth",userRouter);

db().then(()=>{
   app.listen(Port,"0.0.0.0",()=>{
      console.log(`Server is listen at ${Port}`)
   })
})