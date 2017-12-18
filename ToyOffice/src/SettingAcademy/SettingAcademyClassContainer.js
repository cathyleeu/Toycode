import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import { BodyContainer, ToyCodeSelect } from '../Components'
import FilteredList from './FilteredList'
import SettingAcademyClassModal from './SettingAcademyClassModal'

// import { Route } from 'react-router-dom'

// import './index.css'

class SettingAcademyClassContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      academies: [],
      selectedAcademy: {},
      createAcademyClass: false,
      editAcademyClass: false,
      modalRenderData: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }
  componentWillMount(){
    this.props.getAcademyByUser()
  }
  componentWillReceiveProps(newProps) {
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
  handleModal(e, modalData) {
    let { name } = e.currentTarget.dataset;
    this.setState({
      [name] : !this.state[name],
      modalRenderData: {...modalData}
    })
  }
  render(){
    let { parentId, code, lang } = this.state.selectedAcademy
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
        <SettingAcademyClassModal
          {...this.state.modalRenderData}
          modalPurpose="edit"
          modalHandleName="editAcademyClass"
          editAcademyClass={this.props.editAcademyClass}
          modalStatus={this.state.editAcademyClass}
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
          match={this.props.match}
          history={this.props.history}
          handleModal={this.handleModal}
          modalHandleName="editAcademyClass"
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
