import React, {Component} from 'react'

class Kinder extends Component {
  constructor(props) {
    super(props)
  }
  handleRemoveClick = e => {
    e.preventDefault()
    const { deleteKinderClass, id } = this.props
    deleteKinderClass(id)
  }
  render(){
    const { counter, parentId, id} = this.props
    return(
      <div className="row col-md-12">
        <label>반 이름</label>
          <input
            type="text"
            name='classname'
            // value={this.state.classname}
            // onChange={this.isHandleChange}
          />
          <label>학생 수</label>
          <input
            type="number"
            name='students'
            // value={this.state.students}
            // onChange={this.isHandleChange}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={this.handleRemoveClick}>
            삭제
          </button>
      </div>
    )
  }
}

export default Kinder
