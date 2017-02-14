import React, {Component} from 'react'
import { connect } from 'react-redux'
import {addClass, updateKinder, updateKinderClass, createKinderClass, deleteKinderClass, deleteKinder} from '../actions'
import {searchAddress, selectedJuso} from '../../actions'
import RegisterKinderClasses from './RegisterKinderClasses'
import './RegisterKinder.css'
import AddrModal from '../../Shop/components/AddrModal'

class RegisterKinder extends Component {
  constructor(props) {
    super(props)
    const { kinder } = this.props
    this.state = {
      name: kinder.name || '',
      zipNo: kinder.zipNo || '',
      roadAddr: kinder.roadAddr || '',
      detailAddr: kinder.detailAddr || '',
      phone: kinder.phone || '',
      manager: kinder.manager || '',
      managerPh: kinder.managerPh || '',
      isModalOpen: false,
      location: ''
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
    const { id, kinders, deleteKinderClass, updateKinderClass, branchEdit } = this.props
    const index = kinders.map(item => item._id).indexOf(id);
    return (
      <div key={i}>
        <RegisterKinderClasses id={kinderClass._id} kinderClass={kinderClass} index={index} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} branchEdit={branchEdit} />
      </div>
    )
  }
  isHandleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
		const { searchAddress } = this.props
		this.setState({ isModalOpen: false, location: ''}, searchAddress(''))
	}
	isSearchAddress = () => {
		const { searchAddress } = this.props
		searchAddress(this.state.location)
	}
	isSelectedAddress = (result) => {
		const {selectedJuso} = this.props
		selectedJuso(result)
		this.closeModal()
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr
		})
	}
  isOnBlur = () => {
    const {id, updateKinder, branchCode} = this.props
    updateKinder(this.state,branchCode,id)
  }
  render(){
    const { id, kinders, code, kinderNo, branchEdit, juso } = this.props
    const index = kinders.map(item => item._id).indexOf(id);
    // TODO-2: 반복되는 input을 줄이는 방법
    const disabled = !branchEdit ? 'none' : ''
    return(
      <div className="kinder-info-body">
       <div className="kinder-temp">
         <div className="kinder-top">
           <p className="kinder-no">{kinderNo}</p>
             <input
             type="text"
             id={`${code}_name`}
             value={this.state.name}
             name="name"
             style={{border: disabled}}
             disabled={!branchEdit}
             onBlur={this.isOnBlur}
             onChange={this.isHandleChange}
           />
           <div className="kinder-btns" style={{display:disabled}}>
              <button
                className="button-delete"
                onClick={this.handleRemoveClick}><i className="fa fa-trash"></i>원 삭제</button>
              <button
                className="button-addClass"
                onClick={this.handleAddChildClick}><i className="fa fa-plus"></i>반 추가</button>
           </div>
         </div>
         <div className="kinder-body">
           <div className="kinder-address">
             <i className="fa fa-building" aria-hidden="true"></i>
             <div className="kinder-address-body">
               <div className="kinder-address-zip">
                 <input
                   type="text"
                   id={`${code}_zipNo`}
                   value={this.state.zipNo}
                   name="zipNo"
                   onBlur={this.isOnBlur}
                   style={{border: disabled}}
                   disabled={!branchEdit}
                   onChange={this.isHandleChange}
                 />
                 {branchEdit && <button onClick={this.openModal}>주소검색</button>}
                 <AddrModal
                   isModalOpen={this.state.isModalOpen}
                   closeModal={this.closeModal}>
     							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
     							<div className="search-address-top">
     								<input className="search-input" type="search" value={this.state.location} onChange={this.isHandleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
     								<i className="fa fa-search search-icon" aria-hidden="true" onClick={this.isSearchAddress}></i>
     							</div>
     							<div className="search-address-results">
     									{juso && juso.map((result, i)=> (
     										<div className="search-address-result" key={i} onClick={() => this.isSelectedAddress(result)}>
     											<p>{result.roadAddr}</p>
     										</div>
     									))}
     							</div>
                </AddrModal>
               </div>
               <div className="kinder-address-roadAddr">
                 <input
                   type="text"
                   id={`${code}_roadAddr`}
                   value={this.state.roadAddr}
                   name="roadAddr"
                   onBlur={this.isOnBlur}
                   style={{border: disabled}}
                   disabled={!branchEdit}
                   onChange={this.isHandleChange}
                   required
                 />
               </div>
               <div className="kinder-address-detailAddr">
                 <input
                   type="text"
                   id={`${code}_detailAddr`}
                   value={this.state.detailAddr}
                   name="detailAddr"
                   onBlur={this.isOnBlur}
                   style={{border: disabled}}
                   disabled={!branchEdit}
                   onChange={this.isHandleChange}
                   placeholder="상세 주소를 입력하세요"
                   required
                 />
               </div>
             </div>
           </div>
           <div className="kinder-phone">
             <i className="fa fa-phone" aria-hidden="true"></i>
             <input
               type="tel"
               id={`${code}_ph`}
               value={this.state.phone}
               name="phone"
               style={{border: disabled}}
               disabled={!branchEdit}
               onBlur={this.isOnBlur}
               onChange={this.isHandleChange}
               placeholder="원 전화번호를 입력하세요."
             />
           </div>
           <div className="kinder-manager">
             <i className="fa fa-user-circle-o" aria-hidden="true"></i>
             <input
               type="text"
               id={`${code}_mng`}
               value={this.state.manager}
               name="manager"
               style={{border: disabled}}
               disabled={!branchEdit}
               onBlur={this.isOnBlur}
               onChange={this.isHandleChange}
               placeholder="담당자를 입력하세요."
             />
           </div>
           <div className="kinder-manager-mobile">
             <i className="fa fa-mobile" aria-hidden="true"></i>
             <input
               type="tel"
               id={`${code}_mngPh`}
               value={this.state.managerPh}
               name="managerPh"
               style={{border: disabled}}
               disabled={!branchEdit}
               onBlur={this.isOnBlur}
               onChange={this.isHandleChange}
               placeholder="담당자 전화번호를 입력하세요."
               required
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
    kinders: state.userAccount.kinders,
    juso: state.commonData.juso,
		selectedJuso: state.commonData.selectedJuso
  }
}

export default connect(mapStateToProps, {addClass, updateKinder, updateKinderClass, createKinderClass, deleteKinderClass, deleteKinder,searchAddress, selectedJuso})(RegisterKinder)
