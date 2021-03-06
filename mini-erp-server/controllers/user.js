const jwt = require('jwt-simple'),
  User = require('../models/user'),
  Code = require('../models/code'),
  Login = require('../models/login'),
  mongoose = require('mongoose'),
  nev = require('email-verification')(mongoose),
  config = require('../config'),
  co = require('co');


const passport = require('koa-passport');
const passportConfig = require('../services/passport');

// const requireAuth = passport.authenticate('jwt', {session: false})


function createTempUser(newUser) {
  return new Promise(function (resolve, reject) {
    nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser) {
      if (err) {
        reject({ err });
      } else {
        resolve({ existingPersistentUser, newTempUser });
      }
    });
  });
}
function sendVerificationEmail(email, url) {
  return new Promise(function (resolve, reject) {
    nev.sendVerificationEmail(email, url, function (err, info) {
      if (err) {
        reject({ err });
      } else {
        resolve(info);
      }
    });
  });
}
function sendConfirmationEmail(email) {
  return new Promise((resolve, reject) => {
    nev.sendConfirmationEmail(email, (err, info) => {
      if (err) {
        reject({ err });
      } else {
        resolve(info);
      }
    })
  })
}
function confirmTempUser(url) {
  return new Promise(function (resolve, reject) {
    nev.confirmTempUser(url, function (err, user) {
      resolve({
        err: err,
        user: user
      });
    });
  });
}


nev.generateTempUserModel = function (User, callback) {
  if (!User) {
    return callback(new TypeError('Persistent user model undefined.'), null);
  }
  var tempUserSchemaObject = {}, // a copy of the schema
    tempUserSchema;

  //modified from User.schema.path to User.schema.obj for copying nested values

  Object.keys(User.schema.obj).forEach(function (field) {
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
  Object.keys(User.schema.methods).forEach(function (meth) { // tread lightly
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
      pass: 'c0d1ng!@!!'
    }
  },
  verifyMailOptions: {
    from: '???????????? <toycodeinc_do_not_reply@gmail.com>',
    subject: '???????????? ?????? ????????? ??????',
    html: '<img src="cid:logo" style="width:113px;height:40px;margin-bottom:1em;"/><p style="margin-bottom:0.3em;font-size:18px;">???????????????. ?????????!</p> <p style="margin-bottom:1em;">????????? "????????????"??? ???????????????, ????????? ???????????????.</p><a href="${URL}" style="padding:1em 3em; background-color:#4CA651;color:white;text-align:center;text-decoration:none;display: inline-block;">????????????</a></p>',
    text: '',
    attachments: [{
      filename: 'logo.png',
      path: 'static/img/logo.png',
      cid: 'logo' //same cid value as in the html img src
    }]
  }
}, function (err, options) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('configured: ' + (typeof options === 'object'));
});


nev.generateTempUserModel(User, function (err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});



function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret)
}


