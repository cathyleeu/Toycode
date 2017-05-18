import React, {PureComponent} from 'react'
import AccountManagerInput from './AccountManagerInput'


class AccountManager extends PureComponent {
  constructor(props){
    super(props)
    let { mngModi } = props;
    this.state = {
      A_phone: mngModi.A_phone,
      A_manager: mngModi.A_manager,
      A_email: mngModi.A_email,
      E_phone: mngModi.E_phone,
      E_manager: mngModi.E_manager,
      E_email: mngModi.E_email,
      loaded: false
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.mngModi !== this.props.mngModi){
      this.setState({ ...newProps.mngModi, loaded: true })
    }
  }
  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
    this.props.isModifyingInfo('manager', e.target.name, e.target.value)
  }
  render(){
    let { A_phone, A_manager, A_email, E_phone, E_manager, E_email } = this.state;
    if(!this.state.loaded){
      //value값 props값을 받아올때 값이 한번 바뀌기 때문에 다 불러온 다음에 해줘야지 에러메세지가 발생하지 않는다.
      return <div>로딩중</div>
    }
    return(
      <form className="AccountManager-Cont">
          <div>
            <h3>회계 담당자</h3>
            <AccountManagerInput
              label="담당자 명"
              holder="담당자 명을 입력하세요."
              name="A_manager"
              value={A_manager}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
            <AccountManagerInput
              label="전화번호"
              holder="전화번호를 입력하세요."
              name="A_phone"
              value={A_phone}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
            <AccountManagerInput
              label="이메일"
              holder="이메일을 입력하세요."
              name="A_email"
              value={A_email}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
          </div>
          <div>
            <h3>교육 담당자</h3>
            <AccountManagerInput
              label="담당자 명"
              holder="담당자 명을 입력하세요."
              name="E_manager"
              value={E_manager}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
            <AccountManagerInput
              label="전화번호"
              holder="전화번호를 입력하세요."
              name="E_phone"
              value={E_phone}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
            <AccountManagerInput
              label="이메일"
              holder="이메일을 입력하세요."
              name="E_email"
              value={E_email}
              onChange={this.handleChange}
              readOnly={this.props.readOnly} />
          </div>
      </form>
    )
  }
}

export default AccountManager
