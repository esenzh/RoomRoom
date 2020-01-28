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
  nativeLocation: { type: String}
});

module.exports = mongoose.model("User", userSchema);
