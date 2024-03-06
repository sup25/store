const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "store",
  password: "asus",
  port: 5000,
});

module.exports = pool;
