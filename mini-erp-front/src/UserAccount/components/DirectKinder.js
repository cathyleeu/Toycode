import React, {Component} from 'react';
import RegisterKinderClasses from './RegisterKinderClasses'


class DirectKinder extends Component{
  // constructor(props){
  //   super(props)
  // }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addClass, createKinderClass, id, kinders} = this.props
    const childId = createKinderClass('반').classId
    console.log("childId", childId);
    console.log("id",id);
    // const index = kinders.map(item => item._id).indexOf(id);
    addClass(id, childId, 0)
  }
  renderChild = (kinderClass, i) => {
    const { id, removeChild, kinders, deleteKinderClass, updateKinderClass, branchEdit } = this.props
    // const index = kinders.map(item => item._id).indexOf(id);
    // console.log(kinderClass);
    return (
      <div key={i}>
        <RegisterKinderClasses id={kinderClass._id} kinderClass={kinderClass} index='0' removeChild={removeChild} deleteKinderClass={deleteKinderClass} updateKinderClass={updateKinderClass} branchEdit={branchEdit} />
      </div>
    )
  }
  render(){
  const {kinder, branchEdit} = this.props;
  const disabled = !branchEdit ? 'none' : '';
  // console.log(kinder);
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
       {kinder.kinderClasses.map(this.renderChild)}
     </div>
    </div>
  )}
}

export default DirectKinder;
