const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  id: Number,
  title : String,
  code : String,
  quantity : Number,
  price : Number,
  desc: String,
  img: String
});

// module.exports = mongoose.model('books', booksSchema)


const BookClass = mongoose.model('books', booksSchema)

module.exports = BookClass;
