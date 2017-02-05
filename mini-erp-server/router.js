const app = require('koa-router')();
const Users = require('./controllers/user');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const passport = require('koa-passport');
const passportConfig = require('./services/passport'); //어떻게 사용하는 것인지 잘 몰겠음...


const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

app.get('/', requireAuth, Users.intro);
app.post('/hello', Users.hello);

app.post('/signin', requireSignin, Users.signin)
app.post('/signup', Users.signup);
// router.get('/signup/:url', Users.confirmSignUp)


app.get('/user', Users.allUsers)
app.get('/user/:user', Users.loggedUser)
app.get('/user/:user/kinders',  Users.userKinders)
app.put('/user/:user/info',  Users.userInfoUpdate)
app.put('/user/:user/kinder',  Users.userKinderUpdate)


app.post('/books', Books.isRegisteredNewGoods)
app.get('/books', Books.isFetchedAll)

app.post('/invoices', Invoices.isRegisteredNewIVes)
app.get('/invoices', Invoices.isFetchedAll)
app.get('/invoices/:user', Invoices.isFetchedByUser)


module.exports = router;
