const Books = require('../models/books');
const Code = require('../models/code');

const isRegisteredNewGoods = async (ctx, next) => {
  try{
    let codeRes = await Code.findOne({dbcollection: 'Books'});
    let count = codeRes ? codeRes.count : 1,
        zero = "0".repeat(4),
        resultId = "G" + (zero+count).slice(-zero.length);

    const book = new Books({
      code : resultId,
      ...ctx.request.body
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
  } catch(err){
    ctx.body = await next(err);
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
