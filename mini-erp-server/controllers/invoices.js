const Invoices = require('../models/invoices');
const Code = require('../models/code');
const nodemailer = require('nodemailer');
const XLSX = require('xlsx')
const moment = require('moment-timezone')


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
    const {userName, userEmail, userCode, userErp, delivery, requestedGoods, requestDesc, totalSales} = ctx.request.body;
    const {to, phone, address} = delivery;
    const {roadAddr, detailAddr, zipNo} = address;

    let codeRes = await Code.findOne({dbcollection: 'Invoices'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(9),
        invoiceId = "IV" + (zero+count).slice(-zero.length);
    const invoice = new Invoices({
      invoiceId, userName, userEmail, userCode, userErp,
      modifiability: true,
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
      ` <tr>
          <td style="padding: 7px;">${goods.name}</td>
          <td style="padding: 7px;">${goods.qutt}</td>
          <td style="padding: 7px;">${Commas(goods.sales)}</td>
        </tr>
      `
    ))
    let message = {
      // Comma separated list of recipients
      to: `${userName} <${userEmail}>`,
      subject: '키즈씽킹 주문 접수 완료 메일',
      text: '',
      // HTML body
      html: `
      <img src="cid:logo" style="width:113px;height:36px;margin-bottom:1em;"/>
      <p>안녕하세요. 토이코드 입니다. </p>
      <p>주문해주셔서 감사합니다. <b>${userName}</b>님의 주문 내역입니다.</p>
      <p>총 <strong> ${Commas(totalSales)}</strong>을 입금 해주세요.</p>
      <p>입금하실 계좌번호는</p>
      <p><strong>우리은행 (주)토이코드 1005-102-896893</strong>입니다.</p>
      <table style="border: 1px solid #dbdbdb;width: 400px;text-align:center;border-spacing: 0;">
        <thead>
          <th colspan=3 style="height: 45px;background-color: #dbdbdb;padding: 7px;">주문내역</th>
          <tr>
            <td style="border-bottom: 2px solid #dbdbdb; border-collapse: collapse; padding: 7px;">상품명</td>
            <td style="border-bottom: 2px solid #dbdbdb; border-collapse: collapse; padding: 7px;">수량</td>
            <td style="border-bottom: 2px solid #dbdbdb; border-collapse: collapse; padding: 7px;">가격</td>
          </tr>
        </thead>
        <tbody>
          ${goods.join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan=3 style="padding: 30px 10px 10px;border-top: 2px solid #dbdbdb;border-collapse: collapse;text-align: right;">
              총 가격:<strong>${Commas(totalSales)}</strong>원
            </td>
          </tr>
        </tfoot>
      </table>
      `,
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


/*
`<img src="cid:logo" style="width:113px;height:36px;margin-bottom:1em;"/>
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
  <div style="display:flex;flex-direction:row;justify-content:space-between;border-bottom:1px solid #dbdbdb;">
    <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">${goods.name}</p>
    <p style="text-align:center;width:33.3%;border-right:1px solid #dbdbdb;">${goods.qutt}</p>
    <p style="text-align:center;width:33.3%;">${Commas(goods.sales)}</p>
  </div>
*/

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
        filterReleaseDate: ctx.request.body.filterReleaseDate,
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
//     console.log(filterDate)
//     const ffmt = await Invoices.find({createdOn: {"$gte": new Date(2017,2,1), "$lt": new Date(2017,4,1)}})
    // let obj = {};
    // ffmt.forEach(ff => {
    //
    // })
    // moment(this.state.startDate).tz("Asia/Seoul").format('MM월 DD일')
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

/*============ xlsx ====================================*/
function datenum(v, date1904) {
  if(date1904) v+=1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}
function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

/*============================================================*/



const isGetXlsx = async ctx => {
  let rqt = await Invoices.find({status: 'RQT'})

  /* original data */

  let today = moment().tz("Asia/Seoul").format('YYYY년MM월DD일')

  var wb = new Workbook();
  rqt.forEach(state => {
    let list = []
    let totalQutt = 0
    var data = [
      ["거래명세서", null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null ],
      ["일자", "우편번호","전표:1", null, null, null, null, null, null],
      [today, state.delivery.address.zipNo , "공급자", '등록번호'   , "764-86-00016"                 , null, null],
      [state.delivery.address.roadAddr,  null  , "공급자", '상호(법인명)', '주식회사 토이코드'                ,"성명","홍현기"],
      [state.delivery.address.detailAddr, null  , "공급자", '사업장주소'  , "서울특별시 강남구 강남대로 408 13층" , null,null],
      ["아래와 같이 계산합니다.",null,"공급자","업태", "출판, 영상, 방송통신\n및 정보서비스업","종목","교육출판물, 시스템\n소프트웨어개발및 공급"],
      ["합계금액", null, state.totalSales , null, null, null, null, null, null],
      ["품목", null, "수량" , "단가", "공급가액", "세액", "비율", null , null]
    ];

    state.requestedGoods.forEach(g => {
      list = [g.name, null, g.qutt, g.sales/g.qutt , g.sales, null, null];
      totalQutt += g.qutt
      data.push(list);
    })
    let nullRow = [null,null,null,null,null,null,null,null,null,null]
    data.push(nullRow)
    data.push(nullRow)
    data.push(nullRow)
    data.push(["계", "총수량", totalQutt ,"총금액",state.totalSales,null,null,null,null,null])
    data.push(nullRow)
    data.push(nullRow)
    data.push(["배송처"])
    data.push([`${state.delivery.address.roadAddr} ${state.delivery.address.detailAddr}`])
    data.push([state.delivery.to])
    data.push([state.delivery.phone])

    var ws_name = `토이코드-거래명세서-${state.delivery.to}`;
    var ws = sheet_from_array_of_arrays(data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    ws['!merges'] = [
      {s:{c:8,r:0},e:{c:0,r:1}}, //거래명세서
      {s:{c:2,r:6},e:{c:2,r:3}}, //공급자
      {s:{c:4,r:3},e:{c:6,r:3}}, //등록번호
      {s:{c:4,r:5},e:{c:6,r:5}}, // 사업장 주소
      {s:{c:0,r:4},e:{c:1,r:4}}, // 주소
      {s:{c:0,r:5},e:{c:1,r:5}}, // 상세주소
      {s:{c:0,r:6},e:{c:1,r:6}}, //아래와 같이
      {s:{c:0,r:7},e:{c:1,r:7}}, //합계
      {s:{c:2,r:7},e:{c:6,r:7}}, //total sales
      {s:{c:0,r:8},e:{c:1,r:8}},
      {s:{c:0,r:9},e:{c:1,r:9}},
      {s:{c:0,r:10},e:{c:1,r:10}},
      {s:{c:0,r:11},e:{c:1,r:11}},
      {s:{c:0,r:12},e:{c:1,r:12}}
    ];
    ws['!cols'] = [
      {wch:25},{wch:10},{wch:5},{wch:7},{wch:15},{wch:7},{wch:15},{wch:5},{wch:5},
    ];

  })

  /* write file */
  ctx.type = "application/octet-stream";
  ctx.attachment(`토이코드-주문서-${moment().format('YYMMDD')}.xlsx`);
  ctx.body = XLSX.write(wb, {
    type: "buffer"
  });

}

const isModifyingIVes = async ctx => {
  try{
    console.log("modi", ctx.request.body, ctx.params)
    let { userCode, invoiceId } = ctx.params;
    ctx.body = await Invoices.findOneAndUpdate({ userCode, invoiceId }, {$set: { requestedGoods: ctx.request.body }}, { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
const isRemoveIVes = async ctx => {
  try{
    console.log("deleteBBBB");
    let { invoiceId, userCode } = ctx.params;
    ctx.body = await Invoices.findOneAndRemove({ invoiceId, userCode })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

const isGetXlsxDayFFMT = async ctx => {
  console.log(ctx.params.date)
  let ffmtAday = await Invoices.find({filterReleaseDate: ctx.params.date})
  var wb = new Workbook();
  var data = [
    ["판매자료 입력"],
    [null],
    ["Ⅰ. 공급자 인적사항"],
    ["①  회 사 명"   , null , null, "②사업자등록번호" , null, "필수입력 항목" , null, null],
    ["주식회사 토이코드", null , null, "764-86-00016" ,null, null, null],
    [null],
    [" Ⅱ. 거래내역"],
    ["년월일", "번호", "처리유형(상위)", "처리유형(하위)" ,"거래처코드", "거래처명", "사업자등록번호", "부서/사원", "납기일자","비고(상단)", "분개", "자산", "품목코드","품목명" ,"규격", "수량", "단가", "VAT", "공급가액", "세액", "합계금액", "창고","프로젝트","품목비고","금융기관","납품처","거래명세서비고","(세금)계산서 비고"],
  ];
  ffmtAday.forEach(state => {
    let list = []
    state.requestedGoods.forEach((g, i) => {
      list = [ctx.params.date, i+1 , 1, 3 , state.userErp, null, null, null, null,null, 3,4, g.erpCode, g.name, null, g.qutt, g.sales/g.qutt, null, null,null,null,null,null,null,null,null,null];
      data.push(list);
    })
  })
  var ws = sheet_from_array_of_arrays(data);
  ws['!merges'] = [
    {s:{c:4,r:0},e:{c:0,r:0}}, //판매자료 입력
    {s:{c:4,r:2},e:{c:0,r:2}}, //공급자
    {s:{c:2,r:3},e:{c:0,r:3}}, //회사명
    {s:{c:4,r:3},e:{c:3,r:3}}, //사업자
    {s:{c:2,r:4},e:{c:0,r:4}}, //회사명
    {s:{c:4,r:4},e:{c:3,r:4}}, //사업자
    {s:{c:4,r:6},e:{c:0,r:6}}
  ];
  ws['!cols'] = [
    //  a       b       c       d       e       f       g       h
    {wch:10},{wch:5},{wch:5},{wch:5},{wch:10},{wch:7},{wch:7},{wch:5}
    //  i       j       k       l       m       n     o         p
    ,{wch:5},{wch:5},{wch:5},{wch:5},{wch:10},{wch:20},{wch:5},{wch:5}
    // q        r      s        t       u      v        w       x
    ,{wch:10},{wch:5},{wch:5},{wch:5},{wch:5},{wch:5},{wch:5},{wch:5}
    // y         z        aa      ab     ac
    ,{wch:5},{wch:5},{wch:5},{wch:5},{wch:5}
  ];
  var ws_name = `토이코드-출고입력-${ctx.params.date}`;

  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  /* write file */
  ctx.type = "application/octet-stream";
  ctx.attachment(`토이코드-출고입력-${ctx.params.date}.xlsx`);
  ctx.body = XLSX.write(wb, {
    type: "buffer"
  });
}


module.exports = {
  isRegisteredNewIVes,
  isFetchedAllIVes ,
  isFetchedIVesByUser,
  isFetchedOrderStatus,
  isPostTrackNumber,
  isGetXlsx,
  isGetXlsxDayFFMT,
  isModifyingIVes,
  isRemoveIVes
  // isFetchedOrderFFMT
 };
