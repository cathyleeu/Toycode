import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import IssuedClassesList from '../components/IssuedClassesList'



const IssuedContainer = ({recordedInfo, fetchInfoForIssued,loginInfo, isRegisteredNames}) => {
  return(
  <div className="has-Header Container">
    {recordedInfo && <IssuedClassesList recordedInfo={recordedInfo} fetchInfoForIssued={fetchInfoForIssued} loginInfo={loginInfo} isRegisteredNames={isRegisteredNames}/>}
  </div>
)}



const mapStateToProps = (state) => ({
  recordedInfo: state.auth.user.kinders,
  loginInfo: state.issuedLogin.recordedInfo
})

export default connect(mapStateToProps, actions )(IssuedContainer)
