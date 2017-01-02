const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: create sub model
// const requestedGoods = new Schema({
//
// })

// disable _id
//const noId = new Schema({name: String}, {_id: false});

const invoiceSchema = new Schema({
  invoiceId: Number,
  userEmail : {type: String, required: true},
  delivery: {
    to: {type: String, required: true},
    address: {type: String, required: true},
    phone: String
  },
  requestedGoods:[{}],
  createdOn : { type: Date, default: Date.now },
  requestDesc: String,
  totalSales: Number
});

// totalSales: requestedGoods.map(total => total.sale)
// module.exports = mongoose.model('invoice', invoiceSchema)


const InvoiceClass = mongoose.model('invoice', invoiceSchema)

module.exports = InvoiceClass;
