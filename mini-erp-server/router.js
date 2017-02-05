const router = require('koa-router')();
const Users = require('./controllers/user');
const Books = require('./controllers/books');
const passport = require('koa-passport');

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

router.get('/', requireAuth, Users.intro);
router.post('/hello', Users.hello);

router.post('/signin', requireSignin, Users.signin)
router.post('/signup', Users.signup);
// router.get('/signup/:url', Users.confirmSignUp)


router.get('/user', Users.allUsers)
router.get('/user/:user', Users.loggedUser)
router.get('/user/:user/kinders',  Users.userKinders)
router.put('/user/:user/info',  Users.userInfoUpdate)
router.put('/user/:user/kinder',  Users.userKinderUpdate)


router.post('/books', Books.isRegisteredNewGoods)
router.get('/books', Books.isFetchedAll)

module.exports = router;
