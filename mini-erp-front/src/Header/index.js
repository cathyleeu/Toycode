import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth}) => {
  const lists = [
    // {route: '/feature' , title: '키즈씽킹'},
    // {route: '/support' , title: '영업지원'},
    {route: '/shop' , title: '주문'},
    // {route: '/login_issue' , title: '아이디 발급'},
    {route: '/my_account' , title: '마이페이지'},
    {route: '/signout' , title: '로그아웃'}
  ]
  const headerList = lists.map((list,i) => (
    <li key={i}>
      <Link to={list.route} className="navLink"><p>{list.title}</p></Link>
    </li>
  ))
  return(
    <div>
      {auth.authenticated && (
        <header className="Header-bar">
          <nav>
            <logo>
              <img src={logo} className="logo" alt="logo" />
            </logo>
            <ul className="Header-nav">
              {headerList}
            </ul>
          </nav>
        </header>
      )}
    </div>
  )
}


function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)
