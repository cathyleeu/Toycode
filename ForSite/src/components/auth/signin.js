import React, {Component} from 'react'
import {Link} from 'react-router'


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
  onSubmit(e){
    e.preventDefault()
    this.props.signinUser(this.state)

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
        <button action="submit" className="btn btn-primary">로그인</button>
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    )
  }
}

Signin.propTypes = {
  signinUser: React.PropTypes.func.isRequired
}

export default Signin
