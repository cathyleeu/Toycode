const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  id: Number,
  title : String,
  code : String,
  quantity : {type: Number, default: 0},
  price : {type: Number, default: 0},
  desc: String,
  img: String
});

// module.exports = mongoose.model('books', booksSchema)


const BookClass = mongoose.model('books', booksSchema)

module.exports = BookClass;
