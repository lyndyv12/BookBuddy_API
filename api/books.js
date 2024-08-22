const express = require("express");

const { getBooks, getBookbyID, createBook } = require("../db/books");

const booksRouter = express.Router();


booksRouter.get("/", async (req,res)=>{
    try{
        const results = await getBooks();
        res.send(results);
    } catch (err) {
        res.send({ err, message:"something went wrong"});
    }
});

booksRouter.get("/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await getBookbyID(id);
        res.send(result);
    } catch (err) {
        res.send({ err, message:"something went wrong"});
    }
});

booksRouter.post("/", async (req,res)=>{
    try{
        const result = createBook(req.body);
        console.log(result);
        res.send("created book");
        
    } catch (err) {
        console.log(err);
    }
});


module.exports = booksRouter;