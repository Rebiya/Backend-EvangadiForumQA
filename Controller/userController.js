const register = (req, res) => {
  res.send("successfully registered");
};
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
const login = (req, res) => {
  res.send("successfully logged in");
};
// const { email, password } = req.body;
// User.findOne({ email })
//   .then((user) => {
//     if (!user) return res.status(400).json({ message: "User not found" });
//     user.comparePassword(password).then((isMatch) => {
//       if (!isMatch)
//         return res.status(400).json({ message: "Invalid password" });
//       res.json({ message: "Successfull login" });
//     });
//   })
//   .catch((err) => res.status(400).json({ message: err.message }));
const checkUser = (req, res) => {
  res.send("successfully checked");
};
// User.findOne({ email: req.query.email })
//   .then((user) => {
//     if (!user) return res.status(400).json({ message: "User not found" });
//     res.json(user);
//   })
//   .catch((err) => res.status(400).json({ message: err.message }));

module.exports = { register, login, checkUser };