const signin = async (ctx, next) => {
  const gen = await passport.authenticate('local', function* (err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.body = { success: false, type: "loginErr", msg: '??????????????? ??????????????? ??????????????????.' };  //???????????? ????????? ?????????????????? ????????? ?????????.
    } else {
      ctx.body = { success: true, token: tokenForUser(user) };
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

    //validation
    if (!email) {
      errObj.push({ type: "emailErr", msg: "???????????? ???????????????." })
    }
    if (!password) {
      errObj.push({ type: "passwordErr", msg: "??????????????? ??????????????????." })
    }
    if (userType === "branch") {
      if (!zipNo || !roadAddr || !detailAddr) {
        errObj.push({ type: "addrErr", msg: "????????? ????????? ??????????????????." })
      }
      if (!license || !bizType || !bizItems || !name || !repr) {
        errObj.push({ type: "bizErr", msg: "????????? ????????? ?????? ??????????????????." })
      }
      if (signupCode.toLowerCase() == "think2017") {
        customerType = "A";
      } else if (signupCode.toLowerCase() == "ecc2017") {
        customerType = "B";
      } else if (signupCode.toLowerCase() == "ybm2017") {
        customerType = "C";
      } else if (signupCode.toLowerCase() == "psa2017") {
        customerType = "D";
      } else if (signupCode.toLowerCase() == "toy2017") {
        customerType = "E";
      } else if (signupCode.toLowerCase() == "toycode_admin") {
        userType = "admin";
        customerType = "Z";
      } else {
        errObj.push({ type: "codeErr", msg: '????????? ??????????????? ??????????????????.' })
      }
    }
    if (userType === "kinder") { customerType = "T"; }

    if (errObj.length > 0) {
      ctx.status = 422;
      ctx.body = errObj;
      return;
    }


    let user = await User.findOne({ email: email });
    let codeRes = await Code.findOne({ dbcollection: 'User' });


    let count = codeRes ? codeRes.count : 1,
      zero = "0".repeat(5),
      resultId = customerType + (zero + count).slice(-zero.length);
    if ((customerType === 'B') || (customerType === 'D') || (customerType === 'E')) {
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        kinders: [{
          parentId: resultId,
          name, zipNo, roadAddr, detailAddr, kinderClasses: []
        }],
        branch: {
          license, name, repr, bizType, bizItems,
          address: { zipNo, roadAddr, detailAddr }
        },
        account: { A_manager: '', A_email: '', A_phone: '' },
        education: { E_manager: '', E_email: '', E_phone: '' }
      });
    } else if (customerType === 'T') {
      let targetKinder = await User.findOne({ "code": signupCode, "kinders.name": kinderName.trim() }).select('kinders.$')
      console.log("AAAAAAAAAA", targetKinder.kinders[0].kinderClasses);
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        kinders: [{
          code: targetKinder.kinders[0].code,
          parentId: signupCode,
          name: kinderName.trim(),
          kinderClasses: targetKinder.kinders[0].kinderClasses
        }]
      });
    } else {
      user = new User({
        userType, email, password,
        code: resultId,
        customerType,
        branch: {
          license, name, repr, bizType, bizItems,
          address: { zipNo, roadAddr, detailAddr }
        },
        account: { A_manager: '', A_email: '', A_phone: '' },
        education: { E_manager: '', E_email: '', E_phone: '' }
      });
    }

    const result = await createTempUser(user);
    if (result.existingPersistentUser) {
      errObj.push({ type: "existErr", msg: '?????? ????????? ??????????????????.' })
      ctx.body = errObj;
      return;
    }
    if (result.newTempUser) {
      const url = result.newTempUser[nev.options.URLFieldName];
      const info = await sendVerificationEmail(email, url);

      codeRes = codeRes || new Code({
        dbcollection: 'User',
        count: count
      });
      codeRes.count++;
      const err = await codeRes.save();
      if (err) {
        await next(err);
      }
      ctx.body = {
        msg: '???????????? ????????? ????????????',
        token: tokenForUser(user),
        info: info
      };
    } else {
      errObj.push({ type: "sendErr", msg: '?????? ????????? ??????????????? ???????????????. ??????????????????.' })
      ctx.body = errObj;
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }

  // TODO: async await?????? Promise reject??? ?????? ?????? ??????
};

