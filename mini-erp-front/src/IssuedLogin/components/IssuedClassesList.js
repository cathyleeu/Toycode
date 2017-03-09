import React, {Component} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends Component {
  componentWillMount(){
    const { recordedKinders, fetchInfoForIssued } = this.props;
    recordedKinders.map(kinder => fetchInfoForIssued(kinder.parentId, kinder.name))
  }
  render(){
    const {loginInfo, isRegisteredNames, recordedKinders, customerType, isFetchedNamesByClass, studentsNames, isEditingNames} = this.props;
    const Code4Kinder = Object.keys(loginInfo).filter(name => name !== 'branchInfo')[0];
    return(
        <div>
          <h3>로그인 발급 : 로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h3>
          {recordedKinders.map((kinder, i) =>{
            const kinder4Info = customerType === 'T' ? loginInfo[Code4Kinder] : loginInfo[kinder.code];
            return( kinder4Info &&
              <IssuedClasses
                key={i}
                studentsNames={studentsNames}
                branchInfo={loginInfo.branchInfo}
                kinderInfo={kinder4Info}
                isEditingNames={isEditingNames}
                isRegisteredNames={isRegisteredNames}
                isFetchedNamesByClass={isFetchedNamesByClass}
              />)}
          )}
        </div>
    )
  }
}

export default IssuedClassesList
