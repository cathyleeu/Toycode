const jwt = require('jwt-simple'),
      User = require('../models/user'),
      Code = require('../models/code'),
      mongoose = require('mongoose'),
      nev = require('email-verification')(mongoose),
      config = require('../config'),
      co = require('co');


const passport = require('koa-passport');
const passportConfig = require('../services/passport');

// const requireAuth = passport.authenticate('jwt', {session: false})


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
function sendConfirmationEmail(email){
  return new Promise((resolve, reject) => {
    nev.sendConfirmationEmail(email, (err, info) => {
      if(err){
        reject({ err });
      } else {
        resolve(info);
      }
    })
  })
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
    verificationURL: config.SERVER_URL + '/signup/${URL}',
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
      from: '키즈씽킹 <toycodeinc_do_not_reply@gmail.com>',
      subject: '키즈씽킹 회원 이메일 인증',
      html: '<img src="cid:logo" style="width:113px;height:40px;margin-bottom:1em;"/><p style="margin-bottom:0.3em;font-size:18px;">안녕하세요. 고객님!</p> <p style="margin-bottom:1em;">아래의 "인증하기"를 클릭하시면, 가입이 완료됩니다.</p><a href="${URL}" style="padding:1em 3em; background-color:#4CA651;color:white;text-align:center;text-decoration:none;display: inline-block;">인증하기</a></p>',
      text: '',
      attachments: [{
        filename: 'logo.png',
        path: 'static/img/logo.png',
        cid: 'logo' //same cid value as in the html img src
      }]
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
  return jwt.encode({sub: user._id, iat: timestamp }, config.secret)
}


const signin = async(ctx, next) => {
  const gen = await passport.authenticate('local', function*(err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.body = { success: false , loginErr: '이메일이나 비밀번호를 확인해주세요.' };  //보완적인 이슈로 두리뭉실하게 에러를 보내줌.
    } else {
      ctx.body = { success: true, token:tokenForUser(user) };
    }
  })
  await co(gen.call(ctx, next));
};


const signup = async (ctx, next) => {
  try {
    const { email, password, zipNo, roadAddr, detailAddr, signupCode, license, name, repr, bizType, bizItems, kinderName } = ctx.request.body;
    let { userType } = ctx.request.body;
    let errObj = [];
    let customerType = "A";
    if(!email){
      errObj.push({ type: "emailErr", msg: "이메일을 입력하세요." })
    }
    if(!password){
      errObj.push({ type: "passwordErr", msg: "비밀번호를 입력해주세요." })
    }
    if(userType === "branch"){
      if( !zipNo || !roadAddr || !detailAddr ){
        errObj.push({ type: "addrErr", msg: "모든 항목을 입력해주세요." })
      }
      if( !license || !bizType || !bizItems || !name || !repr ){
        errObj.push({ type: "bizErr", msg: "모든 항목을 입력해주세요." })
      }
      if(signupCode.toLowerCase() == "think2017") {
        customerType = "A";
      } else if(signupCode.toLowerCase() == "ecc2017") {
        customerType = "B";
      } else if(signupCode.toLowerCase() == "ybm2017") {
        customerType = "C";
      } else if(signupCode.toLowerCase() == "psa2017") {
        customerType = "D";
      } else if(signupCode.toLowerCase() == "toy2017") {
        customerType = "E";
      } else if(signupCode.toLowerCase() == "toycode_admin") {
        userType = "admin";
        customerType = "Z";
      } else {
        errObj.push({ type: "codeErr", msg: '인증된 가입코드를 입력해주세요.' })
      }
    }
    if(userType === "kinder"){ customerType = "T"; }

    if(errObj.length > 0) {
      ctx.status = 422;
      ctx.body = errObj;
      return;
    }
    let user = await User.findOne({ email: email });
    let codeRes = await Code.findOne({ dbcollection: 'User' });


    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(5),
        resultId = customerType + (zero+count).slice(-zero.length);
    if((customerType === 'B') || (customerType === 'D') || (customerType === 'E')){
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        kinders:[{
          parentId: resultId,
          name, zipNo, roadAddr, detailAddr, kinderClasses:[]
        }],
        branch: {
          license, name, repr, bizType, bizItems,
          address:{ zipNo, roadAddr, detailAddr }
        },
        account:{ A_manager: '', A_email: '', A_phone: '' },
        education:{ E_manager: '', E_email: '', E_phone: '' }
      });
    } else if(customerType === 'T'){
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        kinders:[{
          parentId: signupCode, name: kinderName.trim(),  kinderClasses:[]
        }]
      });
    } else {
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        branch: {
          license, name, repr, bizType, bizItems,
          address:{ zipNo, roadAddr, detailAddr }
        },
        account:{ A_manager: '', A_email: '', A_phone: '' },
        education:{ E_manager: '', E_email: '', E_phone: '' }
      });
    }

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

