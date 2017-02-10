const router = require('koa-router')();
const Users = require('./controllers/user');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const ReturnGoods = require('./controllers/return');




// router.get('/', requireAuth, Users.intro);
// router.get('/', Users.intro);


// router.post('/signin', requireSignin, Users.signin)
router.post('/signin', Users.signin)
router.post('/signup', Users.signup);
router.get('/signup/:url', Users.confirmSignUp)


router.get('/user', Users.allUsers)
router.get('/user/:user', Users.loggedUser)
router.get('/user/:user/kinders',  Users.userKinders)
router.put('/user/:user/info',  Users.userInfoUpdate)
router.put('/user/:user/kinder',  Users.userKinderUpdate)


router.post('/books', Books.isRegisteredNewGoods)
router.get('/books', Books.isFetchedAll)

router.get('/invoices', Invoices.isFetchedAllIVes)
router.get('/invoices/:user', Invoices.isFetchedIVesByUser)
router.post('/invoices', Invoices.isRegisteredNewIVes)


router.get('/return', ReturnGoods.isFetchedAllRTns)
router.get('/return/:user', ReturnGoods.isFetchedRTnsByUser)
router.post('/return', ReturnGoods.isRegisteredNewRTns)


module.exports = router;
