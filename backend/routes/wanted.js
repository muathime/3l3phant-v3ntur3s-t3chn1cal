const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Auth Token si required" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

router.get("/", authenticate, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.APIURL}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", //I addded this because for some rerasons the fbi api sensored my requests for lack of a browser referrer
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
