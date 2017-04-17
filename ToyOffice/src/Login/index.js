import React, {Component} from 'react'
import {Card } from 'material-ui/Card';
import {TextField, RaisedButton} from 'material-ui';
import { connect } from 'react-redux'
import * as actions from './actions'
import './login.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    err: this.props.err || '',
    height: window.innerHeight
  }
  componentWillReceiveProps(newProps){
    this.setState({err: newProps.err})
  }
  handleLogin = e => {
    e.preventDefault()
    this.props.tempoLogin(this.state)
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    // console.log("login",this.props.err);
    const logo = require('../../public/logo.png');
    return(
      <div className="Login-temp" style={{height: `${this.state.height}px`}}>
        <div className="Login-temp-back" style={{height: `${this.state.height}px`}}>
        <Card className="Login-cont" onSubmit={this.handleLogin}>
          <div className="Login-logo-cont">
            <img src={logo} className="Login-logo" alt="logo" />
            <h4>오피스 사이트 로그인</h4>
          </div>
          <form>
            <TextField
              hintText="이메일"
              floatingLabelText="이메일"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              errorText={this.state.err}
            />
            <TextField
              hintText="비밀번호"
              floatingLabelText="비밀번호"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              errorText={this.state.err}
            />
            <RaisedButton label="로그인" type="submit"/>
          </form>
        </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  err: state.login.err
})

export default connect(mapStateToProps, actions)(Login)
