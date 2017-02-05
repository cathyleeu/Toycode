const jwt = require('jwt-simple'),
      User = require('../models/user'),
      Code = require('../models/code'),
      mongoose = require('mongoose'),
      nev = require('email-verification')(mongoose),
      siteUrl = 'http://localhost:3000',
      config = require('../config');

function createTempUser(newUser) {
  return new Promise( function (resolve, reject) {
    nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser){
      if(err) {
        reject({ err });
      } else {
        resolve({ existingPersistentUser, newTempUser });
      }
    });
  });
}
function sendVerificationEmail(email, url) {
  return new Promise( function (resolve, reject) {
    nev.sendVerificationEmail(email, url, function (err, info){
      if(err) {
        reject({ err });
      } else{
        resolve(info);
      }
    });
  });
}
function confirmTempUser(url) {
  return new Promise( function (resolve, reject) {
    nev.confirmTempUser(url, function (err, user){
      resolve({
        err: err,
        user: user
      });
    });
  });
}

nev.generateTempUserModel = function(User, callback) {
  if (!User) {
    return callback(new TypeError('Persistent user model undefined.'), null);
  }
  var tempUserSchemaObject = {}, // a copy of the schema
    tempUserSchema;

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



function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, config.secret)
}

const signin = async ctx => { ctx.body = { token: tokenForUser(ctx.request.body.user) };};


const signup = async (ctx, next) => {
  try {
    const { email, password, Name, zipNo, roadAddr, detailAddr } = ctx.request.body;

    if(!email || !password){
      ctx.status = 422;
      ctx.body = {error: '아이디 또는 비밀번호를 입력해주세요.'};
      return;
    }

    let user = await User.findOne({email: email});
    let codeRes = await Code.findOne({dbcollection: 'User'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(5),
        resultId = "A" + (zero+count).slice(-zero.length);
    user = new User({
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
    });

    const result = await createTempUser(user);
    if(result.existingPersistentUser) {
      ctx.body = { msg: '이미 가입된 이메일입니다.' };
      return;
    }
    if(result.newTempUser) {
      const url = result.newTempUser[nev.options.URLFieldName];
      const info = await sendVerificationEmail(email, url);

      codeRes = codeRes || new Code({
        dbcollection: 'User',
        count: count
      });
      codeRes.count++;
      const err = await codeRes.save();
      if(err) {
        await next(err);
      }
      ctx.body = {
        msg: '이메일을 인증을 확인부탁',
        token: tokenForUser(user),
        info: info
      };
    } else {
      ctx.body = {
        msg: '이미 이메일 이증메일을 보냈습니다. 확인해주세요.'
      };
    }
  } catch(err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }

  // TODO: async await에서 Promise reject의 경우 처리 필요
};

// TODO:codeName 으로 불러오기
const allUsers = async ctx => {
  ctx.body = await User.find().where({admin: false}).select('admin email kinders branch Code account education');
}
const loggedUser = async ctx => {
  ctx.body = await User.find().where({email: ctx.params.user}).select('admin email kinders branch Code account education');
}


const userKinders = async ctx => {
  ctx.body = await User.find().where({email: ctx.params.user}).select('kinders')
}
const userInfoUpdate = async ctx => {
  try {
    const { A_manager, A_email, A_phone } = ctx.request.body.account;
    const { E_manager, E_email, E_phone } = ctx.request.body.education;
    ctx.body = await User.findOneAndUpdate(
      {email: ctx.params.user},
      {$set: {
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
      }})
  } catch(err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
const userKinderUpdate = async ctx => {
  try{
    const kinders = ctx.request.body.kinders.map((kinder, i) => {
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
      ctx.body = User.findOneAndUpdate({email: user}, {$set: {kinders: kinders}})
  } catch(err){
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}


const intro = async ctx => {
  ctx.body = 'Welcome to mini-erp-server';
};

const hello = async ctx => {
  const user = await User.findOne({email: ctx.request.body.email});
  ctx.body = 'Hello World, ' + ctx.request.body.email + " " + user.Code;
};

module.exports = {
  intro, hello, signin, signup, allUsers, loggedUser, userKinders, userInfoUpdate, userKinderUpdate
};
