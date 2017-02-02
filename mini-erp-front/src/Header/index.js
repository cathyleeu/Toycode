import React from 'react';
import { Link } from 'react-router'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth, signoutUser, admin}) => {
  const userHeader = [
    {route: '/shop' , title: '주문'},
    {route: '/account' , title: '마이페이지'}
  ]
  const adminHeader = [
    {route: '/cst-iv-list' , title: '주문상황'},
    {route: '/cst-list' , title: '지사상황'},
    {route: '/catalog' , title: '상품목록'}
  ]
  const userHeaderList = userHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  const adminHeaderList = adminHeader.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  return(
    <div>
      {auth.authenticated && (
        <header className="header-bar">
          <nav>
            <logo>
              <img src={logo} className="logo" alt="logo" />
            </logo>
            <ul className="header-menu">
              {admin ? adminHeaderList : userHeaderList }
            </ul>
            <div className="Logout" onClick={() => signoutUser()}>로그아웃</div>
          </nav>
        </header>
      )}
    </div>
  )
}

export default Header
