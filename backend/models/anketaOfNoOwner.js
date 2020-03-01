const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const anketaNoOwnerSchema = Schema({
  metro: { type: Array },
  budget: { type: String },
  duration: { type: String },
  admissionDay: { type: Date },
  sexPreference: { type: String },
  agePreference: { type: Array },
  childrenPreference: { type: String },
  petPreference: { type: String },
  smokingPreference: { type: String },
  sexOfUser: { type: String },
  ageOfUser: { type: String },
  childrenOfUser: { type: String },
  petsOfUser: { type: String },
  isOwnerSmokes: { type: String },
  aboutUser: { type: String },
  professionOfUser: { type: String },
  photoOfUser: { type: Array },
  authorID: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("AnketaNoOwner", anketaNoOwnerSchema);
