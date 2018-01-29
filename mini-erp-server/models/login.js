const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//FIXME: renewal 버전에서 다시 새로 살려야 함
// const studentsSchema = new Schema({
//   parentId: String,
//   kinderId: String,
//   classId: String,
//   name: String
// })

const loginSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String, //_id 값으로 받아와야 할 듯 함
  className: String,
  students: [],
  updateOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model('login', loginSchema)
