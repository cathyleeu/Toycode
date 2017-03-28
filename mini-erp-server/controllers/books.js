const Books = require('../models/books');
const Code = require('../models/code');

const isRegisteredNewGoods = async (ctx, next) => {
  try{
    const {title, code, quantity, price, bPrice, dPrice } = ctx.request.body;


    let codeRes = await Code.findOne({dbcollection: 'Books'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(4),
        resultId = "G" + (zero+count).slice(-zero.length);

    const book = new Books({
      title,
      code : resultId,
      quantity, bPrice, dPrice, price
    });
    codeRes = codeRes || new Code({
      dbcollection: 'Books',
      count: count
    });
    codeRes.count++;
    const err = await codeRes.save();
    if(err) {
      await next(err);
    }
    ctx.body = await book.save();
    // ctx.body = await new Books().save()
  } catch(err){
    ctx.body = await next(err);
    // console.log(err);
  }
};
const isFetchedAll = async ctx => {
  try {
    ctx.body = await Books.find().sort({"id": -1 });
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

module.exports = {
  isRegisteredNewGoods, isFetchedAll
};
