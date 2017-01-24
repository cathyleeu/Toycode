import React from 'react'
import './UserInfo.css'

const UserInfo = ({user}) => (
  <div className="user-info-cont">
    <p>지사명:{user.branch.Name}</p>
    <div>지사주소
      <p>{user.branch.Address.zipNo}</p>
      <p>{user.branch.Address.roadAddr}</p>
      <p>{user.branch.Address.detailAddr}</p>
    </div>
    {/* <p>사업자번호:{user.branch.License}</p> */}
  </div>
)

export default UserInfo
