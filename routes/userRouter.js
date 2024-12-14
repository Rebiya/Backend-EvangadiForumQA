const express = require("express");
const router = express.Router();
const { register, login,checkUser } = require("../Controller/userController");
const authMiddleware = require("../MiddleWare/authMiddleware");
//register route
router.post("/register", register);

//login user:
router.post("/login", login);

//check user
router.get("/checkuser", authMiddleware, checkUser);

module.exports = router;
