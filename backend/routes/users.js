var express = require("express");
var router = express.Router();
const User = require("../models/user");
const sessionChecker = require("../middleware/auth");

/* GET user info. */
router.get("/api/user", sessionChecker, async (req, res, next) => {
  try {
    const { _id } = req.session.user;
    const user = await User.findOne({ _id });
    res.status(200).json({ response: user });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

module.exports = router;
