const jwt = require('jwt-simple'),
      User = require('../models/user'),
      Code = require('../models/code'),
      mongoose = require('mongoose'),
      nev = require('email-verification')(mongoose),
      siteUrl = 'http://localhost:3090',
      config = require('../config');

// email-verification에서 User모델의 nested values를 처리하지 못하는 문제 수정
nev.generateTempUserModel = function(User, callback) {
  if (!User) {
    return callback(new TypeError('Persistent user model undefined.'), null);
  }
  var tempUserSchemaObject = {}, // a copy of the schema
    tempUserSchema;

  // copy over the attributes of the schema
  // Object.keys(User.schema.paths).forEach(function(field) {
  //   tempUserSchemaObject[field] = User.schema.paths[field].options;
  // });

  //modified from User.schema.path to User.schema.obj for copying nested values

  Object.keys(User.schema.obj).forEach(function(field) {
    tempUserSchemaObject[field] = User.schema.obj[field];
  });
  tempUserSchemaObject[nev.options.URLFieldName] = String;


  // create a TTL
  tempUserSchemaObject.createdAt = {
    type: Date,
    expires: nev.options.expirationTime.toString() + 's',
    default: Date.now
  };

  tempUserSchema = mongoose.Schema(tempUserSchemaObject);

  // copy over the methods of the schema
  Object.keys(User.schema.methods).forEach(function(meth) { // tread lightly
    tempUserSchema.methods[meth] = User.schema.methods[meth];
  });

  nev.options.tempUserModel = mongoose.model(nev.options.tempUserCollection, tempUserSchema);

  return callback(null, mongoose.model(nev.options.tempUserCollection));
};

nev.configure({
    verificationURL: siteUrl + '/signup/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'tempUsers',

    transportOptions: {
      service: 'Gmail',
      auth: {
        user: 'toycodeinc@gmail.com',
        pass: 'c0d1ng!@'
      }
    },
    verifyMailOptions: {
      from: '키즈코딩 <toycodeinc_do_not_reply@gmail.com>',
      subject: '키즈코딩 회원 이메일 인증',
      html: '<p>다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : </p><p>${URL}</p>',
      text: '다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : ${URL}'
    }
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});






nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

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

// 에러남
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
          Address:{
            zipNo:zipNo,
            roadAddr:roadAddr,
            detailAddr:detailAddr
          }
        },
        account:{
          Manager: '',
          Email: '',
          Phone: ''
        },
        education:{
          Manager: '',
          Email: '',
          Phone: ''
        }
      })

      nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
        if(err){
          console.log(err)
          return res.status(404).send('ERROR: creating temp user FAILED');
        }
        // new user created

        if (newTempUser) {
          console.log("newTempUser:")
          console.log(newTempUser)
          var URL = newTempUser[nev.options.URLFieldName];
          // nev.getNestedValue(user,"branch.Name")
          nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err) {
              return res.status(404).send('ERROR: sending verification email FAILED');
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
              res.json({
                msg: '이메일을 인증을 확인부탁',
                token:tokenForUser(user),
                info: info
              })
            });
          });
        // user already exists in temporary collection!
        } else {
          res.json({
            msg: 'You have already signed up. Please check your email to verify your account.'
          });
        }
      })
    });
  })
};

exports.confirmSignUp = (req, res) => {
  const url = req.params.url
  console.log(url)
  nev.confirmTempUser(url, function(err, user) {
    console.log("user")  //null로 나온다..ㅎㅎㅎ
    console.log(user)
    if (user) {
        nev.sendConfirmationEmail(user.email, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending confirmation email FAILED');
          }
          res.json({
            msg: 'CONFIRMED!',
            info: info
          })
        });
    }
    else {
      console.log("나는에러다다다다", err)
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
 })
}


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
