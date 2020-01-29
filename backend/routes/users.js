var express = require("express");
var router = express.Router();
const sessionChecker = require("../middleware/auth");
const User = require("../models/user");

/* GET user info. */
router.get("/api/profile", sessionChecker, async (req, res, next) => {
  try {
    const { _id } = req.session.user;
    const userDB = await User.findOne({ _id });
    const {
      first_name,
      last_name,
      email,
      phone,
      photo,
      username,
      vk,
      age,
      nativeLocation
    } = userDB;
    const user = {
      first_name,
      last_name,
      email,
      phone,
      photo,
      username,
      vk,
      age,
      nativeLocation
    };
    res.status(200).json({ response: user });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

router.post("/api/profile/edit", async (req, res) => {
  try {
    const { _id } = req.session.user;
    const {
      first_name,
      last_name,
      email,
      phone,
      vk,
      nativeLocation,
      photos
    } = req.body;
    const dbemail = await User.findOne({ email });
    if (dbemail && dbemail._id != _id && dbemail.email == email) {
      res.status(400).json({ response: "emailExist" });
    } else {
      await User.updateOne(
        { _id },
        {
          $set: {
            first_name,
            last_name,
            email,
            phone,
            vk,
            nativeLocation,
            photo: photos
          }
        }
      );
      const user = await User.findOne({ _id });
      res.status(200).json({ response: user });
    }
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

module.exports = router;
