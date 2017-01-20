import React from 'react'
import './RegisteredKinderInfo.css'

const RegisteredKinderInfo = ({kinder, kinderNo}) => (
  <div className="kinder-info-body">
     <div className="kinder-temp">
       <div className="kinder-top">
         <p className="kinder-no">{kinderNo}</p>
         <p className="kinder-Name">{kinder.name}</p>
       </div>
       <div className="kinder-body">
         <div>
           <i className="fa fa-building" aria-hidden="true"><p>주소:</p></i>
           <p>{kinder.address}</p>
         </div>
         <div>
           <i className="fa fa-phone" aria-hidden="true"><p>원 전화:</p></i>
           <p>{kinder.phone}</p>
         </div>
         <div>
           <i className="fa fa-user-circle-o" aria-hidden="true"><p>담당자 성함:</p></i>
           <p>{kinder.manager}</p>
         </div>
         <div>
           <i className="fa fa-mobile" aria-hidden="true"><p>담당자 전화번호:</p></i>
           <p>{kinder.managerPh}</p>
         </div>
       </div>
     </div>
     <div className="kinder-class-body">
     {kinder.kinderClasses.map((kinderClass,i) => (
        <div className="col-md-12 row" key={i}>
          {/* <p>{i+1}</p> */}
          <p>{kinderClass.className}</p>
          <p>{kinderClass.students}</p>
        </div>
     ))}
     </div>
  </div>
)

export default RegisteredKinderInfo
