const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const returnSchema = new Schema({
  returnGoodsId: String,
  userName: {type: String, required: true},
  userEmail : {type: String, required: true},
  userCode: {type: String, required: true},
  status: {type: String, default: '반품/교환접수'},
  refundType: String,
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
  returningGoods:[],
  createdOn : { type: Date, default: Date.now },
  requestDesc: String,
  totalRefund: Number
});



module.exports = mongoose.model('return', returnSchema)
