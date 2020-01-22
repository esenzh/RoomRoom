var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ok');
});

// router.get('/sendLikeMail', function(req, res, next) {
//   console.log('пришел запрос')
//   res.send('ok tcn');
// });

router
    .route("/sendLikeMail")
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

module.exports = router;
