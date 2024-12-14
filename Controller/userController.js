const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { userid, username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // user will be an array of objects containing the username and userid
    const [user] = await dbConnection.query(
      "select username,userid from users where username=? or email=?",
      [username, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already has an account." });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password should be at least 8 characters long." });
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "user successfully registered" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong ,try again later" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const selectUser =
      "SELECT username,password,userid,firstname FROM users where username=?";
    const [user] = await dbConnection.query(selectUser, [username]);
if (!user || user.length === 0 || !user[0].password) {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: "User does not exist or invalid user data" });
}
const isValidPassword = await bcrypt.compare(password, user[0].password);
// console.log("Retrieved user:", user);
if (!isValidPassword) {
  return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid password" });
}

return res
  .status(StatusCodes.ACCEPTED)
  .json({ msg: "User logged in successfully" });

  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong plz wait" });
  }
};
// const checkUser =async (req, res) => {
//   res.send("successfully checked");
// };

module.exports = { register, login };
