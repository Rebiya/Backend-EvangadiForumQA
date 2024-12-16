const { v4: uuidv4 } = require("uuid");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const addQuestion = async (req, res) => {
  const { title, description } = req.body;
  const { username, userid } = req.user;
  const questionId = uuidv4();
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill in all fields" });
  }
  try {
    await dbConnection.query(
      "INSERT INTO questions (title, description, questionid, userid) VALUES (?,?,?,?)",
      [title, description, questionId, userid]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question submitted successfully", questionId });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "something went wrong on adding your Question,try again later"
    });
  }
};

const allQuestion = async (req, res) => {
  if (!req.body) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No questions found" });
  }
  const { username, userid } = req.user;
  try {
    const [questions] = await dbConnection.query(
      "SELECT q.questionid,u.username, q.title, q.description, q.created_at  FROM questions q JOIN users u ON q.userid = u.userid "
    );
    res
      .status(200)
      .json({ msg: "Request body processed successfully", questions });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "something went wrong while fetching all questions please try again later"
    });
  }
};
const singleQuestion = async (req, res) => {
  const { question_id } = req.params; 
  try {
    const [questions] = await dbConnection.query(
      `SELECT q.questionid, u.username, q.title, q.description, q.created_at 
       FROM questions q 
       JOIN users u ON q.userid = u.userid 
       WHERE q.questionid = ?;`,
      [question_id]
    );

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ msg: "No question found with the provided ID" });
    }

    res.status(200).json({
      msg: "Question fetched successfully",
      question: questions[0]
    });
  } catch (error) {
    console.error("Error fetching question:", error.message);
    res.status(500).json({
      msg: "Something went wrong while fetching the question. Please try again later."
    });
  }
};


module.exports = { allQuestion, singleQuestion, addQuestion };
