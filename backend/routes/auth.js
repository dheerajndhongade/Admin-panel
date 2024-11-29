const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const authenticate = require("../middleware/auth");

router.post("/login", login);

router.get("/dashboard", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
