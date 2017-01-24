const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;


//TODO: create sub model
// const requestedGoods = new Schema({
//
// })



const invoiceSchema = new Schema({
  invoiceId: String,
  userEmail : {type: String, required: true},
  userCode: {type: String, required: true},
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

//TODO-4: 한국시간으로 받아오기
// invoiceSchema.virtual('createdOnInvoice').get(function() {
//   return moment(this.createdOn).format('lll')
// })


const InvoiceClass = mongoose.model('invoice', invoiceSchema)
module.exports = InvoiceClass;
