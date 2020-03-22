const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  role: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  anketaID: {type: String},
});

module.exports = mongoose.model("User", userSchema);
