const Schema = require('mongoose').Schema;
const moment = require('moment');



const returnSchema = new Schema({
  returnGoodsId: String,
  userName: {type: String, required: true},
  userEmail : {type: String, required: true},
  userCode: {type: String, required: true},
  status: {type: String, default: '반품접수'},
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

//TODO-4: 한국시간으로 받아오기
// returnSchema.virtual('createdOnInvoice').get(function() {
//   return moment(this.createdOn).format('lll')
// })


module.exports = mongoose.model('return', returnSchema)
