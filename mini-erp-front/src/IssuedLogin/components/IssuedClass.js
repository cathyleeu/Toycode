import React from 'react'


const IssuedClass = ({ kinderName, kclassName, code, level, disabled }) => {
  // const disabled = level === 'none' ? 'disabled' : '';
  console.log(level);
  return(
  <div>
    {kinderName} - {kclassName}
    <form action="https://toycode.org/issue" method="POST" target="_blank">
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="school" value={kinderName} />
      <input type="hidden" name="className" value={kclassName} />
      <input type="hidden" name="yearmonth" value="201703" />
      <input type="hidden" name="level" value={level} />
      <button disabled={disabled} onClick={() => alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.')}>로그인 스티커 발급 및 인쇄</button>
    </form>
  </div>
)}


// class IssuedClass extends Component {
//
//   render(){
//     const { kinderName, kclassName, code, level, disable } = this.props;
//     return(
//       <div>
//         {kinderName} - {kclassName}
//         <form action="https://toycode.org/issue" method="POST" target="_blank">
//           <input type="hidden" name="code" value={code} />
//           <input type="hidden" name="school" value={kinderName} />
//           <input type="hidden" name="className" value={kclassName} />
//           <input type="hidden" name="yearmonth" value="201703" />
//           <input type="hidden" name="level" value={level} />
//           <input type="submit" value="로그인 스티커 발급" disabled={disable}/>
//         </form>
//       </div>
//     )
//   }
// }

export default IssuedClass;
