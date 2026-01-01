const mongoose = require("mongoose");
const URL = "mongodb+srv://kapoorashish714:%40ashish2005@cluster0.y0iwm.mongodb.net/";

const ConnectDB = async ()=>{
    try{
   await mongoose.connect(URL);
   console.log("DB Connected successfully");
    }
    catch (error){
    console.log(`error for DB ${error}`)
    process.exit(0)
    }
}

module.exports = ConnectDB;