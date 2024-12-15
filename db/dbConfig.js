const mysql2 = require("mysql2");

//-------------using createPool-------------
const dbConnection = mysql2.createPool({
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  host: "localhost",
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 10
});
module.exports = dbConnection.promise();

