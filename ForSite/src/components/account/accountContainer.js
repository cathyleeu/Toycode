import React from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Branch from './Branch'
import { completedAddKinder, addKinder } from '../../actions/kindergarten'

const AccountCont = ({user, completedAddKinder, addKinder}) => {
  //TODO: redux 연결해서 data 받기
  const KinData = {
    kindergartens:[
      {
        name: '수수유치원',
        class:[
          {classname:'쌔싹반', students: 10},
          {classname:'누리반', students: 11}
        ]
      },
      {
        name: '나라유치원',
        class:[
          {classname:'나나반', students: 10},
          {classname:'니니반', students: 11}
        ]
      }
    ]
  }
  return (
    <div>
      <div>지사명:{user.branch.Name}</div>
      <div>지사주소:{user.branch.Address}</div>
      <div>사업자주소:{user.branch.License}</div>
      <hr />
      <Branch
        addKinder={addKinder}
        completedAddKinder={() => completedAddKinder(KinData)}/>
    </div>
  )
}

function mapStateToProps(state){
  return {
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    completedAddKinder,
    addKinder
  }, dispatch)
}

// export default AccountCont
export default connect(mapStateToProps, mapDispatchToProps)(AccountCont)
