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
  studentsNames
}) => {
  return(
  <div className="has-Header Container">
    {recordedKinders && (
      <IssuedClassesList
        studentsNames={studentsNames}
        recordedKinders={recordedKinders}
        fetchInfoForIssued={fetchInfoForIssued}
        loginInfo={loginInfo}
        isRegisteredNames={isRegisteredNames}
        isFetchedNamesByClass={isFetchedNamesByClass}
        isEditingNames={isEditingNames}
      />)}
  </div>
)}



const mapStateToProps = (state) => ({
  recordedKinders: state.auth.user.kinders,
  loginInfo: state.issuedLogin,
  studentsNames: state.issuedLogin
})

export default connect(mapStateToProps, actions)(IssuedContainer)
