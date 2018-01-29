import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  ToyCodeButton,
  DirectionContainer,
  ToyCodeInputCont
 } from '../Components'

class GoodsDeliveryAddr extends Component{
  state = {
    rqcontent: '',
		location: '',
    phone: '',//acct.A_phone || '',
		zipNo: '',
		roadAddr: '', //address.roadAddr|| '',
		detailAddr: '',//address.detailAddr|| '',
    recipient: '', //acct.A_manager || '',
    addrModal: false
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  handleSendAddr = () => {
    this.props.enterDeliveryDetail(this.state)
  }
  handleAddrModal = (e) => {
    let name = e.target.tagName === "DIV" ? e.target.dataset.name : e.target.name;
    this.setState({[name]: !this.state[name]})
  }
  handleSearchAddr = e => {
    e.preventDefault();
		this.props.searchAddress(this.state.location)
	}
  handleSelectAddr = (result) => {
    console.log(result);
    // const {selectedJuso} = this.props
		// selectedJuso(result)
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr,
      detailAddr: result.detailAddr || '',
      recipient: result.manager || '',
      phone: result.managerPh || '',
      location: '',
      addrModal: false
		})
    this.props.searchAddress('')
  }
  render(){
    let { juso } = this.props;
    return(
      <div className="Goods-Delivery-Addr">
        <DirectionContainer direction="row">
            <ToyCodeInputCont
              label="우편번호"
              holder="우편번호"
              styleType="top_aligned"
             />
            <ToyCodeButton content="주소 검색" buttonStyle="toycode_button"/>
            <ToyCodeButton content="주소록" buttonStyle="toycode_button"/>
        </DirectionContainer>
        <ToyCodeInputCont
          label="배송지"
          holder="배송지"
          styleType="top_aligned"
         />
        <ToyCodeInputCont
          holder="상세주소"
          styleType="top_aligned"
         />
        <DirectionContainer direction="row">
            <ToyCodeInputCont
              label="수령인"
              holder="수령인"
              styleType="top_aligned"
             />
            <ToyCodeInputCont
              label="연락처"
              holder="연락처"
              styleType="top_aligned"
             />
        </DirectionContainer>
        <ToyCodeInputCont
          label="요구사항"
          holder="요구사항"
          styleType="top_aligned"
         />

        <Modal
          isModalOpen={this.state.addrModal}
          closeName="addrModal"
          closeModal={this.handleAddrModal}
          styleType="searchModal"
          >
            <i className="fa fa-times-circle search-close" aria-hidden="true" onClick={() => this.handleAddrModal('addrModal', false)}></i>
            <form onSubmit={this.handleSearchAddr} className="search-bar">
              <input className="search-input" type="search" value={this.state.location} onChange={this.handleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
              <ToyCodeButton
                buttonStyle="search-btn"
                buttonType="button"
                buttonName="modi"
                handleButtonEvent={this.handleSearchAddr}
                content="주소 검색"
              />
            </form>
            <div className="search-address-results">
              {juso && juso.map((result, i)=> (
                <div className="search-address-result" key={i} onClick={() => this.handleSelectAddr(result)}>
                  <p>{result.roadAddr}</p>
                </div>
              ))}
            </div>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = ({goods}) => ({
  juso: goods.juso,
	selectedJuso: goods.selectedJuso
})


export default connect(mapStateToProps, null)(GoodsDeliveryAddr)

//
// <div className="Delivery-Addr-Col">
//   <div className="Delivery-Addr-Row SpaceBtw">
//     <ToyCodeInput
//       inputContStyle="Delivery-Container"
//       inputStyle="Delivery-input"
//       label="우편번호"
//       holder='우편번호'
//       name="zipNo"
//       inputType="number"
//       value={this.state.zipNo}
//       readOnly={true} />
//     <div>
//       <ToyCodeButton
//         buttonType="button"
//         buttonStyle="Delivery-Addr-btn"
//         handleButtonEvent={this.handleAddrModal}
//         buttonName="addrModal"
//         content="주소 검색"
//       />
//       <ToyCodeButton
//         buttonType="button"
//         buttonStyle="Delivery-Addr-btn"
//         content="주소록"
//       />
//     </div>
//   </div>
//   <ToyCodeInput
//     inputContStyle="Delivery-Container"
//     inputStyle="Delivery-input"
//     label="배송처"
//     holder="주소를 검색하여 배송지를 입력해주세요."
//     name="roadAddr"
//     inputType="text"
//     value={this.state.roadAddr}
//     readOnly={true} />
//   <ToyCodeInput
//     inputContStyle="Delivery-Container"
//     inputStyle="Delivery-input"
//     // label="배송지 상세주소"
//     holder="배송지 상세주소"
//     name="detailAddr"
//     inputType="text"
//     value={this.state.detailAddr}
//     handleChange={this.handleChange}
//     handleBlur={this.handleSendAddr}
//   />
//   <div className="Delivery-Addr-Row SpaceBtw">
//     <ToyCodeInput
//       inputContStyle="Delivery-Container"
//       inputStyle="Delivery-input half"
//       label="수령인"
//       inputType="text"
//       holder="수령인"
//       name="recipient"
//       value={this.state.recipient}
//       handleChange={this.handleChange}
//       handleBlur={this.handleSendAddr}
//     />
//     <ToyCodeInput
//       label="연락처"
//       inputContStyle="Delivery-Container"
//       inputStyle="Delivery-input half"
//       inputType="number"
//       holder='-를 제외하고 입력하세요.'
//       name="phone"
//       value={this.state.phone}
//       handleChange={this.handleChange}
//       handleBlur={this.handleSendAddr}
//     />
//   </div>
//   <ToyCodeInput
//     label="요구사항"
//     inputStyle="Delivery-input"
//     inputContStyle="Delivery-Container"
//     inputType="text"
//     holder='요청 사항을 적어주세요.'
//     name="rqcontent"
//     value={this.state.rqcontent}
//     handleChange={this.handleChange}
//     handleBlur={this.handleSendAddr}
//   />
// </div>
