const express = require("express");
const router = express.Router();
const {
  GetSingleAns,
  PostSingleAns
} = require("../Controller/answerController");
router.get("/:question_id", GetSingleAns);
router.post("/:question_id", PostSingleAns);

module.exports = router;
