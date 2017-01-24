import React from 'react';
import BranchContainer from './BranchContainer'
import RequestedIVesContainer from './RequestedIVesContainer'

const AccountContainer = () => (
  <div className="has-Header Container">
    <BranchContainer/>
    <RequestedIVesContainer />
  </div>
)

export default AccountContainer
