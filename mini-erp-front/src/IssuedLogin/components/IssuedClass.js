import React, {PureComponent} from 'react'
import './IssuedClass.css'
import IssuedNames from './IssuedNames'
import moment from 'moment-timezone'



const ReportInput = (props) => {
  return (
    <label>
      {props.title}
      <input
        type="radio"
        value={props.value}
        name="range"
        checked={props.value === props.checked}
        onChange={props.handleChange}
      />
    </label>
  )
}
const ReportModal = (props) => {
  let outerStyle = {
    height : `${window.innerHeight}px`,
    width : `${window.innerWidth}px`,
    top : `${window.scrollY}px`
  }
  return(
  <div
    className="modal_outerStyle"
    style={{
        ...outerStyle,
				display: props.isModalOpen ? "block" : "none"
		}}
  >
    <div className="modal_innerStyle">
      {props.children}
    </div>
  </div>
)}

const IssuedClassTop = (props) => {
  //() => this.setState({ added: false })
  let status = {
    "noname" : {
      "instr" : "none",
      "cancle" : "none",
      "save" : "none",
      "edit" : "none",
      "register" : "block"
    },
    "hasname" : {
      "instr" : "block",
      "cancle" : "none",
      "save" : "none",
      "edit" : "block",
      "register" : "none"
    },
    "editname" : {
      "instr" : "block",
      "cancle" : "block",
      "save" : "block",
      "edit" : "none",
      "register" : "none"
    },
    "createname" : {
      "instr" : "block",
      "cancle" : "block",
      "save" : "block",
      "edit" : "none",
      "register" : "none"
    }
  }

  return (
    <div className="issued-login-top">
      <p style={{display: status[props.topStatus].instr}}>
        학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.
      </p>
      <button
        className='button-save'
        style={{display: status[props.topStatus].save}}
        name="hasname"
        data-purpose="save"
        onClick={(e) => props.handleTopStatus(e)}>완료</button>

      <button
        className='button-cancle'
        style={{display: status[props.topStatus].cancle}}
        name="hasname"
        data-purpose="cancle"
        onClick={(e) => props.handleTopStatus(e) }>취소하기</button>

      <button
        className='button-addClass'
        style={{display: status[props.topStatus].edit}}
        name="editname"
        onClick={(e) => props.handleTopStatus(e)}>수정하기</button>

      <button
        className='button-addClass register_names'
        style={{display: status[props.topStatus].register}}
        name="createname"
        onClick={(e) => props.handleTopStatus(e)}>학생 이름 등록하기</button>
    </div>



  )
}

