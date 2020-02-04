const express = require("express");
const path = require('path');
require('dotenv').config()
const indexRouter = require("./routes/index");
const nodemailer = require("nodemailer");
const authenticationRouter = require("./routes/authentication");
const user = require("./routes/users");
const CronJob = require('cron').CronJob;
const Form = require("./models/form");
const User = require("./models/user");
const userMiddleWare = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();

userMiddleWare(app);



const job = new CronJob('59 59 23 * * *', async () => {
  const usersForm = await Form.find({});
  usersForm.map(async (user) => {
    if (new Date() - user.data > 259200000) {
      const userProfile = await User.findOne({_id: user.idAuthor});
      async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: "pekarnyavkusnaya",
            pass: "pekarnyavkusnaya111"
          }
        });
        let info = await transporter.sendMail({
          from: '"RoomRoom 👻" <pekarnyavkusnaya@yandex.ru>', // sender address
          to: userProfile.email, // list of receivers
          subject: "RoomRoom ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<p>К сожалению у Вашей анкеты вышел срок давности. Пожалуйста, обновите анкету</p>"
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);
      await Form.findOneAndDelete(
        { _id: user._id }
      )
    }

  })
  console.log('Update data Forms');
}, null, true, 'Europe/Moscow');
job.start();

app.use(express.static(path.join(__dirname, 'public/frontend/build')));


app.use("/", indexRouter);
app.use("/", authenticationRouter);
app.use("/", user);


app.get('*', (req, res) => {
  let path;
  res.sendFile(`${__dirname}/public/frontend/build/index.html`);
});
useErrorHandlers(app);

module.exports = app;
