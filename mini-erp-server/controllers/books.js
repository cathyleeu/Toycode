const Books = require('../models/books');

const isRegisteredNewGoods = async (ctx, next) => {
  try{
    const {title, code, quantity, price} = ctx.request.body;
    const book = new Books({
      title : title,
      code : code,
      quantity : quantity,
      price : price
    })
    ctx.body = await book.save();
  } catch(err){
    ctx.body = await next(err);
  }
};

const isFetchedAll = async ctx => {
  try {
    ctx.body = await Books.find().sort({"id": 1 });
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

module.exports = {
  isRegisteredNewGoods, isFetchedAll
};
