const express = require("express");
const router = express.Router();
const { register } = require("../Controller/userController");
//register route
router.post("/register", register);

//login user:
// router.post("/login",login);

//check user
// router.get("/checkuser", checkUser);

module.exports = router;
