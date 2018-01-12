import React, {Component} from 'react'
import { Card } from 'material-ui/Card';
import { PrimaryButton, Modal } from '../Components'
import { connect } from 'react-redux'
import * as actions from './actions'
import './login.css'
import LoginTemp from './LoginTemp'
import axios from 'axios'



const Step = (PassedComponent) => ({ children, ...props }) => {
  console.log("Step",props.match, props.step);
  if(props.match !== props.step) {
    return <div style={{display: "none"}}></div>
  }
  return (
    <PassedComponent {...props}>
      {children}
    </PassedComponent>
  )
}

const LoginStep = Step(LoginTemp);


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
      customerType: "",
      selectedOption: "branch",
      location: "",
      modalStatus: false,


      step: 1
    }

    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleVerifiedCode = this.handleVerifiedCode.bind(this)
    this.handleSearchAddr = this.handleSearchAddr.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async verifiedCode(userType, code) {
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
        step: this.state.step+1
      })
    }

  }
  componentWillReceiveProps(newProps){
    this.setState({err: newProps.err})
  }
  handleLogin = e => {
    e.preventDefault()
    this.props.tempoLogin(this.state)
  }
  handleChange(e){
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
    this.verifiedCode(selectedOption, code)
  }
  handleSearchAddr(e) {
    e.preventDefault()
    this.props.searchAddress(this.state.location)
  }
  handleSelectAddr = (result) => {
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr,
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
  handleClick(e){
    e.preventDefault()
    // console.log(e.target.name)
    if(e.target.name === "link") {
      window.open("https://www.toycode.co.kr:125/")
    }
    if(e.target.name === "next") {

      this.setState({ step : this.state.step+1 })
    }
    if(e.target.name === "back") {
      this.setState({ step : this.state.step-1 })
    }
    if(e.target.name === "enter"){
      //TODO: 여기서 전송하기 버튼 다 구분해줘야함
      let filterStep = {
        1 : () => false,
        2 : () => this.handleVerifiedCode(),
        3 : () => false
      }
      filterStep[e.target.dataset.step]()
    }
  }
  render(){
    let {email, password, code, passwordConfirm, zipNo, roadAddr, detailAddr, parentId, selectedOption} = this.state;
    let stateObj = {
      email,
      password,
      parentId,
      code,
      passwordConfirm,
      zipNo,
      roadAddr,
      detailAddr
    }

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
          <LoginStep
            match={1}
            step={this.state.step}
            onChange={this.handleChange}
            onClick={this.handleClick}
            {...stateObj}
           />
          <LoginStep
            match={2}
            subHeader={'가입을 위해 발급된 코드를 입력하세요'}
            step={this.state.step}
            onChange={this.handleChange}
            onClick={this.handleClick}
            {...stateObj}
            selectedOption={selectedOption}
           />
          <LoginStep
            match={3}
            subHeader={'오피스 사이트 회원가입'}
            step={this.state.step}
            onChange={this.handleChange}
            onClick={this.handleClick}
            {...stateObj}
            selectedOption={selectedOption}
           />
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
