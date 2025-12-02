import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./db/index.js";

const envPath = fs.existsSync("./.env") ? "./.env" : "./public/temp/.env";
dotenv.config({
  path: envPath,
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{});
    console.log(`Server is running on port ${process.env.PORT}`);
})
.catch((error)=>{
    console.log("MongoDB db connection failed!!! ", error);
})


















/*
//this was the first approch i used to connect to the database and start the server
import express from "express";
const   app = express();

//this is an IIFE from javascript and it runs as soon as it is defined and declared
(async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.error("Error connecting to the database:", error);
        throw error;
       });

       app.listen(process.env.PORT, () => {});
       console.log(`Server is running on port ${process.env.PORT}`);
       
    } catch (error) {
        console.error
        ("Error connecting to the database:", error);
        throw error;
    }
})();*/
