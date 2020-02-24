const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String},
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  
  counters: { type: String },
});

module.exports = mongoose.model("UserOwner", userSchema);
