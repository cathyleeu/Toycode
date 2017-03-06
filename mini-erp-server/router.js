const router = require('koa-router')();
const Users = require('./controllers/user');
const Login = require('./controllers/login');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const ReturnGoods = require('./controllers/return');




// router.get('/', requireAuth, Users.intro);
// router.get('/', Users.intro);
// 패턴이 달라야함!!

// router.post('/signin', requireSignin, Users.signin)
router.post('/signin', Users.signin)
router.post('/signup', Users.signup);
router.get('/signup/:url', Users.confirmSignUp)


router.get('/user', Users.allUsers)
router.get('/user/:user', Users.loggedUser)

router.get('/branch/:branch', Users.allBranchKinders)
router.get('/branch/:branch/:kinderInfo', Users.isFetchedKinderInfo)

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


router.post('/login', Login.isRegisteredNames)
router.get('/login/:classId', Login.isFetchedNamesByClass)
router.put('/login/update/:classId', Login.isUpdateNames)



module.exports = router;
