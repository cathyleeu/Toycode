import React, {Component} from 'react'
import { Card } from 'material-ui/Card';
import { PrimaryButton, Modal } from '../Components'
import { connect } from 'react-redux'
import * as actions from './actions'
import './login.css'
import LoginTemp from './LoginTemp'
import axios from 'axios'



const Step = (PassedComponent) => ({ children, ...props }) => {
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
      step: 3,

      email: '',
      password: '',
      passwordConfirm: '',
      zipNo: "",
      roadAddr:"",
      detailAddr:"",

      code: '',
      parentId: "",
      customerType: "",
      selectedOption: "branch",

      err: props.err || {}, //로그인 잘못할 경우 오는 err

      location: "",
      modalStatus: false,
      height: window.innerHeight,

    }

    this.handleVerifiedCode = this.handleVerifiedCode.bind(this)
    this.handleSearchAddr = this.handleSearchAddr.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
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
  handleChange(e){
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    this.props.emptyErr(e.target.name)
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
    this.props.emptyErr('roadAddr')
    this.props.searchAddress('')
  }
  handleBlur(e) {
    this.props.existingEmail(this.state.email)
  }
  handleSubmit(e) {
    //TODO: 서버로 날리기~~~ step에 있는 버튼에 따라 로그인, 회원가입 Submit 구분해주기
    let step = e.target.dataset.step
    let submitType = {
      1 : () => this.props.postLogin(this.state),
      3 : () => this.props.postRegister(this.state)
    }
    submitType[step]()
  }
  handleClick(e){
    e.preventDefault()
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
      let filterStep = {
        1 : (e) => this.handleSubmit(e),
        2 : () => this.handleVerifiedCode(),
        3 : (e) => this.handleSubmit(e)
      }
      filterStep[e.target.dataset.step](e)
    }
  }
  render(){
    let { location, modalStatus, height, selectedOption, ...restState } = this.state;
    let { juso } = this.props;
    return(
      <div className="Login-temp" style={{height: `${height}px`}}>
        <Modal
          isModalOpen={this.state.modalStatus}
          modalWidth="600px">

          <form onSubmit={this.handleSearchAddr} className="search-bar">
            <input className="search-input" type="search" value={this.state.location} onChange={this.handleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
            <PrimaryButton
              buttonType="button"
              purpose="create"
              onClick={this.handleSearchAddr}
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
        <div className="Login-temp-back" style={{height: `${height}px`}}>
        <Card className="Login-cont" onSubmit={this.handleLogin} >
          <LoginStep
            match={1}
            step={this.state.step}
            onChange={this.handleChange}
            onClick={this.handleClick}
            {...restState}
           />
          <LoginStep
            match={2}
            subHeader={'가입을 위해 발급된 코드를 입력하세요'}
            step={this.state.step}
            onChange={this.handleChange}
            onClick={this.handleClick}
            {...restState}
            selectedOption={selectedOption}
           />
          <LoginStep
            match={3}
            subHeader={'오피스 사이트 회원가입'}
            step={this.state.step}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            {...restState}
            modalControl={() => this.setState({ modalStatus: true })}
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
