import React, {PureComponent} from 'react'
import IssuedClasses from './IssuedClasses'


class IssuedClassesList extends PureComponent {
  constructor(){
    super()
    this.state = {
      kinderCode: ""
    }
    this.renderIssuedClasses = this.renderIssuedClasses.bind(this)
  }
  // componentDidMount(){
    // const { recordedKinders, fetchInfoForIssued } = this.props;
    // if(this.props.customerType !== 'T') {
    //   recordedKinders.forEach(kinder => fetchInfoForIssued(kinder.parentId, kinder.name))
    // }
  // }
  renderIssuedClasses( kinder , i ) {
    const { loginInfo, customerType } = this.props;

    let essential = {
      kinderLang : kinder.lang,
      kinderUrl : kinder.url,
      kinderInfo : kinder
    }
    if(customerType === 'T') {
      let targetK = loginInfo[kinder.code];
      essential = {
        ...essential,
        kinderLang : targetK.lang,
        kinderUrl : targetK.url,
        kinderInfo : {
          ...kinder,
          kinderId : kinder.code
        }
      }
    }
    return(
      <IssuedClasses
        key={i}
        KinNo={i+1}
        {...this.props}
        {...essential}
      />
    )

  }
  render(){
    return(
        <div>
          <h3 className='issued-notice'>로그인 발급 : 로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h3>
          {this.props.recordedKinders.map(this.renderIssuedClasses)}
        </div>
    )
  }
}

export default IssuedClassesList
