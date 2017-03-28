import React, {PureComponent} from 'react';
import IssuedClass from './IssuedClass'


class IssuedClasses extends PureComponent{
  render(){
    const { kinderInfo, kinderUrl, KinNo } = this.props;
    let getUrl = this.props.customerType === 'T' ? kinderInfo.url : kinderUrl;
    return(
      <div>
        <div className="issued-login-top">
          <p className="kinder-no">{KinNo}</p>
          <h5>{kinderInfo.name}({kinderInfo.code}) 접속 주소: <a href={`https://toycode.org/code/${getUrl}`} target="_blank">toycode.org/code/{getUrl}</a></h5>
        </div>
        { kinderInfo.kinderClasses.length > 0 ? (
          kinderInfo.kinderClasses.map((kids, i) => {
            return(
            <div key={i} >
              <IssuedClass
                {...this.props}
                kinderUrl={getUrl}
                kinderLang={kinderInfo.lang}
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
}

export default IssuedClasses;



/*
const IssuedClasses = (props) => {

  const { kinderInfo, kinderUrl, KinNo } = props;
  let getUrl = props.customerType === 'T' ? kinderInfo.url : kinderUrl; // 지사 소속원의 접속주소를 받아오기 위해서.

  return(
    <div>
      <div className="issued-login-top">
        <p className="kinder-no">{KinNo}</p>
        <h5>{kinderInfo.name} 접속 주소: <a href={`https://toycode.org/code/${getUrl}`} target="_blank">toycode.org/code/{getUrl}</a></h5>
      </div>
      { kinderInfo.kinderClasses.length > 0 ? (
        kinderInfo.kinderClasses.map((kids, i) => {
          return(
          <div key={i} >
            <IssuedClass
              {...props}
              kinderUrl={getUrl}
              kinderLang={kinderInfo.lang}
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
*/
