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

const isGetAcademyReports = async (ctx) => {
  try {
    let { classId, chapter } = ctx.params;
    //FIXME: chapter 권별로 필터링 할 수 있도, 분기별 필터링
    // chapter : "cho_a1" 을 RegExp 로 변경하고 find 하면 해당 권수에 속하는 단원들을 다 불러움
    chapter = new RegExp(chapter, "g")
    ctx.body = await Reports.find({classId, chapter });
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
    console.log(err);
  }
}

function getEachAverage(name, arr) {
  let arrL = arr.length;
  if(arrL === 0) {
    return 0;
  }
  let result = arr.reduce((acc,cv) => {
	   return acc + (!cv[name] ? 0 : cv[name])
  }, 0)

  return +(result/arrL).toFixed(2)
}

function getResultbyStudent(reports, chapters) {
  // reports : 각 학생들의 reports array
  let obj = {}
  let totalD = 0;
  let totalF = 0;
  let totalB = 0;
  let totalS = 0;
  let totalL = 0;

  chapters.forEach(ch => {

    let target = reports.filter(re => re.chapter === ch);
    let duration = getEachAverage("duration", target)
    let failed = getEachAverage("failed", target)
    let block = getEachAverage("block", target)
    let score = target.length;

    obj[ch] = {};
    obj[ch] = {
      duration,
      failed,
      block,
      score
    }
    // totalD += duration
    totalD += duration;
    totalF += failed;
    totalB += block;
    totalS += score;
    // 문제 풀이한 단원만 뽑아서 평균 뽑아줌
    totalL += (target.length > 0 ? 1 : 0)
  })

  obj["total"] = {
    "duration" : +(totalD/totalL).toFixed(2),
    "failed"   : +(totalF/totalL).toFixed(2),
    "block"    : +(totalB/totalL).toFixed(2),
    "score"    : totalS
  }
  return obj
}

function getKeysbyArray(arr, name) {
  let result = [];
  arr.forEach( each => {
   if(!result.includes(each[name])){
    result.push(each[name])
   }
  })
  return result;
}

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

function getChapterAvebyKeys(array, key, name) {

  let getTotal = array.reduce((prev, curr) => {

    let count = prev.get(curr[key]) || 0;
    prev.set(curr[key], curr[name] + count);
    // prev = 생성된 맵 return
    return prev;
  }, new Map());
  let obj = {}

  let makeObj = [...getTotal].map(([key, value]) => {
    obj[key] = {}
    obj[key] = value
  })

  return obj
}

function getElite(stand, array, keys) {
  return Math[stand](...array.map(ac => ac[keys]))
}

const isGetAllAveByUserId = async (ctx) => {
  try {
    let { classId, userId, chapter } = ctx.params;
    chapter = new RegExp(chapter, 'g');

    // target 학생의 reports
    let academy = await Reports.find({classId, chapter})
        // block 을 한번도 사용하지 않은 것은 필터링
        academy = academy.filter(ac => ac.success)


    let chapterAves = [];

    // 반에서 각 학생들의 이름과 챕터를 뽑음
    let students = getKeysbyArray(academy, "userId")
    let chapters = getKeysbyArray(academy, "chapter")

    // 학생들의 total 값 가져옴
    let total = {}
    students.forEach( solo => {

    	let targetR = academy.filter(re => re.userId === solo);
      total[solo] = {};
      total[solo] = getResultbyStudent(targetR, chapters)

    })

    let totalArr = students.map( s => total[s]["total"]);
    let targetStudent = total[userId]



    // let totalChapter = {}
    let chapterBlock = getChapterAvebyKeys(academy, "chapter", "block");
    let chapterFailed = getChapterAvebyKeys(academy, "chapter", "failed");

    chapters.forEach( each => {
      let leng = academy.filter(ac => ac.chapter === each).length
      // TODO 반 최고 블럭, 반 최0 평균 시도
      chapterAves.push({
          name: each,
          학생블럭수: targetStudent[each].block,
          반평균블럭: +(chapterBlock[each]/leng).toFixed(2),
          학생시도횟수: targetStudent[each].failed,
          반평균시도횟수: +(chapterFailed[each]/leng).toFixed(2)
        })
    })


    /*
      TODO:
      1. DONE - total 전부 빼기
      2. DONE - 반 평균 구하는 방법 수정하기 = 각 학생에 따라 푼 만큼의 평균을 보여줘야함
      3. 월별, 분기별에 구하기
      4: 반 최고를 뽑아내기
    */
    
    ctx.body = {
      block : {
        reportTitle: "사용 블럭 수",
        studentValue: targetStudent["total"].block,
        classAverage: getEachAverage("block", totalArr),
        totalAverage: getElite("min", academy, "block")
      },
      failed : {
        reportTitle: "시도 횟수",
        studentValue: targetStudent["total"].failed,
        classAverage: getEachAverage("failed", totalArr),
        totalAverage: getElite("min", academy, "failed")
      },
      score : {
        reportTitle: "점수",
        studentValue: targetStudent["total"].score,
        classAverage: getEachAverage("score", totalArr),
        totalAverage: getElite("max", totalArr, "score")
      },
      duration : {
        reportTitle: "풀이 시간",
        studentValue: filterDuration(targetStudent["total"].duration),
        classAverage: filterDuration(getEachAverage("duration", totalArr)),
        totalAverage: filterDuration(getElite("min", academy, "duration"))
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
  isGetAcademyReports,
  isGetAllAveByUserId
};
