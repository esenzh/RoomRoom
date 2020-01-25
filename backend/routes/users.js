var express = require("express");
var router = express.Router();
const User = require("../models/user");
const sessionChecker = require("../middleware/auth");

/* GET user info. */
router.get("/api/profile", sessionChecker, async (req, res, next) => {
  try {
    const userDB = req.session.user;
    const { first_name, last_name, email, phone, photo } = userDB;
    const user = {
      first_name,
      last_name,
      email,
      phone,
      photo
    };
    res.status(200).json({ response: user });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

module.exports = router;
