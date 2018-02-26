const Reports = require('../models/reports');



const isPostedReports = async (ctx) => {
  // console.log(ctx.request.body);
  const report = new Reports({
    ...ctx.request.body
  });
  ctx.body = await report.save();
}

const getAverage = async (target, name) => {
  let result = await Reports.aggregate([
    { "$match": target },
    { "$group": {
        "_id": `${name}`,
        "score": { "$avg": "$score" },
        "failed": { "$avg": "$failed" },
        "duration": { "$avg": "$duration" },
        "block": { "$avg": "$block" }
    }}
  ])
  result = result[0];
  result.score = +result.score.toFixed(2);
  result.failed = +result.failed.toFixed(2);
  result.block = +result.block.toFixed(2);

  return result
}


const isGetAllAveByUserId = async (ctx) => {
  try {
    let { classId, userId, chapter } = ctx.params;
    chapter = new RegExp(chapter, 'g');

    let ch = await Reports.find({classId, userId, chapter}).select('-_id chapter') //.sort('date')

    let each = [], chapterAves = [];

    ch.forEach( c => {
      if(each.indexOf(c.chapter) === -1) {
        each.push(c.chapter)
      }
    })

    for( let i = 0; i < each.length; i++) {
      let chByStudent = await getAverage({ classId, userId, chapter: each[i] }, `${classId}.${userId}.${each[i]}`)
      let chByClass = await getAverage({ classId, chapter: each[i] }, `${classId}.${each[i]}`)
      let chByTotal = await getAverage({ chapter: each[i] }, `total.${each[i]}`)

      chapterAves.push({
        name: each[i],
        학생블럭수: chByStudent.block,
        반평균블럭: chByClass.block,
        전체평균블럭: chByTotal.block,
        학생시도횟수: chByStudent.failed,
        반평균시도횟수: chByClass.failed,
        전체평균시도횟수: chByTotal.failed,
      })
    }
    // all average
    let studentAve = await getAverage({ classId, userId, chapter }, `${classId}.${userId}`)
    let classAve = await getAverage({ classId, chapter }, `${classId}`)
    let totalAve = await getAverage({ chapter }, `total`)

    function filterDuration(time) {
      let sec = Math.floor(time/1000), min = null; // , hr = null;
      let result = `${sec}초`
      if (sec > 60) {
        sec = sec%60;
        min = Math.ceil(sec/60);
        result = `${min}분 ${sec}초`
      }
      return result
    }
    ctx.body = {
      block : {
        reportTitle: "사용 블럭 수",
        studentValue: studentAve.block,
        classAverage: classAve.block,
        totalAverage: totalAve.block
      },
      failed : {
        reportTitle: "시도 횟수",
        studentValue: studentAve.failed,
        classAverage: classAve.failed,
        totalAverage: totalAve.failed
      },
      score : {
        reportTitle: "점수",
        studentValue: studentAve.score,
        classAverage: classAve.score,
        totalAverage: totalAve.score
      },
      duration : {
        reportTitle: "풀이 시간",
        studentValue: filterDuration(studentAve.duration),
        classAverage: filterDuration(classAve.duration),
        totalAverage: filterDuration(totalAve.duration)
      },
      chapterAves
    };
  } catch (err) {
      // ctx.status = 404;
      ctx.body = false //{ err: "데이터가 없습니다." };
      console.log(err);
  }
}




module.exports = {
  isPostedReports,
  isGetAllAveByUserId
};
