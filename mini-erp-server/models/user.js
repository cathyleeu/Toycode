const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// const subClassSchema = new Schema({
//   className: String,
//   students: Number
// })
const kinderSchema = new Schema({
  parentId:String,
  code: String,
  lang: String,
  url: String,
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

// userType = [branch, admin, warehouse, kinder]
const userSchema = new Schema({
  userType: String,
  email : { type: String, lowercase: true},
  password: String,
  code: String,
  customerType: String,
  branch: {
    license: String,
    name: String,
    location: String, // 지사 소속
    sub_name: String,
    repr: String,
    bizType: String,
    bizItems: String,
    address:{
      zipNo:  String,
      roadAddr: String,
      detailAddr: String
    }
  },
  account: {
    A_manager: String,
    A_email: String,
    A_phone: String
  },
  education:{
    E_manager: String,
    E_email: String,
    E_phone: String
  },
  kinders: [kinderSchema],
  updateOn: {type: Date, default: Date.now},
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
