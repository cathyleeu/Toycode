const Invoices = require('../models/invoices');

exports.newInvoice = function (req, res, next) {
  const invoiceId = req.body.invoiceId;
  const userEmail = req.body.userEmail;
  const to = req.body.delivery.to
  const address = req.body.delivery.address
  const phone = req.body.delivery.phone
  const requestedGoods = req.body.requestedGoods
  const requestDesc = req.body.requestDesc
  const totalSales = req.body.totalSales


    const invoice = new Invoices({
      invoiceId : invoiceId,
      userEmail : userEmail,
      delivery: {
        to : to,
        address: address,
        phone : phone
      },
      requestedGoods: requestedGoods,
      requestDesc: requestDesc,
      totalSales: totalSales
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

exports.getUserInvoices = (req, res) => {
  const user = req.params.user
  Invoices.find((err, users) => res.json(users)).where({userEmail: user}).sort({createdOn: -1})
}
