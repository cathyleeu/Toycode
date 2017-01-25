const jwt = require('jwt-simple'),
      User = require('../models/user'),
      Code = require('../models/code'),
      config = require('../config');


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
  const zipNo = req.body.zipNo;
  const roadAddr = req.body.roadAddr;
  const detailAddr = req.body.detailAddr;
  // const License = req.body.License;


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
          // License: License,
          Address: {
            zipNo:zipNo,
            roadAddr:roadAddr,
            detailAddr:detailAddr
          }
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
  User.find((err, users) => res.json(users)).where({email: user}).select('email kinders branch Code account education')
}

exports.userKinder = (req, res) => {
  const user = req.params.user
  User.find((err, users) => res.json(users)).where({email: user}).select('kinders')
}
//TODO: update specific field

exports.userInfoUpdate = (req, res) => {
  const user = req.params.user
  const A_manager = req.body.account.manager
  const A_email = req.body.account.email
  const A_phone = req.body.account.phone
  const E_manager = req.body.edu.manager
  const E_email = req.body.edu.email
  const E_phone = req.body.edu.phone

  User.findOneAndUpdate({email: user}, {$set: {
    account: {
      Manager: A_manager,
      Email: A_email,
      Phone: A_phone
    },
    education:{
      Manager: E_manager,
      Email: E_email,
      Phone: E_phone
    }
  }}, function(err, data){
    if(err) {
      console.log("err:",err)
      res.status(500).send()
    }
    res.json()
  })

}
exports.userKinderUpdate = (req, res) => {

  const user = req.params.user
  const kinders = req.body.kinders.map((kinder, i) => {
    const kinderId = 'K'+(i+1)
    const kinderCode = kinder.parentId+'-'+kinderId
    //TODO: castError
    return({
      code: kinderCode,
      parentId: kinder.parentId,
      manager: kinder.manager,
      zipNo: kinder.zipNo,
      roadAddr: kinder.roadAddr,
      detailAddr:kinder.detailAddr,
      // address: {
      //   zipNo: kinder.zipNo,
      //   roadAddr: kinder.roadAddr,
      //   detailAddr:kinder.detailAddr
      // },
      managerPh: kinder.managerPh,
      name: kinder.name,
      phone: kinder.phone,
      kinderClasses: kinder.kinderClasses.map((kinderClass, i) => ({
        _id: kinderId+'-KC'+(i+1),
        code: kinderCode+'-KC'+(i+1),
        className: kinderClass.className,
        students: kinderClass.students
      }))
    })})
  User.findOneAndUpdate({email: user}, {$set: {kinders: kinders}}, function(err, data){
    if(err) {
      console.log("err:",err)
      res.status(500).send()
    }
    res.json()
  })
}
