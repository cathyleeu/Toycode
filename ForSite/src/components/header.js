import React, { Component } from 'react';
import { Link } from 'react-router'
// import { connect } from 'react-redux'
// import * as actions from '../actions'

import SigninPage from './auth/signinPage'
class Header extends Component {
  // constructor() {
  //
  // }
  // authButton(){
  //   // this.props.authenticated true라면, 액션 authenticate()를 false로 한다.
  //   if(this.props.authenticated) {
  //     return ( <button onClick={() => this.props.authenticate(false)}>로그아웃 </button> )
  //   }
  //   return(
  //     <button onClick={() => this.props.authenticate(true)}>로그인</button>
  //   )
  // }
  render(){
    return(
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="signin">로그인</Link>
            </li>
          </ul>
        </nav>
    )
  }
}
// function mapStateToProps(state){
//   return { authenticated: state.authenticated}
// }
//
// export default connect(mapStateToProps, actions)(Header)
export default Header
