import React from 'react';
import IssuedClass from './IssuedClass'

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


const IssuedClasses = (props) => {

  const { kinderInfo, branchInfo } = props,
        code = getCode(branchInfo.name, kinderInfo.name,"201703");
  return(
    <div>
      <h5>로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h5>
      원별 접속 주소: <a href={`https://toycode.org/code/${code}`} target="_blank">toycode.org/code/{code}</a>
      { kinderInfo.kinderClasses.length > 0 ? (
        kinderInfo.kinderClasses.map((kids, i) => {
          return(
          <div key={i} style={{margin: '1em'}}>
            <IssuedClass
              code={code}
              parentId={kinderInfo.parentId}
              kinderId={kinderInfo.code}
              kclassId={kids.code}
              kinderName={kinderInfo.name}
              kclassName={kids.className}
              isEditingNames={props.isEditingNames}
              studentsNames={props.studentsNames}
              isFetchedNamesByClass={props.isFetchedNamesByClass}
              isRegisteredNames={props.isRegisteredNames}
              level={kids.level}
              disabled={kids.level === '' && 'disabled'}/>
          </div>
        )})
      ) : (
        <div>
          마이페이지에서 원과 레벨을 입력해주세요.
        </div>
      )}
    </div>
  )
}

// class IssuedClasses extends Component {
//
//   render(){
//     const { kinders, branch } = this.props.loginInfo,
//             code = getCode(branch.name, kinders[0].name, "201703");
//     return(
//       <div>
//         원별 접속 주소: <a href={`https://toycode.org/code/${code}`} target="_blank">toycode.org/code/{code}</a>
//         {kinders[0].kinderClasses.map((kids, i) => (
//           <div  key={i} style={{margin: '1em'}}>
//             <IssuedClass code={code} kinderName={kinders[0].name} kclassName={kids.className} level={kids.level} disable={(kids.level === 'none') ? 'disabled' : '' }/>
//           </div>
//         ))}
//       </div>
//     )
//   }
// }


export default IssuedClasses;

/* <form action="https://toycode.org/issue" method="POST" target="_blank"> */

/* <button>원아수 수정</button>
<button>ID 설정하기</button>
<button>로그인 발급 받기</button> */
