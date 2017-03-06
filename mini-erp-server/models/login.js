const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String,
  className: String,
  students: []
})

module.exports = mongoose.model('login', loginSchema)
