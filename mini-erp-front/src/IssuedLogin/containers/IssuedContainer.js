import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import IssuedClassesList from '../components/IssuedClassesList'



const IssuedContainer = ({
  recordedInfo,
  fetchInfoForIssued,
  loginInfo,
  isFetchedNamesByClass,
  isRegisteredNames,
  studentsNames
}) => {
  return(
  <div className="has-Header Container">
    {recordedInfo && (
      <IssuedClassesList
        studentsNames={studentsNames}
        recordedInfo={recordedInfo}
        fetchInfoForIssued={fetchInfoForIssued}
        loginInfo={loginInfo}
        isRegisteredNames={isRegisteredNames}
        isFetchedNamesByClass={isFetchedNamesByClass}
      />)}
  </div>
)}



const mapStateToProps = (state) => ({
  recordedInfo: state.auth.user.kinders,
  loginInfo: state.issuedLogin.recordedInfo,
  studentsNames: state.issuedLogin
})

export default connect(mapStateToProps, actions)(IssuedContainer)
