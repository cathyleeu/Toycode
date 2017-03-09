function getCode( bId , kId ) {
  let sum = 0;
  sum += bId.charCodeAt(0) * 17;
  sum += bId.charCodeAt(1) * 13;
  if(kId.slice(0, 2) === "러닝") {
    if(kId.slice(2, 4) !== "서초") {
      sum += kId.charCodeAt(2) * 13;
      sum += kId.charCodeAt(3) * 29;
    }
  }
  if(kId.slice(0, 4) === "와이비엠") {
    if(kId.slice(4, 6) !== "개금") {
      sum += kId.charCodeAt(4) * 11;
      sum += kId.charCodeAt(5) * 31;
    }
  }
  if(kId.slice(0, 8) === "(주)와이비엠넷") {
    if(kId.slice(8, 10) !== "송도") {
      sum += kId.charCodeAt(8) * 11;
      sum += kId.charCodeAt(9) * 31;
    }
  }
  if(kId.slice(0, 3) === "ECC") {
    if(kId.slice(3, 5) === "석계") {
      sum += kId.charCodeAt(3) * 11;
      sum += kId.charCodeAt(4) * 31;
    }
  }
  if(kId.slice(0, 2) === "이화") {
    sum += kId.charCodeAt(2) * 13;
    sum += kId.charCodeAt(3) * 29;
  }
  sum += kId.charCodeAt(0) * 11;
  sum += kId.slice(-1).charCodeAt(0) * 19;
  sum += kId.slice(parseInt(kId / 2, 10)).charCodeAt(0) * 7;
  let code = sum.toString(16).slice(1),
      l = parseInt(kId.length / 2, 10),
      mid = kId.slice(l-1, l+1);
  code = (code + mid.charCodeAt(0).toString(16).slice(0, 2) + mid.charCodeAt(1).toString(16).slice(0, 2)).slice(0, 5);
  return code;
}
