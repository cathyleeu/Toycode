const Reports = require('../models/reports');



const isPostedReports = async (ctx) => {
  // console.log(ctx.request.body);
  const report = new Reports({
    ...ctx.request.body
  });
  ctx.body = await report.save();
}

const getAverage = async (target, name) => {
  return await Reports.aggregate([
    { "$match": target },
    { "$group": {
        "_id": `${name}`,
        "score": { "$avg": "$score" },
        "failed": { "$avg": "$failed" },
        "duration": { "$avg": "$duration" },
        "block": { "$avg": "$block" }
    }}
  ])
}


const isGetAllAveByUserId = async (ctx) => {

  let { classId, userId, chapter } = ctx.params;
  let volume = new RegExp(chapter.split("_")[0], 'g');

  // get average by each chapter
  let ch = await Reports.find({classId, userId, chapter: volume}).select('-_id chapter')
  let each = [], chapterAves = [];
  ch.forEach( c => {
    if(each.indexOf(c.chapter) === -1) {
      each.push(c.chapter)
    }
  })

  each.forEach( async ch => {
    let chByStudent = await getAverage({ classId, userId, chapter: ch }, `${classId}.${userId}.${ch}`)
    let chByClass = await getAverage({ classId, chapter: ch }, `${classId}.${ch}`)
    let chByTotal = await getAverage({ chapter: ch }, `total.${ch}`)

    chByStudent = chByStudent[0]
    chByClass = chByClass[0]
    chByTotal = chByTotal[0]

    chapterAves.push({
      name: ch,
      학생블럭수: chByStudent.block,
      반평균블럭: chByClass.block,
      전체평균블럭: chByTotal.block,
      학생시도횟수: chByStudent.failed,
      반평균시도횟수: chByClass.failed,
      전체평균시도횟수: chByTotal.failed,
    })
  })

  // all average


  let studentAve = await getAverage({ classId, userId, chapter: volume }, `${classId}.${userId}`)
  let classAve = await getAverage({ classId, chapter: volume }, `${classId}`)
  let totalAve = await getAverage({ chapter: volume }, `total`)

  studentAve = studentAve[0]
  classAve = classAve[0]
  totalAve = totalAve[0]

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
}




module.exports = {
  isPostedReports,
  isGetAllAveByUserId
};
