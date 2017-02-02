const Auth = require('./controllers/auth');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
const passportConfig = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function(app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ messege: 'ABW123'})
  })
  app.post('/signin', requireSignin, Auth.signin)
  app.post('/signup', Auth.signup)
  app.get('/signup/:url', Auth.confirmSignUp)

  app.get('/user/:user',  Auth.userOn)
  app.put('/user/:user/kinder',  Auth.userKinderUpdate)
  app.put('/user/:user/info',  Auth.userInfoUpdate)
  app.get('/user/:user/kinder',  Auth.userKinder)
  app.get('/user',  Auth.allUsers)

  app.post('/books', Books.newbook)
  app.get('/books', Books.getbooks)

  // app.post('/books/:book_id', function(req, res){
  //   res.end()
  // })

  app.get('/invoices', Invoices.getAllInvoices)
  app.get('/invoices/:user', Invoices.getUserInvoices)
  app.post('/invoices', Invoices.newInvoice)
  // app.put('/books/:book_id', function(req, res){
  //   res.end()
  // })
}
