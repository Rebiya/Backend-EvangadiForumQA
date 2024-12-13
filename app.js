const express = require("express");
const app = express();
const dbConnection = require("./db/dbConfig");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes middleware file
const userRoutes = require("./routes/userRouter");
// const answerRoutes = require("./routes/answerRouter");
// const questionRoutes = require("./routes/questionRouter");

// Register routes
app.use("/api/users", userRoutes);
// app.use("/api/answer", answerRoutes);
// app.use("/api/questions", questionRoutes);

const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log(result);
    app.listen(port);
    console.log("database is connected");
    console.log("server is running");
  } catch (error) {
    console.log(error.message);
  }
};
start();
