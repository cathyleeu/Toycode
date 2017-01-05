import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/kindergarten'
import Kinder from './Kinder'

class Branch extends Component {
  constructor(props) {
    super(props)
    const {kinder} = this.props
    kinder.map((kinder, i) => {
      this.state = {
        Name: kinder.name,
        Address: kinder.address,
        Phone: kinder.phone,
        Manager: kinder.manager,
        ManegerPh: kinder.managerPh
      }
    })
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
    updateKinder(this.state,id)
  }
  render(){
    const { parentId, childIds, classCount, kinder, id, kinders, completedAddKinder} = this.props
    const index = kinder.map(item => item.id).indexOf(id);
    return(
      <div className="row col-md-12">
        <div className="col-md-5">
          <div>
            <label htmlFor={`${id}_name`}>원 명</label>
            <input
              type="text"
              id={`${id}_name`}
              value={this.state.Name}
              name="Name"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${id}_adres`}>원 주소</label>
            <input
              type="text"
              id={`${id}_adres`}
              value={this.state.Address}
              name="Address"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${id}_ph`}>원 전화번호</label>
            <input
              type="tel"
              id={`${id}_ph`}
              value={this.state.Phone}
              name="Phone"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${id}_mng`}>원 담당자</label>
            <input
              type="text"
              id={`${id}_mng`}
              value={this.state.Manager}
              name="Manager"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${id}_mngPh`}>원 담당자 전화번호</label>
            <input
              type="tel"
              id={`${id}_mngPh`}
              value={this.state.ManegerPh}
              name="ManegerPh"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div className="row">
            <button
              className="btn btn-danger col-md-3"
              onClick={this.handleRemoveClick}> 삭제 </button>
            <button
              className="btn btn-success col-md-3"
              onClick={this.handleAddChildClick}>반 추가 </button>
          </div>
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
