import React from 'react';
import { Link } from 'react-router'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth, signoutUser, userType}) => {
  const branchHeader = [
    {route: '/shop' , title: '주문'},
    {route: '/account' , title: '마이페이지'}
  ]
  const adminHeader = [
    {route: '/allIves' , title: '주문상황'},
    {route: '/cst-list' , title: '지사상황'},
    {route: '/catalog' , title: '상품목록'},
    {route: '/statement' , title: '매출장부'}
  ]
  const transportHeader = [
    {route: '/transport' , title: '배송물량'},
    {route: '/return' , title: '반품물량'}
  ]
  const branchHeaderList = branchHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  const kinderHeaderList = (<li><Link to="issued"><p>로그인발급</p></Link></li>);
  const adminHeaderList = adminHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  const transportHeaderList = transportHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
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
              { userType === 'branch' && branchHeaderList }
              { userType === 'kinder' && kinderHeaderList }
              { userType === 'admin' && adminHeaderList }
              { userType === 'warehouse' && transportHeaderList }
              <li><a href="https://drive.google.com/embeddedfolderview?id=0B1Aeb4WZ7p9uWGE2NVM2QmRobXM#list" target="_blank">자료실</a></li>
            </ul>
            <div className="Logout" onClick={() => signoutUser()}>로그아웃</div>
          </nav>
        </header>
      )}
    </div>
  )
}

export default Header
