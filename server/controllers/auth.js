const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// sub : subject 어떤것이 token을 원하는감? ㅎㅎ
// iat : issued at time
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req, res, next) {
  //사용자들이 로그인
  // token 생성하는 것
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).sned({error: '아이디 또는 비밀번호를 입력해주세요.'})
  }
  // 유저가 이메일 있는가 확인 (가입 되었는가 확인)

  User.findOne({ email: email }, function (err, existingUser) {
    if(err){
      return next(err)
    }
    // 유저 있는 경우 에러 리턴
    if(existingUser){
      return res.status(422).send({ error: '이미사용되는 이메일입니다.'})
    }
    // 한번도 생성한 적이 없는 경우 유저생성하는 것
    const user = new User({
      email: email,
      password: password
    })
    user.save(function (err) {
      if(err){
        return next(err)
      }
      res.json({token:tokenForUser(user)})
    })
  })



  //유저 생성이 된 것에 응답하는것
};
