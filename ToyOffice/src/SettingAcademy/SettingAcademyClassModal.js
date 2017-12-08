import React, { PureComponent } from 'react'
import { ToyCodeInputCont, DirectionContainer, Modal, ToyCodeSelect } from '../Components'
import FlatButton from 'material-ui/FlatButton';

class SettingAcademyClassModal extends PureComponent{
  constructor(props){
    super(props)
    this.isGetInitialState = () => ({
      className: props.name || "",
      level: props.level || "A",
      parentId : props.parentId,
      academyId : props.academyId
    })
    this.state = this.isGetInitialState()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  componentWillReceiveProps(newProps) {
    this.setState({ ...newProps })
  }
  handleClick(e){
    // debugger
    let { modalPurpose } = this.props;
    let { result } = e.currentTarget.dataset;

    let handleEvent = {
      "create" : {
        complete : () => this.props.createAcademyClass(this.state),
        cancle : () => false
      },
      "edit" : {
        complete : () => this.props.editAcademyClass(this.state, this.props.academyClass_id),
        cancle : () => false
      }
    }

    handleEvent[modalPurpose][result]()

    this.setState(this.isGetInitialState())
    this.props.handleModal(e)
    // this.props.getAcademyByUser()
  }
  render(){
    // console.log("render Setting");
    let { className, level } = this.state;
    let Options = [
      {value: "A", name: "A레벨-5세용"},
      {value: "B", name: "B레벨-6세용"},
      {value: "C", name: "C레벨-7세용"}
    ]
    return(
      <Modal
        isModalOpen={this.props.modalStatus}
        // closeName="modi"``
        modalWidth="600px"
      >
        <DirectionContainer direction="row">
          <ToyCodeInputCont
            label="반 명"
            holder="반 명"
            styleType="top_aligned"
            name="className"
            value={className}
            handleChange={this.handleChange}
           />
          <ToyCodeSelect
            labelName="레벨"
            name="level"
            value={level}
            handleChange={this.handleChange}
            options={Options}
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

export default SettingAcademyClassModal
