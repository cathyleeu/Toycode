const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// sub : subject 어떤것이 token을 원하는감? ㅎㅎ
// iat : issued at time
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => res.send({ token: tokenForUser(req.user) })


exports.signup = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  const Name = req.body.Name;
  const Address = req.body.Address;
  const License = req.body.License;

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
      password: password,
      branch: {
        Name: Name,
        License: License,
        Address: Address
      }
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


//해당 유저의 내용만 받아오기
exports.userOn = (req, res ) => {
  console.log(req.params.user)
  const user = req.params.user
  User.find((err, users) => res.json(users)).where({email: user})
}

exports.userUpdate = (req, res) => {
  const user = req.params.user
  const kindergartens = req.body.kindergartens

  User.findOne({email: user}, function(err, data){
    if(err) {
      console.log(err);
      res.status(500).send()
    } else {
        if(!data) {
          res.status(404).send()
        } else {
            if(kindergartens) {
              data.kindergartens = req.body.kindergartens
            }
            data.save(function (err, updated) {
              if(err){
                console.log(err)
                res.status(500).send()
              } else {
                res.send(updated)
                console.log(updated)
              }
            })
        }
    }
  })
}
// exports.userUpdate = (req,res) => {
//   console.log(req.params.user)
//   const user = req.params.user
//   const kindergartens = req.body.kindergartens
//   User.find((err, users) => res.json(users)).where({email: user}).update(
//     {
//       kindergartens: kindergartens
//     }
//   )
// }\
