const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const GetSingleAns = async (req, res) => {
  res.send("Get an answer for a specific Question");
};
const PostSingleAns = async (req, res) => {
  res.send("post answer for a specific question");
};
module.exports = { GetSingleAns ,PostSingleAns};
