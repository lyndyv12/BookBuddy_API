const express = require("express");
const app=express();

const PORT = 3000;

require("dotenv").config();
const client = require("./db/client");
client.connect()

app.use(express.json());

app.use("/api", require("./api"));

app.get("/", (req,res)=>{
    res.send("Hello from our server")
})

app.listen(PORT, ()=>{
    console.log(`server is working on ${PORT}`)
})