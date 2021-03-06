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
  userErp: String,
  status: {type: String, default: 'RQT'}, //RQT, FFMT
  trackingNo: String,
  releaseDate: Date,
  filterReleaseDate: String, //YYYYMMDD
  delivery: {
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
  totalSales: Number,
  modifiability: Boolean
});



const InvoiceClass = mongoose.model('invoice', invoiceSchema)
module.exports = InvoiceClass;
