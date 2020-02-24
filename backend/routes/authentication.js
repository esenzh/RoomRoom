const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const Users = require("../models/user");
const UserOwners = require("../models/userOwner");

const saltRounds = 10;

router
  .post("/api/signup", async (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      password,

    } = req.body;
    const user = new Users({
      first_name,
      last_name,
      email,
      password: await bcrypt.hash(password, saltRounds)
    });

    const dbemail = await Users.findOne({ email });
    if (dbemail && dbemail.email === email) {
      res.status(400).json({ response: "emailExist" });
    } else {
      await user.save();
      req.session.user =  user;
      res.status(200).json({ response: "success" });
    }
  })
    .post("/api/signupUserOwners", async (req, res, next) => {
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
        nativeLocation,
        sex,
        location,
        interest,
        data,
        about,
        likes,
        сomparison,
        funs,
        price,
      } = req.body;
      const user = new UserOwners ({
        first_name,
        last_name,
        email,
        phone,
        photo,
        vk,
        age,
        nativeLocation,
        username,
        password: await bcrypt.hash(password, saltRounds),
        sex,
        location,
        interest,
        data,
        about,
        likes,
        сomparison,
        funs,
        price,
      });
      const dbusername = await UserOwners.findOne({ username });
      const dbemail = await UserOwners.findOne({ email });
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
      const { mail, password } = req.body;
      const user = await Users.findOne({ email: mail });
      const userOwner = await UserOwners.findOne({ email: mail });
      if(user){
        console.log('user')
        if (user && (await bcrypt.compare(password, user.password))) {
          req.session.user = user;
          res.status(200).json({ response: "success" });
        } else {
          res.status(400).json({ response: "fail" });
        }
      }

      if(userOwner){
        console.log('userOwner')
        if (userOwner && (await bcrypt.compare(password, userOwner.password))) {
          req.session.user = userOwner;
          res.status(200).json({ response: "success" });
        } else {
          res.status(400).json({ response: "fail" });
        }
      }

    })
  // .post("/api/login", async (req, res) => {
  //   const { username, password } = req.body;
  //   const user = await Users.findOne({ username });
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     req.session.user = user;
  //     res.status(200).json({ response: "success" });
  //   } else {
  //     res.status(400).json({ response: "fail" });
  //   }
  // })
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
