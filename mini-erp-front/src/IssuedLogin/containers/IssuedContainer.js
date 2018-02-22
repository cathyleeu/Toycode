import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import IssuedClassesList from '../components/IssuedClassesList'



class IssuedContainer extends PureComponent {
  componentWillMount(){
    if(this.props.customerType === 'T') {
      let { parentId, name } = this.props.recordedKinders[0]
      this.props.fetchInfoForIssued(parentId, name)
    }
  }
  render(){
    let {
      recordedKinders,
      fetchInfoForIssued,
      loginInfo,
      isFetchedNamesByClass,
      isRegisteredNames,
      isEditingNames,
      studentsNames,
      isWritingNames,
      customerType
    } = this.props;
    return (
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
    )
  }
}


const mapStateToProps = (state) => ({
  recordedKinders: state.auth.user.kinders,
  loginInfo: state.issuedLogin,
  studentsNames: state.issuedLogin,
  customerType: state.auth.user.customerType
})

export default connect(mapStateToProps, actions)(IssuedContainer)
