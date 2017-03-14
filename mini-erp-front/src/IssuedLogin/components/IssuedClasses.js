import React from 'react';
import IssuedClass from './IssuedClass'



const IssuedClasses = (props) => {

  const { kinderInfo, kinderUrl, KinNo } = props;
  return(
    <div>
      <div className="issued-login-top">
        <p className="kinder-no">{KinNo}</p>
        <h5>{kinderInfo.name} 접속 주소: <a href={`https://toycode.org/code/${kinderUrl}`} target="_blank">toycode.org/code/{kinderUrl}</a></h5>
      </div>
      { kinderInfo.kinderClasses.length > 0 ? (
        kinderInfo.kinderClasses.map((kids, i) => {
          return(
          <div key={i} >
            <IssuedClass
              {...props}
              parentId={kinderInfo.parentId}
              kinderId={kinderInfo.code}
              kclassId={kids.code}
              kinderName={kinderInfo.name}
              kclassName={kids.className}
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


export default IssuedClasses;
