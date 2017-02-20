const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//TODO: create sub model
// const requestedGoods = new Schema({
//
// })



const invoiceSchema = new Schema({
  invoiceId: String,
  userName: {type: String, required: true},
  userEmail : {type: String, required: true},
  userCode: {type: String, required: true},
  status: {type: String, default: '상품준비중'},
  delivery: {
    trackingNo: String,
    to: {type: String, required: true},
    address: {
      zipNo:  {type: String, required: true},
      roadAddr: {type: String, required: true},
      detailAddr: {type: String, required: true}
    },
    phone: {type: String, required: true}
  },
  requestedGoods:[],
  createdOn : { type: Date, default: Date.now },
  requestDesc: String,
  totalSales: Number
});



const InvoiceClass = mongoose.model('invoice', invoiceSchema)
module.exports = InvoiceClass;
