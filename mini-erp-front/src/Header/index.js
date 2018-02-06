import React from 'react';
import { Link } from 'react-router'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth, signoutUser, userType, customerType}) => {
  // let customerCode = auth.user.code
  const adminHeader = [
    {route: '/allIves' , title: '주문상황'},
    {route: '/cst-list' , title: '지사상황'},
    {route: '/catalog' , title: '상품목록'},
    {route: '/statement' , title: '매출장부'},
    {route: '/reports', title: '이력관리'}
  ]

  const adminHeaderList = adminHeader.map((list,i) => (
    <li key={i} className="head-menu">
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  return(
    <div>
      {auth.authenticated && (
        <header className="header-bar">
          <nav>
            <Link to="/feature" className="head-logo">
              <logo >
                <img src={logo} className="logo" alt="logo" />
              </logo>
            </Link>
            <ul className="header-menu">
              { ( (userType === 'branch') && ((customerType === 'A') || (customerType === 'E'))) && <li className="head-menu"><Link to="/shop"><p>주문</p></Link></li> }
              { userType === 'branch' && <li className="head-menu"><Link to="/account"><p>마이페이지</p></Link></li> }
              { userType !== 'admin' && <li className="head-menu"><Link to="/issued"><p>로그인 발급</p></Link></li> }
              { customerType === 'Z' && adminHeaderList }
              {/* { (customerCode === 'C00071' || customerCode === 'C00043') && <li className="head-menu"><a href="http://localhost:3000/reports" target="_blank"><p>이력관리</p></a></li>} */}
              <li className="head-menu"><a href="https://drive.google.com/drive/folders/0B1Aeb4WZ7p9uWGE2NVM2QmRobXM?usp=sharing" target="_blank"><p>자료실</p></a></li>
            </ul>
          </nav>
          <div className="Logout" onClick={() => signoutUser()}>로그아웃</div>
        </header>
      )}
    </div>
  )
}


// const transportHeaderList = transportHeader.map((list,i) => (
//   <li key={i}>
//     <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
//   </li>
// ))

// const transportHeader = [
//   {route: '/transport' , title: '배송물량'},
//   {route: '/return' , title: '반품물량'}
// ]
export default Header
