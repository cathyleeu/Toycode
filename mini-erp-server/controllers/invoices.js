const Invoices = require('../models/invoices');
const Code = require('../models/code');

const isRegisteredNewIVes = async (ctx, next) => {
  try {
    const {userName, userEmail, userCode, delivery, requestedGoods, requestDesc, totalSales} = ctx.request.body;
    const {to, phone, address} = delivery;
    const {roadAddr, detailAddr, zipNo} = address;

    // let invoice = await User.findOne({email: email});
    let codeRes = await Code.findOne({dbcollection: 'Invoices'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(9),
        resultId = "IV" + (zero+count).slice(-zero.length);
    const invoice = new Invoices({
      invoiceId : resultId,
      userName : userName,
      userEmail : userEmail,
      userCode: userCode,
      delivery: {
        to : to,
        address: {
          zipNo:zipNo,
          roadAddr: roadAddr,
          detailAddr: detailAddr
        },
        phone : phone
      },
      requestedGoods: requestedGoods,
      requestDesc: requestDesc,
      totalSales: totalSales
    });
    codeRes = codeRes || new Code({
      dbcollection: 'Invoices',
      count: count
    });
    codeRes.count++;
    const err = await codeRes.save();
    if(err) {
      await next(err);
    }
    ctx.body = await invoice.save();
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};


const isFetchedAllIVes = async ctx => {
  try {
    ctx.body = await Invoices.find().sort({createdOn: -1});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};
const isFetchedByUser = async ctx => {
  try {
    ctx.body = await Invoices.find().where({userEmail: ctx.params.user}).sort({createdOn: -1});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

module.exports = { isRegisteredNewIVes, isFetchedAllIVes , isFetchedByUser };
