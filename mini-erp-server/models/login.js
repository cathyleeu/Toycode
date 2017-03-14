const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String,
  className: String,
  students: [],
  updateOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model('login', loginSchema)
