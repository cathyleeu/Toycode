const router = require('koa-router')();
const Users = require('./controllers/user');
const Login = require('./controllers/login');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const ReturnGoods = require('./controllers/return');
const Reports = require('./controllers/reports');



// router.get('/', requireAuth, Users.intro);
// router.get('/', Users.intro);
// 패턴이 달라야함!!

// router.post('/signin', requireSignin, Users.signin)
router.post('/signin', Users.signin)
router.post('/signup', Users.signup);
router.post('/renewalSignup', Users.renewalSignup);
router.get('/renewalSignup/:email', Users.renewalExistingUser);
router.get('/signup/:url', Users.confirmSignUp)
router.post('/verification/:code', Users.verifiedCode)


router.get('/user', Users.allUsers)
router.get('/email', Users.allUsersEmails)
router.get('/user/:user', Users.loggedUser)
router.get('/user/getdata/:customerType', Users.findUserByType)

router.get('/branch/:branch', Users.allBranchKinders)
router.get('/branch/:branch/:kinderInfo', Users.isFetchedKinderInfo)

router.get('/user/:user/kinders',  Users.userKinders)
router.put('/user/:user/info',  Users.userInfoUpdate)
router.put('/user/:user/info/:info',  Users.userInfoUpdatebyRenew)
router.put('/user/:user/kinder',  Users.userKinderUpdate)
router.put('/user/:user/kinder/:academyId',  Users.editAcademy)
router.get('/user/:user/kinder/:academyId',  Users.getAcademyByUser)
router.del('/user/:user/kinder/:academyId',  Users.deleteAcademy)
router.put('/user/:user/academyClass/:academyId',  Users.createAcademyClass)
router.put('/user/:user/academyClass/:academyId/:classId',  Users.updateAcademyClass)
router.get('/user/:size/:page/:customerType', Users.getPagination)
router.post('/user/search/:searchText', Users.getAutoComplete)

router.put('/user/:parentId/:kinderName/:customerType', Users.updateKinderClasses )
// router.get('/user/:user/kinder/:academyId/',  Users.getAcademyByUser)
// router.del('/user/:user/kinder/:academyId/',  Users.deleteAcademy)

// router.post('/user/reports/:classId', Users.getClassReports)


router.put('/user/:code', Users.userUpdateByAdmin )


router.post('/books', Books.isRegisteredNewGoods)
router.get('/books', Books.isFetchedAll)
router.put('/books/:code', Books.isModifyingGoods)

router.get('/invoices', Invoices.isFetchedAllIVes)
router.get('/invoices/status/:status', Invoices.isFetchedOrderStatus)
router.put('/invoices/track/no/:invoiceId', Invoices.isPostTrackNumber)
router.get('/invoices/:user', Invoices.isFetchedIVesByUser)
router.put('/invoices/:userCode/:invoiceId', Invoices.isModifyingIVes)
router.del('/invoices/:userCode/:invoiceId', Invoices.isRemoveIVes)
router.post('/invoices', Invoices.isRegisteredNewIVes)
router.get('/xlsx', Invoices.isGetXlsx)
router.get('/xlsx/:date/ffmt', Invoices.isGetXlsxDayFFMT)
// router.get('/xlsx/day', Invoices.isGetXlsx)


router.get('/return', ReturnGoods.isFetchedAllRTns)
router.get('/return/:user', ReturnGoods.isFetchedRTnsByUser)
router.post('/return', ReturnGoods.isRegisteredNewRTns)


router.get('/login', Login.isFetchedAllNames)
router.post('/login', Login.isRegisteredNames)
router.get('/login/:parentId', Login.isAllNamesByBranch)
router.get('/login/:classId/:className', Login.isFetchedNamesByClass)
router.get('/login/:parentId/:academyId/:classId', Login.isFetchedNamesByClassId)
router.put('/login/update/:classId/:className', Login.isUpdateNames)
router.put('/login/:editType/:classId', Login.editStudentName)
// router.del('/login/:studentId', Login.delStudentName)
router.del('/login/:_id', Login.isRemovedNamesByKC)
router.del('/login/:classId/:className', Login.isDeleteNamesByClass)
// router.put('/login/edit/:classId', Login.editStudentName)

router.post('/reports', Reports.isPostedReports)
router.get('/reports/:classId/:chapter', Reports.isGetAcademyReports)
router.get('/reports/:classId/:userId/:chapter', Reports.isGetAllAveByUserId)


module.exports = router;