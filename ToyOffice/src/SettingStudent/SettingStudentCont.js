import React, { PureComponent } from 'react'
// import {connect} from 'react-redux'
// import * as actions from './actions'
// import FlatButton from 'material-ui/FlatButton';
import { BodyContainer } from '../Components'
import './index.css'

export default class SettingStudentCont extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
    }

  }
  componentWillMount(){

  }
  componentWillReceiveProps(newProps){
  }
  render(){
    return(
      <BodyContainer>
        <p>issue</p>
      </BodyContainer>
    )
  }
}

// const mapStateToProps = (state) => ({
//   kinders: state.kinder.kinders,
//   user: state.login.user
// })
//
//
// export default connect(mapStateToProps, actions)(RegisterStudentCont)
