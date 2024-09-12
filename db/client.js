const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  database: process.env.DB_NAME,
});
module.exports = db;