const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "thonmydata",
  port: 5432,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "thonmydata",
  port: 5432,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
