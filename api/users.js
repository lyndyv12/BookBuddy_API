const express = require("express");
const userRouter = express.Router();


const { getUsers, getUserbyID, createUser } = require("../db/users");


userRouter.get("/", async (req,res)=>{
    try{
        const results = await getUsers();
        res.send(results);
    } catch (err) {
        res.send({ err, message:"something went wrong"});
    }
});

userRouter.get("/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await getUserbyID(id);
        res.send(result);
    } catch (err) {
        res.send({ err, message:"something went wrong"});
    }
});


userRouter.get("/me", (req,res)=>{
    res.send("here is your account info");
});


userRouter.post("/register", async (req,res) => {
    try {
        const result = await createUser(req.body);
        console.log(result);
        res.send("created user")

    } catch (err){
        console.log(err)
        res.send(err)
    }
});

userRouter.post("/login", (req,res)=>{
    console.log("Request Body", req.body)
    res.send("User Logged In");
});

module.exports = userRouter;