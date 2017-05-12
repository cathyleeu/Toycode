import React, {PureComponent} from 'react'

class AccountManager extends PureComponent {
  render(){
    return(
      <div>
        <div>회계 담당자</div>
        <div>
          교육 담당자
          <input readOnly={this.props.readOnly}/>
        </div>
      </div>
    )
  }
}

export default AccountManager
