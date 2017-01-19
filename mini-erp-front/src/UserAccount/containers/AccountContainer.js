import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import BranchContainer from './BranchContainer'
import RequestedIVesContainer from './RequestedIVesContainer'

const AccountContainer = ({invoices,kinders,editKinder,completedAddKinder,createKinder,addChild,user}) => (
  <div className="has-Header Container">
    <BranchContainer
      kinders={kinders}
      editKinder={editKinder}
      completedAddKinder={completedAddKinder}
      createKinder={createKinder}
      addChild={addChild}
      user={user}
      kindergartens={kinders.kinders}
     />
    <RequestedIVesContainer invoices={invoices} />
  </div>
)

function mapStateToProps(state, ownProps){
  return {
    user: state.auth.user,
    kinders: state.userAccount,
    invoices: state.shop.userInvoices
  }
}
export default connect(mapStateToProps, actions)(AccountContainer)
