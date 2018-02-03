const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
  parentId: String,
  kinderId: String,
  classId: String,
  userId: String,
  chapter: String,
  problem: String,
  failed: Number,
  score: Number,
  duration: Number,
  block: Number,
  success: Boolean,
  date: Date
})

module.exports = mongoose.model('reports', reportsSchema)
