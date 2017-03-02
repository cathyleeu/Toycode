import React from 'react'


const IssuedClass = ({ kinderName, kclassName, code, level }) => {
  const disabled = (level === 'none' || undefined || '') ? 'disabled' : '';
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
      <button disabled={disabled}>로그인 스티커 발급</button>
      {/* <input type="submit" value="로그인 스티커 발급" disabled={disabled} /> */}
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
