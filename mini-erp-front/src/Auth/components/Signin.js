import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signinUser, authError } from '../actions'
import { bindActionCreators } from 'redux'
import './Signin.css'


class Signin extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
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
    this.props.signinUser(this.state)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="LoginForm">
        <fieldset className="form-group">
         <label htmlFor="email">이메일</label>
         <input
           value={this.state.email}
           id="email"
           name="email"
           type="text"
           placeholder="이메일 입력"
           onChange= {this.onChange}
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
          onChange= {this.onChange}
          placeholder="비밀번호 입력"
          required
          />
        </fieldset>
        {this.renderAlert()}
        <div className="Form-Bottom">
          <button action="submit">로그인</button>
          <div className="message">회원이 아니신가요? <Link to="/signup"><p>회원가입 하기</p></Link></div>
        </div>
      </form>
    )
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    errorMessage: state.auth.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signinUser:signinUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Signin)
