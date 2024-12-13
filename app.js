const express = require("express");
const app = express();
const connectDB = require("./db/dbConfig");
const port = 3000;

app.use(express.json());

//connecting with mysql
connectDB()
  .then((connection) => {
    global.connection = connection;
    app.get("/", (req, res) => {
      res.send("successfully connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//user routes middleware file :
const userRoutes = require("./routes/userRouter");
// const answerRoutes = require("./routes/answerRouter");
// const questionRoutes = require("./routes/questionRouter");

//register route

app.use("/api/users", userRoutes);
// app.use("/api/answer", answerRoutes);
// app.use("/api/questions", questionRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${port}`);
  }
});
