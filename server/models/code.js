const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const codeSchema = new Schema({
  dbcollection : String,
  count: Number
})


module.exports = mongoose.model('code', codeSchema)
