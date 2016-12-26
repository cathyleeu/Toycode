import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signupUser} from '../../actions'
import {bindActionCreators} from 'redux'
const Validator = require('validator');




class SignupForm extends Component {
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
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  isValidate(){
    const data = this.state
    if(!Validator.equals(data.password, data.passwordConfirm)){
      return (
        <div className="alert alert-danger">
          패스워드가 다릅니다.
        </div>
      )
    }
    if(!Validator.isEmail(data.email)){
      return (
        <div className="alert alert-danger">
          유효한 메일이 아닙니다.
        </div>
      )
    }
    if(Validator.isEmpty(data.email)|| Validator.isEmpty(data.password) ||Validator.isEmpty(data.passwordConfirm)){
      return (
        <div className="alert alert-danger">
          양식을 정확히 입력해 주세요.
        </div>
      )
    }
  }
  onSubmit(e){
    e.preventDefault()
    this.props.signupUser(this.state)
  }
  render() {
    return (
      <div className="FormCont">
        <form onSubmit={this.onSubmit} className="LoginForm">
          {this.isValidate()}
          <fieldset className="form-group">
           <label>이메일</label>
           <input
             value={this.state.email}
             name="email"
             type="text"
             placeholder="이메일 입력"
             className="form-control"
             onChange= {this.onChange}
             required
           />
          </fieldset>
          <fieldset className="form-group">
           <label>비밀번호</label>
           <input
            value={this.state.password}
            name="password"
            type="password"
            onChange= {this.onChange}
            placeholder="비밀번호 입력"
            className="form-control"
            required/>
          </fieldset>
          <fieldset className="form-group">
           <label>비밀번호확인</label>
           <input
            value={this.state.passwordConfirm}
            name="passwordConfirm"
            type="password"
            onChange= {this.onChange}
            placeholder="비밀번호 확인입력"
            className="form-control"
            required/>
          </fieldset>
          <div className="row">
            <fieldset className="form-group col-md-6">
             <label>지사상호명</label>
             <input
              value={this.state.Name}
              name="Name"
              type="text"
              onChange= {this.onChange}
              placeholder="지사명을 입력하세요"
              className="form-control"
              required/>
            </fieldset>
            <fieldset className="form-group col-md-6">
             <label>사업자 등록번호</label>
             <input
              value={this.state.License}
              name="License"
              type="text"
              onChange= {this.onChange}
              placeholder="사업자 등록번호를 입력하세요"
              className="form-control"
              required/>
            </fieldset>
          </div>
          <fieldset className="form-group">
           <label>사업장 주소</label>
           <input
            value={this.state.Address}
            name="Address"
            type="text"
            onChange= {this.onChange}
            placeholder="사업장 주소를 입력하세요"
            className="form-control"
            required/>
          </fieldset>
          <div className="Form-Bottom">
            <button action="submit" className="btn btn-primary">회원가입</button>
            <Link to="/">홈으로 가기</Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    // auth: state.auth,
    errorMessage: state.auth.error
    // props로 사용할 이름 : reducer에서 불러오는 것
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signupUser:signupUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
