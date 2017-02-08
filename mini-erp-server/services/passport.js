const passport = require('koa-passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


passport.serializeUser((user, done) => { done(null, user._id) })
passport.deserializeUser((id, done) => { User.findById(id, done); })



//Create local Strategy

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

const LocalStrategy = require('passport-local').Strategy;
const localOptions = { usernameField: 'email'}
passport.use(new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email:email}, function(err, user) {
    if(!err && user) {
      user.comparePassword(password, function(err, isMatch) {
        if(err) {
          done(err, false);
        } else if(isMatch) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      return;
    }
    done(null, false);
  });
}))
