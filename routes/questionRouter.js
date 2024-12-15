const express = require("express");
const router = express.Router();
const { allQuestion,singleQuestion,addQuestion } = require("../Controller/questionController");
//all question route
router.get("/", allQuestion);
router.get("/:question_id",singleQuestion);
router.post("/",addQuestion)


module.exports = router;
