import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../Auth/actions'
import './index.css'
import logo from '../../public/logo.png'


const Header = ({auth, signoutUser}) => {
  const lists = [
    {route: '/shop' , title: '주문'},
    {route: '/account' , title: '마이페이지'}
  ]
  const headerList = lists.map((list,i) => (
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
              {headerList}
            </ul>
            <div className="Logout" onClick={() => signoutUser()}>로그아웃</div>
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

export default connect(mapStateToProps, actions)(Header)
