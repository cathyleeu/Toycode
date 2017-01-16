import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/kindergarten'
import Kinder from './Kinder'

class Branch extends Component {
  constructor(props) {
    super(props)
    const { kinder, branchCode } = this.props
    this.state = {
      Name: kinder.name,
      Address: kinder.address,
      Phone: kinder.phone,
      Manager: kinder.manager,
      ManegerPh: kinder.managerPh
    }
  }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addClass, createKinderClass, id, kinders} = this.props
    const childId = createKinderClass('반').classId
    const index = kinders.map(item => item._id).indexOf(id);
    addClass(id, childId, index)
  }
  handleRemoveClick = e => {
    e.preventDefault()
    const { deleteKinder, id } = this.props
    deleteKinder(id)
  }
  renderChild = (kinderClass, i) => {
    const { id, removeChild, kinders, deleteKinderClass, updateKinderClass } = this.props
    const index = kinders.map(item => item._id).indexOf(id);
    return (
      <div key={i}>
        <Kinder id={kinderClass._id} kinderClass={kinderClass} index={index} removeChild={removeChild} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} />
      </div>
    )
  }
  isHandleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  isOnBlur = () => {
    const {id, updateKinder, branchCode} = this.props
    updateKinder(this.state,branchCode,id)
  }
  render(){
    const { parentId, childIds, classCount, kinder, id, kinders, code } = this.props
    const index = kinders.map(item => item._id).indexOf(id);
    // TODO-2: 반복되는 input을 줄이는 방법
    return(
      <div className="row col-md-12">
        <div className="col-md-5">
          <div>
            <label htmlFor={`${code}_name`}>원 명</label>
            <input
              type="text"
              id={`${code}_name`}
              value={this.state.Name}
              name="Name"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${code}_adres`}>원 주소</label>
            <input
              type="text"
              id={`${code}_adres`}
              value={this.state.Address}
              name="Address"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${code}_ph`}>원 전화번호</label>
            <input
              type="tel"
              id={`${code}_ph`}
              value={this.state.Phone}
              name="Phone"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${code}_mng`}>원 담당자</label>
            <input
              type="text"
              id={`${code}_mng`}
              value={this.state.Manager}
              name="Manager"
              onBlur={this.isOnBlur}
              onChange={this.isHandleChange}
            />
          </div>
          <div>
            <label htmlFor={`${code}_mngPh`}>원 담당자 전화번호</label>
            <input
              type="tel"
              id={`${code}_mngPh`}
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
          {kinders[index].kinderClasses.map(this.renderChild)}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    kinders: state.kindergarten.kinders
  }
}

export default connect(mapStateToProps, actions)(Branch)
// export default Branch
