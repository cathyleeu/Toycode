import React, { PureComponent } from 'react'
// import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import * as actions from './actions'
import { ConditionalHeader, BodyContainer, Modal } from '../Components'
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
      modalRenderData: {},
      modalStatus: false,
      // selectedAcademy: ""
    }
    this.handleAddAcademy = this.handleAddAcademy.bind(this)
    this.handleSettingAcademy = this.handleSettingAcademy.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.handleModalStatus = this.handleModalStatus.bind(this)
  }
  componentWillMount(){
    this.props.getAcademyByUser()
  }
  componentWillReceiveProps(newProps) {
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
  handleModalStatus(academy_id){

    let selectedAcademy = this.state.academies.find(aca => aca._id === academy_id),
        { kinderClasses } = selectedAcademy

    console.log("handleModalStatus");
    //
    //
    // this.props.getStudentNames(
    //   this.state.parentId,
    //   this.state.academyId,
    //   this.state.classId
    // )
    // debugger


    // this.setState({
    //   modalStatus: !this.state.modalStatus
    // })

    // academyUrl,
    // academyName,
    // academyLang,
    // className,
    // level,
    // names
  }
  handleSettingAcademy(e, data){
    this.setState({
      settingAcademyModal: !this.state.settingAcademyModal,
      modalRenderData: { ...data }
    })
  }
  renderChild(academy, i){
    return (
      <SettingAcademyCard
        key={i} {...academy}
        handleModalStatus={this.handleModalStatus}
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
          name="createAcademy"
          headerTitle="소속 원 리스트"
          btnFront={
            [
              { purpose: "create", name: "원 등록하기" }
            ]
          }
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
        <Modal
          isModalOpen={this.state.modalStatus}
          modalWidth="600px"
          >

          <button onClick={() => this.setState({modalStatus: !this.state.modalStatus})}>close</button>
        </Modal>
        {nodes}
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  academies: state.kinder.kinders,
  students: state.kinder.students,
  user: state.login.user
})


export default connect(mapStateToProps, actions)(SettingAcademyContainer)
