const router = require('koa-router')();
const Users = require('./controllers/user');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const passport = require('koa-passport');
const passportConfig = require('./services/passport'); //어떻게 사용하는 것인지 잘 몰겠음...


const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

// router.get('/', requireAuth, Users.intro);
router.get('/', Users.intro);
router.post('/hello', Users.hello);

// router.post('/signin', requireSignin, Users.signin)
router.post('/signin', Users.signin)
router.post('/signup', Users.signup);
// router.get('/signup/:url', Users.confirmSignUp)


router.get('/user', Users.allUsers)
router.get('/user/:user', Users.loggedUser)
router.get('/user/:user/kinders',  Users.userKinders)
router.put('/user/:user/info',  Users.userInfoUpdate)
router.put('/user/:user/kinder',  Users.userKinderUpdate)


router.post('/books', Books.isRegisteredNewGoods)
router.get('/books', Books.isFetchedAll)

router.get('/invoices', Invoices.isFetchedAllIVes)
router.get('/invoices/:user', Invoices.isFetchedByUser)
router.post('/invoices', Invoices.isRegisteredNewIVes)



module.exports = router;
