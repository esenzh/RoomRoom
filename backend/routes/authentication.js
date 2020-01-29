const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const Users = require("../models/user");

const saltRounds = 10;

router
  .post("/api/signup", async (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      photo,
      vk,
      username,
      password,
      age,
      nativeLocation
    } = req.body;
    const user = new Users({
      first_name,
      last_name,
      email,
      phone,
      photo,
      vk,
      age,
      nativeLocation,
      username,
      password: await bcrypt.hash(password, saltRounds)
    });
    const dbusername = await Users.findOne({ username });
    const dbemail = await Users.findOne({ email });
    if (dbusername && dbusername.username === username) {
      res.status(400).json({ response: "usernameExist" });
    } else if (dbemail && dbemail.email === email) {
      res.status(400).json({ response: "emailExist" });
    } else {
      await user.save();
      req.session.user =  user;
      res.status(200).json({ response: "success" });
    }
  })
  .post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.status(200).json({ response: "success" });
    } else {
      res.status(400).json({ response: "fail" });
    }
  })
  .get("/api/logout", async (req, res, next) => {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.status(200).json({ response: "success" });
    } catch (error) {
      res.status(400).json({ response: "fail" });
    }
  });

module.exports = router;
