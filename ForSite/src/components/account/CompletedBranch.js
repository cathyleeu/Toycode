import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/kindergarten'
import Kinder from './Kinder'


const CompletedBranch = ({kinders}) => (
  <div>
   {kinders.map((kinder, i) => (
     <div key={i}>
       <p>{kinder.name}</p>
       <p>{kinder.address}</p>
       <p>{kinder.phone}</p>
       <p>{kinder.manager}</p>
       <p>{kinder.managerPh}</p>
     </div>
   ))}
  </div>
)

export default CompletedBranch
