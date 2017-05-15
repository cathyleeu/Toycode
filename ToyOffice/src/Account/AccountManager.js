import React, {PureComponent} from 'react'
import AccountManagerInput from './AccountManagerInput'


class AccountManager extends PureComponent {

  render(){
    return(
      <form className="AccountManager-Cont">
          <div>
            <h3>회계 담당자</h3>
            <AccountManagerInput label="담당자 명" readOnly={this.props.readOnly} />
            <AccountManagerInput label="전화번호" readOnly={this.props.readOnly} />
            <AccountManagerInput label="이메일" readOnly={this.props.readOnly} />
          </div>
          <div>
            <h3>교육 담당자</h3>
            <AccountManagerInput label="담당자 명" readOnly={this.props.readOnly} />
            <AccountManagerInput label="전화번호" readOnly={this.props.readOnly} />
            <AccountManagerInput label="이메일" readOnly={this.props.readOnly} />
          </div>
      </form>
    )
  }
}

export default AccountManager
