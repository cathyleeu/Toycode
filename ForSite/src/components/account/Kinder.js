import React, {Component} from 'react'

class Kinder extends Component {
  constructor(props) {
    super(props)
  }
  //TODO: 따로따로 작동할 수 있도록 해야함.
  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteKinderClass, parentId, id } = this.props
    removeChild(parentId,id)
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
        {typeof parentId !== 'undefined' &&
          <button
            className="btn btn-outline-secondary"
            onClick={this.handleRemoveClick}>
            delete
          </button>
        }
      </div>
    )
  }
}

export default Kinder
