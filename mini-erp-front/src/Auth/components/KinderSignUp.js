import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import logo from '../../../public/logo.png'
import {Link} from 'react-router'


class KinderSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      signupCode:'',
      kinderName:'',
      signupErr: '',
      userType: 'kinder',
      isValid: "none",
      isValidPW: "none"
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
  isValidBranchCode = () => {
    const { signupCode } = this.state;
    const { fetchMatchedBranch } = this.props;
    fetchMatchedBranch(signupCode)
  }
  isValidKinderCode = () => {

  }
  isValidPassword = () => {
    let regexPassword = /^[a-z0-9_]{8,20}$/;
    if(regexPassword.test(this.state.password)){
      this.setState({isValidPW : "none"})
    } else {
      this.setState({isValidPW: true})
    }
  }
  onSubmit = e => {
    e.preventDefault()
    const { signupUser, kinderCode } = this.props
    const matchedKinder = kinderCode.map(matched => matched.name).indexOf(this.state.kinderName)
    let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let regexPassword = /^[a-z0-9_]{4,20}$/;
    if(!regexEmail.test(this.state.email)){
      this.setState({isValid: true})
    } else if(!regexPassword.test(this.state.password)) {
      this.setState({isValidPW: true})
    } else if(matchedKinder === -1){
      alert("인증된 코드가 아닙니다. 지사에 문의해주세요.")
    } else {
      this.setState({isValid:"none", isValidPW :"none"})
      signupUser(this.state)
    }
  }
  render() {
    const isMatch = (this.state.password === this.state.passwordConfirm);
    return (
      <div className="SignUp-Container">
        <img src={logo} className="Auth-logo" role="presentation"/>
        <div style={{ textAlign:"center", margin:"20px", padding:"20px", display:"none" }}>
          <h1>준비중입니다.</h1>
        </div>
        <div style={{ display: false }}>
        <form className="SignUp-Form">
          <div className="rg-user-info col-md-12">
            <input type="hidden" name="userType" value={this.state.userType} />
            <fieldset className="form-group rg-user-email">
             <label htmlFor="email" className="errHandle">이메일 {this.getErrMsg("emailErr")}<strong style={{display: this.state.isValid, margin: 0, color: "#990c0c", fontSize: "10px"}}>정확한 이메일 양식을 입력하세요.</strong></label>
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
            <div className="rg-kinder-teacher">
            <fieldset className="form-group rg-user-pw">
             <label htmlFor="password" className="errHandle">비밀번호 {this.getErrMsg("passwordErr")} <strong style={{display: this.state.isValidPW, margin: 0, color: "#990c0c", fontSize: "10px"}}>영문자,숫자 조합으로 8~16자를 사용하세요.</strong> </label>
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
            <fieldset className="form-group rg-user-pwCnfrm">
             <label htmlFor="passwordConfirm" className="errHandle">비밀번호확인 {!isMatch && <strong className="errMessage">일치하지 않습니다.</strong>}</label>
             <input
              value={this.state.passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              onChange={this.onChange}
              placeholder="비밀번호 확인입력"
              required/>
            </fieldset>
            </div>
            <fieldset className="form-group rg-user-issuedCode">
              <label htmlFor="branch-signupCode" className="errHandle">지사코드 <strong className="errMessage">* 지사에서 발급 받은 지사코드 입력</strong></label>
               <input
                value={this.state.signupCode}
                className="rg-branch-name"
                id="branch-signupCode"
                name="signupCode"
                type="text"
                onChange={this.onChange}
                onBlur={this.isValidBranchCode}
                placeholder="지사코드"
                required/>
            </fieldset>
            <fieldset className="form-group rg-user-issuedCode">
              <label htmlFor="branch-kinderName" className="errHandle">원코드 <strong className="errMessage">* 지사에서 발급 받은 원코드 입력</strong></label>
               <input
                value={this.state.kinderName}
                className="rg-branch-name"
                id="branch-kinderName"
                name="kinderName"
                type="text"
                onChange={this.onChange}
                onBlur={this.isValidKinderCode}
                placeholder="원코드"
                required/>
            </fieldset>
          </div>
        </form>
        <div className="rg-submit col-md-12">
          <button onClick={this.onSubmit}>원(선생님)으로 회원가입</button>
          <div className="message">이미 회원이신가요?
            <Link to="login">로그인하기</Link>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    errorMessage: state.auth.errMsg,
    kinderCode: state.auth.matchedB
  }
}


export default connect(mapStateToProps, actions)(KinderSignUp)
