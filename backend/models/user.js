const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: { type: String },
  last_name: { type: String },
  role: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  anketaID: {type: String},
});

module.exports = mongoose.model("User", userSchema);
