import React, {Component} from 'react';
import RegisterKinderClasses from './RegisterKinderClasses'


class DirectKinder extends Component{
  constructor(props){
    super(props)
    this.state = {
      lang: this.props.kinder.lang || 'en'
    }
  }
  isHandleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  isOnBlur = () => {
    const { kinder, updateKinder, branchCode} = this.props;
    const directKinUp = {
      name: kinder.name,
      zipNo: kinder.zipNo,
      roadAddr: kinder.roadAddr,
      detailAddr: kinder.detailAddr,
      parentId: branchCode,
      lang: this.state.lang
    }
    updateKinder(directKinUp, kinder._id)
  }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addClass, createKinderClass, id} = this.props
    const childId = createKinderClass('반').classId
    addClass(id, childId, 0)
  }
  renderChild = (kinderClass, i) => {
    const { removeChild, deleteKinderClass, updateKinderClass, branchEdit } = this.props
    return (
      <div key={i}>
        <RegisterKinderClasses
          id={kinderClass._id} kinderClass={kinderClass} index={0} removeChild={removeChild} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} branchEdit={branchEdit}/>
      </div>
    )
  }
  render(){
  const {kinder, branchEdit} = this.props;
  const disabled = !branchEdit ? 'none' : '';
  return(
    <div className="kinder-info-body">
     <div className="kinder-temp">
       <div className="kinder-top">
         <p>{kinder.name}</p>
         <div className="kinder-btns" style={{display:disabled}}>
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
               <p>{kinder.zipNo}</p>
             </div>
             <div className="kinder-address-roadAddr">
               <p>{kinder.roadAddr}</p>
             </div>
             <div className="kinder-address-detailAddr">
               <p>{kinder.detailAddr}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div className="kinder-class-body">
       <strong>로그인 발급과 관련된 정보입니다.</strong>
       <strong>해당 원에 맞게 설정해주세요.</strong>
       <div>
         <p>1. 신청한 교재와 맞는 언어를 선택해주세요.</p>
         <label>
           언어
           <select
             name="lang"
             value={this.state.lang}
             onChange={this.isHandleChange}
             onBlur={this.isOnBlur}
             disabled={!branchEdit}>
             <option value="">---</option>
             <option value="ko">한국어</option>
             <option value="en">영어</option>
           </select>
         </label>
       </div>
       <div>
          <p>2. 각 반과 반에서 사용하는 키즈씽킹 레벨을 선택 해주세요.</p>
         {kinder.kinderClasses.map(this.renderChild)}
       </div>
     </div>
    </div>
  )}
}

export default DirectKinder;
