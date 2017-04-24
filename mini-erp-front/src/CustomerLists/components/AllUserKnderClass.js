import React, {PureComponent} from 'react'



class AllUserKnderClass extends PureComponent{
  state = {
    names: this.props.allKCNames ? this.props.allKCNames.students : ''
  }
  render(){
    let { kinder, kdc, mon } = this.props;
    return(
      <form action="https://toycode.org/issue" method="POST" target="_blank">
        <input type="hidden" name="code" value={kinder.url} />
        <input type="hidden" name="school" value={kinder.name} />
        <input type="hidden" name="lang" value={kinder.lang} />
        <input type="hidden" name="className" value={kdc.className} />
        <input type="hidden" name="yearmonth" value={mon.format('YYYYMM')} />
        <input type="hidden" name="level" value={kdc.level} />
        <input type="hidden" name="students" value={this.state.names} />
        <button
          className='button-edit'
          disabled={kdc.level === '' && 'disabled'} onClick={() => {
          return(alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.'))}}>{kdc.className}-{kdc.level}</button>
      </form>
    )
  }
}

export default AllUserKnderClass
