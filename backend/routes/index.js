var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const Form = require("../models/form");
const User = require("../models/user");
const sessionChecker = require('../middleware/auth');

router.post("/api/newForm", async (req, res, next) => {
    const user1 = req.session.user;
    const user1Form = await Form.findOne({idAuthor: user1._id});
    if (user1Form) {
        console.log('Обновляет!')
        const {metro, interest, budget, about} = req.body;

        user1Form.location = metro;
        user1Form.interest = interest;
        user1Form.data = new Date();
        user1Form.about = about;
        user1Form.prise = budget;
        user1Form.save();
        res.json({text: "Анкета обновлена!"});
    } else {
        console.log('Создает новую внкету!')

    const {metro, interest, budget, about} = req.body;

    const form = new Form({
        idAuthor: req.session.user._id,
        location: metro,
        interest,
        data: new Date(),
        about,
        likes: [],
        funs: [],
        prise: budget
    });
    try {
        await form.save();
        res.send("form is save");
    } catch (e) {
        res.send("form is NO save");
    }
    res.send("ok");
}
});

router.route("/api/sendLikeMail").post(async (req, res, next) => {
    try {
        console.log("пришел запрос");
        const user1 = req.session.user;
        const user2ID = req.body;
        // console.log(user1._id);
        // console.log(user2ID.id);

        const user1Form = await Form.findOne({idAuthor: user1._id});
        const user2Form = await Form.findOne({idAuthor: user2ID.id });

        // const user2 = await  User.findOne({id: user2ID.id });

        if (user2Form.funs.includes(user1Form.idAuthor)) {                                                   //1. Проверка на повторный лайк
            console.log('reapeat like')
            res.json({text:"Вы уже стаивли лайк данному пользователю!"});
        } else {
            console.log('Проверка на повторный лайк пройдена!')
            if (user2Form.likes.includes(user1Form.idAuthor)) {                                           // 2. Проверка пользователя, которого лайкнули на взаимный лайк
                console.log('совпадение есть')
                async function main() {                                                                    //6. Уведомление пользователя о том что мы ему поставили лайк
                    let testAccount = await nodemailer.createTestAccount();
                    const transporter = nodemailer.createTransport({
                        host: "smtp.yandex.ru",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "pekarnyavkusnaya",
                            pass: "pekarnyavkusnaya111"
                        }
                    });

                    let info = await transporter.sendMail({
                        from: '"Roomroom 👻" <pekarnyavkusnaya@yandex.ru>', // sender address
                        to: `igordg@mail.ru`,  // list of receivers  user2.email,
                        subject: "Roomroom ✔", // Subject line
                        text: "Текст1", // plain text body
                        html:
                            `<img src="https://gorod.tomsk.ru/uploads/33808/1240896561/my_room.jpg" alt="RoomRoom"><br>
                            <b>Здравствуйте! На сервисе RoomRoom появился пользователь, который хотел бы вместе с Вами арендовать квартиру!</b>
                                <p>Имя пользователя: ${user1.first_name} ${user1.last_name}</p>
                                <p>Более подробная информация в Вашем профиле RoomRoom в разделе "Совпадания"</p> `
                    });
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    res.send("Письмо отправлено!");
                }
                main().catch(console.error);

                user1Form.likes.push(user2Form.idAuthor);
                console.log(user1Form, user2Form);
                user1Form.сomparison.push(user2Form.idAuthor);                                            // 3. запись совпадения в анкеты двух юзеров
                user2Form.сomparison.push(user1Form.idAuthor);
                user2Form.funs.push(user1Form.idAuthor)
                user1Form.save();
                user2Form.save();
                res.json({text: "Совпадение найдено!"});
            } else {
                console.log('взаимного лайка нет, записываем себя к пользователю в лайки')

                async function main() {                                                                    //6. Уведомление пользователя о том что мы ему поставили лайк
                    let testAccount = await nodemailer.createTestAccount();
                    const transporter = nodemailer.createTransport({
                        host: "smtp.yandex.ru",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "pekarnyavkusnaya",
                            pass: "pekarnyavkusnaya111"
                        }
                    });

                    let info = await transporter.sendMail({
                        from: '"Roomroom 👻" <pekarnyavkusnaya@yandex.ru>', // sender address
                        to: `igordg@mail.ru`,  // list of receivers  user2.email,
                        subject: "Roomroom ✔", // Subject line
                        text: "Текст1", // plain text body
                        html:
                            `<img src="https://gorod.tomsk.ru/uploads/33808/1240896561/my_room.jpg" alt="RoomRoom"><br>
                            <b>Здравствуйте! На сервисе RoomRoom у Вас появились новые лайки!</b>
                                <p>Лайк поставлен пользователем ${user1.first_name} ${user1.last_name}</p>
                                <p>Более подробная информация в Вашем профиле RoomRoom</p>`
                    });
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    res.send("Письмо отправлено!");
                }
                main().catch(console.error);
                user1Form.likes.push(user2Form.idAuthor);                                                  //5. Записываем в свой массив лайков пользователя которому поставили лайк
                user2Form.funs.push(user1Form.idAuthor)                                                     // 6.запись нас в массив "поклонников" данного пользователя
                user1Form.save();
                user2Form.save();
                // console.log(user1Form.likes);
                // console.log(user2Form.funs);
                res.json({text: "Пользователю, которому Вы поставили лайк направлено уведомление о том, что Вы хотели бы совместно снимать квартиру!"})
            }
        }
  } catch (error) {
    next(error);
  }
});

