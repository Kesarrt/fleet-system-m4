const express=require("express");
require("dotenv").config();

const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
res.send("Fleet System M4 Running");
});

app .listen(process.env.PORT,()=>{
    console.log('Server running on port ${process.env.PORT}');
});