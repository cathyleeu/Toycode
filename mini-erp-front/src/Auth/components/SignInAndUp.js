import React, {Component} from 'react'
import { connect } from 'react-redux'
// import * as actions from '../actions'
import {toggleSignup, toggleSignin, signupUser, signinUser} from '../actions'
import {searchAddress, selectedJuso} from '../../actions'
import './SignInAndUp.css'
import logo from '../../../public/logo.png'
import AddrModal from '../../Shop/components/AddrModal'


class SignInAndUp extends Component {
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
      isValid: "none",
      isValidPW: "none"
    }
  }
  onChange = e => {
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  getErrMsg = (errType) => {
    const { errorMessage } = this.props;
    if(errorMessage){
      return <strong className="errMessage">{errorMessage[errType]}</strong>
    }
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
		const { searchAddress } = this.props
		this.setState({ isModalOpen: false, location: ''}, searchAddress(''))
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
  onSubmit = e => {
    e.preventDefault()
    const { signupUser, signinUser, auth } = this.props
    if(auth.status){
      let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      let regexPassword = /^[a-z0-9_]{4,20}$/;
      if(regexEmail.test(this.state.email)){
        this.setState({isValid: "none"})
        if(regexPassword.test(this.state.password)){
          this.setState({isValidPW : "none"})
          signupUser(this.state)
        } else {
          this.setState({isValidPW: true})
        }
      } else {
        this.setState({isValid: true})
      }
    } else {
      signinUser(this.state)
    }
  }
  isSignInAndUp = () => {
    const {toggleSignup, toggleSignin, auth} = this.props
    auth.status ? toggleSignin() : toggleSignup()
    this.setState({signupErr: ''})
  }
  render() {
    const { auth, juso } = this.props;
    const isMatch = (this.state.password === this.state.passwordConfirm);
    const SignUpFieldSet = (
      <div className="col-md-6">
        <fieldset className="rg-address-info form-group">
         <label htmlFor="address">?????? {this.getErrMsg("addrErr")}</label>
         <div className="rg-address-zip">
           <input
            value={this.state.zipNo}
            name="Zipcode"
            type="text"
            onChange={this.onChange}
            placeholder="????????????"
            required/>
            <div className="searchBtn" onClick={this.openModal}>????????????</div>
            <AddrModal
              isModalOpen={this.state.isModalOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
							<div className="search-address-top">
								<input className="search-input" type="search" value={this.state.location} onKeyPress={this.isEnterAddr} onChange={this.onChange} name="location" placeholder="ex) ????????? ???????????? 408" />
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
           placeholder="????????? ???????????????"
           required/>
           <input
            value={this.state.detailAddr}
            name="detailAddr"
            id="address"
            className="rg-address"
            type="text"
            onChange={this.onChange}
            placeholder="?????? ????????? ???????????????"
            required/>
        </fieldset>
        <fieldset className="rg-branch-info form-group">
          <label htmlFor="branch-no" className="errHandle">????????? ?????? {this.getErrMsg("bizErr")}</label>
           <input
            value={this.state.license}
            className="rg-branch-name"
            id="branch-no"
            name="license"
            type="text"
            onChange={this.onChange}
            placeholder="???????????????"
            required/>
          <div className="rg-branch-info-ctx">
            <fieldset className="rg-branch-info-name">
            <label htmlFor="branch-name">?????????</label>
             <input
              value={this.state.name}
              className="rg-branch-name"
              id="branch-name"
              name="name"
              type="text"
              onChange={this.onChange}
              placeholder="?????????"
              required/>
            </fieldset>
            <fieldset className="rg-branch-info-repr">
              <label htmlFor="branch-repr">?????????</label>
               <input
                value={this.state.repr}
                className="rg-branch-name"
                id="branch-repr"
                name="repr"
                type="text"
                onChange={this.onChange}
                placeholder="?????????"
                required/>
            </fieldset>
          </div>
          <div className="rg-branch-info-ctx">
            <fieldset className="rg-branch-info-bizType">
             <label htmlFor="branch-bizType">??????</label>
              <input
               value={this.state.bizType}
               className="rg-branch-name"
               id="branch-bizType"
               name="bizType"
               type="text"
               onChange={this.onChange}
               placeholder="??????"
               required/>
           </fieldset>
           <fieldset className="rg-branch-info-bizItems">
             <label htmlFor="branch-bizItems">??????</label>
              <input
               value={this.state.bizItems}
               className="rg-branch-name"
               id="branch-bizItems"
               name="bizItems"
               type="text"
               onChange={this.onChange}
               placeholder="??????"
               required/>
             </fieldset>
           </div>
        </fieldset>
      </div>
    )
    return (
      <div className={ auth.status ? "SignUp-Container" : "SignIn-Container"}>
        <img src={logo} className="Auth-logo" role="presentation"/>
        <form className={ auth.status ? "row SignUp-Form" : "SignIn-Form"}>
          <div className={ auth.status ? "rg-user-info col-md-6" : "rg-user-info col-md-12"}>
            <fieldset className="form-group rg-user-email">
             <label htmlFor="email" className="errHandle">????????? {this.getErrMsg("emailErr")}<strong style={{display: this.state.isValid, margin: 0, color: "#990c0c", fontSize: "10px"}}>????????? ????????? ????????? ???????????????.</strong></label>
             <input
               value={this.state.email}
               id="email"
               name="email"
               type="text"
               placeholder="ex)toycode@toycode.org"
               onChange={this.onChange}
               required
             />
            </fieldset>
            <fieldset className="form-group rg-user-pw">
             <label htmlFor="password" className="errHandle">???????????? {this.getErrMsg("passwordErr")} {auth.status && <strong style={{display: this.state.isValidPW, margin: 0, color: "#990c0c", fontSize: "10px"}}>?????????,?????? ???????????? 8~16?????? ???????????????.</strong>}</label>
             <input
              id="password"
              value={this.state.password}
              name="password"
              type="password"
              onChange={this.onChange}
              onBlur={this.isValidPassword}
              placeholder="???????????? ??????"
              required
              />
            </fieldset>
            {auth.status && (
              <fieldset className="form-group rg-user-pwCnfrm">
               <label htmlFor="passwordConfirm" className="errHandle">?????????????????? {!isMatch && <strong className="errMessage">???????????? ????????????.</strong>}</label>
               <input
                value={this.state.passwordConfirm}
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                onChange={this.onChange}
                placeholder="???????????? ????????????"
                required/>
              <label htmlFor="branch-signupCode" className="errHandle">???????????? {this.getErrMsg("codeErr")}</label>
               <input
                value={this.state.signupCode}
                className="rg-branch-name"
                id="branch-signupCode"
                name="signupCode"
                type="text"
                onChange={this.onChange}
                placeholder="????????????"
                required/>
              </fieldset>
            )}
            {this.getErrMsg("loginErr")}
          </div>
          { auth.status && SignUpFieldSet }
        </form>
        <div className="rg-submit col-md-12">
          <button onClick={this.onSubmit}>{ auth.status ? "????????????" : "?????????"}</button>
          <div className="message">{ auth.status ? "?????? ???????????????????" : "????????? ????????????????"}
            <a onClick={this.isSignInAndUp}>{ auth.status ? "???????????????" : "???????????? ??????"}</a>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    errorMessage: state.auth.errMsg,
    juso: state.commonData.juso,
		selectedJuso: state.commonData.selectedJuso
  }
}


export default connect(mapStateToProps, {signupUser, signinUser, searchAddress, toggleSignup, toggleSignin, selectedJuso})(SignInAndUp)
