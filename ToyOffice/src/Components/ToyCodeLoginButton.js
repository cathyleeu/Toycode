import React, { PureComponent } from 'react'

import PrimaryButton from './PrimaryButton'

import moment from 'moment-timezone'


let mon = moment().set({year:2017, month:3}).format('YYYYMM');


class ToyCodeLoginButton extends PureComponent {
  render(){
    let {
      academyUrl,
      academyName,
      academyLang,
      className,
      level,
      names,
    } = this.props;
    return (
      <form
        ref={(submit) => { this.btnSubmit = submit }}
        style={{display: "inline"}}
        action="https://toycode.org/issue" method="POST" target="_blank">
        <input type="hidden" name="code" value={academyUrl} />
        <input type="hidden" name="school" value={academyName} />
        <input type="hidden" name="lang" value={academyLang} />
        <input type="hidden" name="className" value={className} />
        <input type="hidden" name="yearmonth" value={mon} />
        <input type="hidden" name="level" value={level} />
        <input type="hidden" name="students" value={names} />
        <PrimaryButton
          content="로그인발급"
          purpose="multi"
          onClick={() => {
          return(alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.'))}} />
      </form>
    )
  }
  componentDidMount(){
    if(this.props.directLink){
      this.props.history.goBack()
      this.btnSubmit.submit()
    }
  }
}


export default ToyCodeLoginButton
