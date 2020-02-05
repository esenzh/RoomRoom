// Да что же с кавычками вы не дружите?)
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  idAuthor: String,
  location: String,
  // Я люблю когда более конкретно указываются типы.
  // То есть не просто массив, а массив строк [String]
  // или объектов, у которых такие-то поля. [{name: String}]
  interest: [],
  data: Date,
  about: String,
  likes: [],
  сomparison: [],
  funs: [],
  // price наверное
  prise: Number
});

module.exports = mongoose.model('Form', formSchema);