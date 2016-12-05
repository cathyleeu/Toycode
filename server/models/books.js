const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  title : String,
  code : String,
  quantity : Number,
  price : Number,
  desc: String,
  img: String,
  status: Boolean
});

// module.exports = mongoose.model('books', booksSchema)


const BookClass = mongoose.model('books', booksSchema)

module.exports = BookClass;