router.post("/api/findSimilarUsers", sessionChecker, async (req, res, next) => {
  try {
    await console.log("пришел запрос");
    let user = req.session.user;
    const userForm = await Form.findOne({ idAuthor: user._id });
    if(userForm) {
        console.log('Работает! Анкета есть!')

        let arr1 = userForm;
        // console.log(arr1);
        let arr2 = [];
        let arr3 = await Form.find();
        for (let i = 0; i < arr3.length; i++) {
            if (arr1.location === arr3[i].location) {
                arr2.push(arr3[i]);
            }
        }
        let allComparison = [];

        arr2.map(function (e) {
            let сomparison = [];
            let userId = {idAuthor: e.idAuthor};
            let location = {location: e.location};
            let data = {data: e.data};
            let about = {about: e.about};
            let likes = {likes: e.likes};
            let prise = {prise: e.prise};
            // let age = {age: e.age};
            // let nativeLocation = {nativeLocation: e.nativeLocation};


            сomparison.push(userId);
            сomparison.push(location);
            сomparison.push(data);
            сomparison.push(about);
            сomparison.push(likes);
            сomparison.push(prise);
            // сomparison.push(age);
            // сomparison.push(nativeLocation);



            let arrInterests = [];
            for (let i = 0; i < arr1.interest.length; i++) {
                for (let k = 0; k < e.interest.length; k++) {
                    if (arr1.interest[i] === e.interest[k]) {
                        arrInterests.push(arr1.interest[i]);
                    }
                }
            }
            сomparison.push(arrInterests);
            allComparison.push(сomparison);
        });

        let lengthAllComparison = [];
        for (let i = 20; i >= 0; i--) {
            for (let j = 0; j < allComparison.length; j++) {
                if (allComparison[j][6].length === i) {
                    lengthAllComparison.push(allComparison[j]);
                }
            }
        }

        let finishREsult = [];

        for (let i = 0; i < lengthAllComparison.length; i++) {
            if (lengthAllComparison[i][6].length !== 0) {
                finishREsult.push(lengthAllComparison[i]);
            }
        }

        sortUserPrise = [];


        for (let i = 0; i < finishREsult.length; i++) {
            if (finishREsult[i][5].prise <= (arr1.prise + 5)) {
                sortUserPrise.push(finishREsult[i]);
            }
        }

        // console.log(sortUserPrise);
        let arrSortUserId = [];

        for (let i = 0; i < sortUserPrise.length; i++) {
            arrSortUserId.push(sortUserPrise[i][0].idAuthor)
        }

        // let arrSortUserIdWithMe = [];
        //
        // for (let i = 0; i < sortUserPrise.length; i++) {
        //     arrSortUserIdWithMe.push(sortUserPrise[i][0].idAuthor)
        // }
        //
        // let arrSortUserId = [];
        //
        // for (let i = 0; i < arrSortUserIdWithMe.length; i++) {
        //     if(arrSortUserIdWithMe[i] !== userForm.idAuthor)
        //     arrSortUserId.push(arrSortUserIdWithMe[i])
        // }

        // console.log(arrSortUserId);

        const baseSortFormsId = await Form.find({idAuthor: arrSortUserId});
        const baseSortUsersId = await User.find({_id: arrSortUserId});


        let gradationUsers = [];
        let gradationForms = [];

        for (let i = 0; i < arrSortUserId.length; i++) {
            for (let k = 0; k < baseSortUsersId.length; k++) {
                if (arrSortUserId[i] === baseSortUsersId[k].id) {
                    gradationUsers.push(baseSortUsersId[k]);
                }
            }
        }

        for (let i = 0; i < arrSortUserId.length; i++) {
            for (let k = 0; k < baseSortFormsId.length; k++) {
                if (arrSortUserId[i] === baseSortFormsId[k].idAuthor) {
                    gradationForms.push(baseSortFormsId[k]);
                }
            }
        }

        let frontViewArr = [];

        for (let i = 0; i < gradationUsers.length; i++) {
            let obj = {
                id: "",
                location: "",
                interest: "",
                about: "",
                prise: "",
                first_name: "",
                // age: '',
                // nativeLocation: '',
                photo: "",
                сomparisonInterests: ''
            };
            (obj.id = arrSortUserId[i]), (obj.location = gradationForms[i].location);
            obj.interest = gradationForms[i].interest;
            obj.about = gradationForms[i].about;
            obj.prise = gradationForms[i].prise;
            obj.first_name = gradationUsers[i].first_name;
            // obj.age = gradationUsers[i].age
            // obj.nativeLocation = obgradationUsers[i].nativeLocation
            obj.photo = gradationUsers[i].photo;
            obj.сomparisonInterests = sortUserPrise[i][6];

            frontViewArr.push(obj);
        }


        let arrWhithoutOwnUserId = [];
        for (let i = 0; i < frontViewArr.length; i++) {
            if(frontViewArr[i].id !== user._id){
                arrWhithoutOwnUserId.push(frontViewArr[i])
                console.log( frontViewArr[i].id,  user._id)
            }
        }

        // console.log(frontViewArr[0])

        res.json(arrWhithoutOwnUserId);

    }else{
        console.log('Анкета отсутствует, создайте анкету!')
        res.json({error: 'Анкета отсутствует, создайте анкету!'});
    }
  } catch (error) {
    next(error);
    console.log("ошибка");
  }
});

