const mysql2 = require("mysql2");
//importing dotenv
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      user: "Rebu",
      password: process.env.MYSQL_PASSWORD,
      database: "evangadi-qa",
      connectionLimit: 10
    });
    console.log("MySQL connected");
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

//------------------------------using createPool----------------------------
// //user createPool for more  complex and large scoped db's
// // const dbConnection = mysql2.createPool({
// //   user: "",
// //   database: "",
// //   host: "",
// //   password: "",
// //   connectionLimit: 10
// // });
// // dbconnection.execute("select 'test' ", (err, result) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(result);
// //   }
// // });
