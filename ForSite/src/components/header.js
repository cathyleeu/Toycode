import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import * as actions from '../actions'

class Header extends Component {
  renderLinks(){
    if(this.props.auth){
      //로그인 상태 => 로그아웃 버튼
      return [
        <li className="nav-item" key={1}>
          <Link to="/feature" className="nav-link">키즈씽킹</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/support" className="nav-link">영업지원</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/book_order" className="nav-link">주문</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link to="/login_issue" className="nav-link">아이디 발급</Link>
        </li>,
        <li className="nav-item" key={5}>
          <Link to="/signout" className="nav-link">로그아웃</Link>
        </li>
      ]
    }

    else {
      //비로그인 상태 => 로그인 버튼
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/">토이코드</Link>
        </li>
      )
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
// export default Header
