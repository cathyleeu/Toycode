import React, { PureComponent } from 'react'
// import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import * as actions from './actions'



import { BodyContainer, DirectionContainer, ConditionalHeader, PrimaryButton, ToyCodeLoginButton } from '../Components'

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
      registerStudents: "",
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
    if(!this.state.registerStudents){
      alert('학생을 입력해주세요.')
      return false
    }
    this.props.createStudentIds(this.state)
  }
  renderStudentNames(name){
    return <StudentNamesCard key={name._id}
              {...name}
              history={this.props.history}
              academyName={this.state.academyName}
              className={this.state.className}
           />
  }
  render(){
    let { academyName, className, students } = this.state,
        names = students.map(name => name.name);
    return(
      <BodyContainer>
        <DirectionContainer direction="row" width="70%" alignItems="center">
          <ConditionalHeader
            headerIcon="fa fa-id-card"
            headerStyle="row_direction"
            headerTitle={`${academyName} > ${className}`}
            headerType="normal"
            customWidth="100%"
            alignItems="center"
            >
                {this.state.loaded
                  ? <div>
                      <ToyCodeLoginButton
                        {...this.props.location.state}
                        names={names}
                        history={this.props.history}
                        directLink={this.state.directLink}
                      />
                      <PrimaryButton
                        purpose="create"
                        content="학생 추가하기"
                      />
                    </div>
                  : <p> 한줄에 한명의 이름을 입력하여, 학생을 등록해주세요 </p>
                }
            </ConditionalHeader>
          </DirectionContainer>
        {
          this.state.loaded
            ? this.state.students.map(this.renderStudentNames)
            : <DirectionContainer direction="column" width="70%" alignItems="center">
                <textarea
                className="students-names"
                onChange={this.handleChange}
                value={this.state.registerStudents}
                name="registerStudents"
               />
                <PrimaryButton
                  purpose="create"
                  content="학생 등록하기"
                  buttonWidth="50%"
                  onClick={this.handleSubmit}
                />
             </DirectionContainer>
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
