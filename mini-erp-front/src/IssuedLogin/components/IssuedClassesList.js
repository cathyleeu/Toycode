import React, {Component} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends Component {
  componentWillMount(){
    const { recordedKinders, fetchInfoForIssued } = this.props;
    recordedKinders.map(kinder => fetchInfoForIssued(kinder.parentId, kinder.name))
  }
  render(){
    const { loginInfo, recordedKinders, customerType} = this.props;
    //TODO: 유치원 코드 찾기
    const Code4Kinder = Object.keys(loginInfo).filter(name => name !== 'branchInfo')[1];
    return(
        <div>
          <h3 className='issued-notice'>로그인 발급 : 로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h3>
          {recordedKinders.map((kinder, i) => {
            const kinder4Info = customerType === 'T' ? loginInfo[Code4Kinder] : loginInfo[kinder.code];
            return( kinder4Info &&
              <IssuedClasses
                key={i}
                KinNo={i+1}
                {...this.props}
                kinderLang={kinder.lang}
                kinderUrl={kinder.url}
                branchInfo={loginInfo.branchInfo}
                kinderInfo={kinder4Info}
              />)
            }
          )}
        </div>
    )
  }
}

export default IssuedClassesList
