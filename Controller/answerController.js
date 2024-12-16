const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const GetSingleAns = async (req, res) => {
  const { question_id } = req.params;

  try {
    const query = `SELECT a.answerid, u.username, a.answer, a.created_at
                   FROM answers a 
                   JOIN users u ON a.userid = u.userid 
                   WHERE a.questionid = ?`;
    const [rows] = await dbConnection.query(query, [question_id]);

    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Answer not found" });
    }

    return res.status(StatusCodes.OK).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpected error!" });
  }
};

const PostSingleAns = async (req, res) => {
  const { answer } = req.body;
  const { userid } = req.user;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fileds required" });
  }

  console.log("Answer:", answer);
  console.log("User ID:", userid);
  //  console.log("Question ID:", question_id);
  try {
    const { question_id } = req.params;
    console.log(question_id);

    const sendAnswer = `INSERT INTO answers(answer,userid,questionid) VALUES (?,?,?)`;
    await dbConnection.query(sendAnswer, [answer, userid, question_id]);
    return res.status(StatusCodes.ACCEPTED).json({ msg: "answer sent" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "database error" });
  }
};
module.exports = { GetSingleAns, PostSingleAns };
