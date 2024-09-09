const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// Create a new user
const createUser = async ({
  firstname = "fistnameexample",
  lastname = "lastnameexample",
  email,
  password,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const SQL = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) ON CONFLICT(email) DO NOTHING RETURNING id, firstname, lastname, email`;
    const {
      rows: [user],
    } = await client.query(SQL, [
      firstname || "firstname",
      lastname || "lastname",
      email,
      hashedPassword,
    ]);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// Get a user by email
const getUserByEmail = async (email) => {
  try {
    const SQL = `SELECT * FROM users WHERE email=$1`;
    const {
      rows: [user],
    } = await client.query(SQL, [email]);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// Get a user by their ID
const getUserById = async (id) => {
    try {
      const SQL = `SELECT * FROM users WHERE id=$1`;
      const {
        rows: [user],
      } = await client.query(SQL, [id]);
      delete user.passwords;
      return user;
    } catch (err) {
      console.log(err);
    }
  };

// Authenticate a user by email and password
const getUser = async ({ email, password }) => {
    try {
      const existingUser = await getUserByEmail(email);
      if (!existingUser) return;
      const hashedPassword = existingUser.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if (!passwordsMatch) return;
      delete existingUser.password; // Remove password from result
      return existingUser;
    } catch (err) {
      console.log(err);
    }
  };

  // Get all users
const getUsers = async () => {
    try {
      const SQL = `SELECT * FROM users`;
      const { rows } = await client.query(SQL);
      return rows;
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports = { createUser, getUserByEmail, getUserById, getUsers, getUser };