import React, {Component} from 'react'
import { connect } from 'react-redux'
import AddrModal from './AddrModal'

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
  handleAddrModal = (modal, boolean) => {
    this.setState({[modal]: boolean})
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
    // console.log();
    let { juso } = this.props;
    return(
      <div className="Goods-Delivery-Addr">
        <div className="Delivery-Addr-Col">
          <div className="Delivery-Addr-Row SpaceBtw">
            <label>
            우편번호
            <input
              className="Delivery-input"
              placeholder='우편번호'
              type='number'
              name="zipNo"
              value={this.state.zipNo}
              readOnly/>
            </label>
            <button className="Delivery-Addr-btn" onClick={() => this.handleAddrModal('addrModal', true)}>주소 검색</button>
            <button className="Delivery-Addr-btn">주소록</button>
          </div>
          <div>
            <label>배송처
            <input
              className="Delivery-input"
              placeholder='주소를 검색하여 배송지를 입력해주세요.'
              type='text'
              name="roadAddr"
              value={this.state.roadAddr}
              readOnly
            />
            </label>
            <label>배송지 상세주소
            <input
              className="Delivery-input"
              placeholder='배송지 상세주소'
              type='text'
              name="detailAddr"
              value={this.state.detailAddr}
              onChange={this.handleChange}
              onBlur={this.handleSendAddr}
            />
            </label>
          </div>
          <div className="Delivery-Addr-Row SpaceBtw">
            <label>
              수령인
            <input
              className="Delivery-input half"
              placeholder='수령인'
              type='text'
              name="recipient"
              value={this.state.recipient}
              onChange={this.handleChange}
              onBlur={this.handleSendAddr}
            />
            </label>
            <label>연락처
            <input
              className="Delivery-input"
              placeholder='-를 제외하고 입력하세요.'
              type='number'
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              onBlur={this.handleSendAddr}
            />
            </label>
          </div>
          <div>
            <label>
              요구사항
            <input
              className="Delivery-input"
              placeholder='요구사항'
              type='text'
              name="rqcontent"
              value={this.state.rqcontent}
              onChange={this.handleChange}
              onBlur={this.handleSendAddr}
            />
            </label>
          </div>
        </div>
        <AddrModal
          isModalOpen={this.state.addrModal}
          closeModal={() => this.handleAddrModal('addrModal', false)}>
          <i className="fa fa-times-circle search-close" aria-hidden="true" onClick={() => this.handleAddrModal('addrModal', false)}></i>
          <form onSubmit={this.handleSearchAddr} className="search-bar">
            <input className="search-input" type="search" value={this.state.location} onChange={this.handleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
            <button type="button" className="search-btn" onClick={this.handleSearchAddr}>주소 검색</button>
          </form>
          <div className="search-address-results">
            {juso && juso.map((result, i)=> (
              <div className="search-address-result" key={i} onClick={() => this.handleSelectAddr(result)}>
                <p>{result.roadAddr}</p>
              </div>
            ))}
          </div>
          {/* <button className="search-btn" onClick={() => this.setState({addrModal: false })}>닫기</button> */}
        </AddrModal>
      </div>
    )
  }
}

const mapStateToProps = ({goods}) => ({
  juso: goods.juso,
	selectedJuso: goods.selectedJuso
})


export default connect(mapStateToProps, null)(GoodsDeliveryAddr)
