const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const users = [
  {
    id: 1,
    username: "admin",
    password: "1234567890",
  },
];

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};
