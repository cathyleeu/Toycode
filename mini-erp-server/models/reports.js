const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String,
  userId: String,
  chapter: String,
  problem: String,
  failed: String,
  score: String,
  duration: String,
  block: String,
  success: String,
  date: String
})

module.exports = mongoose.model('reports', reportsSchema)
