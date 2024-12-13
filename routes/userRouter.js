const express = require("express");
const router = express.Router();

//register route
router.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   const user = new User({
//     name,
//     email,
//     password
//   });
//   user
//     .save()
//     .then(() => res.json(user))
//     .catch((err) => res.status(400).json({ message: err.message }));
res.send("successfully registered")
});

//login user:
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ message: "User not found" });
      user.comparePassword(password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Invalid password" });
        res.json({ message: "Successfull login" });
      });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

//check user
router.get("/checkuser", (req, res) => {
  User.findOne({ email: req.query.email })
    .then((user) => {
      if (!user) return res.status(400).json({ message: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

module.exports = router;
