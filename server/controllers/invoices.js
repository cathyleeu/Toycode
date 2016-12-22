const Invoices = require('../models/invoices');

exports.newInvoice = function (req, res, next) {
  const orderId = req.body.orderId;
  const userEmail = req.body.userEmail;
  const to = req.body.delivery.to
  const address = req.body.delivery.address
  const phone = req.body.delivery.phone
  const name = req.body.requestedGoods.name
  const code = req.body.requestedGoods.code
  const qutt = req.body.requestedGoods.qutt
  const requestDesc = req.body.requestDesc


    const invoice = new Invoices({
      orderId : orderId,
      userEmail : userEmail,
      delivery: {
        to : to,
        address: address,
        phone : phone
      },
      requestedGoods:[{
        name : name,
        qutt : qutt
      }],
      requestDesc: requestDesc
    })
    invoice.save(function(err){
      if(err){
        return next(err)
      }
      res.json(invoice)
    })
}

exports.getInvoices = function (req, res) {
  Invoices.find(function (err, invoices) {
    if(err){
      return res.status(500).send({error: 'database failure'});
    }
    return res.json(invoices)
  })
}
