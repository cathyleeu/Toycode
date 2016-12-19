const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const invoiceSchema = new Schema({
  orderId: Number,
  userEmail : String,
  delivery: {
    to: String,
    address: String,
    phone: String
  },
  requestedGoods:{
    name : String,
    code : String,
    qutt : String
  },
  requestedDate : { type: Date, default: Date.now },
  requestDesc: String
});

// module.exports = mongoose.model('invoice', invoiceSchema)


const InvoiceClass = mongoose.model('invoice', invoiceSchema)

module.exports = InvoiceClass;
