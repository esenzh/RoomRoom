const mongoose = require("mongoose");
const dbconnection = require("../middleware/db-connect");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const userData = [
  {
    photo: "http://placehold.it/32x32",
    first_name: "Benjamin",
    last_name: "Vance",
    company: "ISODRIVE",
    email: "benjamin.vance@isodrive.name",
    phone: "+7 (912) 527-2300",
    username: "benjamin"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Laurie",
    last_name: "Cox",
    company: "GEEKOL",
    email: "laurie.cox@geekol.net",
    phone: "+7 (961) 540-3596",
    username: "laurie"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Roxanne",
    last_name: "Barrett",
    company: "PUSHCART",
    email: "roxanne.barrett@pushcart.me",
    phone: "+7 (861) 523-3817",
    username: "roxanne"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Brigitte",
    last_name: "Santana",
    company: "GRUPOLI",
    email: "brigitte.santana@grupoli.io",
    phone: "+7 (867) 501-3700",
    username: "brigitte"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Davidson",
    last_name: "Cooke",
    company: "DIGIAL",
    email: "davidson.cooke@digial.biz",
    phone: "+7 (909) 494-2108",
    username: "davidson"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Mcdowell",
    last_name: "Melton",
    company: "ZILIDIUM",
    email: "mcdowell.melton@zilidium.com",
    phone: "+7 (946) 513-2030",
    username: "mcdowell"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Herman",
    last_name: "Ray",
    company: "VENDBLEND",
    email: "herman.ray@vendblend.biz",
    phone: "+7 (845) 587-3778",
    username: "herman"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Ellison",
    last_name: "Obrien",
    company: "FLUMBO",
    email: "ellison.obrien@flumbo.org",
    phone: "+7 (898) 495-3915",
    username: "ellison"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Terri",
    last_name: "Kelly",
    company: "BARKARAMA",
    email: "terri.kelly@barkarama.us",
    phone: "+7 (959) 496-3199",
    username: "terri"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Vickie",
    last_name: "Paul",
    company: "ECSTASIA",
    email: "vickie.paul@ecstasia.ca",
    phone: "+7 (972) 570-3633",
    username: "vickie"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Henry",
    last_name: "Morgan",
    company: "PHARMEX",
    email: "henry.morgan@pharmex.tv",
    phone: "+7 (825) 467-2867",
    username: "henry"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Luella",
    last_name: "Roman",
    company: "BIZMATIC",
    email: "luella.roman@bizmatic.info",
    phone: "+7 (984) 546-3804",
    username: "luella"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Berry",
    last_name: "Meadows",
    company: "MAGNEMO",
    email: "berry.meadows@magnemo.name",
    phone: "+7 (935) 458-3875",
    username: "berry"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Selma",
    last_name: "Kirby",
    company: "COMTREK",
    email: "selma.kirby@comtrek.net",
    phone: "+7 (954) 527-3279",
    username: "selma"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Sheree",
    last_name: "Frank",
    company: "OBLIQ",
    email: "sheree.frank@obliq.me",
    phone: "+7 (879) 487-3628",
    username: "sheree"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "James",
    last_name: "Rosario",
    company: "BOINK",
    email: "james.rosario@boink.io",
    phone: "+7 (928) 569-2784",
    username: "james"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Bernard",
    last_name: "Shelton",
    company: "IZZBY",
    email: "bernard.shelton@izzby.biz",
    phone: "+7 (904) 443-3053",
    username: "bernard"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Moran",
    last_name: "Navarro",
    company: "QUONK",
    email: "moran.navarro@quonk.com",
    phone: "+7 (872) 460-3120",
    username: "moran"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Amie",
    last_name: "Mcintosh",
    company: "JOVIOLD",
    email: "amie.mcintosh@joviold.biz",
    phone: "+7 (935) 573-2329",
    username: "amie"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Bryant",
    last_name: "Bates",
    company: "DUOFLEX",
    email: "bryant.bates@duoflex.org",
    phone: "+7 (899) 507-2034",
    username: "bryant"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Kelley",
    last_name: "Cohen",
    company: "MICRONAUT",
    email: "kelley.cohen@micronaut.us",
    phone: "+7 (964) 490-2643",
    username: "kelley"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Erika",
    last_name: "Yates",
    company: "MAGMINA",
    email: "erika.yates@magmina.ca",
    phone: "+7 (991) 583-3905",
    username: "erika"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Davis",
    last_name: "Dickson",
    company: "ROBOID",
    email: "davis.dickson@roboid.tv",
    phone: "+7 (997) 585-3857",
    username: "davis"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Fernandez",
    last_name: "Hoffman",
    company: "DYMI",
    email: "fernandez.hoffman@dymi.info",
    phone: "+7 (928) 560-2991",
    username: "fernandez"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Duran",
    last_name: "Rasmussen",
    company: "ECRATER",
    email: "duran.rasmussen@ecrater.name",
    phone: "+7 (974) 597-3884",
    username: "duran"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Rhodes",
    last_name: "Short",
    company: "BUNGA",
    email: "rhodes.short@bunga.net",
    phone: "+7 (997) 474-3546",
    username: "rhodes"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Lynch",
    last_name: "Guzman",
    company: "NETPLODE",
    email: "lynch.guzman@netplode.me",
    phone: "+7 (922) 457-3503",
    username: "lynch"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Letha",
    last_name: "Hendrix",
    company: "SHOPABOUT",
    email: "letha.hendrix@shopabout.io",
    phone: "+7 (931) 509-3541",
    username: "letha"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Clara",
    last_name: "Price",
    company: "QUONATA",
    email: "clara.price@quonata.biz",
    phone: "+7 (944) 500-3054",
    username: "clara"
  },
  {
    photo: "http://placehold.it/32x32",
    first_name: "Sheppard",
    last_name: "Spears",
    company: "MAINELAND",
    email: "sheppard.spears@maineland.com",
    phone: "+7 (971) 548-3151",
    username: "sheppard"
  }
];
seedUsers = async () => {
  const saltRounds = 10;
  for (let i = 0; i < userData.length; i++) {
    const user = new User({
      first_name: userData[i].first_name,
      last_name: userData[i].last_name,
      email: userData[i].email,
      phone: userData[i].phone,
      photo: userData[i].photo,
      username: userData[i].username,
      password: await bcrypt.hash('123', saltRounds)
    });
    user.save();
  }
};
//seedUsers();
