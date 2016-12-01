import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signupUser} from '../../actions'
import {bindActionCreators} from 'redux'


class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault()
    this.props.signupUser(this.state)

  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group">
         <label>이메일:</label>
         <input
           value={this.state.email}
           name="email"
           type="text"
           placeholder="이메일 입력"
           className="form-control"
           onChange= {this.onChange}
         />
        </fieldset>
        <fieldset className="form-group">
         <label>비밀번호:</label>
         <input
          value={this.state.password}
          name="password"
          type="password"
          onChange= {this.onChange}
          placeholder="비밀번호 입력"
          className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
         <label>비밀번호확인:</label>
         <input
          value={this.state.passwordConfirm}
          name="passwordConfirm"
          type="password"
          onChange= {this.onChange}
          placeholder="비밀번호 확인입력"
          className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">회원가입</button>
      </form>
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
// export default SignupForm
