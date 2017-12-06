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
      createAcademyModal: false
    }
    this.handleAddAcademy = this.handleAddAcademy.bind(this)
    // this.renderChild = this.renderChild.bind(this)
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
    // console.log(this.state.createAcademyModal);

    // const handleTyle = {
    //   createAcademy : "addAcademy",
    //   createAcademyClass : "addAcademyClass"
    // }
    // // debugger
    // let name = e.target.name || e.target.parentElement.parentElement.dataset.name;
    // const academiesId = this.props[name](this.props.user._id).kinderId
    // this.props[handleTyle[name]](academiesId)
  }
  renderChild(academy, i){
    // console.log("renderChild", academy);
    return <SettingAcademyCard key={i} {...academy} />
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
          headerTitle="프로그램 설정"
          btnTitle="반 등록하기"
          primary={true}
          onClick={this.handleAddAcademy}
        />
        <SettingAcademyCardModal
          completedAddAcademy={this.props.completedAddAcademy}
          modalStatus={this.state.createAcademyModal}
          handleModal={this.handleAddAcademy}
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
