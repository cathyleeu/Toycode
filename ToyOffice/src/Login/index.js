import React, {Component} from 'react'
import { Card } from 'material-ui/Card';
import { TextField } from 'material-ui';
import { PrimaryButton } from '../Components'
import { connect } from 'react-redux'
import * as actions from './actions'
import './login.css'
import LoginTemp from './LoginTemp'
import axios from 'axios'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      code: '',
      parentId: "",
      passwordConfirm: '',
      err: props.err || '',
      height: window.innerHeight,
      registerStep1: "none",
      registerStep2: "none",
      loginDisplay: "",
      customerType: "",
      selectedOption: "branch"
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleLoginStep = this.handleLoginStep.bind(this)
    this.handleVerifiedCode = this.handleVerifiedCode.bind(this)
  }
  async verifiedCode(userType, code, step, nextStep) {
    const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
    code = code.trim().toLocaleLowerCase()
    let verifyObj = {}

    if(userType === "teacher") {
      verifyObj["parentId"] = this.state.parentId;
      verifyObj["code"] = this.state.code;
    }
    verifyObj["userType"] = userType

    let verification = await axios.post(`${ROOT_URL}/verification/${code}`, verifyObj )
    let { message, result, customerType } = verification.data;

    alert(message)

    if(result) {
      this.setState({
        customerType,
        [step]: "none",
        [nextStep] : ""
      })
    }

  }
  componentWillMount(){
    // debugger
  }
  componentDidMount(){

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
  handleOptionChange(e){
    this.setState({selectedOption: e.target.value})
  }
  handleVerifiedCode(e){
    let { selectedOption, code } = this.state;
    this.verifiedCode(selectedOption, code, "registerStep1", "registerStep2")
  }
  handleLoginStep(e){

    // this.setState({
    //   registerStep1: "none",
    //   registerStep2: ""
    // })
  }
  render(){
    let radioName = [
      { name: "지사", value: "branch" },
      { name: "학원", value: "academy" },
      { name: "선생님", value: "teacher" },
    ]
    return(
      <div className="Login-temp" style={{height: `${this.state.height}px`}}>
        <div className="Login-temp-back" style={{height: `${this.state.height}px`}}>
        <Card className="Login-cont" onSubmit={this.handleLogin} >
          <LoginTemp displayStatus={this.state.loginDisplay}>
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
                <PrimaryButton
                  content="로그인"
                  customClassName="Loing-Btn"
                  buttonType="submit"
                  purpose="create" />
              </form>
              <p>회원이 아니신가요?</p>
              <PrimaryButton
                content="회원가입 하기"
                customClassName="Loing-Btn"
                onClick={() => this.setState({registerStep1: "", loginDisplay: "none" })}
                purpose="create" />
              <PrimaryButton
                content="공식 홈페이지"
                customClassName="Loing-Btn"
                onClick={() => window.open("https://www.toycode.co.kr:125/")}
                purpose="create" />
          </LoginTemp>
        <LoginTemp
          displayStatus={this.state.registerStep1}
          subHeader={'가입을 위해 발급된 코드를 입력하세요'}>
          <div>
            {radioName.map((r,i) => (
              <label key={i}>
                {r.name}
                <input
                  type="radio" name={r.value} value={r.value}
                  checked={this.state.selectedOption === r.value}
                  onChange={this.handleOptionChange}
                />
              </label>
            ))}
          </div>
          <form>
            {this.state.selectedOption === "teacher"
              ? <TextField
                hintText="지사코드"
                floatingLabelText="지사코드"
                name="parentId"
                value={this.state.parentId}
                onChange={this.handleChange}
                errorText={this.state.err}
              />
              : false
            }
            <TextField
              hintText="가입코드"
              floatingLabelText="가입코드"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              errorText={this.state.err}
            />
          </form>
          <PrimaryButton
            content="전송"
            customClassName="Loing-Btn"
            // buttonType="submit"
            onClick={this.handleVerifiedCode}
            purpose="create" />
          <PrimaryButton
            content="로그인 하기"
            customClassName="Loing-Btn"
            onClick={() => this.setState({
              registerStep1: "none",
              loginDisplay: ""
            })}
            purpose="create" />

        </LoginTemp>
          <LoginTemp
            displayStatus={this.state.registerStep2}
            subHeader={'오피스 사이트 회원가입'}>
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
              <TextField
                hintText="비밀번호 확인"
                floatingLabelText="비밀번호 확인"
                type="passwordConfirm"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
                errorText={this.state.err}
              />
              { this.state.selectedOption !== "teacher"
                ? <TextField
                  hintText="우편주소"
                  floatingLabelText="우편주소"
                  type="text"
                  // name="passwordConfirm"
                  // value={this.state.passwordConfirm}
                  // onChange={this.handleChange}
                  errorText={this.state.err}
                />
                : false
              }
              { this.state.selectedOption !== "teacher"
                ? <TextField
                  hintText="상세주소"
                  floatingLabelText="상세주소"
                  type="text"
                  // name="passwordConfirm"
                  // value={this.state.passwordConfirm}
                  // onChange={this.handleChange}
                  errorText={this.state.err}
                />
                : false
              }
            </form>
            <PrimaryButton
              content="회원가입"
              customClassName="Loing-Btn"
              buttonType="submit"
              purpose="create" />
          </LoginTemp>
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
