import React, { PureComponent } from 'react'
import { ToyCodeInputCont, DirectionContainer, Modal, ToyCodeSelect } from '../Components'
import FlatButton from 'material-ui/FlatButton';

class SettingAcademyCardModal extends PureComponent{
  constructor(props){
    super(props)
    this.isGetInitialState = () => ({
      name: props.name || "",
      lang: props.lang || "ko",
      phone: props.phone || "",
      // zipNo: props.zipNo || "",
      // roadAddr: props.roadAddr || "",
      // detailAddr: props.detailAddr || "",
      manager: props.manager || "",
      managerPh: props.managerPh || "",
      // classes: props.kinderClasses,
      // modal: props.modalStatus
    })
    this.state = this.isGetInitialState()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){
    // console.log("SettingAcademyCardModal", this.props);
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
        complete : () => this.props.completedAddAcademy(this.state),
        cancle : () => this.setState(this.isGetInitialState())
      },
      "edit" : {
        complete : () => this.props.completedEditAcademy(this.state, this.props.academy_id),
        cancle : () => this.setState(this.isGetInitialState())
      }
    }

    handleEvent[modalPurpose][result]()

    this.props.handleModal()
    this.props.getAcademyByUser()
  }
  render(){
    // console.log("render Setting");
    let { name, lang, phone, manager, managerPh } = this.state;
    let languageOptions = [
      {value: "ko", lang: "한국어"},
      {value: "en", lang: "English"}
    ]
    return(
      <Modal
        isModalOpen={this.props.modalStatus}
        closeName="modi"
        // closeModal={this.handleOrderModal}
        modalWidth="600px"
      >
        <DirectionContainer direction="row">
          <ToyCodeInputCont
            label="학원 명"
            holder="학원 명"
            styleType="top_aligned"
            name="name"
            value={name}
            handleChange={this.handleChange}
           />
         <ToyCodeInputCont
           label="전화번호"
           holder="전화번호"
           styleType="top_aligned"
           inputType="number"
           name="phone"
           value={phone}
           handleChange={this.handleChange}
          />
          <ToyCodeSelect
            labelName="언어선택"
            name="lang"
            value={lang}
            handleChange={this.handleChange}
            options={languageOptions}
          />
        </DirectionContainer>

        <DirectionContainer direction="row">
          <ToyCodeInputCont
            label="담당자"
            holder='담당자'
            styleType="top_aligned"
            name="manager"
            inputType="text"
            value={manager}
            handleChange={this.handleChange}
          />
          <ToyCodeInputCont
            label="담당자 전화번호"
            holder='전화번호'
            styleType="top_aligned"
            name="managerPh"
            inputType="number"
            value={managerPh}
            handleChange={this.handleChange}
          />
        </DirectionContainer>
        <FlatButton
          data-result="cancle"
          label="취소"
          onClick={this.handleClick}
         />
        <FlatButton
          data-result="complete"
          label="완료"
          secondary={true}
          onClick={this.handleClick}
         />
      </Modal>
    )
  }
}

export default SettingAcademyCardModal
