const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUserById,
  getUsers,
  getUserByEmail,
  createUser,
  getUsersReservations,
  getUser,
} = require("../db");
const { requireUser } = require("./utils");

userRouter.get("/", async (req, res, next) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    if (!result) {
      return next({ name: "UserNotFoundError", message: "User not found" });
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/me", requireUser, async(req, res, next) => {
  try{
    if(req.user){
      const usersReservations = await getUsersReservations(req.user.id);
      console.log(userReservations);
      req.user.books = userReservations;
      res.send(req.user);
    } else{
      res.send("Error, login!")
    }
  }catch(err){}
});

userRouter.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email || !password) {
    return next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return next({
        name: "ExistingUserError",
        message: "User already registered with that email",
      });
    }
    const result = await createUser(req.body);
    const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
    res.send({
      message: "Registration Successful!",
      token,
      user: {
        id: result.id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const result = await getUser({ email, password });
    if (result) {
      const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "Login successful!", token });
    } else {
      return next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
