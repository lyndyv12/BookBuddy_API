const express = require("express");
const app=express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

require("dotenv").config();
const client = require("./db/client");
client.connect()
app.use(cors());

app.use(express.json());


app.use("/api", require("./api"));

app.get("/", (req,res)=>{
    res.send("Hello from our server")
})

app.get("*", (req, res) => {
    res
        .status(404)
        .send({
            error:"404 - Not Found",
            message: "No route found for this URL",
        })
})

app.listen(PORT, ()=>{
    console.log(`server is working on ${PORT}`)
})