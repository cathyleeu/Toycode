import React, {Component} from 'react'
import './UserInfo.css'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    const { edu, acct, user } = this.props

    this.state = {
      A_manager: acct.A_manager || '',
      A_email: acct.A_email || '',
      A_phone: acct.A_phone ||'',
      E_manager: edu.E_manager ||'',
      E_email: edu.E_email ||'',
      E_phone: edu.E_phone ||'',
      sub_name: user.branch.sub_name || '',
      isValid: "none"
    }
  }
  isHandleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  isOnBlur = () => {
    const {updateUser} = this.props
    updateUser(this.state)
  }
  isValidEmail = (e) => {
    let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(regexEmail.test(this.state.A_email || this.state.E_email)){
      this.setState({ isValid : "none" })
    } else {
      this.setState({ isValid : true })
    }
  }
  render(){
    const { user, userEdit } = this.props;
    const { branch } = user
    const disabled = !userEdit ? 'none' : ''
    const isntValid = { display: this.state.isValid, margin: 0, color: "#990c0c", fontSize: "12px" }
    return(
      <div className="user-info-cont" id="non-print-userInfo">
        <h3>{user.code}</h3>
        <div className="user-info-row">
          <div className="user-info-addr">
            <div className="user-info-addr-biz">
              <div><p className="user-info-text">사업명</p><p>{user.branch.name}</p></div>
              <div><p className="user-info-text">사업자번호</p><p>{user.branch.license}</p></div>
              <div><p className="user-info-text">대표자명</p><p>{user.branch.repr}</p></div>
              {!(user.customerType ==='A' || user.customerType ==='C')
                && (<div className="user-name-setting">
                      <p className="user-info-text">학원 명</p>
                      <input
                        style={{border: disabled}}
                        disabled={!userEdit}
                        onBlur={this.isOnBlur}
                        onChange={this.isHandleChange}
                        placeholder='프로그램 학원명을 입력하세요.'
                        name='sub_name'
                        value={this.state.sub_name}
                        type='text'/>
                    </div>)}
              <div>
                <p className="user-info-text">주소</p>
                <div>
                  <p>{branch.address.zipNo}</p>
                  <p>{branch.address.roadAddr} {branch.address.detailAddr}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="user-info-mngs">
            <div className="user-info-mngs-acct">
              <p className="user-info-mngs-header">회계 담당자 <strong style={isntValid}>담당자 이메일 양식을 확인하세요.</strong></p>
              <div className="user-info-mngs-body">
                <div className="user-info-mngs-acct-name">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.A_manager}
                    name="A_manager"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isOnBlur}
                    onChange={this.isHandleChange}
                    placeholder='회계담당자를 입력하세요.' />
                </div>
                <div className="user-info-mngs-acct-email">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.A_email}
                    name="A_email"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isValidEmail}
                    onChange={this.isHandleChange}
                    placeholder='회계담당자 이메일을 입력하세요.'
                     />
                </div>
                <div className="user-info-mngs-acct-phone">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.A_phone}
                    name="A_phone"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isOnBlur}
                    onChange={this.isHandleChange}
                    placeholder='회계담당자의 번호를 입력하세요.'
                    required/>
                </div>
              </div>
            </div>
            <div className="user-info-mngs-edu">
              <p className="user-info-mngs-header">교육 담당자 <strong style={isntValid}>담당자 이메일 양식을 확인하세요.</strong></p>
              <div className="user-info-mngs-body">
                <div className="user-info-mngs-edu-name">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.E_manager}
                    name="E_manager"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isOnBlur}
                    onChange={this.isHandleChange}
                    placeholder='교육담당자를 입력하세요.'/>
                </div>
                <div className="user-info-mngs-edu-email">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.E_email}
                    name="E_email"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isValidEmail}
                    onChange={this.isHandleChange}
                    placeholder='교육담당자의 이메일을 입력하세요.'/>
                </div>
                <div className="user-info-mngs-edu-phone">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={this.state.E_phone}
                    name="E_phone"
                    style={{border: disabled}}
                    disabled={!userEdit}
                    onBlur={this.isOnBlur}
                    onChange={this.isHandleChange}
                    placeholder='교육담당자의 번호를 입력하세요.'
                    required/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserInfo
