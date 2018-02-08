const Login = require('../models/login');


const isRegisteredNames = async (ctx, next) => {
  const { parentId, kinderId, classId, className, students } = ctx.request.body;
  try{
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
//
// if(ctx.request.body.renew) {
//   let filterStudent = students.map(name => (
//     {
//       name,
//       parentId,
//       kinderId,
//       classId
//     }
//   ))
//   console.log("BBBB", filterStudent);
//   const login = new Login({
//     parentId,
//     kinderId,
//     classId,
//     className,
//     students : filterStudent
//   });
//   ctx.body = await login.save();
// } else {

const isRemovedNamesByKC = async ctx => {
  try{
    let { _id } = ctx.params;
    console.log("remove class Names");
    ctx.body = await Login.findOneAndRemove({ _id })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

const isFetchedAllNames = async (ctx) => {
  try {
    ctx.body = await Login.find();
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
const editStudentName = async (ctx) => {
  let { editType, classId } = ctx.params;
  if(editType === "add") {
    ctx.body = await Login.findOneAndUpdate(
      { classId },
      { $push: {
        students: ctx.request.body
      }}
    )
  } else {
    let modified = Object.keys(ctx.request.body)
    let modiObj = {}
    // 그에 맞춰서 sub Class 수정
    modified.forEach( mo => {
      modiObj[`students.$.${mo}`] = ctx.request.body[mo]
    })
    ctx.body = await Login.findOneAndUpdate(
      {
        classId,
        "students._id" : ctx.request.body._id
      },
      modiObj
    )
  }
}
const delStudentName = async (ctx) => {
  ctx.body = await Login.findOneAndUpdate(
    //find subSchema
    {
      "students._id" : ctx.params.studentId
    },
    // delete subSchema
    {
      '$pull' : {
        'students' : {
          '_id' : ctx.params.studentId
        }
      }
    }
  );
}

const isUpdateNames = async (ctx) => {

  try{
    const { students } = ctx.request.body;
    ctx.body = await Login.findOneAndUpdate({classId: ctx.params.classId, className: ctx.params.className}, {$set: { students, updateOn: Date.now() }}, { new: true })
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}
const isAllNamesByBranch = async ctx => {
  try{
    const list = await Login.find({parentId:ctx.params.parentId});
    let obj = {};
    list.forEach(item => {
      if(!obj[item.kinderId]) {
        obj[item.kinderId] = {};
      }
      obj[item.kinderId][item.classId] = item.students;
    });
    ctx.body = obj;
  } catch(err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

const isFetchedNamesByClass = async ctx => {
  try {
    ctx.body = await Login.findOne({classId: ctx.params.classId, className: ctx.params.className});
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};

const isFetchedNamesByClassId = async ctx => {
  try {
    let studentsNames = await Login.findOne({ classId: ctx.params.classId }).select('students -_id');
    // if(!studentsNames) {
    //   ctx.status = 204;
    //   ctx.body = { message: ""}
    // }
    ctx.body = studentsNames
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
};


module.exports = {
  isRegisteredNames,
  isFetchedNamesByClass,
  isFetchedNamesByClassId,
  isUpdateNames,
  isFetchedAllNames,
  isAllNamesByBranch,
  editStudentName,
  delStudentName,
  isRemovedNamesByKC
};
