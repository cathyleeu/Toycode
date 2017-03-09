import React from 'react';
import IssuedClass from './IssuedClass'
import { getCode } from '../../services/getCode'



const IssuedClasses = (props) => {

  const { kinderInfo, branchInfo } = props,
        code = getCode(branchInfo.name, kinderInfo.name,"201703");
  return(
    <div>
      <h5>{kinderInfo.name} 접속 주소: <a href={`https://toycode.org/code/${code}`} target="_blank">toycode.org/code/{code}</a></h5>
      { kinderInfo.kinderClasses.length > 0 ? (
        kinderInfo.kinderClasses.map((kids, i) => {
          return(
          <div key={i} >
            <IssuedClass
              code={code}
              parentId={kinderInfo.parentId}
              kinderId={kinderInfo.code}
              kclassId={kids.code}
              kinderName={kinderInfo.name}
              kclassName={kids.className}
              isWritingNames={props.isWritingNames}
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


export default IssuedClasses;
