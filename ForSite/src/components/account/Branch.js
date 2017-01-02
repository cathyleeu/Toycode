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
    const { addClass, createKinderClass, id, parentId} = this.props
    //유치원 명이 들어가면 될 듯 함
    const childId = createKinderClass('반').classId
    const matchId = parseInt(id.split("_")[1])
    addClass(id, childId, matchId, parentId)
  }
  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteKinder, parentId, id } = this.props
    removeChild(parentId, id)
    deleteKinder(id)
  }
  renderChild = childId => {
    const { id, removeChild, deleteKinderClass } = this.props
    const keyId = childId.id.split("_")[1]
    return (
      <div key={keyId}>
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
    const matchId = parseInt(id.split("_")[1])
    return(
      <div className="row col-md-12">
        <div className="col-md-5">
          {typeof parentId !== 'undefined' &&
            <button
              className="btn btn-info"
              onClick={this.handleRemoveClick}>
              삭제
            </button>
          }
          <label>원 명</label>
          <input
            type="text"
            value={this.state.kinderName}
            name="kinderName"
            onChange={this.isHandleChange}
          />
          <button
            className="btn btn-success"
            onClick={this.handleAddChildClick}>반 추가 </button>
        </div>
        <div className="row col-md-7">
          {kinder[matchId].kinderClasses.map(this.renderChild)}
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