import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import { BodyContainer, ToyCodeSelect, FilteredList } from '../Components'
import SettingAcademyClassModal from './SettingAcademyClassModal'
// import './index.css'

class SettingAcademyClassContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      academies: [],
      selectedAcademy: {},
      createAcademyClass: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }
  componentWillMount(){
    this.props.getAcademyByUser()
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.academies, this.props.academies);
    if(newProps.academies !== this.props.academies){
      this.setState({
        academies: newProps.academies,
        selectedAcademy: newProps.academies[0],
        loaded: true
      })
    }
  }
  handleChange(e) {
    let targetAcademy = this.state.academies.find(d => d.name === e.target.value)
    this.setState({
      [e.target.name]: targetAcademy
    })
  }
  handleModal(e) {
    let { name } = e.currentTarget.dataset;
    this.setState({
      [name] : !this.state[name]
    })
  }
  render(){
    let { parentId, code } = this.state.selectedAcademy
    if(!this.state.loaded){
      return false
    }
    return(
      <BodyContainer>
        <SettingAcademyClassModal
          modalPurpose="create"
          modalHandleName="createAcademyClass"
          createAcademyClass={this.props.createAcademyClass}
          modalStatus={this.state.createAcademyClass}
          handleModal={this.handleModal}
          parentId={parentId}
          academyId={code}
        />
        <ToyCodeSelect
          name="selectedAcademy"
          value={this.state.selectedAcademy.name}
          labelName="유치원을 선택해주세요."
          options={this.state.academies}
          handleChange={this.handleChange}
        />
        <FilteredList
          handleModal={this.handleModal}
          filtered={this.state.selectedAcademy}
        />
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


/* <SelectField
  floatingLabelText="원을 선택해주세요."
  value={this.state.value}
  onChange={this.handleChange}
>
  {this.state.academies.map(
    (academy, i) => <MenuItem key={i} value={academy.code} primaryText={academy.name} />
  )}
</SelectField> */
