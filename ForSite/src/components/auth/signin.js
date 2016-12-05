import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signinUser, authError} from '../../actions'
import {bindActionCreators} from 'redux'


class Signin extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e){
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

  onSubmit(e){
    e.preventDefault()
    this.props.signinUser(this.state)
  }
  render() {
    return (
      <div className="FormCont">
      <form onSubmit={this.onSubmit} className="LoginForm">
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
          required
          />
        </fieldset>
        {this.renderAlert()}
        <div className="Form-Bottom">
          <button action="submit" className="btn btn-primary">로그인</button>
          <Link to="/signup">회원가입</Link>
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
    // props로 사용할 이름 : reducer에서 불러오는 것
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signinUser:signinUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Signin)
