const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  title : String,
  code : String,
  quantity : Number,
  price : Number

});

// module.exports = mongoose.model('books', booksSchema)


const ModelClass = mongoose.model('books', booksSchema)

module.exports = ModelClass;
