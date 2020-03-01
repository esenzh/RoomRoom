const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: { type: String },
  last_name: { type: String },
  role: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  metro: {type: Array},
  budget: {type: String},
  duration: {type: String},
  admissionDay: {type: Date},
  sexPreference: {type: String},
  agePreference: {type: Array},
  childrenPreference: {type: String},
  petPreference: {type: String},
  smokingPreference: {type: String},
  sexOfUser:{type: String},
  ageOfUser: {type: String},
  childrenOfUser: {type: String},
  petsOfUser: {type: String},
  isOwnerSmokes: {type: String},
  aboutUser: {type: String},
  professionOfUser: {type: String},
  photoOfUser: {type: Array}
});

module.exports = mongoose.model("User", userSchema);
