const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (email !== "antony@gmail.com" || password !== "1234567") {
    //Basically I should get this from some endpoint orr Db but I'll leave it simple
    return res
      .status(403)
      .json({ message: "Authentication failed, check your credentials!" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
