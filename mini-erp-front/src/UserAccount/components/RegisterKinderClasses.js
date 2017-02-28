import React, {Component} from 'react'

class RegisterKinderClasses extends Component {
  constructor(props) {
    super(props)
    const {kinderClass} = this.props
    this.state={
      classname: kinderClass.className || '',
      level: kinderClass.level || ''
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
    const {classname, level} = this.state
    console.log("this.state",classname, level);
    updateKinderClass(classname, level, index, parentId, id)
  }
  render(){
    const { id, branchEdit } = this.props
    const disabled = !branchEdit ? 'none' : ''
    return(
      <div className="row col-md-12">
        <label htmlFor={`${id}_name`}>
          반 이름
          <input
            style={{border: disabled}}
            disabled={!branchEdit}
            type="text"
            name='classname'
            id={`${id}_name`}
            onBlur={this.isOnBlur}
            value={this.state.classname}
            onChange={this.isHandleChange}
          />
        </label>
        <label htmlFor={`${id}_level`}>
          레벨
          <select
            name="level"
            value={this.state.level}
            onChange={this.isHandleChange}
            onBlur={this.isOnBlur}
            disabled={!branchEdit}>
            <option value="none">---</option>
            <option value="A">A레벨</option>
            <option value="B">B레벨</option>
            <option value="C">C레벨</option>
          </select>
        </label>
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


/*
<input
  style={{border: disabled}}
  disabled={!branchEdit}
  type="number"
  name='level'
  id={`${id}_level`}
  onBlur={this.isOnBlur}
  value={this.state.level}
  onChange={this.isHandleChange}
/>
*/

export default RegisterKinderClasses
