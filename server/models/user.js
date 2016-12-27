const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const subClassSchema = new Schema({
  classname: String,
  students: Number
})
const kinderSchema = new Schema({
  name: String,
  class: [subClassSchema]
})

const userSchema = new Schema({
  email : { type: String, unique: true, lowercase: true},
  password: String,
  branch: {
    Code: { type: String, unique: true },
    Name: String,
    License: { type: String, unique: true },
    Address: String,
  },
  account: {
    Manager: String,
    Email: String,
    Phone: String,
  },
  education:{
    Manager: String,
    Email: String,
    Phone: String,
  },
  kindergartens: [kinderSchema],
  createdOn: {type: Date, default: Date.now}
});

 // on Save Hook, 비밀번호 암호화
 // 모델을 저장하기 전에 이 function이 실행됨 (userSchema.pre)
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null , function(err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if(err){
      return callback(err);
    }
    callback(null, isMatch);
  })
}

// 모델 클래스 생성
const ModelClass = mongoose.model('user', userSchema)

module.exports = ModelClass;
