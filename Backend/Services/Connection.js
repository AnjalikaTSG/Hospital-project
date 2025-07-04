require('dotenv').config();
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB
});

connection.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to the database successfully!");
});

module.exports = connection;