const renewalExistingUser = async (ctx) => {
  let { email } = ctx.params;

  let user = await User.findOne({ email });
  if (!user) {
    ctx.body = { type: "available", msg: '?????? ????????? ??????????????????.' }
    return;
  }

  const result = await createTempUser(user);
  if (result.existingPersistentUser) {
    ctx.status = 401;
    ctx.body = { type: "existErr", msg: '?????? ????????? ??????????????????.' }
    return;
  }

}
const renewalSignup = async (ctx, next) => {
  const { name, email, password, passwordConfirm, zipNo, roadAddr, detailAddr, customerType, userType, parentId } = ctx.request.body;
  let errObj = [];
  let essential = [
    { name: "email", msg: "?????????", value: email },
    { name: "password", msg: "????????????", value: password },
    { name: "passwordConfirm", msg: "???????????? ??????", value: passwordConfirm }
  ]
  if (customerType !== "T") {
    essential.push({ name: "name", msg: "?????????", value: name })
    essential.push({ name: "roadAddr", msg: "??????", value: roadAddr })
    essential.push({ name: "detailAddr", msg: "?????? ??????", value: detailAddr })

  }

  essential.map(e => {
    let valid = e.value ? e.value.trim() : e.value;
    if (!valid) {
      errObj.push({ type: `${e.name}Err`, msg: `${e.msg}???(???) ??????????????????.` })
    }
  })
  console.log(errObj);
  if (passwordConfirm !== password) {
    errObj.push({ type: `passwordConfirmErr`, msg: `??????????????? ???????????? ????????????.` })
  }

  if (errObj.length > 0) {
    ctx.status = 422;
    ctx.body = errObj;
    return;
  }

  let user = await User.findOne({ email: email });
  let codeRes = await Code.findOne({ dbcollection: 'User' });

  let count = codeRes ? codeRes.count : 1,
    zero = "0".repeat(5),
    resultId = customerType + (zero + count).slice(-zero.length);

  let commonValue = {
    userType, email, password,
    code: resultId,
    customerType,
  }

  let exceptTeacher = {
    branch: {
      name,
      address: { zipNo, roadAddr, detailAddr }
    },
    account: { A_manager: '', A_email: '', A_phone: '' },
    education: { E_manager: '', E_email: '', E_phone: '' }
  }

  if ((customerType === 'B') || (customerType === 'D') || (customerType === 'E')) {
    user = new User({
      ...commonValue,
      kinders: [{
        parentId: resultId,
        name, zipNo, roadAddr, detailAddr,
        kinderClasses: []
      }],
      ...exceptTeacher
    });
  } else if (customerType === 'T') {
    let academy = await User.findOne({ 'kinders.parentId': parentId, 'kinders.url': ctx.request.body.code }).select('kinders.$')
    let { name, kinderClasses, url, lang, phone, manager, managerPh } = academy.kinders[0]

    user = new User({
      ...commonValue,
      kinders: [{
        parentId, lang, url, name,
        phone, manager, managerPh,
        kinderClasses: kinderClasses
      }]
    });

  } else {
    user = new User({
      ...commonValue,
      ...exceptTeacher
    });
  }

  const result = await createTempUser(user);
  if (result.newTempUser) {
    const url = result.newTempUser[nev.options.URLFieldName];
    const info = await sendVerificationEmail(email, url);

    codeRes = codeRes || new Code({
      dbcollection: 'User',
      count: count
    });
    codeRes.count++;
    const err = await codeRes.save();

    if (err) {
      await next(err);
    }

    ctx.body = {
      msg: '????????? ?????? ???????????????.\n???????????? ???????????? ?????? ????????? ???????????????.\n??????????????? ????????? ??????????????? ??????????????? ???????????????.',
      token: tokenForUser(user),
      info: info
    };
  } else {
    errObj.push({ type: "sendErr", msg: '?????? ????????? ??????????????? ???????????????. ??????????????????.' })
    ctx.body = errObj;
  }


}

const verifiedCode = async ctx => {
  try {
    let codeType = ctx.params.code;
    let { parentId, userType, code } = ctx.request.body;

    let userTypes = {
      "branch": {
        "think2018": "A",
        "ybm2018": "C",
        "toycode_admin": "Z"
      },
      "academy": {
        "ecc2018": "B",
        "psa2018": "D",
        "toy2018": "E"
      },
      "teacher": {
      }
    }

    if (userType === "teacher") {
      let verification = await User.findOne({
        "kinders.parentId": parentId,
        "kinders.url": code
      }).select('kinders.$ -_id')

      codeType = code;
      userTypes[userType][codeType] = "T";
    }

    if (!userTypes[userType][codeType]) {
      ctx.body = {
        message: "????????? ??????????????? ????????????.",
        result: false
      }
      return false
    }
    ctx.body = {
      customerType: userTypes[userType][codeType],
      message: "????????? ???????????? ?????????.",
      result: true
    }
  } catch (e) {
    ctx.body = {
      message: "??????????????? ??????????????????.",
      result: false
    }
  }

}


const renewalSignin = async (ctx) => {

}

