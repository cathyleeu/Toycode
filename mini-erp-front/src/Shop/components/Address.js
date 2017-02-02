import React, {Component} from 'react'
import Input from './Input'
import './Address.css'
import AddrModal from './AddrModal'
import { connect } from 'react-redux'
import * as actions from '../../actions'


class Address extends Component {
  constructor(props) {
    super(props)
    const { address, acct } = this.props
    this.state = {
      rqcontent: '',
			location: '',
      phone: acct.Phone || '',
			zipNo: address.zipNo || '',
			roadAddr: address.roadAddr|| '',
			detailAddr: address.detailAddr|| '',
      isAddrOpen: false,
      isAddrBookOpen: false
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }
  openAddr = () => {
    this.setState({ isAddrOpen: true })
  }
  openAddrBook = () => {
    this.setState({ isAddrBookOpen: true })
  }
  closeModal = () => {
		const { searchAddress } = this.props
		this.setState({ isAddrOpen: false, isAddrBookOpen: false, location: ''}, searchAddress(''))
	}
	isSearchAddress = () => {
		const { searchAddress } = this.props
		searchAddress(this.state.location)
	}
	isSelectedAddress = (result) => {
		const {selectedJuso} = this.props
		selectedJuso(result)
    console.log(selectedJuso(result))
    console.log(this.state)
		this.closeModal()
		this.setState({
			zipNo: result.zipNo,
			roadAddr: result.roadAddr,
      detailAddr: result.detailAddr || ''
		})
	}
	/*TODO
		1: 사용자가 주소입력 할 수 있도록 onChange설정하기
		2: 그래도, 처음에는 (회원가입)입력한 값으로 받기
		3: 주소 검색 API 붙이기
		4: UI 정리하기...ㅠㅠ
	*/
  render(){
    const {user, userEmail, userCode, requestInvoice, selected, juso, userName, userKinders, kinderAddr} = this.props
    const invoice = {
      userName: userName,
      userEmail: userEmail,
      userCode: userCode,
      delivery: {
        to: user.Name,
        address: {
					zipNo: this.state.zipNo,
					roadAddr: this.state.roadAddr,
					detailAddr: this.state.detailAddr
				},
        phone: this.state.phone
      },
      requestedGoods: selected.map(each => (
        { name : each.title,
          qutt: each.amount,
          sales: each.amount*each.price
        })),
      requestDesc: this.state.rqcontent,
      totalSales: selected.map(each => each.amount*each.price).reduce((a,b)=>a+b)
    }
    return(
      <div className="col-md-12 delivery">
        <div className="delivery-zipcode">
          <label htmlFor="zipcode">우편번호</label>
          <div className="zipcode">
            <Input type={'text'} id={'zipcode'} placeholder={'우편번호'} className={'col-md-5 Added-Input'} value={this.state.zipNo}/>
            <button onClick={this.openAddr} className="col-md-3">주소검색</button>
            <AddrModal
              isModalOpen={this.state.isAddrOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
							<div className="search-address-top">
								<input className="search-input" type="search" value={this.state.location} onChange={this.handleChange} name="location" placeholder="ex) 강남구 강남대로 408" />
								<i className="fa fa-search search-icon" aria-hidden="true" onClick={this.isSearchAddress}></i>
							</div>
							<div className="search-address-results">
								{juso && juso.map((result, i)=> (
									<div className="search-address-result" key={i} onClick={() => this.isSelectedAddress(result)}>
										<p>{result.roadAddr}</p>
									</div>
								))}
							</div>
            </AddrModal>
            <button onClick={this.openAddrBook} className="col-md-2">주소록</button>
            <AddrModal
              isModalOpen={this.state.isAddrBookOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
              <div>
                <p>지사주소</p>
                <div onClick={() => this.isSelectedAddress(user.Address)}>
                  <p>{user.Address.zipNo}</p>
                  <p>{user.Address.roadAddr} | {user.Address.detailAddr}</p>
                </div>
                <div>
                  <p>소속유치원 주소</p>
                  {kinderAddr.map((kinder, i) => (
                    <div key={i} onClick={() => this.isSelectedAddress(kinder)}>
                      <p>{kinder.name}</p>
                      <p>{kinder.zipNo} | {kinder.roadAddr} | {kinder.detailAddr}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AddrModal>

          </div>
        </div>
        <div className="delivery-address">
          <label htmlFor="delivery">배송지</label>
          <Input type={'text'} value={this.state.roadAddr} placeholder={'배송지'} className={'Added-Input'} />
					<Input type={'text'} value={this.state.detailAddr} placeholder={'상세주소를 입력해주세요.'} className={'Added-Input'} id={'delivery'} onChange={this.handleChange} name={'detailAddr'}/>
        </div>
        <div className="delivery-recipient">
          <div className="name">
            <label htmlFor="name">수령인</label>
            <Input type={'text'} id={'name'} value={user.Name} placeholder={'받는이'} className={'Added-Input'}/>
          </div>
          <div className="phone">
            <label htmlFor="phone">연락처</label>
            <Input type={'text'} id={'phone'} value={this.state.phone} name={'phone'} placeholder={'전화번호'} className={'Added-Input'} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="delivery-inquiry">
          <label htmlFor="rqcontent">요청사항</label>
          <textarea
            rows="2" name='rqcontent' placeholder='배송 요청사항을 적어주세요.' id="rqcontent"
            value={this.state.rqcontent} onChange={this.handleChange} />
        </div>
        {invoice.totalSales ?(
          <button
            className="col-md-3"
            onClick={() => requestInvoice(invoice)}>주문하기</button>
        ):'수량을 입력하시면 주문하기 버튼이 뜹니다.'}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    juso: state.commonData.juso,
		selectedJuso: state.commonData.selectedJuso
  }
}


export default connect(mapStateToProps,actions)(Address)
// export default Address
