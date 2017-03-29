const Invoices = require('../models/invoices');
const Code = require('../models/code');
const nodemailer = require('nodemailer');



let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'toycodeinc@gmail.com',
          pass: 'c0d1ng!@'
      },
      logger: true, // log to console
      debug: true // include SMTP traffic in the logs
  }, {
      from: '키즈씽킹 주문<toycodeinc_do_not_reply@gmail.com>'
  });

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const isRegisteredNewIVes = async (ctx, next) => {
  try {
    const {userName, userEmail, userCode, delivery, requestedGoods, requestDesc, totalSales} = ctx.request.body;
    const {to, phone, address} = delivery;
    const {roadAddr, detailAddr, zipNo} = address;

    // let invoice = await User.findOne({email: email});
    let codeRes = await Code.findOne({dbcollection: 'Invoices'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(9),
        invoiceId = "IV" + (zero+count).slice(-zero.length);
    const invoice = new Invoices({
      invoiceId, userName, userEmail, userCode,
      delivery: { to, address: { zipNo, roadAddr, detailAddr }, phone },
      requestedGoods, requestDesc, totalSales
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
    let goods = requestedGoods.map((goods, i) => (
      `<div style="display:flex;flex-direction:row;justify-content:space-between;border-bottom:1px solid #dbdbdb;">
        <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">${goods.name}</p>
        <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">${goods.qutt}</p>
        <p style="text-align:center;width:33.3%;">${Commas(goods.sales)}</p>
      </div>`
    ))
    let message = {
      // Comma separated list of recipients
      to: `${userName} <${userEmail}>`,
      subject: '키즈씽킹 주문 접수 완료 메일',
      text: '',
      // HTML body
      html: `<img src="cid:logo" style="width:113px;height:36px;margin-bottom:1em;"/>
              <p>안녕하세요. 토이코드 입니다. </p>
              <p>주문해주셔서 감사합니다. <b>${userName}</b>님의 주문 내역입니다.</p>
              <div style="margin-top:1em;width:400px;height:70%;display:flex;flex-direction:column;border:1px solid #dbdbdb;">
                <div style="text-align:center;height:30px;background-color:#dbdbdb;padding-top:12px;">
                  <strong>주문내역</strong>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;border-bottom:1px solid #dbdbdb;">
                  <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">상품명</p>
                  <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">수량</p>
                  <p style="text-align:center;width:33.3%;">가격</p>
                </div>
                ${goods.join("")}
                <div style="display:flex;flex-direction:row;justify-content:flex-end;height:30px;padding:10px 10px 0 0;">
                  총 가격:<strong>${Commas(totalSales)}</strong>원
                </div>
              </div>`
            ,
      attachments: [{
        filename: 'logo.png',
        path: 'static/img/logo.png',
        cid: 'logo' //same cid value as in the html img src
      }]
    };
    transporter.sendMail(message, function (error, info) {
      if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return;
      }
      console.log('Message sent successfully!');
      // console.log('Server responded with "%s"', info.response);
    });
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


const isPostTrackNumber = async ctx => {
  console.log(ctx.request.body)
  console.log(ctx.params.invoiceId)
  try {
    ctx.body = await Invoices.findOneAndUpdate(
      {invoiceId: ctx.params.invoiceId},
      {$set: {
        trackingNo: ctx.request.body.trackingNo,
        status: 'FFMT',
        releaseDate: Date.now()}}, { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

const isFetchedOrderStatus = async ctx => {
  try {
    ctx.body = await Invoices.find({status:ctx.params.status.toUpperCase()})
  } catch (e) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
// 2017-03-28
// const isFetchedOrderFFMT = async ctx => {
//   try {
//     let filterDate = ctx.params.date.split("-")
//     const ffmt = await Invoices.find({createdOn: {"$gte": new Date(2017,1,26), "$lt": new Date(2017,3,28)}})
//     // let obj = {};
//     // ffmt.forEach(ff => {
//     //
//     // })
//     // moment(this.state.startDate).tz("Asia/Seoul").format('MM월 DD일')
//     ctx.body = ffmt
//   } catch (err) {
//     ctx.status = 500;
//     ctx.body = err;
//     console.log(err);
//   }
// }


const isFetchedIVesByUser = async ctx => {
  try {
    ctx.body = await Invoices.find().where({userEmail: ctx.params.user}).sort({createdOn: -1});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

module.exports = {
  isRegisteredNewIVes,
  isFetchedAllIVes ,
  isFetchedIVesByUser,
  isFetchedOrderStatus,
  isPostTrackNumber
  // isFetchedOrderFFMT
 };
