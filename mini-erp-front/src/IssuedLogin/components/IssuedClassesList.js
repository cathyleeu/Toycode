import React, {Component} from 'react'
import IssuedClass from './IssuedClass'
// import { connect } from 'react-redux'


class IssuedClassesList extends Component {
  componentWillMount(){
    const { recordedInfo, fetchInfoForIssued } = this.props;
    const { name, parentId } = recordedInfo[0];
    fetchInfoForIssued(parentId, name)
  }
  render(){
    const {loginInfo} = this.props;
    return(
        <div>
          <h3>로그인 발급</h3>
          <IssuedClass loginInfo={loginInfo} />
        </div>
    )
  }
}

export default IssuedClassesList