const confirmSignUp = async ctx => {
  try {
    const url = ctx.params.url;
    const user = await confirmTempUser(url);
    // TODO: 클릭이 완료되면 로그인 페이지로 자동 이동하기 ㅎㅎㅎㅎctx.render = "http:localhost:3000/login"
    ctx.body = "이메일 인증이 완료 되었습니다."
    // if(user) {
    //   try {
    //     const email = await sendConfirmationEmail(user.email)
    //     ctx.body = "이메일 인증 완료"
    //   } catch (err) {
    //     ctx.status = 404;
    //     ctx.body = {err:"인증 메일 확인 전송에 실패했습니다."};
    //     console.log("이메일 확인 인증",err);
    //   }
    // }
  } catch (err) {
    ctx.status = 404;
    ctx.body = {err:"메일 인증에 실패했습니다."};
  }
}


// TODO:codeName 으로 불러오기
const allUsers = async ctx => {
  ctx.body = await User.find().where({userType: 'branch'}).select('userType customerType email kinders branch code account education');
}
const loggedUser = async ctx => {
  ctx.body = await User.find().where({email: ctx.params.user}).select('userType customerType email kinders branch code account education');
}

// 원-지사코드 매칭
const allBranchKinders = async ctx => {
  ctx.body = await User.find().where({ code: ctx.params.branch }).select('kinders');
}

const isFetchedKinderInfo = async ctx => {
  ctx.body = await User.find({
    "kinders.parentId": ctx.params.branch, "userType": "branch"
  },{
    _id: 0, branch: 1, kinders: {$elemMatch : {name: ctx.params.kinderInfo}}
  })
}

const userKinders = async ctx => {
  ctx.body = await User.find().where({email: ctx.params.user}).select('kinders')
}
const userInfoUpdate = async ctx => {
  try {
    // body에소 보내는 명과 model 스키마 명과 일치하는 것이 좋음!!
    const { A_manager, A_email, A_phone } = ctx.request.body.account;
    const { E_manager, E_email, E_phone } = ctx.request.body.education;
    ctx.body = await User.findOneAndUpdate(
      {email: ctx.params.user},
      {$set: {
        account: { A_manager, A_email, A_phone },
        education:{ E_manager, E_email, E_phone }
      }},
      { new: true })
  } catch(err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
const userKinderUpdate = async ctx => {
  try{
    const kinders = ctx.request.body.kinders.map((kinder, i) => {
      console.log("userKinderUpdatefromDB",kinder);
      const kinderId = 'K'+(i+1);
      const kinderCode = kinder.parentId+'-'+kinderId;
      const { manager, zipNo, roadAddr, detailAddr, managerPh, name, phone, parentId, lang} = kinder;
      console.log("langlang",lang);
      return({
        code: kinderCode, manager, parentId,
        zipNo, roadAddr, detailAddr, lang,
        managerPh,
        name: name.trim(), phone,
        kinderClasses: kinder.kinderClasses.map((kinderClass, i) => {
          return({
          _id: kinderId+'-KC'+(i+1),
          code: kinderCode+'-KC'+(i+1),
          className: kinderClass.className,
          level: kinderClass.level
        })})
      })})
      ctx.body = await User.findOneAndUpdate({email: ctx.params.user}, {$set: {kinders}}, { new: true })
  } catch(err){
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

module.exports = {
  signin, signup, confirmSignUp, allUsers, loggedUser, userKinders, userInfoUpdate, userKinderUpdate, allBranchKinders, isFetchedKinderInfo
};
