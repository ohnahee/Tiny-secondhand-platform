const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "tinyshop",
  password: process.env.DB_PASSWORD || "0824",
  port: parseInt(process.env.DB_PORT, 10) || 5432
});

module.exports = pool;
