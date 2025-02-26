
// db password = 45IEktK0XZZlvsmy

//Connecting express/mongoose to project
const express = require("express");
const mongoose = require("mongoose");


const app = express();

//connecting middlewares
app.use("/",(req,res,next) =>{
    res.send("Its working");
})

//Connecting DB
mongoose.connect("mongodb+srv://admin:45IEktK0XZZlvsmy@cluster0.k42cb.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log((err)));