import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RegisterKinderClasses from './RegisterKinderClasses'
import './RegisterKinder.css'

class RegisterKinder extends Component {
  constructor(props) {
    super(props)
    const { kinder } = this.props
    this.state = {
      Name: kinder.name || '',
      Address: kinder.address || '',
      Phone: kinder.phone || '',
      Manager: kinder.manager || '',
      ManegerPh: kinder.managerPh || ''
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
        <RegisterKinderClasses id={kinderClass._id} kinderClass={kinderClass} index={index} removeChild={removeChild} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} />
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
    const { id, kinders, code, kinderNo } = this.props
    const index = kinders.map(item => item._id).indexOf(id);
    // TODO-2: 반복되는 input을 줄이는 방법
    return(
      <div className="kinder-info-body">
       <div className="kinder-temp rg">
         <div className="kinder-top">
           <p className="kinder-no">{kinderNo}</p>
           <input
             type="text"
             id={`${code}_name`}
             value={this.state.Name}
             name="Name"
             onBlur={this.isOnBlur}
             onChange={this.isHandleChange}
           />
           <div className="kinder-btns">
              <button
                className="button-delete"
                onClick={this.handleRemoveClick}><i className="fa fa-trash"></i>원 삭제</button>
              <button
                className="button-addClass"
                onClick={this.handleAddChildClick}><i className="fa fa-plus"></i>반 추가</button>
           </div>
         </div>
         <div className="kinder-body">
           <div>
             <i className="fa fa-building" aria-hidden="true"><p>주소:</p></i>
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
             <i className="fa fa-phone" aria-hidden="true"><p>원 전화:</p></i>
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
             <i className="fa fa-user-circle-o" aria-hidden="true"><p>담당자 성함:</p></i>
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
             <i className="fa fa-mobile" aria-hidden="true"><p>담당자 전화번호:</p></i>
             <input
               type="tel"
               id={`${code}_mngPh`}
               value={this.state.ManegerPh}
               name="ManegerPh"
               onBlur={this.isOnBlur}
               onChange={this.isHandleChange}
             />
           </div>
         </div>
       </div>

       <div className="kinder-class-body">
         {kinders[index].kinderClasses.map(this.renderChild)}
       </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    kinders: state.userAccount.kinders
  }
}

export default connect(mapStateToProps, actions)(RegisterKinder)
