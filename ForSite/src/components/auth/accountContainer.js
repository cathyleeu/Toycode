import React from 'react';
import { connect } from 'react-redux'

const AccountCont = ({user}) => (
  <div>
    <div>지사명:{user.branch.Name}</div>
    <div>지사주소:{user.branch.Address}</div>
    <div>사업자주소:{user.branch.License}</div>

  </div>
)

function mapStateToProps(state){
  return {
    user: state.auth.user
  }
}


export default connect(mapStateToProps)(AccountCont)
