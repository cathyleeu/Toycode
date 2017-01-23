import React, {Component} from 'react'

class RegisterKinderClasses extends Component {
  constructor(props) {
    super(props)
    const {kinderClass} = this.props
    this.state={
      classname: kinderClass.className,
      students: kinderClass.students
    }

  }
  handleRemoveClick = e => {
    e.preventDefault()
    const { deleteKinderClass, id } = this.props
    deleteKinderClass(id)
  }
  isHandleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  isOnBlur = () => {
    const {id, parentId, updateKinderClass, index} = this.props
    const {classname, students} = this.state
    updateKinderClass(classname,students,index,parentId,id)
  }
  render(){
    const { id, status } = this.props
    const disabled = !status ? 'none' : ''
    return(
      <div className="row col-md-12">
        <label htmlFor={`${id}_name`}>
          <i className="fa fa-graduation-cap"></i>
          반 이름</label>
        <input
          style={{border: disabled}}
          disabled={!status}
          type="text"
          name='classname'
          id={`${id}_name`}
          onBlur={this.isOnBlur}
          value={this.state.classname}
          onChange={this.isHandleChange}
        />
        <label htmlFor={`${id}_students`}>
          <i className="fa fa-users" aria-hidden="true"></i>
          학생
        </label>
        <input
          style={{border: disabled}}
          disabled={!status}
          type="number"
          name='students'
          id={`${id}_students`}
          onBlur={this.isOnBlur}
          value={this.state.students}
          onChange={this.isHandleChange}
        />
        <button
          style={{display: disabled}}
          className="button-delete"
          onClick={this.handleRemoveClick}>
          <i className="fa fa-trash"></i>
          반 삭제
        </button>
      </div>
    )
  }
}

export default RegisterKinderClasses
