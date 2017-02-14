import React, {Component} from 'react'
import './UserInfo.css'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    const { edu, acct } = this.props
    this.state = {
      A_manager: acct.A_manager || '',
      A_email: acct.A_email || '',
      A_phone: acct.A_phone ||'',
      E_manager: edu.E_manager ||'',
      E_email: edu.E_email ||'',
      E_phone: edu.E_phone ||''
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

  render(){
    const { user, userEdit } = this.props
    const { branch } = user
    const disabled = !userEdit ? 'none' : ''
    return(
      <div className="user-info-cont">
        <div className="user-info-addr">
          <div>회사정보
            <p>지사명:{user.branch.name}</p>
            <p>사업자번호:{user.branch.license}</p>
            <p>대표자명:{user.branch.repr}</p>
            <p>업태:{user.branch.bizType}</p>
            <p>종목:{user.branch.bizItems}</p>
          </div>
          <div>지사주소
            <p>{branch.address.zipNo}</p>
            <p>{branch.address.roadAddr}</p>
            <p>{branch.address.detailAddr}</p>
          </div>

        </div>
        <div className="user-info-mngs">
          <div className="user-info-mngs-acct">
            <p className="user-info-mngs-header">회계 담당자</p>
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
                  onBlur={this.isOnBlur}
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
            <p className="user-info-mngs-header">교육 담당자</p>
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
                  onBlur={this.isOnBlur}
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
    )
  }
}

export default UserInfo
