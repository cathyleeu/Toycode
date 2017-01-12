const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  id: Number,
  title : String,
  code : String,
  classify: String, //지사구분
  quantity : {type: Number, default: 0},
  price : {type: Number, default: 0}, //TODO: 곧 지우고 도매가로 계산 할 수 있도록 해야암.
  wPrice: {type: Number, default: 0}, // 도매가
  cPrice: {type: Number, default: 0}, // 소비자가
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
