import React from 'react';
import { Link } from 'react-router'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth, signoutUser, userType, customerType}) => {

  const adminHeader = [
    {route: '/allIves' , title: '주문상황'},
    {route: '/cst-list' , title: '지사상황'},
    {route: '/catalog' , title: '상품목록'},
    {route: '/statement' , title: '매출장부'}
  ]
  // const transportHeader = [
  //   {route: '/transport' , title: '배송물량'},
  //   {route: '/return' , title: '반품물량'}
  // ]

  const adminHeaderList = adminHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  // const transportHeaderList = transportHeader.map((list,i) => (
  //   <li key={i}>
  //     <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
  //   </li>
  // ))
  return(
    <div>
      {auth.authenticated && (
        <header className="header-bar">
          <nav>
            <Link to="/feature">
              <logo>
                <img src={logo} className="logo" alt="logo" />
              </logo>
            </Link>
            <ul className="header-menu">
              { ( (userType === 'branch') && (customerType === 'A')) && <li><Link to="/shop"><p>주문</p></Link></li> }
              { userType === 'branch' && <li><Link to="/account"><p>마이페이지</p></Link></li> }
              {
                (((customerType === 'B') || (customerType === 'D') ||  (customerType === 'T')) && (userType !== 'admin'))
                && <li><Link to="/issued"><p>로그인 발급</p></Link></li>
              }
              { customerType === 'Z' && adminHeaderList }

              <li><a href="https://drive.google.com/embeddedfolderview?id=0B1Aeb4WZ7p9uWGE2NVM2QmRobXM#list" target="_blank">자료실</a></li>
            </ul>
            <div className="Logout" onClick={() => signoutUser()}>로그아웃</div>
          </nav>
        </header>
      )}
    </div>
  )
}
/* { userType === 'warehouse' && transportHeaderList } */



export default Header
