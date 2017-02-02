import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import BranchContainer from './BranchContainer'
import RequestedIVesContainer from './RequestedIVesContainer'


const AccountContainer = ({user,kinders}) => (
  <div>
    {user._id && (
      <div className="has-Header Container">
        <BranchContainer user={user} kinders={kinders}/>
        <RequestedIVesContainer />
      </div>
    )}
  </div>
)




function mapStateToProps(state, ownProps){
  return {
    user: state.auth.user,
    kinders: state.userAccount
  }
}


export default connect(mapStateToProps, actions)(AccountContainer)
// export default AccountContainer
