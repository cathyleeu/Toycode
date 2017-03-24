import React, {Component} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesLists extends Component {
  componentDidMount(){
    console.log("IssuedClassesLists")
    this.props.isAllNamesByBranch(this.props.branchId)
  }
  render(){

    //TODO: 유치원 코드 찾기
    // const Code4Kinder = Object.keys(loginInfo).filter(name => name !== 'branchInfo')[1];
    return(
        <div>
          <h3 className='issued-notice'>로그인 발급 : 로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h3>

        </div>
    )
  }
}

export default IssuedClassesLists


// {recordedKinders.map((kinder, i) => {
//   const kinder4Info = customerType === 'T' ? loginInfo[Code4Kinder] : loginInfo[kinder.code];
//   return( kinder4Info &&
//     <IssuedClasses
//       key={i}
//       KinNo={i+1}
//       {...this.props}
//       kinderLang={kinder.lang}
//       kinderUrl={kinder.url}
//       branchInfo={loginInfo.branchInfo}
//       kinderInfo={kinder4Info}
//     />)
//   }
// )}
