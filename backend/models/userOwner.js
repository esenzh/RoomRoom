const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String},
  vk: { type: String},
  photo: { type: Array, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  nativeLocation: { type: String },
  sex: {type: String, required: true},
  location: {type: String, required: true},
  interest: { type: Array, required: true },
  data: Date,
  about: {type: String, required: true},
  likes: { type: Array},
  сomparison: { type: Array},
  funs: { type: Array},
  prise: { type: Number },
  qualityRoom: { type: Number },
  photoRoom: { type: Array, required: true },
  floorNumber: {type: Number},
  dateBeginingLiving: { type: String},
  qualityPropleRoom: { type: Number },
  objectNearRoom: { type: String },
  subjectInFlat: { type: String },
  typeOfRoom: { type: String },
  timeMetro: { type: Number },
  rentTime:  { type: Number },
  counters: { type: String },
});

module.exports = mongoose.model("UserOwner", userSchema);
