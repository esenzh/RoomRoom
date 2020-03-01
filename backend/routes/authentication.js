const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const Users = require("../models/user");
const UserOwner = require("../models/userOwner");
const sessionChecker = require("../middleware/auth");

const saltRounds = 10;

router
  .post("/api/signup", async (req, res, next) => {
    const { first_name, last_name, role, email, password } = req.body;
    if (role === "Сдаю комнату") {
      const user = new UserOwner({
        first_name,
        last_name,
        role,
        email,
        password: await bcrypt.hash(password, saltRounds)
      });
      const dbemail = await UserOwner.findOne({ email });
      if (dbemail && dbemail.email === email) {
        res.status(400).json({ response: "emailExist" });
      } else {
        await user.save();
        req.session.user = user;
        res.status(200).json({ response: "success" });
      }
    } else if (role === "Ищу комнату") {
      const user = new Users({
        first_name,
        last_name,
        role,
        email,
        password: await bcrypt.hash(password, saltRounds)
      });
      const dbemail = await Users.findOne({ email });
      if (dbemail && dbemail.email === email) {
        res.status(400).json({ response: "emailExist" });
      } else {
        await user.save();
        req.session.user = user;
        res.status(200).json({ response: "success" });
      }
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
      await Users.updateOne(
        { _id },
        {
          $set: {
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
            photoOfUser
          }
        }
      );
      res.status(200);
    } catch (e) {
      res.status(400);
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
      await UserOwner.updateOne(
        { _id },
        {
          $set: {
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
            photoOfOwner
          }
        }
      );
      res.status(200);
    } catch (e) {
      res.status(400);
    }
  })
  .post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      const userOwner = await UserOwner.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        res.status(200).json({ response: "success" });
      } else if (
        userOwner &&
        (await bcrypt.compare(password, userOwner.password))
      ) {
        req.session.user = userOwner;
        res.status(200).json({ response: "success" });
      } else {
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
