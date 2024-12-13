const mysql2 = require("mysql2");
require("dotenv").config();

//-------------using createPool-------------
const dbConnection = mysql2.createPool({
  user: "Rebu",
  database: "evangadi-qa",
  host: "localhost",
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 10
});

module.exports = dbConnection.promise();
// // dbconnection.execute("select 'test' ", (err, result) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(result);
// //   }
// // });
