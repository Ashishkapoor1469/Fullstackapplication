const express = require("express");
const router = express.Router();
const userRoute = require("../controllers/userControl")
router.route("/user").get(userRoute.JJ);
router.route("/user/:id").get(async (req,res)=>{
    const userId = req.params.id
    res.send(`User id ${userId} `)
});

router.route("/userupdate").get(async (req,res)=>{
    res.send("Updateuser")
});

module.exports = router;
 