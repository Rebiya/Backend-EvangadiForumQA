const allQuestion = async (req, res) => {
  //   const { id } = req.body;
  //   const query = `SELECT * FROM questions WHERE id = $1`;
  //   db.query(query, [id], (err, result) => {
  //     if (err) {
  //       console.error(err.message);
  //       res.status(500).send("Error fetching questions");
  //     } else {
  //       res.json(result.rows);
  //     }
  //   });
  const { username, userid } = req.user;
  // console.log(username, userid);
  res.send("question is accepted");
};
const singleQuestion = async (req, res) => {
  res.send("a single question is accepted");
};
const addQuestion = async (req, res) => {
  res.send("u can now ask your Questions");
};

module.exports = { allQuestion, singleQuestion, addQuestion };
