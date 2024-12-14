const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
// console.log("Request Headers:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Invalid Authorization Header:", authHeader);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid, header missing or malformed" });
  }

  try {
    const token = authHeader.split(" ")[1];
    // console.log("Request Headers:", authHeader);
    // console.log("Request token:", token);
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Authentication invalid, token not provided" });
    }

    const { username, userid } = jwt.verify(token, "secret");

    req.user = { username, userid }; //to attach the data to the req 
    // console.log("checked successfully",username, userid)
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid, token expired or invalid" });
  }
};

module.exports = authMiddleware;
