import React from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Branch from './Branch'
import { addBranchKinder } from '../../actions/kindergarten'

const AccountCont = ({user, addBranchKinder}) => (
  <div>
    <div>지사명:{user.branch.Name}</div>
    <div>지사주소:{user.branch.Address}</div>
    <div>사업자주소:{user.branch.License}</div>
    <hr />
    <Branch
      addBranchKinder={() => addBranchKinder({kindergartens:[{name: '수수유치원', class: '쌔싹반'},{name: '호호유치원', class: '둘둘반'}]})}/>
  </div>
)

function mapStateToProps(state){
  return {
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addBranchKinder
  }, dispatch)
}

// export default AccountCont
export default connect(mapStateToProps, mapDispatchToProps)(AccountCont)
