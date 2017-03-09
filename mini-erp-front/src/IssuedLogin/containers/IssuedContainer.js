import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import IssuedClassesList from '../components/IssuedClassesList'



const IssuedContainer = ({
  recordedKinders,
  fetchInfoForIssued,
  loginInfo,
  isFetchedNamesByClass,
  isRegisteredNames,
  isEditingNames,
  studentsNames,
  isWritingNames,
  customerType
}) => {
  return(
  <div className="has-Header Container">
    {recordedKinders && (
      <IssuedClassesList
        studentsNames={studentsNames}
        recordedKinders={recordedKinders}
        fetchInfoForIssued={fetchInfoForIssued}
        loginInfo={loginInfo}
        customerType={customerType}
        isRegisteredNames={isRegisteredNames}
        isFetchedNamesByClass={isFetchedNamesByClass}
        isEditingNames={isEditingNames}
        isWritingNames={isWritingNames}
      />)}
  </div>
)}



const mapStateToProps = (state) => ({
  recordedKinders: state.auth.user.kinders,
  loginInfo: state.issuedLogin,
  studentsNames: state.issuedLogin,
  customerType: state.auth.user.customerType
})

export default connect(mapStateToProps, actions)(IssuedContainer)
