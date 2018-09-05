import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import IssuedClassesList from '../components/IssuedClassesList'

//FIXME: teacherId

class IssuedContainer extends PureComponent {
  componentWillMount(){
    console.log("IssuedContainer componentWillMount");
    // if(this.props.customerType === 'T') {
    //   let { parentId, name } = this.props.recordedKinders[0]
    //   this.props.fetchInfoForIssued(parentId, name)
    // }
  }
  componentDidMount(){

    console.log("IssuedContainer componentDidMount");
  }
  componentWillReceiveProps(nextProps) {

    console.log("IssuedContainer componentWillReceiveProps", this.props, nextProps);
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
      editingNames,
      customerType
    } = this.props;
    //recordedKinders => kinders 정보
    return (
      <div className="has-Header Container">
          <IssuedClassesList
            studentsNames={studentsNames}
            recordedKinders={recordedKinders}
            fetchInfoForIssued={fetchInfoForIssued}
            loginInfo={loginInfo}
            customerType={customerType}
            isRegisteredNames={isRegisteredNames}
            isFetchedNamesByClass={isFetchedNamesByClass}
            isEditingNames={isEditingNames}
            editingNames={editingNames}
            isWritingNames={isWritingNames}
          />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    recordedKinders: state.auth.user.kinders,
    loginInfo: state.auth.loginInfo,
    editingNames: state.issuedLogin,
    customerType: state.auth.user.customerType
  }
}

export default connect(mapStateToProps, actions)(IssuedContainer)
