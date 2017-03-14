const Login = require('../models/login');


const isRegisteredNames = async (ctx, next) => {
  try{
    const { parentId, kinderId, classId, className, students } = ctx.request.body;
    let studentsList = [];
    students.map(name => {
      studentsList.push(name)
    })
    const login = new Login({
      parentId, kinderId, classId, className,
      students : studentsList
    });
    ctx.body = await login.save();
  } catch(err) {
    ctx.body = await next(err);
  }
}

const isUpdateNames = async (ctx) => {
  try{
    // const { students } = ctx.request.body;
    console.log(ctx.request.body);
    ctx.body = await Login.findOneAndUpdate({classId: ctx.params.classId}, {$set: { students: ctx.request.body, updateOn: Date.now }}, { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}


const isFetchedNamesByClass = async ctx => {
  try {
    ctx.body = await Login.find({classId: ctx.params.classId, className: ctx.params.className});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

module.exports = { isRegisteredNames, isFetchedNamesByClass, isUpdateNames};
