import React, { PureComponent } from 'react'
// import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import * as actions from './actions'
import { ConditionalHeader, BodyContainer, Modal, PrimaryButton } from '../Components'
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
      academyClasses: []
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
        { kinderClasses, name, url, lang } = selectedAcademy,
        academyClasses = []

    kinderClasses.forEach((cl,i) => {
      academyClasses.push({
        ...cl,
        academyUrl : url,
        academyName: name,
        academyLang: lang,
        directLink: true
      })
    })
    this.setState({
      modalStatus: !this.state.modalStatus,
      academyClasses
    })
  }
  handleSettingAcademy(e, data){
    this.setState({
      settingAcademyModal: !this.state.settingAcademyModal,
      modalRenderData: { ...data }
    })
  }
  renderChild(academy, i){
    let { customerType } = this.props.location.state;
    return (
      <SettingAcademyCard
        key={i} {...academy}
        customerType={customerType}
        handleModalStatus={this.handleModalStatus}
        completedDeleteAcademy={this.props.completedDeleteAcademy}
        handleSettingAcademy={this.handleSettingAcademy}/>
    )
  }
  render(){
    if(!this.state.loaded){
      return <div>로딩중</div>
    }
    let { customerType } = this.props.location.state;
    // console.log(this.props.location.state.customerType);
    let nodes = this.state.academies.map(this.renderChild) || []
    return(
      <BodyContainer>
        <ConditionalHeader
          headerStyle="Kinder-Cont-top"
          name="createAcademy"
          headerTitle="소속 원 리스트"
          customerType={customerType}
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
          <div>
            {
              this.state.academyClasses
                ? this.state.academyClasses.map( (cl,i) => {
                  return (
                    <PrimaryButton
                      onClick={() => {
                        // home/settingStudent/A00016-K8/코넬
                        this.props.history.push(
                          `/home/settingStudent/${cl.academyId}/${cl.className}`,
                          { ...cl }
                        )
                      }}
                      key={i} content={cl.className} purpose={"multi"}
                    />
                  )
                })
                : false
            }
          </div>
          <PrimaryButton
            purpose={'delete'}
            content={'close'}
            onClick={() => this.setState({modalStatus: !this.state.modalStatus})} />
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
