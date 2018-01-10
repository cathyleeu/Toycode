import React, {Component} from 'react'
import { Card } from 'material-ui/Card';
import { TextField } from 'material-ui';
import { PrimaryButton, Modal } from '../Components'
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
      passwordConfirm: '',
      zipNo: "",
      roadAddr:"",
      detailAddr:"",
      emailErr: '',
      passwordErr: '',
      passwordConfirmErr: '',
      roadAddrErr: "",
      detailAddrErr:"",
      code: '',
      parentId: "",
      err: props.err || '',
      height: window.innerHeight,
      registerStep1: "none",
      registerStep2: "none",
      loginDisplay: "", //""
      customerType: "",
      selectedOption: "branch",
      location: "",
      modalStatus: false
    }

    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleLoginStep = this.handleLoginStep.bind(this)
    this.handleVerifiedCode = this.handleVerifiedCode.bind(this)
    this.handleSearchAddr = this.handleSearchAddr.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}Err`]: ""
    })
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
  handleSearchAddr(e) {
    e.preventDefault()
    this.props.searchAddress(this.state.location)
  }
  handleSelectAddr = (result) => {
    console.log(result);
    // const {selectedJuso} = this.props
		// selectedJuso(result)
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr,
      // detailAddr: result.detailAddr || '',
      location: '',
      modalStatus: false
		})
    this.props.searchAddress('')
  }
  validate = () => {
    let isError = false;
    let { email, password, passwordConfirm, detailAddr, roadAddr, customerType } = this.state;
    const errors = {
      emailErr: '',
      passwordErr: '',
      passwordConfirmErr: '',
      roadAddrErr: "",
      detailAddrErr:""
    };

    if (email.indexOf("@") === -1) {
      isError = true;
      errors.emailErr = "정확한 이메일을 기입하세요.";
    }
    if (password === "") {
      isError = true;
      errors.passwordErr = "비밀번호를 기입하세요.";
    }
    if (passwordConfirm === "") {
      isError = true;
      errors.passwordConfirmErr = "비밀번호를 기입하세요.";
    }
    if(password !== passwordConfirm) {
      isError = true;
      errors.passwordConfirmErr = "비밀번호가 일치하지 않습니다.";
    }
    if(customerType === "Z") {
      if (roadAddr === "") {
        isError = true;
        errors.roadAddrErr = "주소를 기입하세요.";
      }
      if (detailAddr === "") {
        isError = true;
        errors.detailAddrErr = "상세주소를 기입하세요.";
      }
    }


    this.setState({
      ...errors
    });

    return isError;
  }
  handleSignUp() {
    let validateErr = this.validate()

    if(!validateErr) {
      alert("success")

    }
  }
  render(){
    let radioName = [
      { name: "지사", value: "branch" },
      { name: "학원", value: "academy" },
      { name: "선생님", value: "teacher" },
    ]
    let { juso } = this.props;
    return(
      <div className="Login-temp" style={{height: `${this.state.height}px`}}>
        <Modal
          isModalOpen={this.state.modalStatus}
          modalWidth="600px">

          <form onSubmit={this.handleSearchAddr} className="search-bar">
            <input className="search-input" type="search" value={this.state.location} onChange={this.handleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
            <PrimaryButton
              // buttonStyle="search-btn"
              buttonType="button"
              purpose="create"
              onClick={this.handleSearchAddr}
              // handleButtonEvent={this.handleSearchAddr}
              content="검색"
            />
          </form>
          <div className="search-address-results">
            {juso && juso.map((result, i)=> (
              <div className="search-address-result" key={i} onClick={() => this.handleSelectAddr(result)}>
                <p><strong>도로명주소</strong> {result.roadAddr}</p>
                <hr className="search-address-hr"/>
                <p><strong>지번주소</strong> : {result.jibunAddr}</p>
              </div>
            ))}
          </div>

          <PrimaryButton
            content="닫기"
            buttonType="button"
            onClick={() => this.setState({modalStatus: false })}
            purpose="create" />
        </Modal>
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
                className="registerStep2"
                value={this.state.email}
                onChange={this.handleChange}
                errorText={this.state.emailErr}
              />
              <TextField
                hintText="비밀번호"
                floatingLabelText="비밀번호"
                type="password"
                name="password"
                className="registerStep2"
                value={this.state.password}
                onChange={this.handleChange}
                errorText={this.state.passwordErr}
              />
              <TextField
                hintText="비밀번호 확인"
                floatingLabelText="비밀번호 확인"
                type="password"
                name="passwordConfirm"
                className="registerStep2"
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
                errorText={this.state.passwordConfirmErr}
              />

              { this.state.selectedOption !== "teacher"
                ? (
                  <div className="addrForm">
                    <TextField
                      hintText="우편주소"
                      floatingLabelText="우편주소"
                      inputStyle={{color: "black"}}
                      type="text"
                      className="registerStep2"
                      disabled={true}
                      name="zipNo"
                      value={this.state.zipNo}
                    />
                    <PrimaryButton
                      content="주소"
                      onClick={() => this.setState({
                        modalStatus: true
                      })}
                      // customClassName="Loing-Btn"
                      buttonType="button"
                      purpose="create" />
                  </div>
                )
                : false
              }
              { this.state.selectedOption !== "teacher"
                ? <TextField
                  hintText="주소"
                  floatingLabelText="주소"
                  type="text"
                  className="registerStep2"
                  inputStyle={{color: "black"}}
                  disabled={true}
                  name="roadAddr"
                  value={this.state.roadAddr}
                  errorText={this.state.roadAddrErr}
                />
                : false
              }
              { this.state.selectedOption !== "teacher"
                ? <TextField
                  hintText="상세주소"
                  floatingLabelText="상세주소"
                  type="text"
                  className="registerStep2"
                  name="detailAddr"
                  value={this.state.detailAddr}
                  onChange={this.handleChange}
                  errorText={this.state.detailAddrErr}
                />
                : false
              }
            </form>
            <PrimaryButton
              content="회원가입"
              customClassName="Loing-Btn"
              buttonType="submit"
              onClick={this.handleSignUp}
              purpose="create" />
          </LoginTemp>
        </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  err: state.login.err,
  juso: state.login.juso
})

export default connect(mapStateToProps, actions)(Login)
