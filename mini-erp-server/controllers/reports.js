const Reports = require('../models/reports');



const isPostedReports = async (ctx) => {
  // console.log(ctx.request.body);
  const report = new Reports({
    ...ctx.request.body
  });
  ctx.body = await report.save();
}

const isGetChapterReportsByUser = async (ctx) => {
  // console.log(ctx.request.body);
  let { classId, userId, chapter } = ctx.params;
  let commonGroup = {
    "score": { "$avg": "$score" },
    "failed": { "$avg": "$failed" },
    "duration": { "$avg": "$duration" },
    "block": { "$avg": "$block" }
  }
  const studentAve = await Reports.aggregate([
    { "$match": { classId, userId, chapter }},
    { "$group": {
        "_id": `${classId}.${userId}`,
        ...commonGroup
    }}
  ]);
  const classAve = await Reports.aggregate([
    { "$match": { classId, chapter }},
    { "$group": {
        "_id": `${classId}`,
        ...commonGroup
    }}
  ]);
  const totalAve = await Reports.aggregate([
    { "$match": { chapter }},
    { "$group": {
        "_id": `all`,
        ...commonGroup
    }}
  ]);


  ctx.body = {studentAve, classAve, totalAve};
}


module.exports = {
  isPostedReports,
  isGetChapterReportsByUser
};
