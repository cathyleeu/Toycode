const Invoices = require('../models/invoices');
const Code = require('../models/code');

exports.newInvoice = function (req, res, next) {
  const userEmail = req.body.userEmail;
  const userCode = req.body.userCode;
  const to = req.body.delivery.to
  const address = req.body.delivery.address
  const phone = req.body.delivery.phone
  const requestedGoods = req.body.requestedGoods
  const requestDesc = req.body.requestDesc
  const totalSales = req.body.totalSales

  Code.findOne({dbcollection: 'Invoices'}, function(err, codeRes) {
    let count = codeRes ? codeRes.count : 1,
        zero = new Array(9).join(0),
        resultId = "IV" + (zero + count).slice(-zero.length);

    const invoice = new Invoices({
      invoiceId : resultId,
      userEmail : userEmail,
      userCode: userCode,
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
      codeRes = codeRes || new Code({
        dbcollection: 'Invoices',
        count: count
      });
      codeRes.count++
      codeRes.save(function(err) {
        if(err){
          return next(err)
        }
        res.json(invoice)
      });
    })
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
