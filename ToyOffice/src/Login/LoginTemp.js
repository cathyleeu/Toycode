import React from 'react'
import { TextField } from 'material-ui';
import { PrimaryButton, ToyCodeSelect } from '../Components'


const logo = require('../../public/logo.png');



const LoginButton = (props) => {
  let filterButton = {
    "enter": [1,2,3],
    "next" : [1],
    "back" : [2],
    "link" : [1]
  }
  let displayButton = filterButton[props.name].indexOf(props.step) !== -1 ? "" : "none" ;
  return (
    <PrimaryButton
      customClassName="Loing-Btn"
      buttonName={props.name}
      buttonType={props.type}
      buttonDisplay={displayButton}
      dataStep={props.step}
      onClick={props.onClick}
      content={props.content}
      purpose="create" />
  )
}


const LoginInput = (props) => {
  let filterInput = {
    1: {
     "all" : ["email", "password"]
    },
    2: {
     "branch" : ["code"],
     "academy" : ["code"],
     "teacher" : ["code", "parentId"]
    },
    3: {
     "branch" : ["email", "password", "passwordConfirm", "zipNo", "roadAddr", "detailAddr"],
     "academy" : ["email", "password", "passwordConfirm", "zipNo", "roadAddr", "detailAddr"],
     "teacher" : ["email", "password", "passwordConfirm"]
    }
  }
  let selectType = props.selectedOption ? props.selectedOption : "all" ;

  let display = filterInput[props.step][selectType].indexOf(props.name) !== -1 ? true : false ;

  if(!display) {
    return <div style={{display: "none"}}></div>
  }
  if(display && props.name === "zipNo") {
    return (
      <div className="addrForm">
        <TextField
          className={"registerInput"}
          hintText={props.text}
          floatingLabelText={props.text}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          errorText={props.errText}
          disabled={true}
        />
        <PrimaryButton
          content="검색"
          // onClick={() => this.setState({
          //   modalStatus: true
          // })}
          buttonType="button"
          purpose="create" />
      </div>
    )
  }
  return (
      <TextField
        // className={props.customStyle}
        className={"registerInput"}
        hintText={props.text}
        floatingLabelText={props.text}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        errorText={props.errText}
        disabled={props.disabled}
      />
  )}

const LoginTemp = (props) => {
  let {
    step,
    onChange,
    onClick,
    selectedOption
  } = props;

  let inputProps = {
    step,
    onChange,
    selectedOption
  };

  let buttonProps = {
    step,
    onClick,
    selectedOption
  }

  let radioName = [
      { name: "지사", value: "branch" },
      { name: "학원", value: "academy" },
      { name: "선생님", value: "teacher" },
  ]
  let radioDisplay = props.step === 2 ? "" : "none";
  let textDisplay = props.step === 1 ? "" : "none";
  return(
    <div>
      <div className="Login-logo-cont">
        <img src={logo} className="Login-logo" alt="logo" />
      </div>
      {props.subHeader ? <h4>{props.subHeader}</h4> : false}
      <ToyCodeSelect
        display={radioDisplay}
        labelName="회원 유형을 선택하세요"
        name="selectedOption"
        value={props.selectedOption}
        handleChange={onChange}
        options={radioName}
      />
      <LoginInput text="이메일" name="email" value={props["email"]} {...inputProps}/>
      <LoginInput text="비밀번호" name="password" value={props["password"]} {...inputProps}/>
      <LoginInput text="비밀번호 확인" name="passwordConfirm" value={props["passwordConfirm"]} {...inputProps}/>
      <LoginInput text="지사코드 입력" name="parentId" value={props["parentId"]} {...inputProps}/>
      <LoginInput text="코드입력" name="code" value={props["code"]} {...inputProps}/>
      <LoginInput text="우편주소" name="zipNo" value={props["zipNo"]} {...inputProps}/>
      <LoginInput text="주소" name="roadAddr" value={props["roadAddr"]} disabled={true} {...inputProps}/>
      <LoginInput text="상세주소" name="detailAddr" value={props["detailAddr"]} {...inputProps}/>

      {/* {props.children} */}
      <LoginButton type="button" name={"enter"} {...buttonProps} content="전송" />
      <p style={{display: textDisplay}}>회원이 아니신가요?</p>
      <LoginButton type="button" name={"next"} {...buttonProps} content="회원가입" />
      <LoginButton type="button" name={"back"} {...buttonProps} content="로그인 하기" />
      <LoginButton type="button" name={"link"} {...buttonProps} content="공식 홈페이지" />
    </div>
  )
}



export default LoginTemp
