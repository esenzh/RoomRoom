const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  idAuthor: String,
  location: String,
  interest: [],
  data: Date,
  about: String,
  likes: [],
  сomparison: [],
  funs: [],
  prise: Number
});

module.exports = mongoose.model('Form', formSchema);