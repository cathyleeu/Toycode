import React, {Component} from 'react'
import './UserInfo.css'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    const { edu, acct } = this.props
    this.state = {
      a_manager: acct.Manager || '',
      a_email: acct.Email || '',
      a_phone: acct.Phone ||'',
      e_manager: edu.Manager ||'',
      e_email: edu.Email ||'',
      e_phone: edu.Phone ||''
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
    const disabled = !userEdit ? 'none' : ''
    return(
      <div className="user-info-cont">
        <div className="user-info-addr">
          <p>지사명:{user.branch.Name}</p>
          <div>지사주소
            <p>{user.branch.Address.zipNo}</p>
            <p>{user.branch.Address.roadAddr}</p>
            <p>{user.branch.Address.detailAddr}</p>
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
                  value={this.state.a_manager}
                  name="a_manager"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
              </div>
              <div className="user-info-mngs-acct-email">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="text"
                  value={this.state.a_email}
                  name="a_email"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
              </div>
              <div className="user-info-mngs-acct-phone">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <input
                  type="text"
                  value={this.state.a_phone}
                  name="a_phone"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
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
                  value={this.state.e_manager}
                  name="e_manager"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
              </div>
              <div className="user-info-mngs-edu-email">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="text"
                  value={this.state.e_email}
                  name="e_email"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
              </div>
              <div className="user-info-mngs-edu-phone">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <input
                  type="text"
                  value={this.state.e_phone}
                  name="e_phone"
                  style={{border: disabled}}
                  disabled={!userEdit}
                  onBlur={this.isOnBlur}
                  onChange={this.isHandleChange} />
              </div>
            </div>
          </div>
        </div>
        {/* <p>사업자번호:{user.branch.License}</p> */}
      </div>
    )
  }
}

export default UserInfo
