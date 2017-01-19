import React from 'react'
import './UserInfo.css'

const UserInfo = ({user}) => (
  <div className="user-info-cont">
    <p>지사명:{user.branch.Name}</p>
    <p>지사주소:{user.branch.Address}</p>
    <p>사업자주소:{user.branch.License}</p>
  </div>
)

export default UserInfo
