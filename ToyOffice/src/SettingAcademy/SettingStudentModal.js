import React, { PureComponent } from 'react'
import { ToyCodeInputCont, DirectionContainer, Modal } from '../Components'
import FlatButton from 'material-ui/FlatButton';

class SettingStudentModal extends PureComponent{
  constructor(props){
    super(props)
    this.isGetInitialState = () => ({
      name: props.name || "",
      studentsId: props._id || ""
      // parentId : props.parentId,
      // academyId : props.academyId
    })
    this.state = this.isGetInitialState()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }
  handleChange(e) {
    // console.log(e);
    this.setState({[e.target.name]: e.target.value})
  }
  componentWillReceiveProps(newProps) {
    if(newProps.modalStatus !== this.props.modalStatus) {
      // console.log( "modal componentWillReceiveProps" );
      this.setState({ ...newProps.modalRenderData })
    }
    return false
  }
  // shouldComponentUpdate(newProps){
  //   if(newProps.modalStatus !== this.props.modalStatus) {
  //     console.log( "modal shouldComponentUpdate AAAA" );
  //     return true
  //   }
  //   return false
  // }
  handleClick(e){
    let { modalPurpose } = this.props;
    let { result } = e.currentTarget.dataset;
    //TODO: action api 만 짜면 됨
    let handleEvent = {
      "create" : {
        complete : () => this.props.editStudentName("add", this.state),
        cancle : () => false
      },
      "edit" : {
        complete : () => this.props.editStudentName("edit", this.state),
        cancle : () => false
      }
    }

    handleEvent[modalPurpose][result]()

    this.setState(this.isGetInitialState())

    this.props.handleModal(e)

  }
  render(){
    let { name } = this.state;
    return(
      <Modal
        isModalOpen={this.props.modalStatus}
        modalWidth="600px"
      >
        <DirectionContainer direction="row">
          <ToyCodeInputCont
            label="학생 명"
            holder="학생 명"
            styleType="top_aligned"
            name="name"
            value={name}
            handleChange={this.handleChange}
           />

        </DirectionContainer>
        <FlatButton
          data-result="cancle"
          data-name={this.props.modalHandleName}
          label="취소"
          onClick={this.handleClick}
         />
        <FlatButton
          data-result="complete"
          data-name={this.props.modalHandleName}
          label="완료"
          secondary={true}
          onClick={this.handleClick}
         />
      </Modal>
    )
  }
}

export default SettingStudentModal
