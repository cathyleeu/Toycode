import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './SignInAndUp.css'
import logo from '../../../public/logo.png'


class SignInAndUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      Name: '',
      License:'',
      Address: ''
    }
  }
  onChange = e => {
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong> {this.props.errorMessage}</strong>
        </div>
      )
    }
  }
  onSubmit = e => {
    e.preventDefault()
    const { signupUser, signinUser, auth } = this.props
    if(auth.status){
      signupUser(this.state)
    } else {
      signinUser(this.state)
    }
  }
  isSignInAndUp = () => {
    const {toggleSignup, toggleSignin, auth} = this.props
    auth.status ? toggleSignin() : toggleSignup()
  }
  render() {
    const { auth } = this.props
    const SignUpFieldSet = (
      <div className="col-md-6">
        <fieldset className="form-group">
         <label>비밀번호확인</label>
         <input
          value={this.state.passwordConfirm}
          name="passwordConfirm"
          type="password"
          onChange={this.onChange}
          placeholder="비밀번호 확인입력"
          required/>
        </fieldset>
        <div className="row">
          <fieldset className="form-group col-md-6">
           <label>지사상호명</label>
           <input
            value={this.state.Name}
            name="Name"
            type="text"
            onChange={this.onChange}
            placeholder="지사명을 입력하세요"
            required/>
          </fieldset>
          <fieldset className="form-group col-md-6">
           <label>사업자 등록번호</label>
           <input
            value={this.state.License}
            name="License"
            type="text"
            onChange={this.onChange}
            placeholder="사업자 등록번호를 입력하세요"
            required/>
          </fieldset>
        </div>
        <fieldset className="form-group">
         <label>사업장 주소</label>
         <input
          value={this.state.Address}
          name="Address"
          type="text"
          onChange={this.onChange}
          placeholder="사업장 주소를 입력하세요"
          required/>
        </fieldset>
      </div>
    )
    return (
      <div className={ auth.status ? "SignUp-Container" : "SignIn-Container"}>
        <img src={logo} className="Auth-logo" role="presentation"/>
        <form onSubmit={this.onSubmit} className={ auth.status ? "row SignUp-Form" : "SignIn-Form"}>
          <div className={ auth.status ? "col-md-6" : "col-md-12"}>
            <fieldset className="form-group">
             <label htmlFor="email">이메일</label>
             <input
               value={this.state.email}
               id="email"
               name="email"
               type="text"
               placeholder="이메일 입력"
               onChange={this.onChange}
               required
             />
            </fieldset>
            <fieldset className="form-group">
             <label htmlFor="password">비밀번호</label>
             <input
              id="password"
              value={this.state.password}
              name="password"
              type="password"
              onChange={this.onChange}
              placeholder="비밀번호 입력"
              required
              />
            </fieldset>
          </div>
          { auth.status && SignUpFieldSet }
          { this.renderAlert()}
          <div className="Form-Bottom col-md-12">
            <button action="submit">{ auth.status ? "회원가입" : "로그인"}</button>
            <div className="message">{ auth.status ? "이미 회원이신가요?" : "회원이 아니신가요?"}
              <a onClick={this.isSignInAndUp}>{ auth.status ? "로그인하기" : "회원가입 하기"}</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    errorMessage: state.auth.error
  }
}


export default connect(mapStateToProps, actions)(SignInAndUp)
