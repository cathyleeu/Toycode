const Auth = require('./controllers/auth');
const Books = require('./controllers/books');
const Invoices = require('./controllers/invoices');
// const Code = require('./controllers/codes');
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
  app.get('/user/:user',  Auth.userOn)
  app.put('/user/:user',  Auth.userKinderUpdate)
  // app.delete('/user/:user',  Auth.userKinderDelete)
  app.get('/user/:user/kinder',  Auth.userKinder)

  app.post('/books', Books.newbook)
  app.get('/books', Books.getbooks)
  // app.post('/codes', Code.initialCode)
  // app.post('/code', )

  // app.post('/books/:book_id', function(req, res){
  //   res.end()
  // })

  app.get('/invoices', Invoices.getInvoices)
  app.get('/invoices/:user', Invoices.getUserInvoices)
  app.post('/invoices', Invoices.newInvoice)
  // app.put('/books/:book_id', function(req, res){
  //   res.end()
  // })
}
