import React, {Component} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends Component {
  componentWillMount(){
    const { recordedKinders, fetchInfoForIssued } = this.props;
    recordedKinders.map(kinder => fetchInfoForIssued(kinder.parentId, kinder.name))
  }
  render(){
    const {loginInfo, isRegisteredNames, recordedKinders, isFetchedNamesByClass, studentsNames, isEditingNames} = this.props;
    return(
        <div>
          <h3>로그인 발급</h3>
          {recordedKinders.map((kinder, i) =>
            loginInfo[kinder.code] &&
              <IssuedClasses
                key={i}
                studentsNames={studentsNames}
                branchInfo={loginInfo.branchInfo}
                kinderInfo={loginInfo[kinder.code]}
                isEditingNames={isEditingNames}
                isRegisteredNames={isRegisteredNames}
                isFetchedNamesByClass={isFetchedNamesByClass}
              />
          )}
        </div>
    )
  }
}

export default IssuedClassesList


/* {loginInfo &&
  <IssuedClasses
    studentsNames={studentsNames}
    loginInfo={loginInfo}
    isEditingNames={isEditingNames}
    isRegisteredNames={isRegisteredNames}
    isFetchedNamesByClass={isFetchedNamesByClass}
  />} */