router.get("/api/likes/by", async (req, res) => {
  try {
    const { _id } = req.session.user;
    const form = await Form.findOne({ idAuthor: _id });
    if (!form) {
      res.status(200).json({ response: "noform" });
    } else {
      const users = await User.find({ _id: form.funs });
      const userIDs = users.map(user => {
        return user._id;
      });
      const forms = await Form.find({ idAuthor: userIDs });
      const formsUsers = [];
      for (let i = 0; i < forms.length; i++) {
        formsUsers.push({
          form: forms[i],
          id: users[i]._id,
          first_name: users[i].first_name,
          last_name: users[i].last_name,
          photo: users[i].photo,
          age: users[i].age,
          nativeLocation: users[i].nativeLocation,
        });
      }
      res.status(200).json({ response: formsUsers });
    }
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

router.get("/api/likes/mutual", async (req, res) => {
  try {
    const { _id } = req.session.user;
    const form = await Form.findOne({ idAuthor: _id });
    if (!form) {
      res.status(200).json({ response: "noform" });
    } else {
      const match = form["сomparison"];
      if (match.length !== 0) {
        const users = await User.find({ _id: match });
        const userIDs = users.map(user => {
          return user._id;
        });
        const forms = await Form.find({ idAuthor: userIDs });
        const formsUsers = [];
        for (let i = 0; i < forms.length; i++) {
          formsUsers.push({
            form: forms[i],
            id: users[i]._id,
            first_name: users[i].first_name,
            last_name: users[i].last_name,
            email: users[i].email,
            phone: users[i].phone,
            vk: users[i].vk,
            age: users[i].age,
            nativeLocation: users[i].nativeLocation,
            photo: users[i].photo
          });
        }
        res.status(200).json({ response: formsUsers });
      } else {
        res.status(200).json({ response: "nomatch" });
      }
    }
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});

module.exports = router;
