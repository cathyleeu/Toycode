import React, {Component} from 'react'


const RegisteredKinderInfo = ({kinder}) => (
  <div className="row">
     <div className="col-md-6">
       <p>{kinder.name}</p>
       <p>{kinder.address}</p>
       <p>{kinder.phone}</p>
       <p>{kinder.manager}</p>
       <p>{kinder.managerPh}</p>
     </div>
     <div className="row col-md-6">
     {kinder.kinderClasses.map((kinderClass,i) => (
        <div className="col-md-6" key={i}>
          <p>{kinderClass.className}</p>
          <p>{kinderClass.students}</p>
        </div>
     ))}
     </div>
  </div>
)

export default RegisteredKinderInfo
