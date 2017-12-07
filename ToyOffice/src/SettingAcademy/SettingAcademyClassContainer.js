import React, { PureComponent } from 'react'
import {SelectField, MenuItem } from 'material-ui';
import {connect} from 'react-redux'
import * as actions from './actions'
import { BodyContainer } from '../Components'
// import './index.css'

class SettingAcademyClassContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentWillMount(){
    this.props.getAcademyByUser()
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.academies, this.props.academies);
    if(newProps.academies !== this.props.academies){
      this.setState({
        loaded: true
      })
    }
  }

  render(){
    if(!this.state.loaded){
      return false
    }
    return(
      <BodyContainer>
        <SelectField
          floatingLabelText="원을 선택해주세요."
          // value={this.state.value}
          // onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  academies: state.kinder.kinders
  // user: state.login.user
})

// export default SettingAcademyClassContainer
export default connect(mapStateToProps, actions)(SettingAcademyClassContainer)
