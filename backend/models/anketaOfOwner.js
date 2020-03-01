const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const anketaOwnerSchema = Schema({
  metro: { type: Array },
  distance: { type: Number },
  totalFloor: { type: Number },
  floorNumber: { type: Number },
  totalRooms: { type: Number },
  roomsToRent: { type: Number },
  typeOfRoom: { type: String },
  furnitureAndTech: { type: Array },
  furnitureInRoom: { type: Array },
  internet: { type: String },
  nearBy: { type: Array },
  apartmentPhoto: { type: Array },
  fee: { type: Number },
  bills: { type: Number },
  deposit: { type: Number },
  rentalDuration: { type: String },
  admissionDay: { type: Date },
  peopleNumberPreference: { type: Number },
  sexPreference: { type: String },
  agePreference: { type: Array },
  childrenPreference: { type: String },
  petsPreference: { type: String },
  smokingPreference: { type: String },
  peopleLivingNumber: { type: Number },
  sexOfOwner: { type: String },
  ageOfOwner: { type: Number },
  phone: { type: String },
  professionOfOwner: { type: String },
  childrenOfOwner: { type: String },
  petsOfOnwer: { type: String },
  isOwnerSmokes: { type: String },
  aboutOwner: { type: String },
  photoOfOwner: { type: Array },
  authorID: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("AnketaOwner", anketaOwnerSchema);
