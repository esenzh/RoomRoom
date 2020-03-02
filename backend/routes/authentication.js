const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const Users = require("../models/user");
const AnketaNoOwner = require("../models/anketaOfNoOwner");
const AnketaOwner = require("../models/anketaOfOwner");
const sessionChecker = require("../middleware/auth");

const saltRounds = 10;

router
  .post("/api/signup", async (req, res, next) => {
    const { first_name, last_name, role, email, password } = req.body;
    console.log(first_name, last_name, role, email, password);
    const user = new Users({
      first_name,
      last_name,
      role,
      email,
      password: await bcrypt.hash(password, saltRounds)
    });
    console.log(user);
    const dbemail = await Users.findOne({ email });
    if (dbemail && dbemail.email === email) {
      res.status(400).json({ response: "emailExist" });
    } else {
      await user.save();
      req.session.user = user;
      res.status(200).json({ response: "success" });
    }
  })
  .post("/api/signup/noowner", async (req, res, next) => {
    const { _id } = req.session.user;
    const { metro, budget, timeInRoom, admissionDay } = req.body.userInputWhere;

    const {
      sexPreference,
      agePreference,
      childrenPreference,
      petPreference,
      smokingPreference
    } = req.body.userInputWho;

    const {
      sexOfUser,
      ageOfUser,
      childrenOfUser,
      petsOfUser,
      isUserSmokes,
      aboutUser,
      professionOfUser,
      photoOfUser
    } = req.body.userInputYou;

    try {
      const anketa = new AnketaNoOwner({
        metro,
        budget,
        timeInRoom,
        admissionDay,
        sexPreference,
        agePreference,
        childrenPreference,
        petPreference,
        smokingPreference,
        sexOfUser,
        ageOfUser,
        childrenOfUser,
        petsOfUser,
        isUserSmokes,
        aboutUser,
        professionOfUser,
        photoOfUser,
        authorID: _id
      });
      await anketa.save();
      res.status(200).json({ response: "success" });
    } catch (e) {
      res.status(400).json({ response: "fail" });
    }
  })
  .post("/api/signup/owner", async (req, res, next) => {
    const { _id } = req.session.user;
    const {
      metro,
      distance,
      totalFloor,
      floorNumber,
      totalRooms,
      roomsToRent,
      typeOfRoom,
      furnitureAndTech,
      furnitureInRoom,
      internet,
      nearBy,
      apartmentPhoto,
      fee,
      bills,
      deposit,
      rentalDuration,
      admissionDay
    } = req.body.userInputWhere;

    const {
      peopleNumberPreference,
      sexPreference,
      agePreference,
      childrenPreference,
      petsPreference,
      smokingPreference
    } = req.body.userInputWho;

    const {
      peopleLivingNumber,
      sexOfOwner,
      ageOfOwner,
      phone,
      professionOfOwner,
      childrenOfOwner,
      petsOfOnwer,
      isOwnerSmokes,
      aboutOwner,
      photoOfOwner
    } = req.body.userInputYou;

    try {
      const anketa = new AnketaOwner({
        metro,
        distance,
        totalFloor,
        floorNumber,
        totalRooms,
        roomsToRent,
        typeOfRoom,
        furnitureAndTech,
        furnitureInRoom,
        internet,
        nearBy,
        apartmentPhoto,
        fee,
        bills,
        deposit,
        rentalDuration,
        admissionDay,
        peopleNumberPreference,
        sexPreference,
        agePreference,
        childrenPreference,
        petsPreference,
        smokingPreference,
        peopleLivingNumber,
        sexOfOwner,
        ageOfOwner,
        phone,
        professionOfOwner,
        childrenOfOwner,
        petsOfOnwer,
        isOwnerSmokes,
        aboutOwner,
        photoOfOwner,
        authorID: _id
      });
      await anketa.save();
      res.status(200).json({ response: "success" });
    } catch (e) {
      res.status(400).json({ response: "fail" });
    }
  })
  .post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        console.log("success")
        res.status(200).json({ response: "success" });
      } else {
        console.log("fail")
        res.status(400).json({ response: "fail" });
      }
    } catch (e) {
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
