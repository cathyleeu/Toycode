import React, {Component} from 'react'
import './UserInfo.css'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    const { edu, acct } = this.props
    this.state = {
      a_manager: acct.Manager || '',
      a_email: acct.Email || '',
      a_phone: acct.Phone || '',
      e_manager: edu.Manager || '',
      e_email: edu.Email || '',
      e_phone: edu.Phone || ''
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
        <p>지사명:{user.branch.Name}</p>
        <div>지사주소
          <p>{user.branch.Address.zipNo}</p>
          <p>{user.branch.Address.roadAddr}</p>
          <p>{user.branch.Address.detailAddr}</p>
        </div>
        <div> 회계담당
          <label>담당자</label>
          <input
            type="text"
            value={this.state.a_manager}
            name="a_manager"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
          <label>이메일</label>
          <input
            type="text"
            value={this.state.a_email}
            name="a_email"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
          <label>전화번호</label>
          <input
            type="text"
            value={this.state.a_phone}
            name="a_phone"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
        </div>
        <div> 교육담당
          <label>담당자</label>
          <input
            type="text"
            value={this.state.e_manager}
            name="e_manager"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
          <label>이메일</label>
          <input
            type="text"
            value={this.state.e_email}
            name="e_email"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
          <label>전화번호</label>
          <input
            type="text"
            value={this.state.e_phone}
            name="e_phone"
            style={{border: disabled}}
            disabled={!userEdit}
            onBlur={this.isOnBlur}
            onChange={this.isHandleChange} />
        </div>
        {/* <p>사업자번호:{user.branch.License}</p> */}
      </div>
    )
  }
}



//
// const UserInfo = ({user}) => (
//   <div className="user-info-cont">
//     <p>지사명:{user.branch.Name}</p>
//     <div>지사주소
//       <p>{user.branch.Address.zipNo}</p>
//       <p>{user.branch.Address.roadAddr}</p>
//       <p>{user.branch.Address.detailAddr}</p>
//     </div>
//     <div> 회계담당자
//       <input
//       type="text"
//       value={this.state.a_manager}
//       name="a_manager"
//       style={{border: disabled}}
//       disabled={!userEdit}
//       onBlur={this.isOnBlur}
//       onChange={this.isHandleChange}
//     </div>
//     <div> 교육담당자
//
//     </div>
//     {/* <p>사업자번호:{user.branch.License}</p> */}
//   </div>
// )

export default UserInfo
