const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  id: Number,
  title : String,
  code : String,
  classify: String, //지사구분
  quantity : {type: Number, default: 0},
  // price : {type: Number, default: 0},
  bPrice: {type: Number, default: 0}, // 도매가
  dPrice: {type: Number, default: 0}, // 소비자가
  desc: String,
  img: String,
  ISBN: String,
  ISBNset: String,
  tax: Boolean,
  lang: String

});

// module.exports = mongoose.model('books', booksSchema)


const BookClass = mongoose.model('books', booksSchema)

module.exports = BookClass;
