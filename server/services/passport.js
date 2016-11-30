const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


//Create local Strategy
const localOptions = { usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // 이메일과 비밀번호 확인, call done with the user
  // 일치할 경우
  // 아닐경우
  User.findOne({ email: email }, function(err, user){
    if(err){
      return done(err)
    }
    if(!user){
      return done(null, false)
    }
    // 비밀번호 비교
    user.comparePassword(password, function (err, isMatch) {
      if(err){
        return done(err)
      }
      if(!isMatch){
        return done(null, false)
      }
      return done(null, user)
    })
  })
})

// Setup options for JWT JwtStrategy

const jwtOtions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOtions, function(payload, done){
  // See if the user Id in the payload exists in our database
  // 그랬다면, call 'done'
  // 아니라면 user 오브젝트 없이 call
  User.findById(payload.sub, function (err,user) {
    if(err){
      return done(err, false)
    }
    if(user){
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})

//Tell passport to user this Strategy
passport.use(jwtLogin)
passport.use(localLogin)
