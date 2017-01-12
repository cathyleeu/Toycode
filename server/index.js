const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use(morgan('combined'));
app.use(cors());
app.use(errorHandler);
app.use(bodyParser.json({type: '*/*'})); //bodyparser을 사용해서 req.body를 사용할 수 있음.
router(app);


// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500);
  res.render('error_template', {error: err});
}


//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)
