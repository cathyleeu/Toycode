const Return = require('../models/return');
const Code = require('../models/code');

const isRegisteredNewRTns = async (ctx, next) => {
  try {
    const { userName, userEmail, userCode, delivery, returningGoods, requestDesc, totalRefund, refundType } = ctx.request.body;
    const { to, phone, address } = delivery;
    const { roadAddr, detailAddr, zipNo } = address;

    // let returnGoods = await User.findOne({email: email});
    let codeRes = await Code.findOne({dbcollection: 'Return'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(5),
        returnGoodsId = "RT" + (zero+count).slice(-zero.length);
    const returnGoods = new Return({
      returnGoodsId, userName, userEmail, userCode, requestRefund,
      delivery: { to, address: { zipNo, roadAddr, detailAddr }, phone },
      returningGoods, requestDesc, totalRefund
    });
    codeRes = codeRes || new Code({
      dbcollection: 'Return',
      count: count
    });
    codeRes.count++;
    const err = await codeRes.save();
    if(err) {
      await next(err);
    }
    ctx.body = await returnGoods.save();
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};


const isFetchedAllRTns = async ctx => {
  try {
    ctx.body = await Return.find().sort({createdOn: -1});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};
const isFetchedRTnsByUser = async ctx => {
  try {
    ctx.body = await Return.find().where({userEmail: ctx.params.user}).sort({createdOn: -1});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

module.exports = { isRegisteredNewRTns, isFetchedAllRTns , isFetchedRTnsByUser };
