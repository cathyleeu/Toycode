import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Header = ({auth}) => {
  const lists = [
    {route: '/feature' , title: '키즈씽킹'},
    {route: '/support' , title: '영업지원'},
    {route: '/book_order' , title: '주문'},
    {route: '/login_issue' , title: '아이디 발급'},
    {route: '/my_account' , title: '마이페이지'},
    {route: '/signout' , title: '로그아웃'}
  ]
  const headerList = lists.map(
        (list,index) => <li className="nav-item" key={index}>
          <Link to={list.route} className="nav-link">{list.title}</Link>
        </li>
      )
  return(
    <nav className="navbar navbar-light">
      <ul className="nav navbar-nav">
        { auth.authenticated ? headerList : (<li className="nav-item">
          <Link className="nav-link" to="/">토이코드</Link>
        </li>) }
      </ul>
    </nav>
  )
}

function mapStateToProps(state){
  return { auth: state.auth}
}

export default connect(mapStateToProps)(Header)
