import React, {PureComponent} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends PureComponent {
  constructor(){
    super()
    this.state = {
      kinderCode: ""
    }
  }
  componentDidMount(){
    const { recordedKinders, fetchInfoForIssued } = this.props;
    if(this.props.customerType !== 'T') {
      recordedKinders.forEach(kinder => fetchInfoForIssued(kinder.parentId, kinder.name))
    }
  }
  render(){
    const { loginInfo, recordedKinders, customerType} = this.props;
    let Code4Kinder;
    if(customerType === "T") {
      let code = recordedKinders[0].kinderClasses < 0 ? false : recordedKinders[0].kinderClasses[0].code
      if(!code) {
        alert("지사에 문의하여 반을 등록하세요.")
      }
      let getCode = code.split("-");
      Code4Kinder = `${getCode[0]}-${getCode[1]}`
    }
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
