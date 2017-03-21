import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signupUser, isValidEmail } from '../actions'
import { searchAddress, selectedJuso } from '../../actions'
import logo from '../../../public/logo.png'
import AddrModal from '../../Shop/components/AddrModal'
import {Link} from 'react-router'


class BranchSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      signupCode:'',
      name: '',
      repr:'',
      bizType:'',
      bizItems:'',
      license:'',
      zipNo: '',
      roadAddr: '',
      detailAddr:'',
      isModalOpen: false,
      location: '',
      signupErr: '',
      emailErr: '',
      passwordErr: '',
      bizErr:'',
      codeErr:'',
      addrErr:'',
      userType: 'branch',
      isValid: "none",
      isValidPW: "none"
    }
  }
  componentDidMount(){
    this.props.isValidEmail()
  }
  onChange = e => {
    this.setState({
    [e.target.name]: e.target.value,
    emailErr: '',
    })
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
		const { searchAddress } = this.props
		this.setState({ isModalOpen: false, location: ''}, searchAddress(''))
	}
  isExistingEmail = () => {
   let validEmail = this.props.existingEmails.map(l => l.email).indexOf(this.state.email)
   if(validEmail !== -1) {
     alert('이미 가입된 이메일 입니다.')
     this.setState({emailErr: '이미 가입된 이메일 입니다.'})
   }
  }
  isSearchAddress = () => {
		const { searchAddress } = this.props
		searchAddress(this.state.location)
	}
  isEnterAddr = (e) => {
    if(e.key === 'Enter'){
      const { searchAddress } = this.props
  		searchAddress(this.state.location)
    }
  }
  isSelectedAddress = (result) => {
		const {selectedJuso} = this.props
		selectedJuso(result)
		this.closeModal()
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr
		})
	}
  isValidPassword = () => {
    let regexPassword = /^[a-z0-9_]{4,20}$/;
    if(regexPassword.test(this.state.password)){
      this.setState({isValidPW : "none"})
    } else {
      this.setState({isValidPW: true})
    }
  }
  isMatchPassword = () => {
    const isMatch = this.state.password === this.state.passwordConfirm
    if(!isMatch){
      this.setState({passwordErr: '비밀번호가 일치하지 않습니다.'})
    } else {
      this.setState({passwordErr: ''})
    }
  }
  isValidField = (nameErr) => {
    const {errorMessage} = this.props
    let nameErrs = errorMessage.find(l => l.type.match(nameErr))
    if(nameErrs) return nameErrs.msg
  }
  onSubmit = e => {
    e.preventDefault()
    const { signupUser } = this.props
    let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let regexPassword = /^[a-z0-9_]{4,20}$/;
    if(!regexEmail.test(this.state.email)){
      this.setState({emailErr: '이메일을 양식을 확인하세요.'})
    }
    if(!regexPassword.test(this.state.password)) {
      this.setState({
        isValidPW: true,
        passwordErr: '비밀번호를 확인하세요.'
      })
    }
    this.setState({isValid:"none", isValidPW :"none"})
    signupUser(this.state)

  }
  render() {
    const { juso} = this.props;
    return (
      <div className="SignUp-Container">
        <img src={logo} className="Auth-logo" role="presentation"/>
        <form className="row SignUp-Form">
          <div className="rg-user-info col-md-6">
            <input type="hidden" name="userType" value={this.state.userType} />
            <fieldset className="form-group rg-user-email">
             <label htmlFor="email" className="errHandle">
               이메일
               {this.state.emailErr}
               <strong className="errMessage">{this.isValidField("emailErr")}</strong>
             </label>
             <input
               value={this.state.email}
               id="email"
               name="email"
               type="text"
               placeholder="ex)toycode@toycode.org"
               onBlur={this.isExistingEmail}
               onChange={this.onChange}
               required
             />
            </fieldset>
            <fieldset className="form-group rg-user-pw">
             <label htmlFor="password" className="errHandle">비밀번호
               <strong className="errMessage">{this.isValidField("passwordErr")}</strong>
               <strong style={{display: this.state.isValidPW, margin: 0, color: "#990c0c", fontSize: "10px"}}>영문자,숫자 조합으로 8~16자를 사용하세요.</strong>
             </label>
             <input
              id="password"
              value={this.state.password}
              name="password"
              type="password"
              onChange={this.onChange}
              onBlur={this.isValidPassword}
              placeholder="비밀번호 입력"
              required
              />
            </fieldset>
            <fieldset className="form-group rg-user-pwCnfrm">
             <label htmlFor="passwordConfirm" className="errHandle">
               비밀번호확인
               <strong className="errMessage">{this.state.passwordErr}</strong>
             </label>
             <input
              value={this.state.passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              onChange={this.onChange}
              onBlur={this.isMatchPassword}
              placeholder="비밀번호 확인입력"
              required/>
            <label htmlFor="branch-signupCode" className="errHandle">
              가입코드
              <strong className="errMessage">{this.isValidField("codeErr")}</strong>
              </label>
             <input
              value={this.state.signupCode}
              className="rg-branch-name"
              id="branch-signupCode"
              name="signupCode"
              type="text"
              onChange={this.onChange}
              placeholder="가입코드"
              required/>
            </fieldset>
          </div>
          <div className="col-md-6">
            <fieldset className="rg-address-info form-group">
             <label htmlFor="address">주소
               <strong>{this.isValidField("addrErr")}</strong>
             </label>
             <div className="rg-address-zip">
               <input
                value={this.state.zipNo}
                name="Zipcode"
                type="text"
                onChange={this.onChange}
                placeholder="우편주소"
                required/>
                <div className="searchBtn" onClick={this.openModal}>주소검색</div>
                <AddrModal
                  isModalOpen={this.state.isModalOpen}
                  closeModal={this.closeModal}>
    							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
    							<div className="search-address-top">
    								<input className="search-input" type="search" value={this.state.location} onKeyPress={this.isEnterAddr} onChange={this.onChange} name="location" placeholder="ex) 강남구 강남대로 408" />
    								<i className="fa fa-search search-icon" aria-hidden="true" onClick={this.isSearchAddress}></i>
    							</div>
    							<div className="search-address-results">
    									{juso && juso.map((result, i)=> (
    										<div className="search-address-result" key={i} onClick={() => this.isSelectedAddress(result)}>
    											<p>{result.roadAddr}</p>
    										</div>
    									))}
    							</div>
                </AddrModal>
              </div>
              <input
               value={this.state.roadAddr}
               name="roadAddr"
               className="rg-address"
               type="text"
               onChange={this.onChange}
               placeholder="주소를 입력하세요"
               required/>
               <input
                value={this.state.detailAddr}
                name="detailAddr"
                id="address"
                className="rg-address"
                type="text"
                onChange={this.onChange}
                placeholder="상세 주소를 입력하세요"
                required/>
            </fieldset>
            <fieldset className="rg-branch-info form-group">
              <label htmlFor="branch-no" className="errHandle">사업자 번호
                <strong>{this.isValidField("bizErr")}</strong>
              </label>
               <input
                value={this.state.license}
                className="rg-branch-name"
                id="branch-no"
                name="license"
                type="text"
                onChange={this.onChange}
                placeholder="사업자번호"
                required/>
              <div className="rg-branch-info-ctx">
                <fieldset className="rg-branch-info-name">
                <label htmlFor="branch-name">상호명</label>
                 <input
                  value={this.state.name}
                  className="rg-branch-name"
                  id="branch-name"
                  name="name"
                  type="text"
                  onChange={this.onChange}
                  placeholder="상호명"
                  required/>
                </fieldset>
                <fieldset className="rg-branch-info-repr">
                  <label htmlFor="branch-repr">대표자</label>
                   <input
                    value={this.state.repr}
                    className="rg-branch-name"
                    id="branch-repr"
                    name="repr"
                    type="text"
                    onChange={this.onChange}
                    placeholder="대표자"
                    required/>
                </fieldset>
              </div>
              <div className="rg-branch-info-ctx">
                <fieldset className="rg-branch-info-bizType">
                 <label htmlFor="branch-bizType">업태</label>
                  <input
                   value={this.state.bizType}
                   className="rg-branch-name"
                   id="branch-bizType"
                   name="bizType"
                   type="text"
                   onChange={this.onChange}
                   placeholder="업태"
                   required/>
               </fieldset>
               <fieldset className="rg-branch-info-bizItems">
                 <label htmlFor="branch-bizItems">종목</label>
                  <input
                   value={this.state.bizItems}
                   className="rg-branch-name"
                   id="branch-bizItems"
                   name="bizItems"
                   type="text"
                   onChange={this.onChange}
                   placeholder="종목"
                   required/>
                 </fieldset>
               </div>
            </fieldset>
          </div>
        </form>
        <div className="rg-submit col-md-12">
          <button onClick={this.onSubmit}>회원가입</button>
          <div className="message">이미 회원이신가요?
            <Link to="login">로그인하기</Link>
          </div>
        </div>
      </div>
    )
  }
}



/*errorMessage.find(l => l.type === "addrErr").msg*/
function mapStateToProps(state){
  return{
    auth: state.auth,
    errorMessage: state.auth.errMsg,
    juso: state.commonData.juso,
		selectedJuso: state.commonData.selectedJuso,
    existingEmails: state.auth.existingEmail
  }
}


export default connect(
  mapStateToProps,
  { signupUser,
    searchAddress,
    selectedJuso,
    isValidEmail
  })(BranchSignUp)
