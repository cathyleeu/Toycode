const jwt = require('jwt-simple');
const User = require('../models/user');
const Code = require('../models/code');
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
    // TODO:나중에 고객이 나눠지면 그에 맞는 구분 코드를 설정해야함.
    Code.findOne({dbcollection: 'User'}, function(err, codeRes) {
      var count = codeRes ? codeRes.count : 1,
          zero = new Array(5).join(0),
          resultId = "A" + (zero + count).slice(-zero.length);

      const user = new User({
        email: email,
        password: password,
        Code: resultId,
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
        codeRes = codeRes || new Code({
          dbcollection: 'User',
          count: count
        });
        codeRes.count++
        codeRes.save(function(err) {
          if(err){
            return next(err)
          }
          res.json({token:tokenForUser(user)})
        });
      })
    });
  })
  //유저 생성이 된 것에 응답하는것
};


//해당 유저의 내용만 받아오기
exports.userOn = (req, res ) => {
  console.log(req.params.user)
  const user = req.params.user
  User.find((err, users) => res.json(users)).where({email: user}).select('email kinders branch Code')
}

exports.userKinder = (req, res) => {
  const user = req.params.user
  User.find((err, users) => res.json(users)).where({email: user}).select('kinders')
}
//TODO: update specific field
exports.userKinderUpdate = (req, res) => {

  const user = req.params.user
  //TODO: Code를 자동생성하는 것으로 쓸 방법... ㅎㅎㅎ
  const kinders = req.body.kinders.map((kinder, i) => ({
      code: kinder.parentId+'-K'+(i+1),
      parentId: kinder.parentId,
      manager: kinder.manager,
      address: kinder.address,
      managerPh: kinder.managerPh,
      name: kinder.name,
      phone: kinder.phone,
      kinderClasses: kinder.kinderClasses
    }))
  User.findOneAndUpdate({email: user}, {$set: {kinders: kinders}}, function(err, data){
    if(err) {
      console.log("err:",err)
      res.status(500).send()
    }
    res.json()
  })
}
