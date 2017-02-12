const Koa = require('koa'),
      app = new Koa(),
      cors = require('koa-cors'), //http 접근 제어 cross resoure origin sharing
      body = require('koa-body'),
      router = require('./router'),
      config = require('./config');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const session = require('koa-generic-session')
const convert = require('koa-convert');

console.log(config);

//DB setup
const authDB = "mongodb://localhost:auth/auth"
mongoose.Promise = global.Promise;
mongoose.connect(authDB)
var db = mongoose.connection;
db.on('error', function(e) {
  console.error(e);
});
db.once('open', function() {
  console.log('connected to ' + authDB);
});


//app setup
app
  .use(convert(cors({origin:true})))
  .use(convert(body()));

// logger
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(convert(session()))
app.use(convert(passport.initialize()))
app.use(convert(passport.session()))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3090);
