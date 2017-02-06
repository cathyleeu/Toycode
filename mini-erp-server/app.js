const Koa = require('koa'),
      app = new Koa(),
      cors = require('koa-cors'), //http 접근 제어 cross resoure origin sharing
      body = require('koa-body'),
      router = require('./router');
const mongoose = require('mongoose');




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
  .use(cors())
  .use(body());

// logger
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000);
