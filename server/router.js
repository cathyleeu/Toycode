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
  app.get('/user/:user',  Auth.onlogin)
  app.post('/books', Books.newbook)
  app.post('/invoices', Invoices.newInvoice)
  // app.post('/books/:book_id', function(req, res){
  //   res.end()
  // })
  app.get('/books', Books.getbooks)
  app.get('/invoices', Invoices.getInvoices)
  // app.put('/books/:book_id', function(req, res){
  //   res.end()
  // })
}
