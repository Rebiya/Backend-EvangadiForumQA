const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./db/dbConfig");
const authMiddleware = require("./MiddleWare/authMiddleware");
const cors = require("cors");
const port = 5500;
// User,answer,question routes middleware file
const userRoutes = require("./routes/userRouter");
const answerRoutes = require("./routes/answerRouter");
const questionRouter = require("./routes/questionRouter");

//middleware for any requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/answer",authMiddleware, answerRoutes);
app.use("/api/questions", authMiddleware, questionRouter);

const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log(result);
    app.listen(port);
    console.log("database is connected");
    console.log(`server is running at port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
};
start();