const confirmSignUp = async ctx => {
  try {
    const url = ctx.params.url;
    const user = await confirmTempUser(url);
    // TODO: ????????? ???????????? ????????? ???????????? ?????? ???????????? ????????????ctx.render = "http:localhost:3000/login"
    ctx.body = "????????? ????????? ?????? ???????????????."
    // if(user) {
    //   try {
    //     const email = await sendConfirmationEmail(user.email)
    //     ctx.body = "????????? ?????? ??????"
    //   } catch (err) {
    //     ctx.status = 404;
    //     ctx.body = {err:"?????? ?????? ?????? ????????? ??????????????????."};
    //     console.log("????????? ?????? ??????",err);
    //   }
    // }
  } catch (err) {
    ctx.status = 404;
    ctx.body = { err: "?????? ????????? ??????????????????." };
  }
}


// TODO:codeName ?????? ????????????
const allUsers = async ctx => {
  ctx.body = await User.find().where({ userType: 'branch' }).select('-password');
}
const allUsersEmails = async ctx => {
  ctx.body = await User.find().select('email -_id');
}
const loggedUser = async ctx => {
  let targetUser = await User.findOne().where({ email: ctx.params.user }).select('-password')
  if (!targetUser) {
    ctx.body = {};
    return;
  }
  let targetCode = { parentId: targetUser.code };
  let targetOne;

  if (targetUser.customerType === 'T') {

    targetOne = targetUser.kinders[0];
    targetCode = { kinderId: targetOne.code, parentId: targetOne.parentId }

  }

  let academies = await Login.find(targetCode)
  let obj = {};

  // console.log(academies);

  targetUser.kinders.forEach(k => {
    obj[k.code] = { ...obj[k.code] }
    k.kinderClasses.forEach(kc => {
      obj[k.code][kc.code] = { ...obj[k.code][kc.code] }
    })
  })

  academies.forEach((ac, i) => {
    let { kinderId, classId, parentId, ...restData } = ac;
    obj[ac.kinderId] = {
      ...obj[ac.kinderId]
    };
    obj[ac.kinderId][ac.classId] = {
      "students": ac.students,
      "className": ac.className
    };
  })



  if (targetUser.customerType === 'T') {
    // console.log(targetOne.code);
    let extraInfo = await User.aggregate([
      { $unwind: '$kinders' },
      { $match: { 'kinders.code': targetOne.code } },
      {
        $project: {
          _id: 0,
          lang: '$kinders.lang',
          name: '$kinders.name',
          url: '$kinders.url'
        }
      }
    ])


    // console.log(extraInfo);
    obj[targetOne.code] = {
      ...obj[targetOne.code],
      "lang": extraInfo[0].lang,
      "url": extraInfo[0].url,
      "name": extraInfo[0].name
    }

  }

  ctx.body = {
    user: targetUser,
    loginInfo: obj
  }
}

const findUserByType = async ctx => {
  ctx.body = await User.find({ customerType: ctx.params.customerType }).select('-password');
}

// ???-???????????? ??????
const allBranchKinders = async ctx => {
  ctx.body = await User.findOne().where({ code: ctx.params.branch }).select('kinders');
}

const isFetchedKinderInfo = async ctx => {
  ctx.body = await User.find({
    "kinders.parentId": ctx.params.branch, "userType": "branch"
  }, {
    _id: 0, branch: 1, kinders: { $elemMatch: { name: ctx.params.kinderInfo } }
  })
}

