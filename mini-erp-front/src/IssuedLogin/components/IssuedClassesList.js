import React, {Component} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends Component {
  componentWillMount(){
    const { recordedInfo, fetchInfoForIssued } = this.props;
    const { name, parentId } = recordedInfo[0];
    fetchInfoForIssued(parentId, name)
  }
  render(){
    const {loginInfo, isRegisteredNames, isFetchedNamesByClass, studentsNames} = this.props;
    return(
        <div>
          <h3>로그인 발급</h3>
          {loginInfo.kinders &&
            <IssuedClasses
              studentsNames={studentsNames}
              loginInfo={loginInfo}
              isRegisteredNames={isRegisteredNames}
              isFetchedNamesByClass={isFetchedNamesByClass}
            />}
        </div>
    )
  }
}

export default IssuedClassesList