class IssuedClass extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      isEditing: true, //for disabled textarea
      isModalOpen: false,
      topStatus: "",
      prevStatus: "",
      range: "monthly",
      volume: "",
      monthly : {
        A: [
          { name: "10", val: "a9"},
          { name: "11", val: "a10_"},
          { name: "12(겨울특별)", val: "a105"}
        ],
        B: [
          { name: "2", val: "b2re"},
          { name: "3", val: "b3re"},
          { name: "4", val: "b4re"},
          { name: "5", val: "b5re"},
          { name: "6(여름특별)", val: "b55"},
          { name: "7", val: "b6"},
          { name: "8", val: "b7"},
          { name: "9", val: "b8"},
          { name: "10", val: "b9"},
          { name: "11", val: "b10_"},
          { name: "12(겨울특별)", val: "b105"}
        ],
        C: [
          { name: "2", val: "c2re"},
          { name: "3", val: "c3re"},
          { name: "4", val: "c4re"},
          { name: "5", val: "c5re"},
          { name: "6(여름특별)", val: "c55re"},
          { name: "7", val: "c6"},
          { name: "8", val: "c7"},
          { name: "9", val: "c8"},
          { name: "10", val: "c9"},
          { name: "11", val: "c10_"},
          { name: "12(겨울특별)", val: "c105"}
        ]
      },
      quarter : {
        A: [
          {name: "10-12(겨울특별)", val: "a9|a10_|a105"}
        ],
        B: [
          {name: "1-3", val: "b2re|b3re"},
          {name: "4-6(여름특별)", val: "b4re|b5re|b55"},
          {name: "7-9", val: "b6|b7|b8"},
          {name: "10-12(겨울특별)", val: "b9|b10_|b105"}
        ],
        C: [
          {name: "1-3", val: "c2re|c3re"},
          {name: "4-6(여름특별)", val: "c4re|c5re|c55re"},
          {name: "7-9", val: "c6|c7|c8"},
          {name: "10-12(겨울특별)", val: "c9|c10_|c105"}
        ]
      }
    }
  }
  componentWillMount() {
    console.log("IssuedClass componentWillMount");
    let topStatus = this.props.studentsNames.length < 1 ? "noname" : "hasname"
    this.setState({
      topStatus
    })
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName, studentsNames } = this.props;

    isRegisteredNames(parentId,kinderId,kclassId,kclassName, studentsNames)
    this.setState({ isEditing: true })
  }
  isEditingNames = () => {
    const {isEditingNames, kclassId, kclassName, editingNames } = this.props;
    const students = editingNames[kclassId].students;

    isEditingNames(kclassId, students , kclassName)
    this.setState({ isEditing: true })
  }
  handleTopStatus = ( e ) => {
    e.preventDefault()

    let topStatus = e.target.name;
    let purpose = e.target.dataset.purpose;
    let prevStatus = this.state.prevStatus;
    let isEditing = true;
    // debugger
    // e.target.purpose
    if(prevStatus === "noname" && purpose === "cancle") {
      topStatus = "noname"
    }
    if(topStatus === "editname") {
      isEditing = false;
    }
    if(prevStatus === "noname" && purpose === "save") {
      console.log("posting");
      this.isPostingNames()
    }
    if(prevStatus === "hasname" && purpose === "save") {
      console.log("editing");
      this.isEditingNames()
    }
    this.setState((prev) => ({
        topStatus,
        prevStatus : prev.topStatus,
        isEditing
      })
    )
  }
  handleOpenModal = (e) => {
    let body = e.target.ownerDocument.body;

    this.setState((prev) => {
      body.classList.toggle("preventScroll")
      return ({
        isModalOpen: !this.state.isModalOpen
      })
    })

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleOpenReport = (e) => {
    const { kinderName, kclassName, kinderUrl, studentsNames, kclassId } = this.props;
    let { volume, range } = this.state;

    if(volume === "") {
      alert("범위를 선택해주세요.")
      return;
    }

    let url = `http://localhost:3001/reports?code=${kinderUrl}&classId=${kclassId}&school=${kinderName}&className=${kclassName}&level=${volume}&students=${studentsNames}&range=${range}`
    window.open(url, "_blank")

    this.handleOpenModal(e)
  }
  render(){
    const { kinderName, kclassName, kinderUrl, level, disabled, studentsNames, kinderLang, kclassId, kinderId } = this.props;

    let mon = moment().set({year:2017, month:3});
    // YBM 대구지사 3월로 고정 예외처리
    if(kinderId.split("-")[0] === "C00071") {
      mon = moment().set({year:2017, month:2});
    }
    return(
      <div className='issued-login'>
        <ReportModal
          isModalOpen={this.state.isModalOpen}
        >
          <div>
            <ReportInput
              value={'monthly'}
              title={'월별'}
              checked={this.state.range}
              handleChange={this.handleChange}
            />
            <ReportInput
              value={'quarter'}
              title={'분기별'}
              checked={this.state.range}
              handleChange={this.handleChange}
            />
          </div>
          <div>
            <select onChange={this.handleChange} name="volume">
              <option value="">---선택하세요---</option>
              {this.state[this.state.range][level].map( (vol, i) => (
                <option key={i} value={vol.val}>
                  {`${level}${vol.name}권`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className='button-cancle' onClick={this.handleOpenModal}>취소</button>
            <button className='button-save' onClick={this.handleOpenReport}>확인</button>
          </div>

        </ReportModal>
        <div className="issued-login-top issued-kinder-info">
          <i className="fa fa-id-card" aria-hidden="true"></i>
          <p className="issued-info">{kinderName} - {kclassName}</p>
          <form action="https://toycode.org/issue" method="POST" target="_blank">
            <input type="hidden" name="code" value={kinderUrl} />
            <input type="hidden" name="school" value={kinderName} />
            <input type="hidden" name="lang" value={kinderLang} />
            <input type="hidden" name="className" value={kclassName} />
            <input type="hidden" name="yearmonth" value={mon.format('YYYYMM')} />
            <input type="hidden" name="level" value={level} />
            <input type="hidden" name="students" value={studentsNames[kclassId] ? studentsNames[kclassId].students : ''} />
            <button
              className='button-edit'
              disabled={disabled}
              onClick={() => {
                return(
                  alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.')
                )}}>
                  로그인발급
            </button>
          </form>
          {/* http://office.toycode.org/reports  */}
          {(kinderId.split("-")[0] === "C00176" || kinderId.split("-")[0] === "A00083" || kinderId.split("-")[0] === "C00071")
            ? <div>
              <button
                onClick={this.handleOpenModal}
                className='button-edit'>
                이력관리 리포트
              </button>
            </div>
            : false
          }

        </div>
        <IssuedClassTop
          topStatus={this.state.topStatus}
          handleTopStatus={this.handleTopStatus}
        />
        {this.state.topStatus !== "noname"
          &&
          <IssuedNames {...this.props}
            disabled={this.state.isEditing}
            studentsNames={studentsNames.join("\n")}
          />
        }

      </div>
    )
  }
}

export default IssuedClass;