const userKinders = async ctx => {
  ctx.body = await User.find().where({ email: ctx.params.user }).select('kinders')
}
const userInfoUpdate = async ctx => {
  try {
    // body?????? ????????? ?????? model ????????? ?????? ???????????? ?????? ??????!!
    const { sub_name, account, education } = ctx.request.body;
    console.log(ctx.request.body)

    ctx.body = await User.findOneAndUpdate(
      { email: ctx.params.user },
      {
        $set: {
          "branch.sub_name": sub_name,
          account: { ...account },
          education: { ...education },
        }
      },
      { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

const userInfoUpdatebyRenew = async ctx => {
  let { user, info } = ctx.params;
  let setObj = {}
  if (info === "branch") {
    setObj[info] = {
      ...ctx.request.body,
      address: {
        detailAddr: ctx.request.body.detailAddr,
        roadAddr: ctx.request.body.roadAddr,
        zipNo: ctx.request.body.zipNo
      }
    }
  } else {
    let keyObjs = Object.keys(ctx.request.body)
    keyObjs.forEach(d => {
      setObj[d] = {
        ...ctx.request.body[d]
      }
    })
  }
  ctx.body = await User.findOneAndUpdate(
    { email: ctx.params.user },
    {
      $set: {
        ...setObj
      }
    },
    { new: true }
  )

  // const { sub_name, account, education } = ctx.request.body;
}

const getNewUrl = (bId, names) => {
  //FIXME: ????????? ????????? ???????????? ?????? ??????
  return new Promise(async (resolve, reject) => {
    let users = await User.find(),
      urls = [],
      newUrls = [];
    users.filter(function (user) {
      return user.userType == "branch";
    }).forEach(function (user) {
      user.kinders.forEach(function (kinder) {
        if (kinder.url) {
          urls.push(kinder.url);
        }
      });
    });
    for (let i = 0; i < names.length; i++) {
      let sum = 0,
        kId = names[i];
      sum += bId.charCodeAt(0) * 17;
      sum += bId.charCodeAt(1) * 13;
      if (kId.slice(0, 2) === "??????") {
        if (kId.slice(2, 4) !== "??????") {
          sum += kId.charCodeAt(2) * 13;
          sum += kId.charCodeAt(3) * 29;
        }
      }
      if (kId.slice(0, 4) === "????????????") {
        if (kId.slice(4, 6) !== "??????") {
          sum += kId.charCodeAt(4) * 11;
          sum += kId.charCodeAt(5) * 31;
        }
      }
      if (kId.slice(0, 8) === "(???)???????????????") {
        if (kId.slice(8, 10) !== "??????") {
          sum += kId.charCodeAt(8) * 11;
          sum += kId.charCodeAt(9) * 31;
        }
      }
      if (kId.slice(0, 3) === "ECC") {
        if (kId.slice(3, 5) === "??????") {
          sum += kId.charCodeAt(3) * 11;
          sum += kId.charCodeAt(4) * 31;
        }
      }
      if (kId.slice(0, 2) === "??????") {
        sum += kId.charCodeAt(2) * 13;
        sum += kId.charCodeAt(3) * 29;
      }
      sum += kId.charCodeAt(0) * 11;
      sum += kId.slice(-1).charCodeAt(0) * 19;
      sum += kId.slice(parseInt(kId / 2, 10)).charCodeAt(0) * 7;
      let code, l, mid;
      while (true) {
        code = sum.toString(16).slice(1);
        l = parseInt(kId.length / 2, 10);
        mid = kId.slice(l - 1, l + 1);
        code = (code + mid.charCodeAt(0).toString(16).slice(0, 2) + mid.charCodeAt(1).toString(16).slice(0, 2)).slice(0, 5);

        if (urls.indexOf(code) == -1) {
          urls.push(code); //????????? ??? ??????
          newUrls.push(code); //return ???
          break;
        }
        sum++;
      }
    }
    // console.log("urls",urls);
    // console.log("newUrls",newUrls);
    resolve(newUrls);
  });
}

// const createAcademy = async ctx => {
//   ctx.body = await User.findOneAndUpdate({email: ctx.params.user},{$push: {"kinders": ctx.request.body}});
// }

const editAcademy = async ctx => {
  // ??????????????? ?????? key ?????? ??????
  let modified = Object.keys(ctx.request.body)
  let modiObj = {}
  // ?????? ????????? sub Class ??????
  modified.forEach(mo => {
    modiObj[`kinders.$.${mo}`] = ctx.request.body[mo]
  })
  ctx.body = await User.findOneAndUpdate(
    //find subSchema
    {
      email: ctx.params.user,
      "kinders._id": ctx.params.academyId
    },
    modiObj
  );
}

const deleteAcademy = async ctx => {
  ctx.body = await User.findOneAndUpdate(
    //find subSchema
    {
      email: ctx.params.user,
      "kinders._id": ctx.params.academyId
    },
    // delete subSchema
    {
      '$pull': {
        'kinders': {
          '_id': ctx.params.academyId
        }
      }
    }
  );
}

const getAcademyByUser = async ctx => {
  console.log(ctx.params.user, ctx.params.academyId);
  let result = await User.findOne(
    {
      email: ctx.params.user,
      "kinders._id": ctx.params.academyId
    }
  )
  console.log(result);
  ctx.body = result
}

const createAcademyClass = async ctx => {
  //FIXME:

  let { academyId } = ctx.params,
    codeRes = await Code.findOne({ dbcollection: academyId }),
    count = codeRes ? codeRes.count : 1;

  codeRes = codeRes || new Code({
    dbcollection: academyId,
    count: count
  });
  codeRes.count++;
  await codeRes.save();
  // parentId, className, level, academyId
  ctx.body = await User.findOneAndUpdate(
    {
      email: ctx.params.user,
      "kinders.code": academyId
    },
    {
      $push:
      {
        "kinders.$.kinderClasses": {
          ...ctx.request.body,
          classId: `${academyId}-KC${count}`
        }
      }
    }
  );
}

const updateAcademyClass = async ctx => {
  let nested = await User.findOne({
    email: ctx.params.user,
    "kinders.code": ctx.params.academyId,
    "kinders.kinderClasses._id": ctx.params.classId
  }).select('kinders -_id')
  let parentIndex, childIndex;
  nested.kinders.forEach((aca, i) => {
    if (aca.code === ctx.params.academyId) {
      parentIndex = i;
      aca.kinderClasses.forEach((cl, i) => {
        if (cl._id.toString() === ctx.params.classId) {
          childIndex = i
        }
      })
    }
  })

  let modified = Object.keys(ctx.request.body)
  let modiObj = {}
  // ?????? ????????? sub Class ??????
  modified.forEach(mo => {
    modiObj[`kinders.${parentIndex}.kinderClasses.${childIndex}.${mo}`] = ctx.request.body[mo]
  })

  let filter = await User.findOneAndUpdate(
    {
      email: ctx.params.user,
      "kinders.code": ctx.params.academyId,
      "kinders.kinderClasses._id": ctx.params.classId
    },
    modiObj
  )
  ctx.body = filter;
}

const deleteAcademyClass = async ctx => {
  console.log(ctx.request.body);
  // ctx.body = await User.findOneAndUpdate({email: ctx.params.user},{ $push: { "kinders": academyData }});
}

const userKinderUpdate = async ctx => {

  try {

    let kinders = ctx.request.body.kinders;
    let names = kinders.map(kinder => kinder.name);
    let urls = await getNewUrl(ctx.request.body.branch, names);

    if (kinders.length === 0) {
      // kinders ??? ??? ?????? ?????? ????????? ????????? ???,
      kinders = []

    } else if (kinders[0].code) {
      // ?????? ????????? ??????, ????????? db??? ?????? ?????? ????????? ????????????.
      let orgArr = kinders.filter(a => a.code),
        newArr = kinders.filter(a => !a.code),
        lastN = +orgArr[orgArr.length - 1].code.split("-K")[1];
      let checked = orgArr[0].kinderClasses[0] ? orgArr[0].kinderClasses[0].code : false;
      // ?????? ?????? ?????? ???????????????


      if (checked) {
        let orgKc = {}, newKc = {}
        // ?????? ?????? ????????? ?????? ?????? ??? ??????
        orgArr.forEach((org, i) => {
          let eachCode = org.kinderClasses[0] ? org.kinderClasses[0].code : false;
          if (eachCode) {
            let parentK = org.kinderClasses[0].code.split("-KC")[0];
            let orgKces = org.kinderClasses.filter(a => a.code);
            let newKces = org.kinderClasses.filter(a => !a.code);
            orgKc[parentK] = orgKces;
            newKc[parentK] = newKces;
          }
        })

        let orgKeys = Object.keys(orgKc), lastKcN, newKcArr = {};

        orgKeys.forEach(kn => {
          if (newKc[kn].length > 0) {
            lastKcN = +orgKc[kn][orgKc[kn].length - 1].code.split("-KC")[1];
            let pk = kn.split("-K")[1];
            newKc[kn] = newKc[kn].map((kc, i) => ({
              _id: `K${pk}-KC${lastKcN + i + 1}`,
              code: `${kn}-KC${lastKcN + i + 1}`,
              className: kc.className,
              level: kc.level
            }))
          }
          newKcArr[kn] = orgKc[kn].concat(newKc[kn])

        })

        orgArr.forEach((oa, i) => {
          oa.kinderClasses = newKcArr[oa.code]
        })

      }
      newArr = newArr.map((a, i) => {
        //newArr ?????? ?????? ?????? ???????????? ???.... ????????? KC ?????????.. ???
        let { _id, kinderClasses, ...rest } = a;
        let kinderCode = `${a.parentId}-K${lastN + i + 1}`;
        let ids = kinderClasses.map((kc, i) => kc.code ? kc.code : kinderCode + '-KC' + (i + 1));

        kinderClasses = kinderClasses.map((kc, j) => {
          if (kc.code) {
            //KC ??? ????????? ?????? ?????? ??? ?????? ????????? ?????? ???
            return kc
          } else {
            //  KC ??? ?????? ??????,
            let id = kinderCode + '-KC' + (j + 1), //1
              split = id.split("KC"),
              newId = j + 1; //1

            //FIXME: 2?????? ???????????? ?????? ????????????.. - -;;

            for (let i = 0; i < ids.length; i++) { //ids.length = 2
              if (ids.indexOf(id) !== -1 || ids[i] === id) { //A00016-K2-KC1
                newId = parseInt(split[1], 10) + 1;
                id = `${split[0]}KC${newId}`

              }
            }
            return ({
              _id: `K${lastN + i + 1}-KC${newId}`,
              code: kinderCode + '-KC' + newId,
              className: kc.className,
              level: kc.level
            })
          }
        })

        return ({
          ...rest,
          kinderClasses,
          url: urls[(orgArr.length - 1) + i],
          code: kinderCode
        })
      })

      kinders = orgArr.concat(newArr)

    } else {
      for (var i = 0; i < kinders.length; i++) {
        // ??? ?????????... K2 -> K1 ?????? ???????????? ?????? ???????????????.

        const kinder = kinders[i];
        const kinderId = 'K' + (i + 1);
        const kinderCode = kinder.parentId + '-' + kinderId;
        const { manager, zipNo, roadAddr, detailAddr, managerPh, name, phone, parentId, lang, url } = kinder;

        let ids = kinder.kinderClasses.map((kc, i) => kc.code ? kc.code : kinderCode + '-KC' + (i + 1))

        let kinderClasses = kinder.kinderClasses.map((kinderClass, i) => {
          if (kinderClass.code) {
            return kinderClass
          } else {
            let id = kinderCode + '-KC' + (i + 1),
              split = id.split("KC"),
              newId = i + 1;

            for (let i = 0; i < ids.length; i++) {
              if (ids.indexOf(id) !== -1 || ids[i] === id) {
                newId = parseInt(split[1], 10) + 1;
                id = `${split[0]}KC${newId}`
              }
            }
            return ({
              _id: kinderId + '-KC' + newId,
              code: kinderCode + '-KC' + newId,
              className: kinderClass.className,
              level: kinderClass.level
            })
          }
        })

        kinders[i] = {
          code: kinderCode, manager, parentId,
          zipNo, roadAddr, detailAddr, lang,
          managerPh,
          url: url || urls[i],
          name: name.trim(), phone,
          kinderClasses
        };
      }

    }

    let ln = kinders.map(k => k.code);
    let loginList = await Login.find({ parentId: kinders[0].parentId })
    // TODO: kinder ????????? Login ??? ?????? ????????????

    loginList.forEach(async l => {
      if (ln.indexOf(l.kinderId) === -1) {
        await Login.findOneAndRemove({ kinderId: l.kinderId })
      }
    })


    ctx.body = await User.findOneAndUpdate({ email: ctx.params.user }, { $set: { kinders, updateOn: Date.now() } }, { new: true })

  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);

  }

}

//TODO: renewal page ??????
// if(ctx.request.body.renewal) {
//   let { name, phone, parentId, lang, managerPh, manager } = ctx.request.body,
//         urls = await getNewUrl(ctx.request.body.branch, [name]),
//         codeRes = await Code.findOne({ dbcollection: parentId }),
//         count = codeRes ? codeRes.count : 1,
//         academyData = {
//           code: `${parentId}-K${count}`,
//           url: urls, name, phone, parentId, lang, managerPh, manager
//         };
//   codeRes = codeRes || new Code({
//     dbcollection: parentId,
//     count: count
//   });
//   codeRes.count++;
//   await codeRes.save();
//   ctx.body = await User.findOneAndUpdate({email: ctx.params.user},{ $push: { "kinders": academyData }});
// }

// const getClassReports = async ctx => {
//   console.log("===============AAAA===============");
// }

const userUpdateByAdmin = async ctx => {
  try {

    const { name, sub_name, license, erpCode, location } = ctx.request.body;
    ctx.body = await User.findOneAndUpdate(
      { code: ctx.params.code },
      {
        $set: {
          "branch.name": name,
          "branch.sub_name": sub_name,
          "branch.license": license,
          "branch.location": location,
          erpCode: erpCode
        }
      },
      { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

const updateKinderClasses = async ctx => {
  let { parentId, kinderName, customerType } = ctx.params;

  let targetParent = await User.findOne({ "code": parentId, "kinders.name": kinderName }).select("kinders.$"),
    targetKinder = await User.findOneAndUpdate(
      { customerType, "kinders.parentId": parentId, "kinders.name": kinderName },
      {
        $set: {
          "kinders.$.code": targetParent.kinders[0].code,
          "kinders.$.kinderClasses": targetParent.kinders[0].kinderClasses
        }
      },
      { new: true })
  console.log(targetParent, targetKinder);
  ctx.body = targetKinder
}


//==================pagination==========

const getPagination = async ctx => {
  let { page, size, customerType } = ctx.params;
  let filter = customerType === "all" ? "true" : "false"
  let filterObj = {
    true: { customerType: { $nin: "Z" } },
    false: {
      $and: [
        { customerType },
        { customerType: { $nin: "Z" } }
      ]
    }
  }

  let totalSize = await User.find(filterObj[filter]).count()
  let filterUser = await User.find(filterObj[filter])
    .limit(+size)
    .skip((+(page - 1)) * (+size))
    .sort('createdOn')
    .select('-password')

  ctx.body = { filterUser, totalSize }
}

const getAutoComplete = async ctx => {
  let { searchText } = ctx.params;
  let regex = new RegExp(searchText, 'g');

  //{ customerType: { $nin: "Z" } } ??? ?????? ???????????? ??????.. or ??? ????????? ?????? ??????????????? ???????????? ???
  let matchedUsers = await User.find(
    {
      $and: [
        {
          $or: [
            { email: regex },
            { code: regex },
            { "branch.name": regex }
          ]
        },
        { customerType: { $nin: "Z" } }
      ]
    }
  ).limit(10)

  ctx.body = matchedUsers


}







module.exports = {
  signin,
  signup,
  renewalSignin,
  renewalExistingUser,
  renewalSignup,
  verifiedCode,
  confirmSignUp,
  allUsers,
  loggedUser,
  userKinders,
  userInfoUpdate,
  userInfoUpdatebyRenew,
  userKinderUpdate,
  allBranchKinders,
  isFetchedKinderInfo,
  allUsersEmails,
  userUpdateByAdmin,
  editAcademy,
  getAcademyByUser,
  deleteAcademy,
  createAcademyClass,
  updateAcademyClass,
  deleteAcademyClass,
  getPagination,
  getAutoComplete,
  updateKinderClasses,
  findUserByType
  // getClassReports
};
