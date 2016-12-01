import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import * as actions from '../actions'


class Header extends Component {
  renderLinks(){

    if(this.props.auth){
      //로그인 상태 => 로그아웃 버튼
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">로그아웃</Link>
        </li>
      )
    } else {
      //비로그인 상태 => 로그인 버튼
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="signin">로그인</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="signup">회원가입</Link>
        </li>
      ]
    }
  }
  render(){
    return(
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
    )
  }
}

function mapStateToProps(state){
  return { auth: state.auth.authenticated}
}
//
export default connect(mapStateToProps)(Header)
