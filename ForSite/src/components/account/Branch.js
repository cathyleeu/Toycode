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
    const { id, removeChild, kinder,deleteKinderClass, updateKinderClass } = this.props
    const index = kinder.map(item => item.id).indexOf(id);
    return (
      <div key={childId.id}>
        <Kinder id={childId.id} parentId={id} index={index} removeChild={removeChild} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} />
      </div>
    )
  }
  isHandleChange = e => {
    const {updateKinder} = this.props
    this.setState({[e.target.name]: e.target.value})
  }
  isOnBlur = () => {
    const {id, updateKinder} = this.props
    updateKinder(this.state.kinderName ,id)
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
            onBlur={this.isOnBlur}
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
