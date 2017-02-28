import React from 'react';

function getCode( bId , kId , date ){
  let sum = 0;
  if(date.length === 6) {
    date += "01";
  }
  sum += bId.charCodeAt(0) * 17;
  sum += bId.charCodeAt(1) * 13;
  if(kId.slice(0, 2) === "러닝") {
    if(kId.slice(2, 4) !== "서초") {
      sum += kId.charCodeAt(2) * 13;
      sum += kId.charCodeAt(3) * 29;
    }
  }
  if(kId.slice(0, 2) === "이화") {
    sum += kId.charCodeAt(2) * 13;
    sum += kId.charCodeAt(3) * 29;
  }
  sum += kId.charCodeAt(0) * 11;
  sum += kId.slice(-1).charCodeAt(0) * 19;
  sum += kId.slice(parseInt(kId / 2, 10)).charCodeAt(0) * 7;
  return sum.toString(16).slice(1);
}

const IssuedClass = ({loginInfo}) => {
  const { kinders, branch } = loginInfo,
        code = getCode(branch.name, kinders[0].name, "201703");

  return(
    <div>
      원별 접속 주소: <a href={`https://toycode.org/code/${code}`} target="_blank">toycode.org/code/{code}</a>
      {kinders && kinders[0].kinderClasses.map((kids, i) => (
        <div key={i} style={{margin: '1em'}}>
          {kinders[0].name} - {kids.className}
          <form action="https://toycode.org/issue" method="POST" target="_blank">
            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="school" value={kinders[0].name} />
            <input type="hidden" name="className" value={kids.className} />
            <input type="hidden" name="yearmonth" value="201703" />
            <input type="hidden" name="level" value={kids.level} />
            <input type="submit" value="로그인 스티커 발급" />
          </form>
        </div>
      ))}
    </div>
)}

export default IssuedClass;

/* <form action="https://toycode.org/issue" method="POST" target="_blank"> */

/* <button>원아수 수정</button>
<button>ID 설정하기</button>
<button>로그인 발급 받기</button> */
