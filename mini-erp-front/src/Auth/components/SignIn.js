import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './SignInAndUp.css'
import logo from '../../../public/logo.png'
import {Link} from 'react-router'


class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      signupErr: ''
    }
  }
  onChange = e => {
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  getErrMsg = (errType) => {
    const { errorMessage } = this.props;
    if(errorMessage){
      return <strong className="errMessage">{errorMessage[errType]}</strong>
    }
  }
  onSubmit = e => {
    e.preventDefault()
    const { signinUser} = this.props;
    signinUser(this.state)
  }
  render() {
    return (
      <div className="SignIn-Container">
        <img src={logo} className="Auth-logo" role="presentation"/>
        <form className="SignIn-Form">
          <div className="rg-user-info col-md-12">
            <fieldset className="form-group rg-user-email">
             <label htmlFor="email" className="errHandle">이메일</label>
             <input
               value={this.state.email}
               id="email"
               name="email"
               type="text"
               placeholder="ex)toycode@toycode.org"
               onChange={this.onChange}
               required
             />
            </fieldset>
            <fieldset className="form-group rg-user-pw">
             <label htmlFor="password" className="errHandle">비밀번호</label>
             <input
              id="password"
              value={this.state.password}
              name="password"
              type="password"
              onChange={this.onChange}
              onBlur={this.isValidPassword}
              placeholder="비밀번호 입력"
              required
              />
            </fieldset>
            {this.getErrMsg("loginErr")}
          </div>
        </form>
        <div className="rg-submit col-md-12">
          <button onClick={this.onSubmit}>로그인</button>
          <div className="message">회원이 아니신가요?
            <Link to="signup">회원가입 하기</Link>
            {/* <a>회원가입 하기</a> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    errorMessage: state.auth.errMsg
  }
}


export default connect(mapStateToProps, actions )(SignIn)
