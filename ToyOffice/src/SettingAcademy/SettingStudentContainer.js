import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'

import moment from 'moment-timezone'

import { BodyContainer } from '../Components'
// import FilteredList from './FilteredList'
// import SettingAcademyClassModal from './SettingAcademyClassModal'
import StudentNamesCard from './StudentNamesCard'
import './index.css'

class SettingStudentContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      ...props.location.state,
      loaded: false,
      // academies: [],
      selectedAcademy: {},
      // createAcademyClass: false,
      // editAcademyClass: false,
      // modalRenderData: {}
      students: [],
      disabled: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderStudentNames = this.renderStudentNames.bind(this)
    // console.log(props.location.state);
  }
  componentWillMount(){
    this.props.getStudentNames(
      this.state.parentId,
      this.state.academyId,
      this.state.classId
    )
  }
  componentWillReceiveProps(newProps) {
    if(newProps.students !== this.props.students){

      this.setState({
        students: newProps.students[this.state.classId],
        // selectedAcademy: newProps.academies[0],
        loaded: true
      })
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleModal(e, modalData) {
    let { name } = e.currentTarget.dataset;
    this.setState({
      [name] : !this.state[name],
      modalRenderData: {...modalData}
    })
  }
  handleSubmit() {
    // debugger
    this.props.createStudentIds(this.state)
  }
  renderStudentNames(name){
    return <StudentNamesCard key={name._id}
              {...name}
              history={this.props.history}
              // location={this.props.location}
              academyName={this.state.academyName}
              className={this.state.className}
           />
  }
  render(){
    let { academyUrl, academyName, academyLang, className, level, students } = this.state,
        mon = moment().set({year:2017, month:3}),
        names = students.map(name => name.name);
        // console.log(names);
    return(
      <BodyContainer>
        {/* <h3 className='issued-notice'>로그인 발급 : 로그인 발급을 위해 각 반의 레벨을 꼭 기입해 주세요.</h3> */}
        <div className="issued-login-top issued-kinder-info">
          <i className="fa fa-id-card" aria-hidden="true"></i>
          <p className="issued-info">{this.state.className}</p>
          {this.state.loaded
            ? <div>
                <form action="https://toycode.org/issue" method="POST" target="_blank">
                  <input type="hidden" name="code" value={academyUrl} />
                  <input type="hidden" name="school" value={academyName} />
                  <input type="hidden" name="lang" value={academyLang} />
                  <input type="hidden" name="className" value={className} />
                  <input type="hidden" name="yearmonth" value={mon.format('YYYYMM')} />
                  <input type="hidden" name="level" value={level} />
                  <input type="hidden" name="students" value={names} />
                  <button
                    // className='button-edit'
                    onClick={() => {
                    return(alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.'))}}>로그인발급</button>
                </form>
                <button>학생 추가하기</button>
              </div>
            : <p> 한줄에 한명의 이름을 입력하여, 학생을 등록해주세요 </p>
          }

        </div>

        {this.state.loaded
          ? this.state.students.map(this.renderStudentNames)
          : <div>
              <textarea
              className="students-names"
              onChange={this.handleChange}
              value={this.state.students}
              name="students"
             />
             <button onClick={this.handleSubmit}>학생 이름 등록하기</button>
           </div>
        }
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  students: state.kinder.students
})

// export default SettingStudentContainer
export default connect( mapStateToProps, actions)(SettingStudentContainer)
