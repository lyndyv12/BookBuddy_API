const express = require("express");
const apiRouter = express.Router();

const app=express();
app.use(express.json());

apiRouter.use("/users", require("./users"));
apiRouter.use("/books", require("./books"));

apiRouter.get("/", (req,res)=>{
    res.send("Hello from /api");
});

module.exports = apiRouter;