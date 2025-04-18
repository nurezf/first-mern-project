import express from "express";
import dotenv from"dotenv";


dotenv.config();

const app=express();

app.get("/products",(req,res)=>{
    res.send("Hello World");
})


app.listen(5000,()=>{
    console.log("server statrte at port 5000")
})


//