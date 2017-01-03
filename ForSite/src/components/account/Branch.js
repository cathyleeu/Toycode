import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/kindergarten'
import Kinder from './Kinder'

class Branch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kinderName: ''
    }
  }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addClass, createKinderClass, id, kinder} = this.props
    //유치원 명이 들어가면 될 듯 함
    const childId = createKinderClass('반').classId
    const index = kinder.map(item => item.id).indexOf(id);
    addClass(id, childId, index)
  }
  handleRemoveClick = e => {
    e.preventDefault()
    const { deleteKinder, id } = this.props
    deleteKinder(id)
  }
  renderChild = childId => {
    const { id, removeChild, deleteKinderClass } = this.props
    return (
      <div key={childId.id}>
        <Kinder id={childId.id} parentId={id} removeChild={removeChild} deleteKinderClass={deleteKinderClass} />
      </div>
    )
  }
  // ,() => updateKinder(this.state.kinderName)
  isHandleChange = e => {
    const {updateKinder} = this.props
    this.setState({[e.target.name]: e.target.value}
    )
  }
  render(){
    const { parentId, childIds, classCount, kinder, id} = this.props
    const index = kinder.map(item => item.id).indexOf(id);
    return(
      <div className="row col-md-12">
        <div className="col-md-5">
          <button
            className="btn btn-info"
            onClick={this.handleRemoveClick}>
            삭제
          </button>
          <label htmlFor={id}>원 명</label>
          <input
            type="text"
            id={id}
            value={this.state.kinderName}
            name="kinderName"
            onChange={this.isHandleChange}
          />
          <button
            className="btn btn-success"
            onClick={this.handleAddChildClick}>반 추가 </button>
        </div>
        <div className="row col-md-7">
          {kinder[index].kinderClasses.map(this.renderChild)}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    kinder: state.kindergarten.branch.kinder
  }
}

export default connect(mapStateToProps, actions)(Branch)
// export default Branch
