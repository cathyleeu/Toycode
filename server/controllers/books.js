const Books = require('../models/books');


exports.newbook = function (req, res, next) {

  const title = req.body.title;
  const code = req.body.code;
  const quantity = req.body.quantity;
  const price = req.body.price;


    const book = new Books({
      title : title,
      code : code,
      quantity : quantity,
      price : price
    })
    book.save(function(err){
      if(err){
        return next(err)
      }
      res.json({result:1})
    })
}

exports.getbooks = function (req, res) {
  Books.find(function (err, books) {
    if(err){
      return res.status(500).send({error: 'database failure'});
    }
    return res.json(books)
  })
}
