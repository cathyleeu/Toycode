import React, { PureComponent } from 'react'
// import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import * as actions from './actions'
import { ConditionalHeader, BodyContainer } from '../Components'
import SettingAcademyCardModal from './SettingAcademyCardModal'
import SettingAcademyCard from './SettingAcademyCard'
import './index.css'

class SettingAcademyContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      academies: props.academies,
      loaded: false,
      createAcademyModal: false,
      settingAcademyModal: false,
      modalRenderData: {}
    }
    this.handleAddAcademy = this.handleAddAcademy.bind(this)
    this.handleSettingAcademy = this.handleSettingAcademy.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }
  componentWillMount(){
    this.props.getAcademyByUser()
  }
  componentWillReceiveProps(newProps) {
    console.log(this.props.academies);
    if(newProps.academies !== this.props.academies) {
      this.setState({
        academies: newProps.academies,
        loaded: true
      })
    }
  }
  handleAddAcademy(e){
    this.setState({
      createAcademyModal: !this.state.createAcademyModal
    })
  }
  handleSettingAcademy(e, data){
    this.setState({
      settingAcademyModal: !this.state.settingAcademyModal,
      modalRenderData: { ...data }
    })
  }
  renderChild(academy, i){
    // console.log("renderChild",academy);
    return (
      <SettingAcademyCard
        key={i} {...academy}
        completedDeleteAcademy={this.props.completedDeleteAcademy}
        handleSettingAcademy={this.handleSettingAcademy}/>
    )
  }
  render(){
    if(!this.state.loaded){
      return <div>로딩중</div>
    }
    let nodes = this.state.academies.map(this.renderChild) || []
    return(
      <BodyContainer>
        <ConditionalHeader
          headerStyle="Kinder-Cont-top"
          headerType="normal"
          name="createAcademy"
          headerTitle="소속 원 리스트"
          btnTitle="원 등록하기"
          primary={true}
          onClick={this.handleAddAcademy}
        />
        <SettingAcademyCardModal
          completedAddAcademy={this.props.completedAddAcademy}
          modalStatus={this.state.createAcademyModal}
          modalPurpose="create"
          handleModal={this.handleAddAcademy}
          getAcademyByUser={this.props.getAcademyByUser}
        />
        <SettingAcademyCardModal
          {...this.state.modalRenderData}
          modalPurpose="edit"
          completedEditAcademy={this.props.completedEditAcademy}
          modalStatus={this.state.settingAcademyModal}
          handleModal={this.handleSettingAcademy}
          getAcademyByUser={this.props.getAcademyByUser}
        />
        {nodes}
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  academies: state.kinder.kinders,
  user: state.login.user
})


export default connect(mapStateToProps, actions)(SettingAcademyContainer)
