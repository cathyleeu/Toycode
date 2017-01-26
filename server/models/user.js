const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// const subClassSchema = new Schema({
//   classname: String,
//   students: Number
// })
const kinderSchema = new Schema({
  parentId:String,
  code: String,
  // address:{},
  zipNo:String,
  roadAddr:String,
  detailAddr:String,
  phone: String,
  manager: String,
  managerPh: String,
  name: String,
  address: String,
  kinderClasses: []
})

const userSchema = new Schema({
  email : { type: String, unique: true, lowercase: true},
  password: String,
  Code: { type: String, unique: true },
  branch: {
    Name: String,
    Address:{
      zipNo:  String,
      roadAddr: String,
      detailAddr: String
    }
  },
  account: {
    Manager: String,
    Email: String,
    Phone: String
  },
  education:{
    Manager: String,
    Email: String,
    Phone: String
  },
  kinders: [kinderSchema],
  createdOn: {type: Date, default: Date.now}
}, {collection:'user'});


// License: { type: String, unique: true },


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
module.exports = mongoose.model('user', userSchema)
