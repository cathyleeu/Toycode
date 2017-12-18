const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentsSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String,
  name: String
})

const loginSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String, //_id 값으로 받아와야 할 듯 함
  className: String,
  students: [studentsSchema],
  updateOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model('login', loginSchema)
