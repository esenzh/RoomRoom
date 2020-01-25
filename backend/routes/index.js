var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const Form = require("../models/form");
const User = require("../models/user");


router.post('/api/newForm', async (req, res, next) => {
  const {
    metro,
    interest,
    budget,
    about
  } = req.body;
  console.log(req.body)

  const form = new Form({
    idAuthor: "req.session.user_id",
    location: metro,
    interest,
    data:new Date(),
    about,
    likes:[],
    prise: budget
  });
  try {

    await form.save();
    res.send('form is save');
  }catch (e) {
    res.send('form is NO save');
  }
  res.send('ok');
});

// router.get('/sendLikeMail', function(req, res, next) {
//   console.log('пришел запрос')
//   res.send('ok tcn');
// });

router
    .route("/api/sendLikeMail")
    .get(async (req, res, next) => {
      try {
       await console.log('пришел запрос')
        async function main() {
          let testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
              user: 'pekarnyavkusnaya',
              pass: 'pekarnyavkusnaya111'
            }
          });

          let info = await transporter.sendMail({
            from: '"Roomroom 👻" <pekarnyavkusnaya@yandex.ru>', // sender address
            to: "igordg@mail.ru, 14.02.2017@bk.ru", // list of receivers
            subject: "Roomroom ✔", // Subject line
            text: "Текст1", // plain text body
            html: "<b><img src=\"https://gorod.tomsk.ru/uploads/33808/1240896561/my_room.jpg\" alt=\"RoomRoom\"></b>" // html body
          });
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.send('Письмо отправлено!')
       }

        main().catch(console.error);

      } catch (error) {
        next(error);
      }
    });


router.get('/api/profile', async (req, res, next) => {
  try {
    let user = req.session.user;
    res.json({first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      vk: user.vk,
      photo: user.photo
    });
  }catch (e) {
    res.send('profile not found');
  }
});

router
    .route('/api/findSimilarUsers')
    .post(async (req, res, next) => {
      try {
        await console.log('пришел запрос')

          let user = req.session.user;
          const userForm = await Form.findOne({ idAuthor: user._id })
        let arr1 = userForm.interest;
        let arr2 = []
        let arr3 = await Form.find();
        for (let i = 0; i <arr3.length ; i++) {
          if(arr1.location === arr3[i].location) {
              arr2.push(arr3[i])
          }
          let сomparison = [];
              let userId = {idAuthor: e.idAuthor}
              let location = {location: e.location}
              let data = {data: e.data}
              let about = {about: e.about}
              let likes = {likes: e.likes}
              let prise = {prise: e.prise}

              сomparison.push(userId)
              сomparison.push(location)
              сomparison.push(data)
              сomparison.push(about)
              сomparison.push(likes)
              сomparison.push(prise)

              let arrInterests = []
              for (let i = 0; i < arr1.interest.length; i++) {
                for (let k = 0; k < e.interest.length; k++) {
                  if (arr1.interest[i] === e.interest[k]) {
                    arrInterests.push(arr1.interest[i])
                  }
                }
              }
              сomparison.push(arrInterests)
              allComparison.push(сomparison)
            }


// console.log(allComparison)

        let lengthAllComparison = []
        for (let i = 20; i>=0; i--) {
          for (let j = 0; j < allComparison.length; j++) {

            if (allComparison[j][6].length === i) {
              lengthAllComparison.push(allComparison[j])
            }
          }
        }

        let finishREsult = [];

        for (let i = 0; i < lengthAllComparison.length; i++) {
          if(lengthAllComparison[i][6].length !== 0){
            finishREsult.push(lengthAllComparison[i])
          }
        }

// console.log(finishREsult)

        sortUserPrise = [];

        for (let i = 0; i < finishREsult.length; i++) {
          if(finishREsult[i][5].prise <= arr1.prise ){
            sortUserPrise.push(finishREsult[i])
          }
        }

        console.log(sortUserPrise)

        let arrSortUserId = [];

        for (let i = 0; i < sortUserPrise.length; i++) {
          arrSortUserId.push(sortUserPrise[i][0].idAuthor)
        }
        console.log(arrSortUserId)
        res.json(sortUserPrise)
      } catch (error) {
        next(error);
      }
    });

module.exports = router;
